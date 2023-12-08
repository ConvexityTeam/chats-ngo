<template>
  <div class="mt-4 px-4">
    <!-- campaign details   here -->
    <div class="mt-4">
      <span class="text-base font-medium primary-blue">Project Overview</span>

      <div class="detail-holder mt-2 mb-4 p-3">
        <div class="row mb-2">
          <!-- campaign name -->
          <div class="col-6">
            <span class="header"> CASH FOR WORK NAME </span>

            <h6 class="primary-blue font-medium pt-1">
              {{ campaign.title || "" | capitalize }}
            </h6>
          </div>

          <!-- campaign Budget -->
          <div class="col-6">
            <span class="header">
              {{ campaign.type === "item" ? "NUMBER OF PRODUCTS" : "BUDGET" }}
            </span>

            <h6 class="primary-blue font-medium pt-1">
              <span v-if="campaign.type === 'item'">
                {{ campaign.minting_limit || 0 | formatNumber }}
              </span>
              <span v-else>
                {{ campaign.budget || 0 | formatCurrency }}
              </span>
            </h6>
          </div>
        </div>

        <div class="row">
          <!-- campaign Beneficiaries -->
          <div class="col-6">
            <span class="header"> TOTAL BENEFICIARIES </span>

            <h6 class="primary-blue font-medium pt-1">
              {{ approvedBeneficiaries || 0 }}
            </h6>
          </div>

          <!-- Beneficiaries Share -->
          <div v-if="campaign.type !== 'cash-for-work'" class="col-6">
            <span class="header"> BENEFICIARY SHARE </span>

            <h6 class="primary-blue font-medium pt-1">
              <span v-if="campaign.type == 'item'">
                {{ getShare(campaign.minting_limit) | formatNumber }}
              </span>

              <span v-else>
                {{ getShare(campaign.budget) | formatCurrency }}
              </span>
            </h6>
          </div>
        </div>
      </div>
    </div>

    <!-- Buttons Here -->
    <div class="my-2">
      <div>
        <Button
          type="button"
          :loading="loading"
          :has-icon="false"
          :text="buttonText"
          custom-styles="height:41px; border-radius: 5px; width: 100%; font-weight: 600 !important"
          :disabled="disabled"
          @click="fundCampaign"
        />
      </div>

      <div class="pt-3">
        <Button
          type="button"
          :has-icon="false"
          text="Cancel"
          :hasBorder="true"
          custom-styles="height:41px; border-radius: 5px; width: 100%; border:1px solid #17ce89 !important; font-weight: 600 !important"
          @click="closeModal"
        />
      </div>
    </div>

    <!-- Disclaimer Text here -->
    <div class="mt-4 mb-3">
      <div class="d-flex">
        <!-- Icon Here -->
        <div>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.9994 1.9082C7.07616 1.9082 6.40266 2.46403 5.82644 3.18807C5.26284 3.89628 4.66306 4.93229 3.92134 6.21351L3.88863 6.27001L3.49308 6.95322L3.46035 7.00976L3.46035 7.00977C2.7158 8.29575 2.1139 9.33535 1.77934 10.1793C1.43743 11.0418 1.29033 11.905 1.75257 12.7067C2.21482 13.5085 3.03555 13.8136 3.95329 13.9499C4.85128 14.0832 6.05254 14.0832 7.53849 14.0831H7.53852H7.60386H8.39495H8.4603H8.46032C9.94628 14.0832 11.1475 14.0832 12.0455 13.9499C12.9633 13.8136 13.784 13.5085 14.2462 12.7067C14.7085 11.905 14.5614 11.0418 14.2195 10.1793C13.8849 9.33535 13.283 8.29575 12.5385 7.00977L12.5057 6.95322L12.1102 6.27001L12.0775 6.2135C11.3357 4.93228 10.736 3.89627 10.1724 3.18807C9.59615 2.46402 8.92264 1.9082 7.9994 1.9082ZM8.7494 5.99983C8.7494 5.58561 8.41361 5.24983 7.9994 5.24983C7.58519 5.24983 7.2494 5.58561 7.2494 5.99983V8.66649C7.2494 9.08071 7.58519 9.41649 7.9994 9.41649C8.41361 9.41649 8.7494 9.08071 8.7494 8.66649V5.99983ZM8.66607 10.6665C8.66607 11.0347 8.36759 11.3332 7.9994 11.3332C7.63121 11.3332 7.33274 11.0347 7.33274 10.6665C7.33274 10.2983 7.63121 9.99983 7.9994 9.99983C8.36759 9.99983 8.66607 10.2983 8.66607 10.6665Z"
              fill="#FF9505"
            />
          </svg>
        </div>

        <span class="poppins primary-gray disclaimer ml-2 pt-1">
          Kindly note that once the project is funded, beneficiaries
          automatically get access to funds except project is canceled
          immediately.
        </span>
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
    tokenType: {
      type: String,
      default: () => {},
    },
    orgId: {
      type: [Number, String],
      default: "",
    },
  },

  data: () => ({
    loading: false,
    statuses: ["pending", "completed", "ongoing"],
    beneficiaries: [],
  }),

  async fetch() {
    const { id } = this.$route.params;
    console.log("fetching", this.$route.params);
    this.beneficiaries = await this.$axios.$get(
      `organisation/${this.orgId}/campaigns/${id}/beneficiaries`
    );
  },

  computed: {
    approvedBeneficiaries() {
      const beneficiaries =
        this.beneficiaries.filter((benefactor) => benefactor.approved) || [];

      return beneficiaries.length;
    },

    buttonText() {
      let text = "";

      if (this.tokenType === "wallet") {
        text = "Confirm and fund wallet";
      } else if (this.tokenType === "sms") {
        text = "Confirm and send SMS tokens";
      } else {
        text = "Confirm and generate QR codes";
      }
      return text;
    },

    disabled() {
      return (
        (!!this.campaign && !this.approvedBeneficiaries) ||
        this.statuses.includes(this.campaign?.status)
      );
    },

    tokenData() {
      let tokenData = "";
      if (this.tokenType === "qr") {
        tokenData = "papertoken";
      } else if (this.tokenType === "sms") {
        tokenData = "smstoken";
      } else {
        tokenData = "wallet";
      }
      return tokenData;
    },
  },

  methods: {
    getShare(value) {
      const result = value / this.approvedBeneficiaries;

      if (result === Infinity) {
        return 0;
      }
      return result || 0;
    },

    closeModal() {
      this.$bvModal.hide("fund-campaign");
    },

    async fundCampaign() {
      try {
        this.loading = true;
        const response = await this.$axios.post(
          `organisations/${this.orgId}/campaigns/${this.$route.params.id}/fund`,
          {
            token_type: this.tokenData,
          }
        );

        console.log("FUNDRESP:::", response);

        if (response.status === "success") {
          this.closeModal();
          this.$emit("fund-success");
        }
      } catch (_err) {
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.detail-holder {
  border: 1px dashed #7c8db5;
  border-radius: 8px;
  background: #fcfcfe;
  height: 152px;
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

.disclaimer {
  font-size: 0.625rem;
}
</style>
