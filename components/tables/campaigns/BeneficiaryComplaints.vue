<template>
  <div>
    <div class="table-holder">
      <div class="d-flex align-items-center table-title">
        <h4 class="pt-2">Beneficiary Complaints</h4>
        <div class="ml-auto"></div>
      </div>

      <!-- Tabs Here -->
      <div class="">
        <b-tabs content-class="mt-3">
          <hr class="divider" />

          <!-- All complaints tab here -->
          <b-tab title="All" active>
            <TablesCampaignsAllComplaints
              :loading="loading"
              :campaignName="campaignName"
              :complaints="allComplaints"
              :allComplaintPageNum="allComplaintPageNum"
              :allComplaintTotalItems="allComplaintTotalItems"
              @resolved="getComplaints"
              @updatePage="updateComplaints"
            />
          </b-tab>

          <!-- Resolved complaints here -->
          <b-tab title="Resolved">
            <TablesCampaignsResolvedComplaints
              :loading="loading"
              :campaignName="campaignName"
              :complaints="allResolvedComplaints"
              :resolvedComplaintPageNum="resolvedComplaintPageNum"
              :resolvedComplaintTotalItems="resolvedComplaintTotalItems"
              @resolved="getComplaints"
              @updatePage="updateComplaints"
            />
          </b-tab>

          <!-- Unresolved Complaints here -->
          <b-tab title="Unresolved">
            <TablesCampaignsUnresolvedComplaints
              :loading="loading"
              :campaignName="campaignName"
              :complaints="allUnresolvedComplaints"
              :unresolvedComplaintPageNum="unresolvedComplaintPageNum"
              :unresolvedComplaintTotalItems="unresolvedComplaintTotalItems"
              @updatePage="updateComplaints"
              @resolved="getComplaints"
            />
          </b-tab>
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    campaignId: {
      type: String,
      default: "",
    },

    campaignName: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      loading: false,
      orgId: "",

      allComplaints: [],
      allComplaintPageNum: 1,
      allComplaintTotalItems: 0,

      allResolvedComplaints: [],
      resolvedComplaintPageNum: 1,
      resolvedComplaintTotalItems: 0,

      allUnresolvedComplaints: [],
      unresolvedComplaintPageNum: 1,
      unresolvedComplaintTotalItems: 0,
    };
  },

  computed: {
    ...mapGetters("authentication", ["user"]),
  },

  async mounted() {
    this.orgId = this.user?.AssociatedOrganisations[0]?.OrganisationId;
    await this.getComplaints();
  },

  methods: {
    async getComplaints() {
      try {
        this.loading = true;

        const complaints = await this.$axios.get(
          `/organisations/${this.orgId}/campaigns/${+this
            .campaignId}/complaints?page=${this.allComplaintPageNum}&size=10`
        );
        const resolved = await this.$axios.get(
          `/organisations/${this.orgId}/campaigns/${+this
            .campaignId}/complaints?page=${
            this.resolvedComplaintPageNum
          }&size=10&status=resolved`
        );
        const unresolved = await this.$axios.get(
          `/organisations/${this.orgId}/campaigns/${+this
            .campaignId}/complaints?page=${
            this.allUnresolvedComplaints
          }&size=10&status=unresolved`
        );

        if (complaints.status === "success")
          this.allComplaints = complaints.data?.complaint?.data;
        if (resolved.status === "success")
          this.allResolvedComplaints = resolved.data?.complaint?.data;
        if (unresolved.status === "success")
          this.pendingBeneficiaries = unresolved.data?.complaint?.data;

        this.allComplaintPageNum =
          complaints?.data?.complaint?.currentPage || 1;
        this.allComplaintTotalItems = complaints?.data?.complaint?.totalItems;

        this.resolvedComplaintPageNum =
          resolved?.data?.complaint?.currentPage || 1;
        this.resolvedComplaintTotalItems =
          resolved?.data?.complaint?.totalItems;

        this.unresolvedComplaintPageNum =
          unresolved?.data?.complaint?.currentPage || 1;
        this.unresolvedComplaintTotalItems =
          unresolved?.data?.complaint?.totalItems;
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },

    updateComplaints({ action, activeTab }) {
      if (activeTab === "resolved") {
        this.resolvedComplaintPageNum =
          action === "prev"
            ? this.resolvedComplaintPageNum - 1
            : this.resolvedComplaintPageNum + 1;
      } else if (activeTab === "unresolved") {
        this.unresolvedComplaintPageNum =
          action === "prev"
            ? this.unresolvedComplaintPageNum - 1
            : this.unresolvedComplaintPageNum + 1;
      } else {
        this.allComplaintPageNum =
          action === "prev"
            ? this.allComplaintPageNum - 1
            : this.allComplaintPageNum + 1;
      }

      this.getComplaints();
    },
  },
};
</script>

<style scoped>
.table-title {
  padding: 0.5rem 1.5rem;
}
.divider {
  border-top: 1px solid #f5f6f8;
}

.nav-tabs {
  border: none !important;
}
</style>
