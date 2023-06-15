<template>
  <div>
    <!-- modals here -->
    <Modal size="lg" id="select-campaign-type" title="Select campaign type">
      <SelectCampaignTypeVue @selectCampaignType="selectCampaignType" />
    </Modal>
    <!--  -->
    <Modal id="new-campaign-form" title="New Campaign">
      <NewCampaignVue :selectedCampaign="selectedCampaign" @reload="$fetch" />
    </Modal>

    <div class="main container transparent pb-5">
      <div class="row pt-4 mt-2">
        <div class="col-lg-8">
          <div class="row">
            <div class="col-lg-5">
              <!-- Search Box here -->
              <div class="position-relative">
                <input
                  type="text"
                  class="form-controls search"
                  :placeholder="`Search ${section}...`"
                  v-model="searchQuery"
                />
                <img
                  src="~/assets/img/vectors/search.svg"
                  class="search-icon position-absolute"
                  alt="search"
                />
              </div>
            </div>

            <!-- <div class="position-relative">
            <span class="filter position-absolute">
              <img src="~/assets/img/vectors/filter.svg" alt="filter" />
            </span>
            <b-form-select
              v-model="selected"
              :options="options"
              class="filter"
              plain
            ></b-form-select>
          </div> -->
          </div>
        </div>

        <div class="ml-auto mx-3">
          <Button
            v-if="section === 'campaigns' || section === 'items'"
            text="Create campaign"
            custom-styles="height:50px"
            @click="$bvModal.show('select-campaign-type')"
          />

          <Button
            v-if="section === 'forms'"
            text="New form"
            custom-styles="height:50px"
            @click="handleNewForm"
          />
        </div>
      </div>

      <!-- Tabs Here -->
      <section class="mt-4">
        <b-tabs
          content-class="mt-1"
          id="profile-tab"
          nav-class
          nav-wrapper-class
        >
          <FullScreenLoader
            v-if="$fetchState.pending"
            :loading="$fetchState.pending"
          />

          <template v-else>
            <!-- Campaigns tab here -->
            <b-tab
              title="Cash Campaigns"
              :active="section === 'campaigns'"
              class="nav-links"
              @click="handleTabClick('campaigns')"
            >
              <CampaignTable
                :resultQuery="resultQuery"
                :loading="$fetchState.pending"
                :id="id"
                @reload="$fetch"
                @activateCampaign="activateCampaign"
              />
            </b-tab>

            <b-tab
              title="Item Campaigns"
              :active="section === 'items'"
              class="nav-links"
              @click="handleTabClick('items')"
            >
              <ItemCampaigns
                :resultQuery="resultQuery"
                :loading="$fetchState.pending"
                :id="id"
                @reload="$fetch"
                @activateCampaign="activateCampaign"
              />
            </b-tab>

            <!-- Campaign forms here -->
            <b-tab
              title="Campaign Forms"
              :active="section === 'forms'"
              @click="handleTabClick('forms')"
            >
              <CampaignForms
                :resultQuery="resultQuery"
                :loading="$fetchState.pending"
                :id="id"
                @reload="$fetch"
              />
            </b-tab>
          </template>
        </b-tabs>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SelectCampaignTypeVue from "~/components/forms/campaigns/SelectCampaignType";
import CampaignTable from "~/components/tables/campaigns/AllCampaigns";
import CampaignForms from "~/components/tables/campaigns/CampaignForms";
import ItemCampaigns from "~/components/tables/campaigns/ItemCampaigns";
import NewCampaignVue from "~/components/forms/new-campaign";

let screenLoading;

export default {
  layout: "dashboard",
  name: "Campaigns",
  components: {
    CampaignTable,
    CampaignForms,
    ItemCampaigns,
    SelectCampaignTypeVue,
    NewCampaignVue,
  },

  data: () => ({
    id: "",
    searchQuery: "",
    selectedCampaign: "",
    campaigns: [],
    forms: [],
    items: [],
  }),

  computed: {
    ...mapGetters("authentication", ["user"]),

    section() {
      return this.$route.query.section || "campaigns";
    },

    resultQuery() {
      const data = this[this.section];
      if (this.searchQuery) {
        return data.filter((item) =>
          item?.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      return data;
    },
  },

  async fetch() {
    this.id = this.user?.AssociatedOrganisations[0]?.OrganisationId;
    const campaignForms = await this.$axios.get(
      `organisations/${this.id}/campaign_form`
    );

    const campaigns = await this.$axios.get(
      `/organisations/${this.id}/campaigns/all?type=campaign`
    );

    // fetch item campaign's response
    const itemCampaigns = await this.$axios.get(
      `/organisations/${this.id}/campaigns/all?type=item`
    );

    this.forms = campaignForms.data;
    this.campaigns = campaigns.data;
    this.items = itemCampaigns.data;
  },

  methods: {
    selectCampaignType(campaign_type) {
      this.selectedCampaign = campaign_type;
      this.$bvModal.hide("select-campaign-type");
      this.$bvModal.show("new-campaign-form");
    },

    async activateCampaign(campaign) {
      try {
        this.openScreen();

        const response = await this.$axios.put(
          `organisations/${this.id}/campaigns/${campaign.id}`,
          { status: "active" }
        );

        if (response.status == "success") {
          this.$toast.success(response.message);
          this.$fetch();
        }
      } catch (err) {
        console.log(err);
      } finally {
        screenLoading.close();
      }
    },

    handleTabClick(section) {
      // check if user is already on the same tab
      if (this.section === section) return;
      this.$router.replace({
        path: this.$route.path,
        query: { section },
      });
    },

    handleNewForm() {
      localStorage.removeItem("campaignForm");
      this.$router.push("/campaigns/forms/new");
    },

    openScreen() {
      screenLoading = this.$loading({
        lock: true,
        spinner: "el-icon-loading",
        background: "#0000009b",
      });
    },
  },
};
</script>

<style scoped>
.main {
  height: calc(100vh - 72px);
  overflow-y: scroll;
}
</style>
