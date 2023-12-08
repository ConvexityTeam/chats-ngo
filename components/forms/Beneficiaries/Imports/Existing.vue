<template>
  <div class="mx-3">
    <section class="mt-3 text-left">
      <p class="primary-gray py-3 font-medium">
        Select a project you would like to import beneficiaries from
      </p>
    </section>

    <!-- Search Region Here -->
    <section class="mt-3">
      <div class="position-relative">
        <input
          v-model="searchQuery"
          type="text"
          class="form-controls search"
          placeholder="Search projects..."
        />
        <img
          src="~/assets/img/vectors/search.svg"
          class="search-icon position-absolute"
          alt="search"
        />
      </div>
    </section>

    <!-- Campaigns Here -->
    <section
      class="mt-4 py-3"
      :class="{ 'campaign-holder': resultQuery.length > 7 }"
    >
      <template v-if="resultQuery.length">
        <div
          v-for="campaign in resultQuery"
          :key="campaign.id"
          class="d-flex pb-2 mb-1"
        >
          <template v-if="campaign.Beneficiaries.length">
            <!-- campaign Here -->
            <p class="font-medium primary-blue">
              {{ `${campaign.title} (${campaign.Beneficiaries.length})` }}
            </p>

            <!-- Button Here -->
            <div class="ml-auto">
              <Button
                text="Import"
                :has-icon="true"
                :is-import="true"
                :has-border="true"
                custom-styles="border: 1px solid #17CE89 !important; border-radius: 5px !important; font-size: 0.875rem !important; height: 33px !important; padding: 0 10px !important"
                :disabled="loading || !campaign.Beneficiaries.length"
                @click="handleImport(campaign.id)"
              />
            </div>
          </template>
        </div>
      </template>

      <div v-else-if="$fetchState.pending" class="text-center loader"></div>
      <h3 v-else class="text-center no-record">NO RECORD FOUND</h3>
    </section>
  </div>
</template>

<script>
let screenLoading;

export default {
  props: {
    orgId: {
      type: [Number, String],
      default: "",
    },
  },

  data: () => ({
    loading: false,
    searchQuery: "",
    campaigns: [],
  }),

  async fetch() {
    // TODO: this needs to be updated to carter for fetching all Campaigns Scenario; either that or we rework the import flow
    const response = await this.$axios.get(
      `/organisations/${+this
        .orgId}/campaigns/all?type=campaign&page=${1}&size=10`
    );

    if (response.status === "success") {
      this.campaigns = response.data.filter(
        (campaign) => parseInt(campaign.id) !== parseInt(this.$route.params.id)
      );
    }
  },

  computed: {
    resultQuery() {
      if (this.searchQuery) {
        return this.campaigns.filter((campaign) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => campaign.title.toLowerCase().includes(v));
        });
      } else {
        return this.campaigns;
      }
    },
  },

  methods: {
    async handleImport(id) {
      try {
        this.openScreen();
        this.loading = true;

        const response = await this.$axios.post(
          `/organisations/${+this.orgId}/onboarded/${
            this.$route.params.id
          }/${id}`
        );

        console.log("Import Response:::", response);

        if (response.status === "success") {
          this.$emit("imported", "existing");
        }
      } catch (error) {
        console.log(error);
      } finally {
        screenLoading.close();
        this.loading = false;
      }
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
.campaign-holder {
  height: 20rem;
  overflow-y: auto;
}
</style>
