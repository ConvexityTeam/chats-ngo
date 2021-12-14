<template>
  <div class="mt-4 px-4">
    <!-- campaign details   here -->
    <div class="mt-4">
      <span class="tertiary-black font-medium">Campaign details</span>

      <div class="detail-holder mt-2 mb-4 p-3">
        <div class="row mb-2">
          <!-- campaign name -->
          <div class="col-6">
            <span class="header"> CAMPAIGN NAME </span>

            <h6 class="tertiary-black font-medium">
              {{ campaign.title || "" | capitalize }}
            </h6>
          </div>

          <!-- campaign Budget -->
          <div class="col-6">
            <span class="header"> BUDGET </span>

            <h6 class="tertiary-black font-medium">
              NGN{{ campaign.budget || 0 | formatCurrency }}
            </h6>
          </div>
        </div>

        <div class="row">
          <!-- campaign Beneficiaries -->
          <div class="col-6">
            <span class="header"> TOTAL BENEFICIARIES </span>

            <h6 class="tertiary-black font-medium">
              {{ campaign.beneficiaries_count || 0 }}
            </h6>
          </div>

          <!-- Beneficiaries Share -->
          <div class="col-6">
            <span class="header"> BENEFICIARY SHARE </span>

            <h6 class="tertiary-black font-medium">
              NGN{{ share | formatCurrency }}
            </h6>
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex py-2">
      <div>
        <Button
          type="button"
          :has-icon="false"
          text="Confirm and fund"
          custom-styles="height:41px; border-radius: 5px; width: 100%"
          :disabled="
            campaign &&
            campaign.beneficiaries_count &&
            campaign.beneficiaries_count == 0
          "
          @click="$emit('fundCampaign')"
        />
      </div>

      <div class="ml-3">
        <Button
          type="button"
          :has-icon="false"
          text="Cancel"
          :hasBorder="true"
          custom-styles="height:41px; border-radius: 5px; width: 100%; border:1px solid #17ce89 !important"
          @click="closeModal"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    campaign: {
      type: Object,
      required: true,
      default: () => {},
    },
  },

  computed: {
    share() {
      const result =
        this.campaign?.budget / this.campaign?.beneficiaries_count || 0;

      if (result == Infinity) {
        return 0;
      }
      return result;
    },
  },

  methods: {
    closeModal() {
      this.$bvModal.hide("fund-campaign");
    },

    sendAmount() {
      this.$emit("fundCampaign");
      this.closeModal();
    },
  },
};
</script>

<style scoped>
.detail-holder {
  border: 1px dashed #7c8db5;
  border-radius: 5px;
  background: #fafafa;
}

.header {
  font-size: 0.75rem;
  color: #7c8db5;
}

h6 {
  word-wrap: break-word;
  max-width: 11rem;
  width: 11rem;
}
</style>
