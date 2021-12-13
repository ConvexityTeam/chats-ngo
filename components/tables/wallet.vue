<template>
  <div>
    <!-- <fund-amount @sentAmount="payViaService" /> -->
    <Modal id="fund-amount" title="fund wallet">
      <fund-amount
        @generatedData="fundWithPaystack"
        :orgId="orgId"
        :showCrypto="false"
      />
    </Modal>

    <!-- <fundBantu @fundAccount="fundAccount" /> -->
    <div class="holder px-3 py-4">
      <h4 class="header">Fund Wallet</h4>

      <!-- Payment options here -->
      <div class="mt-4">
        <!-- Pay with Paystack here -->
        <div class="option-holder py-4 px-3 mb-3">
          <div>
            <h5 class="option-header">Fund Through Paystack</h5>
            <p class="description">
              You can fund your NGO wallet using a Mastercard or Visa card
            </p>

            <div class="my-2">
              <img src="~/assets/img/vectors/cards.svg" alt="cards" />
            </div>

            <Button
              class="mt-3"
              text="Pay Now"
              :has-icon="false"
              :custom-styles="custom"
              @click="$bvModal.show('fund-amount')"
            />
          </div>

          <div class="d-none">
            <paystack
              :amount="(depositData && depositData.amount) || 0"
              :email="(depositData && depositData.email) || ''"
              :paystackkey="(depositData && depositData.key) || ''"
              :reference="(depositData && depositData.ref) || ''"
              :callback="getWallet"
              :close="getWallet"
              :embed="false"
              id="paystackBtn"
            >
            </paystack>
          </div>
        </div>

        <!-- Pay with Crypto here -->
        <div class="option-holder py-4 px-3 mb-3">
          <div>
            <h5 class="option-header">Fund through Crypto</h5>
            <p class="description">
              You can fund your NGO wallet using cryptocurrencies.
            </p>

            <div class="my-1">
              <!-- <div class="position-relative">
                <input
                  type="text"
                  class="wallet-control"
                  v-model="wallet.bantuAddress"
                  ref="wallet"
                  disabled
                />

                <div
                  class="position-absolute copy-btn"
                  @click="copy(wallet.bantuAddress)"
                >
                  <img src="~/assets/img/vectors/copy-btn.svg" alt="copy" />
                </div>
              </div> -->
            </div>

            <div class="d-flex mt-3">
              <Button
                text="Generate address"
                :has-icon="false"
                :custom-styles="custom"
                @click="$bvModal.show('fund-amount')"
              />

              <div class="ml-3">
                <button
                  type="button"
                  class="pay-btn text poppins"
                  @click="$bvModal.show('fund-bantu')"
                  style="height: 40px"
                >
                  Initiate funding
                </button>
              </div>
            </div>
          </div>
        </div>

        <!--Pay With Bank Transfer here -->
        <!-- <div class="option-holder py-4 px-3 mb-3">
          <div>
            <h5 class="option-header">Pay with bank transfer</h5>
            <p class="description">
              You can fund your account by paying into the below bank account.
            </p>

            <div class="my-1">
              <div class="row">
                <div class="col-lg-6">
                  <div class="position-relative">
                    <label class="wallet-header">Bank Name</label>
                    <input
                      type="text"
                      class="wallet-control"
                      v-model="bankName"
                      ref="wallet"
                      disabled
                    />

                    <div
                      class="position-absolute copy-btn"
                      @click="copy(bankName)"
                    >
                      <img src="~/assets/img/vectors/copy-btn.svg" alt="copy" />
                    </div>
                  </div>
                </div>

                <div class="col-lg-6">
                  <div class="position-relative">
                    <label class="wallet-header">Account Number </label>
                    <input
                      type="text"
                      class="wallet-control"
                      v-model="accountNumber"
                      ref="wallet"
                      disabled
                    />

                    <div
                      class="position-absolute copy-btn"
                      @click="copy(accountNumber)"
                    >
                      <img src="~/assets/img/vectors/copy-btn.svg" alt="copy" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import fundAmount from "~/components/forms/fund-amount.vue";
import fundBantu from "~/components/modals/bantu-amount.vue";
import paystack from "vue-paystack";

let screenLoading;

export default {
  components: {
    fundAmount,
    fundBantu,
    paystack,
  },

  data() {
    return {
      wallet: {},
      orgId: "",
      depositData: {},
    };
  },

  computed: {
    ...mapGetters("authentication", ["user"]),

    custom() {
      return "border-radius:5px !important; height: 41px; font-size: 0.875rem; ";
    },
  },

  mounted() {
    this.loadData();
    this.getWallet();
    console.log("Wallet::", this.wallet);
    console.log("KEY", this.reference);
  },

  methods: {
    loadData() {
      this.orgId = this.user?.AssociatedOrganisations[0]?.Organisation.id;
    },

    fundWithPaystack(data) {
      this.depositData = data;
      setTimeout(() => {
        document.getElementById("paystackBtn").click();
      }, 300);
    },
    async getWallet() {
      try {
        this.openScreen();
        const response = await this.$axios.get(
          `/organisation/wallets/main/${+this.orgId}`
        );

        if (response.status == "success") {
          screenLoading.close();
          console.log("Here", response.data);
          this.wallet = response.data.wallet;
        }
      } catch (err) {
        screenLoading.close();
        console.log("Walleterr:::", err);
      }
    },
    copy(value) {
      if (value.length) {
        navigator.clipboard.writeText(value);
        this.$toast.success("copied to clipboard!");
      }
      return;
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
.pay-btn.text {
  color: var(--primary-color);
  font-size: 0.75rem;
  font-weight: 600;
  background: inherit;
  border: none;
}

.option-header {
  color: var(--tertiary-black);
  font-weight: 600;
  font-size: 1rem;
  font-family: "Poppins", sans-serif;
}

.option-holder {
  border: 1px solid #42c18e;
  box-sizing: border-box;
  border-radius: 10px;
}

.wallet-header {
  color: #25396f;
  opacity: 0.7;
  font-size: 0.875rem;
  font-family: "Poppins", sans-serif;
}

.wallet-control {
  width: 100%;
  border: 0.5px dashed #7a809b;
  background: #fafafa;
  border-radius: 5px;
  height: 36px;
  outline: 0;
  color: #7a809b;
  padding: 0px 10px;
  font-size: 0.813rem;
  font-family: "Inconsolata", monospace;
}

.copy-btn {
  height: 36px;
  bottom: 0px;
  right: 0;
  background: #dfe1ea;
  border-radius: 0px 5px 5px 0px;
  padding: 6px 12px;
  width: 44px;
  cursor: pointer;
}

.holder {
  background: #ffffff;
  box-shadow: 0px 4px 25px rgba(174, 174, 192, 0.15);
  border-radius: 10px;
}

.header {
  color: var(--tertiary-black);
  font-weight: bold;
  font-size: 1.125rem;
  font-family: "Poppins", sans-serif;
}

.description {
  color: #7c8db5;
  font-size: 0.875rem;
}
</style>
