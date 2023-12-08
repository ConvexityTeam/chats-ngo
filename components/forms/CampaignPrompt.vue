<template>
  <div>
    <div class="mt-3 text-center">
      <p>
        You are about to {{ status }} {{ title }}. Are you really sure about
        this?
        <span v-if="status == 'Delete'">This action cannot be undone.</span>
      </p>
    </div>

    <!-- buttons here -->
    <div class="mt-4 pb-3 d-flex justify-content-center">
      <div class="d-flex">
        <div>
          <Button
            :text="`${status} project`"
            type="submit"
            :has-icon="false"
            custom-styles="height: 41px; border-radius:5px !important;  font-size: 14px !important"
            @click="handleCampaign"
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
    status: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },

  methods: {
    closeModal() {
      this.$bvModal.hide("campaign-prompt");
    },

    handleCampaign() {
      this.$emit("handleCampaign", this.status);
      this.closeModal();
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
