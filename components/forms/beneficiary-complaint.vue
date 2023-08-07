<template>
  <form @submit.prevent="resolveComplaint" class="mt-4 px-3">
    <!-- Name field  here -->
    <div class="form-group">
      <label for="campaign-name">Project Name</label>
      <input
        type="text"
        class="form-controls"
        id="campaign-name"
        :value="campaignName || ''"
        disabled
      />
    </div>

    <!-- Complaint  here -->
    <div class="form-group">
      <label>Complaint</label>
      <textarea
        class="form-controls"
        :value="report"
        rows="7"
        disabled
        cols="30"
      >
      </textarea>
    </div>

    <div
      v-if="complaint.status != 'resolved'"
      class="d-flex pt-2 pb-3 button-holder"
    >
      <Button
        type="submit"
        :has-icon="false"
        text="Resolve complaint"
        custom-styles="height:41px; border-radius: 5px; "
        @click="resolveComplaint"
        :loading="loading"
        :disabled="loading"
      />
    </div>
  </form>
</template>

<script>
import { mapGetters } from "vuex";
let screenLoading;

export default {
  props: {
    complaint: {
      type: Object,
      required: true,
      default: () => {},
    },

    campaignName: {
      type: String,
      default: "",
    },
  },

  data: () => ({
    orgId: "",
    loading: false,
  }),

  computed: {
    ...mapGetters("authentication", ["user"]),

    report() {
      return this.complaint.report || "";
    },
  },

  mounted() {
    this.orgId = this.user?.AssociatedOrganisations[0]?.OrganisationId;
    console.log("SINGLE COMPLAINT::", this.complaint);
  },

  methods: {
    async resolveComplaint() {
      try {
        this.loading = true;
        const response = await this.$axios.patch(
          `/organisations/${this.orgId}/projects/${this.$route.params.id}/complaints/${this.complaint.id}/resolve`
        );

        if (response.status == "success") {
          this.$emit("resolved");
          this.loading = false;
          this.$toast.success(response.message);
          this.closeModals();
        }

        console.log("Resolved::", response);
      } catch (err) {
        this.loading = false;
        console.log(err);
      }
    },

    closeModals() {
      this.$bvModal.hide("beneficiary-complaint");
      this.$bvModal.hide("beneficiary-complaint-unresolved");
      this.$bvModal.hide("beneficiary-complaint-resolved");
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
label {
  color: var(--primary-blue);
  font-size: 1rem;
  font-weight: 500;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-controls {
  border: 1px solid #7c8db5;
  background: #f5f6f8;
  height: 41px;
  padding: 0rem 0.75rem;
  color: #646a86;
  font-size: 0.875rem;
}

.form-controls::placeholder {
  color: #646a86;
  font-size: 0.875rem;
}

textarea.form-controls {
  height: auto;
  resize: none;
  padding: 10px 15px;
}

.create-campaign {
  background: var(--primary-color);
  border-radius: 10px;
  font-size: 1rem;
  border: 1px solid var(--primary-color);
  color: white;
  border: none;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
