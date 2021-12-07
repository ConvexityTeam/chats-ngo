<template>
  <form @submit.prevent="resolveComplaint" class="mt-4 px-3">
    <!-- Name field  here -->
    <div class="form-group">
      <label for="campaign-name">Campaign Name</label>
      <input
        type="text"
        class="form-controls "
        id="campaign-name"
        :value="campaignName"
        disabled
      />
    </div>

    <!-- Complaint  here -->
    <div class="form-group">
      <label>Complaint</label>
      <textarea
        class="form-controls"
        v-model="report"
        rows="7"
        disabled
        cols="30"
      >
      </textarea>
    </div>

    <div class="d-flex pt-2 pb-3 button-holder">
      <Button
        type="submit"
        :has-icon="false"
        text="Resolve complaint"
        custom-styles="height:41px; border-radius: 5px; "
        @click="$emit('resolveComplaint')"
      />
    </div>
  </form>
</template>

<script>
let screenLoading;
export default {
  props: {
    complaint: {
      type: Object,
      required: true,
      default: () => {}
    },

    campaignName: {
      type: String,
      default: ""
    }
  },

  computed: {
    report() {
      return this.complaint?.report;
    }
  },

  mounted() {
    console.log("SINGLE COMPLAINT::", this.complaint);
  },

  methods: {
    closeModal() {
      this.$bvModal.hide("beneficiary-complaint");
    },
    async resolveComplaint() {
      try {
        this.openScreen();
        const response = await this.$axios.put(
          "/beneficiaries/complaint/resolve",
          this.complaint.id
        );

        console.log("Resolved::"), response;
      } catch (err) {
        screenLoading.close();
        console.log(err);
      }
    },

    openScreen() {
      screenLoading = this.$loading({
        lock: true,
        spinner: "el-icon-loading",
        background: "#0000009b"
      });
    }
  }
};
</script>

<style scoped>
label {
  color: var(--tertiary-black);
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
