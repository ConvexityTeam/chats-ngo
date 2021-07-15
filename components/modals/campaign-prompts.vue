<template>
  <div>
    <b-modal id="campaign-prompt" hide-header hide-footer>
      <div class="text-center position-relative pt-3">
        <h3 class="header">{{ status | capitalize }} Campaign</h3>

        <!--Close button here -->
        <button
          type="button"
          class="close-btn position-absolute"
          @click="closeModal"
        >
          <close />
        </button>
      </div>

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
              :text="`${status} campaign`"
              type="submit"
              :has-icon="false"
              custom-styles="height: 41px; border-radius:5px !important;  font-size: 14px !important"
              @click="handleCampaign"
            />
          </div>

          <div class="ml-3 ">
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
    </b-modal>
  </div>
</template>

<script>
import close from "~/components/icons/close";

export default {
  name: "campaign-prompts",
  props: {
    status: {
      type: String
    },
    title: {
      type: String
    }
  },

  components: { close },

  methods: {
    closeModal() {
      this.$bvModal.hide("campaign-prompt");
    },

    handleCampaign() {
      this.$emit("handleCampaign", status);
      this.closeModal();
    }
  }
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
.header {
  color: var(--tertiary-black);
  font-weight: bold;
  font-size: 1.5rem;
}
.modal-body {
  border-radius: 10px;
  background: white;
}
.close-btn {
  border: none;
  background: inherit;
  bottom: 20px;
  right: 0px;
}
</style>
