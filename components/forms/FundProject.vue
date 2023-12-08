<template>
  <div class="mt-4 px-3">
    <p class="primary-gray font-medium">
      You are about to
      {{ details.type == "item" ? "create items for" : "fund" }}
      <strong> {{ details.title }}</strong>
    </p>

    <!-- campaign details   here -->
    <div class="mt-4">
      <span class="text-base font-medium primary-blue">Funding details</span>

      <div class="detail-holder mt-1 mb-4 px-4 py-3">
        <div class="row mb-2">
          <!-- campaign name -->
          <div class="col-6">
            <span class="header"> Project Name </span>

            <h6 class="primary-blue font-medium pt-1">
              {{ details.title || "" | capitalize }}
            </h6>
          </div>

          <!-- campaign Budget -->
          <div class="col-6">
            <span class="header">
              {{ details.type == "item" ? "number of items" : "BUDGET" }}
            </span>

            <h6 class="primary-blue font-medium pt-1">
              <span v-if="details.type == 'item'">
                {{ details.minting_limit || 0 | formatNumber }}
              </span>
              <span v-else>
                {{ details.budget || 0 | formatCurrency }}
              </span>
            </h6>
          </div>
        </div>

        <div class="row">
          <!-- campaign Beneficiaries -->
          <div class="col-6">
            <span class="header"> Total beneficiaries </span>

            <h6 class="primary-blue font-medium pt-1">
              {{ details.beneficiaries_count || 0 | formatNumber }}
            </h6>
          </div>

          <!-- Beneficiaries Share -->
          <div v-if="details.type != 'cash-for-work'" class="col-6">
            <span class="header"> Beneficiary share </span>

            <h6 class="primary-blue font-medium pt-1">
              <span v-if="details.type == 'item'">
                {{ details.minting_limit || 0 | formatNumber }}
              </span>

              <span v-else>
                {{ details.beneficiary_share || 0 | formatCurrency }}
              </span>
            </h6>
          </div>
        </div>
      </div>
    </div>

    <!-- Disclaimer Text here -->
    <div class="mt-4 mb-3">
      <div class="disclaimer-holder">
        <!-- Icon Here -->
        <div>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.66699 9.99935C1.66699 5.40018 5.40033 1.66602 10.0003 1.66602C14.6087 1.66602 18.3337 5.40018 18.3337 9.99935C18.3337 14.6002 14.6087 18.3327 10.0003 18.3327C5.40033 18.3327 1.66699 14.6002 1.66699 9.99935ZM9.26699 6.84102C9.26699 6.44185 9.60033 6.10768 10.0003 6.10768C10.4003 6.10768 10.7253 6.44185 10.7253 6.84102V10.5243C10.7253 10.9252 10.4003 11.2493 10.0003 11.2493C9.60033 11.2493 9.26699 10.9252 9.26699 10.5243V6.84102ZM10.0087 13.9002C9.60033 13.9002 9.27533 13.5668 9.27533 13.1668C9.27533 12.7668 9.60033 12.4418 10.0003 12.4418C10.4087 12.4418 10.7337 12.7668 10.7337 13.1668C10.7337 13.5668 10.4087 13.9002 10.0087 13.9002Z"
              fill="#EAD83E"
            />
          </svg>
        </div>

        <span class="poppins primary-gray disclaimer ml-2 pt-1">
          Please review the details carefully before proceeding.
        </span>
      </div>
    </div>

    <!-- Buttons Here -->
    <div class="d-flex my-4">
      <div class="mr-3 w-100">
        <Button
          text="Cancel"
          :has-icon="false"
          :custom-styles="`${buttonStyles + cancelStyle}`"
          font-size=" 1rem"
          @click="closeModal"
        />
      </div>

      <div class="w-100">
        <Button
          text="Confirm"
          font-size=" 1rem"
          :has-icon="false"
          :custom-styles="buttonStyles"
          :loading="loading"
          @click="fundProject"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    details: {
      type: Object,
      required: true,
      default: () => {},
    },
  },

  data: () => ({
    loading: false,
    statuses: ["pending", "completed", "ongoing"],
    beneficiaries: [],
    buttonStyles: "height: 52px; border-radius:8px;   width: 100%;",
    cancelStyle:
      "border: 1px solid #646A86 !important; color: #646A86 !important; background: white !important",
  }),

  methods: {
    closeModal() {
      this.$bvModal.hide("funding-prompt");
    },

    async fundProject() {
      try {
        this.loading = true;

        const response = await this.$axios.post(
          `organisations/${this.details.OrganisationId}/campaigns/${this.details?.id}/fund-campaign`
        );

        console.log("RESPNSEHEREEE", response);

        // if (response.status === "success") {
        this.closeModal();
        this.$emit("done");
        // }
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
}

.header {
  display: block;
  padding-bottom: 5px;
  text-transform: uppercase;
  font-size: 0.875rem;
  color: #7c8db5;
}

h6 {
  word-wrap: break-word;
  max-width: 11rem;
  width: 11rem;
}

.disclaimer-holder {
  display: flex;
  align-items: center;
  background: #fffded;
  border-radius: 10px;
  padding: 10px;
  height: 36px;
}
.disclaimer {
  color: #3d3704;
  font-size: 0.875rem;
  letter-spacing: 0.14px;
}
</style>
