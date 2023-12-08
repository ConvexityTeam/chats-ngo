<template>
  <div>
    <div class="mt-3 text-center">
      <p>
        You are about to approve
        {{ benefactors.length === 1 ? "" : benefactors.length }}
        <span class="font-bold">
          {{ benefactors.length === 1 ? namesInString : "Benefactors" }}</span
        >
        . Are you really sure about this?
        <span>This action cannot be undone.</span>
      </p>
    </div>

    <!-- buttons here -->
    <div class="mt-4 pb-3 d-flex justify-content-center">
      <div class="d-flex">
        <div>
          <Button
            text="Continue"
            type="submit"
            :has-icon="false"
            custom-styles="height: 41px; border-radius:5px !important;  font-size: 14px !important"
            @click="handleApproval"
          />
        </div>

        <div class="ml-3">
          <Button
            text="Cancel"
            :has-icon="false"
            :has-border="true"
            custom-styles=" height: 41px !important; border: 1px solid #17CE89 !important; border-radius: 5px !important; font-size: 0.875rem !important; width: 9rem; font-weight: 600 !important"
            @click="closeModal"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CampaignPrompts",

  props: {
    benefactors: {
      type: Array,
      default: () => [],
    },
  },

  data: () => ({
    namesInString: "",
  }),

  created() {
    this.getNameOfSelectedbenefactors();
  },

  methods: {
    closeModal() {
      this.$bvModal.hide("approve-benefactors");
    },

    handleApproval() {
      this.$emit("approveBenefactors");
      this.closeModal();
    },

    getNameOfSelectedbenefactors() {
      if (this.benefactors.length) {
        this.benefactors.map((benefactor, index) => {
          if (index < this.benefactors.length - 1) {
            //
            index !== this.benefactors.length - 2
              ? (this.namesInString += `"${benefactor.User.first_name} ${benefactor.User.last_name}", `)
              : (this.namesInString += `"${benefactor.User.first_name} ${benefactor.User.last_name}" and `);
          } else {
            this.namesInString += `${benefactor.User.first_name} ${benefactor.User.last_name}`;
          }

          return this.namesInString;
        });
      }
    },
  },
};
</script>

<style scoped>
p {
  color: #7c8db5;
  font-weight: 500;
  margin: 0 auto;
  width: 70%;
}

.create-campaign {
  background: var(--primary-color);
  border-radius: 10px;
  font-size: 1rem;
  border: 1px solid var(--primary-color);
  color: white;
  border: none;
}
</style>
