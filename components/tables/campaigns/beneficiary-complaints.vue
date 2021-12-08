<template>
  <div>
    <div class="table-holder ">
      <div class="d-flex align-items-center table-title ">
        <h4 class="pt-2">Beneficiary Complaints</h4>
        <div class="ml-auto"></div>
      </div>

      <!-- Tabs Here -->
      <div class="">
        <b-tabs content-class="mt-3">
          <hr class="divider" />

          <!-- All complaints tab here -->
          <b-tab title="All" active>
            <all-complaints
              :complaints="complaints"
              :loading="loading"
              :campaignName="campaignName"
              @resolved="getComplaints"
            />
          </b-tab>

          <!-- Resolved complaints here -->
          <b-tab title="Resolved">
            <resolved-complaints
              :complaints="resolved"
              :loading="loading"
              :campaignName="campaignName"
              @resolved="getComplaints"
            />
          </b-tab>

          <!-- Unresolved Complaints here -->
          <b-tab title="Unresolved">
            <unresolved-complaints
              :complaints="unresolved"
              :loading="loading"
              :campaignName="campaignName"
              @resolved="getComplaints"
            />
          </b-tab>
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import allComplaints from "./all-complaints.vue";
import resolvedComplaints from "./resolved-complaints.vue";
import unresolvedComplaints from "./unresolved-complaints.vue";
import { mapGetters } from "vuex";

export default {
  props: {
    campaignId: {
      type: String,
      default: ""
    },
    campaignName: {
      type: String,
      default: ""
    }
  },

  components: {
    allComplaints,
    resolvedComplaints,
    unresolvedComplaints
  },

  data() {
    return {
      loading: false,
      orgId: "",
      complaints: [],
      loading: false
    };
  },

  computed: {
    ...mapGetters("authentication", ["user"]),
    resolved() {
      return this.complaints.filter(
        complaint => complaint.status === "resolved"
      );
    },
    unresolved() {
      return this.complaints.filter(
        complaint => complaint.status === "unresolved"
      );
    }
  },

  mounted() {
    this.orgId = this.user?.AssociatedOrganisations[0]?.OrganisationId;
    this.getComplaints();
  },

  methods: {
    async getComplaints() {
      try {
        this.loading = true;

        const response = await this.$axios.get(
          `/organisations/${this.orgId}/campaigns/${+this
            .campaignId}/complaints`
        );

        console.log("ALlcomplaints::::", response);
        if (response.status == "success") {
          this.loading = false;
          this.complaints = response.data?.Complaints;
        }
      } catch (err) {
        this.loading = false;
        console.log(err);
      }
    }
  }
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
