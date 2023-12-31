<template>
  <div>
    <!-- modals here -->
    <Modal id="select-campaign-type" size="lg" title="Select project type">
      <SelectCampaignTypeVue @selectCampaignType="selectCampaignType" />
    </Modal>
    <!--  -->
    <Modal id="new-campaign-form" title="New Project">
      <NewCampaignVue :selectedCampaign="selectedCampaign" @reload="$fetch()" />
    </Modal>

    <div class="main container transparent pb-5">
      <div class="row pt-4 mt-2">
        <div class="col-lg-8">
          <div class="row">
            <div class="col-lg-5">
              <!-- Search Box here -->
              <div class="position-relative">
                <input
                  v-model="searchQuery"
                  type="text"
                  class="form-controls search"
                  :placeholder="`Search ${section}...`"
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
            v-if="section === 'projects' || section === 'items'"
            text="Create project"
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
          id="profile-tab"
          content-class="mt-1"
          nav-class
          nav-wrapper-class
        >
          <!-- Campaigns tab here -->
          <b-tab
            title="Cash Projects"
            :active="section === 'projects'"
            class="nav-links"
            @click="handleTabClick('projects')"
          >
            <CampaignTable
              :id="id"
              :resultQuery="resultQuery"
              :loading="$fetchState.pending"
              :campaignPageNum="campaignPageNum"
              :campaignTotalItems="campaignTotalItems"
              @reload="$fetch"
              @activateCampaign="activateCampaign"
              @updatePage="updateCampaignPage"
            />
          </b-tab>

          <b-tab
            title="Item Projects"
            :active="section === 'items'"
            class="nav-links"
            @click="handleTabClick('items')"
          >
            <ItemCampaigns
              :id="id"
              :resultQuery="resultQuery"
              :loading="$fetchState.pending"
              :itemCampaignPageNum="itemCampaignPageNum"
              :itemCampaignTotalItems="itemCampaignTotalItems"
              @reload="$fetch"
              @activateCampaign="activateCampaign"
              @updatePage="updateItemCampaignPage"
            />
          </b-tab>

          <!-- Campaign forms here -->
          <b-tab
            title="Project Forms"
            :active="section === 'forms'"
            @click="handleTabClick('forms')"
          >
            <CampaignForms
              :id="id"
              :resultQuery="resultQuery"
              :loading="$fetchState.pending"
              @reload="$fetch"
              @updatePage="updateCampaignFormPage"
            />
          </b-tab>
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
  name: "Campaigns",
  components: {
    CampaignTable,
    CampaignForms,
    ItemCampaigns,
    SelectCampaignTypeVue,
    NewCampaignVue,
  },
  layout: "dashboard",
  transition: "fade-up",

  data: () => ({
    id: "",
    searchQuery: "",
    selectedCampaign: "",
    projects: [],
    forms: [],
    items: [],

    campaignPageNum: 1,
    campaignTotalItems: 0,

    itemCampaignPageNum: 1,
    itemCampaignTotalItems: 0,

    formPageNum: 1,
    formTotalItems: 0,
  }),

  async fetch() {
    this.id = this.user?.AssociatedOrganisations[0]?.OrganisationId;
    const campaignForms = await this.$axios.get(
      `organisations/${this.id}/campaign_form?page=${this.formPageNum}&size=10`
    );

    const campaigns = await this.$axios.get(
      `/organisations/${this.id}/campaigns/all?type=campaign&page=${this.campaignPageNum}&size=10`
    );

    console.log("CAMPAIGNS:::", campaigns);

    // fetch item campaign's response
    const itemCampaigns = await this.$axios.get(
      `/organisations/${this.id}/campaigns/all?type=item&page=${this.itemCampaignPageNum}&size=10`
    );

    this.forms = campaignForms.data;
    this.projects = campaigns.data;
    this.items = itemCampaigns.data;

    // Pagination data here
    this.campaignPageNum = campaigns?.currentPage || this.formPageNum;
    this.campaignTotalItems = campaigns?.totalItems;

    this.itemCampaignPageNum = itemCampaigns?.currentPage || this.formPageNum;
    this.itemCampaignTotalItems = itemCampaigns?.totalItems;

    this.formPageNum = campaignForms?.currentPage || this.formPageNum;
    this.formTotalItems = campaignForms?.totalItems;
  },

  computed: {
    ...mapGetters("authentication", ["user"]),

    section() {
      return this.$route.query.section || "projects";
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

  methods: {
    selectCampaignType(campaign_type) {
      this.selectedCampaign = campaign_type;
      this.$bvModal.hide("select-campaign-type");
      this.$bvModal.show("new-campaign-form");
    },

    updateCampaignPage(action) {
      this.campaignPageNum =
        action === "prev" ? this.campaignPageNum - 1 : this.campaignPageNum + 1;

      this.$fetch();
    },

    updateItemCampaignPage(action) {
      this.itemCampaignPageNum =
        action === "prev"
          ? this.itemCampaignPageNum - 1
          : this.itemCampaignPageNum + 1;

      this.$fetch();
    },

    updateCampaignFormPage(action) {
      this.formPageNum =
        action === "prev" ? this.formPageNum - 1 : this.formPageNum + 1;

      this.$fetch();
    },

    async activateCampaign(campaign) {
      try {
        this.openScreen();

        const response = await this.$axios.put(
          `organisations/${this.id}/campaigns/${campaign.id}`,
          { status: "active" }
        );

        if (response.status === "success") {
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
      this.$router.push("/projects/forms/new");
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
