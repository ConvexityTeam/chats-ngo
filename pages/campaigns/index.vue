<template>
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
          v-if="section === 'campaigns'"
          text="Create campaign"
          custom-styles="height:50px"
          @click="$bvModal.show('new-campaign')"
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
      <b-tabs content-class="mt-1" id="profile-tab" nav-class nav-wrapper-class>
        <!-- Campaigns tab here -->
        <b-tab
          title="Campaigns"
          :active="section === 'campaigns'"
          class="nav-links"
          @click="handleTabClick('campaigns')"
        >
          <CampaignTable
            :resultQuery="resultQuery"
            :loading="$fetchState.pending"
            :id="id"
            @reload="$fetch"
          />
        </b-tab>

        <!-- Campaign forms here -->
        <b-tab
          title="Campaign forms"
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
      </b-tabs>
    </section>
  </div>
</template>
<script>
import CampaignTable from "~/components/tables/campaigns/all-campaigns.vue";
import CampaignForms from "~/components/tables/campaigns/CampaignForms.vue";
import { mapGetters } from "vuex";

export default {
  layout: "dashboard",
  components: { CampaignTable, CampaignForms },

  data: () => ({
    id: "",
    searchQuery: "",
    campaigns: [],
    forms: [],
  }),

  computed: {
    ...mapGetters("authentication", ["user"]),

    section() {
      return this.$route.query.section || "campaigns";
    },

    resultQuery() {
      const data = this.section === "campaigns" ? this.campaigns : this.forms;
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
    const responseOne = await this.$axios.get(
      `organisations/${this.id}/campaign_form`
    );

    if (responseOne.status === "success") {
      this.forms = responseOne.data;
    }

    const responseTwo = await this.$axios.get(
      `/organisations/${this.id}/campaigns/all?type=campaign`
    );

    if (responseTwo.status === "success") {
      this.campaigns = responseTwo.data;
    }
  },

  methods: {
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
  },
};
</script>
