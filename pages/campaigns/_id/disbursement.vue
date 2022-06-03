<template>
  <div class="d-flex mt-5 pt-5 w-80 m-auto">
    <!-- Modals Here -->
    <div>
      <!-- Fund Campaign modal -->
      <Modal id="fund-campaign" title="Fund Campaign">
        <FundCampaign
          :campaign="details"
          :tokenType="tokenType"
          :orgId="orgId"
          @fund-success="$bvModal.show('fund-campaign-success')"
        />
      </Modal>

      <!-- Fund Campaign Success modal -->
      <Modal
        id="fund-campaign-success"
        title="Wallet funded"
        @closeModal="handleRoute"
      >
        <FundCampaignSuccess @close="handleRoute" />
      </Modal>
    </div>
    <div class="m-auto w-45">
      <!-- Header text here -->
      <div>
        <h1 class="text-md primary-blue font-bold">
          How do you want to disburse funds to beneficiary?
        </h1>
        <p class="text-sm primary-gray">
          Select a disbursement method that best fits your campaign and
          beneficiaries demography.
        </p>
      </div>

      <!-- Disbursement methods here -->
      <div class="mt-4 pt-2">
        <div
          class="card-holder mb-3 px-4"
          v-for="(method, i) in methods"
          :key="i"
        >
          <div class="d-flex align-items-center h-100">
            <div class="d-flex align-items-center">
              <!-- Svg here -->
              <div class="">
                <img :src="method.image" :alt="method.name" />
              </div>

              <!-- Text here -->
              <label class="ml-3 mt-4 pointer" :for="method.tag">
                <h2 class="primary-blue font-bold text-sm mb-0">
                  {{ method.name }}
                </h2>
                <p class="text-xs primary-gray">
                  {{ method.description }}
                </p>
              </label>
            </div>

            <!-- Radio Here -->
            <div class="ml-auto mt-3">
              <Radio v-model="tokenType" :id="method.tag" :value="method.tag" />
            </div>
          </div>
        </div>
      </div>

      <!-- Buttons here -->
      <div class="d-flex  justify-content-end mt-4 pt-3">
        <Button
          :hasBorder="true"
          :hasIcon="false"
          text="Cancel"
          custom-styles=" border-radius: 5px !important;
                  height:42px !important; border: 1px solid #17ce89 !important; font-size:
                  0.875rem !important; font-weight: 600 !important; "
          @click="goBack"
        />

        <button
          class="continue-btn ml-3 poppins text-center"
          :disabled="!tokenType"
          @click="$bvModal.show('fund-campaign')"
        >
          Continue
        </button>
      </div>

      <!-- View Text here -->
      <div
        class="mt-5 pt-5 d-flex pointer"
        @click="handleTokens"
        v-if="displayManageTokens"
      >
        <p class="poppins primary text-sm font-medium tokens">
          View / manage SMS token & QR codes
        </p>

        <!-- Arrow icon here -->
        <span class="ml-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.4291 18.8201C14.2391 18.8201 14.0491 18.7501 13.8991 18.6001C13.6091 18.3101 13.6091 17.8301 13.8991 17.5401L19.4391 12.0001L13.8991 6.46012C13.6091 6.17012 13.6091 5.69012 13.8991 5.40012C14.1891 5.11012 14.6691 5.11012 14.9591 5.40012L21.0291 11.4701C21.3191 11.7601 21.3191 12.2401 21.0291 12.5301L14.9591 18.6001C14.8091 18.7501 14.6191 18.8201 14.4291 18.8201Z"
              fill="#17CE89"
            />
            <path
              d="M20.33 12.75H3.5C3.09 12.75 2.75 12.41 2.75 12C2.75 11.59 3.09 11.25 3.5 11.25H20.33C20.74 11.25 21.08 11.59 21.08 12C21.08 12.41 20.74 12.75 20.33 12.75Z"
              fill="#17CE89"
            />
          </svg>
        </span>
      </div>
    </div>

    <!-- Close Icon here -->
    <div>
      <svg
        @click="goBack"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.7059 1.70757C18.0966 1.3173 18.0971 0.684134 17.7068 0.293355C17.3165 -0.0974241 16.6834 -0.0978376 16.2926 0.292432L17.7059 1.70757ZM0.719136 15.8455C0.328357 16.2358 0.327944 16.869 0.718213 17.2598C1.10848 17.6505 1.74165 17.6509 2.13243 17.2607L0.719136 15.8455ZM16.2926 0.292432L0.719136 15.8455L2.13243 17.2607L17.7059 1.70757L16.2926 0.292432Z"
          fill="#8895A7"
        />
        <path
          d="M0.294134 1.70757C-0.0966454 1.3173 -0.0970573 0.684134 0.293211 0.293355C0.68348 -0.0974241 1.31665 -0.0978376 1.70742 0.292432L0.294134 1.70757ZM17.2809 15.8455C17.6716 16.2358 17.6721 16.869 17.2818 17.2598C16.8915 17.6505 16.2584 17.6509 15.8676 17.2607L17.2809 15.8455ZM1.70742 0.292432L17.2809 15.8455L15.8676 17.2607L0.294134 1.70757L1.70742 0.292432Z"
          fill="#8895A7"
        />
      </svg>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FundCampaign from "~/components/forms/fund-campaign";
import FundCampaignSuccess from "~/components/forms/fund-campaign-success";
let screenLoading;

export default {
  middleware: "authenticated",
  name: "Disbursement",
  components: { FundCampaign, FundCampaignSuccess },

  data: () => ({
    tokenType: "",
    orgId: "",
    details: {},
    methods: [
      {
        name: "Wallet",
        description: "Distribute funds to beneficiaries wallets (Mobile app)",
        image: require("~/assets/img/vectors/wallet.svg"),
        tag: "wallet"
      },

      {
        name: "SMS Token",
        description: "Generate and send SMS token to beneficiaries",
        image: require("~/assets/img/vectors/sms.svg"),
        tag: "sms"
      },

      {
        name: "QR Code",
        description: "Generate and share unique QR codes to beneficiaries",
        image: require("~/assets/img/vectors/qr.svg"),
        tag: "qr"
      }
    ]
  }),

  computed: {
    ...mapGetters("authentication", ["user"]),
    displayManageTokens() {
      return this.tokenType === "sms" || this.tokenType === "qr";
    }
  },

  mounted() {
    this.orgId = this.user?.AssociatedOrganisations[0]?.OrganisationId;
    this.getDetails();
  },

  methods: {
    async getDetails() {
      try {
        this.openScreen();
        this.loading = true;

        const response = await this.$axios.get(
          `/organisations/${this.orgId}/campaigns/${this.$route.params.id}`
        );

        if (response.status == "success") {
          screenLoading.close();
          this.details = response.data;
          this.location = JSON.parse(response.data?.location?.country);
        }

        this.loading = false;
      } catch (err) {
        this.loading = false;
        screenLoading.close();
      }
    },
    handleRoute() {
      if (this.tokenType === "wallet") {
        return this.goBack();
      }
      this.handleTokens();
    },

    goBack() {
      this.$router.go(-1);
    },

    handleTokens() {
      this.$router.push({
        path: "/campaigns/manage-tokens",
        query: { method: this.tokenType }
      });
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
.card-holder {
  background: #ffffff;
  border: 1px solid #e1e7ec;
  border-radius: 8px;
  height: 80px;
}

svg {
  cursor: pointer;
}

.continue-btn {
  height: 42px;
  background: #17ce89;
  border: 1px solid #17ce89;
  box-shadow: 0px 2px 4px rgba(23, 206, 137, 0.07);
  border-radius: 5px;
  font-size: 0.875rem;
  color: #ffffff;
  font-weight: 600;
  padding: 0 1rem;
}

.continue-btn:disabled {
  background: #7c8db5;
  opacity: 0.5;
  border: none;
  cursor: not-allowed;
}

.tokens {
  padding-top: 1px;
}
</style>
