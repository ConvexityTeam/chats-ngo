<template>
  <div class="ml-2">
    <fundAmount @sentAmount="payViaService" />
    <fundBantu @fundAccount="fundAccount" />

    <div class="holder px-3 py-4">
      <h4 class="header">Fund Wallet</h4>

      <!-- Cards text here -->
      <!-- <div class="d-flex mt-5">
        <div>
          <p class="my-cards">My cards</p>
        </div>

        <div class="ml-auto">
          <a href="#" class="see">see all</a>
        </div>
      </div> -->

      <!-- Card here -->
      <!-- <div>
        <img src="~/assets/img/vectors/Card 1.svg" alt />

        <div class="mt-4">
          <button type="button" class="add-card">
            <i>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7 0.25C7.19891 0.25 7.38968 0.329018 7.53033 0.46967C7.67098 0.610322 7.75 0.801088 7.75 1V7C7.75 7.19891 7.67098 7.38968 7.53033 7.53033C7.38968 7.67098 7.19891 7.75 7 7.75H1C0.801088 7.75 0.610322 7.67098 0.46967 7.53033C0.329018 7.38968 0.25 7.19891 0.25 7C0.25 6.80109 0.329018 6.61032 0.46967 6.46967C0.610322 6.32902 0.801088 6.25 1 6.25H6.25V1C6.25 0.801088 6.32902 0.610322 6.46967 0.46967C6.61032 0.329018 6.80109 0.25 7 0.25Z"
                  fill="black"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.25 7C6.25 6.80109 6.32902 6.61032 6.46967 6.46967C6.61032 6.32902 6.80109 6.25 7 6.25H13C13.1989 6.25 13.3897 6.32902 13.5303 6.46967C13.671 6.61032 13.75 6.80109 13.75 7C13.75 7.19891 13.671 7.38968 13.5303 7.53033C13.3897 7.67098 13.1989 7.75 13 7.75H7.75V13C7.75 13.1989 7.67098 13.3897 7.53033 13.5303C7.38968 13.671 7.19891 13.75 7 13.75C6.80109 13.75 6.61032 13.671 6.46967 13.5303C6.32902 13.3897 6.25 13.1989 6.25 13V7Z"
                  fill="black"
                />
              </svg>
            </i>
            <span class="mx-2">Add new card</span>
          </button>
        </div>
      </div> -->

      <!-- Payment options here -->
      <div class="mt-4">
        <!-- Pay with Flutterwave here -->
        <div class="option-holder py-4 px-3 mb-3">
          <div>
            <h5 class="option-header">Fund Through Flutterwave</h5>
            <p class="description">
              You can fund your NGO wallet using a Mastercard or Visa card
            </p>

            <div class="my-2">
              <img src="~/assets/img/vectors/cards.svg" alt="cards" />
            </div>

            <button
              class="pay-btn px-3 mt-3"
              @click="$bvModal.show('fund-amount')"
            >
              Pay Now
            </button>
          </div>
        </div>

        <!-- Pay with Bantu here -->
        <div class="option-holder py-4 px-3 mb-3">
          <div>
            <h5 class="option-header">Fund through Bantu</h5>
            <p class="description">
              You can fund your NGO wallet using Bantu.
            </p>

            <div class="my-1">
              <p class="wallet-header">Wallet Address:</p>

              <div class="position-relative">
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
              </div>
            </div>

            <button
              class="pay-btn px-3 mt-4"
              @click="$bvModal.show('fund-bantu')"
            >
              Initiate account funding
            </button>
          </div>
        </div>

        <!--Pay With Bank Transfer here -->
        <div class="option-holder py-4 px-3 mb-3">
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
        </div>

        <!--Pay With Wallet here -->
        <!-- <div class="option-holder py-4 px-3 mb-3">
          <div>
            <h5 class="option-header">Pay into our wallet</h5>
            <p class="description">
              You can fund your account by paying into the below bank account.
            </p>

            <div class="my-1">
              <p class="wallet-header">Wallet Address:</p>

              <div class="position-relative">
                <input
                  type="text"
                  class="wallet-control"
                  v-model="walletAddress"
                  ref="wallet"
                  disabled
                />

                <div
                  class="position-absolute copy-btn"
                  @click="copy(walletAddress)"
                >
                  <img src="~/assets/img/vectors/copy-btn.svg" alt="copy" />
                </div>
              </div>
            </div>

            <button class="pay-btn text  mt-1">
              Generate new address
            </button>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import fundAmount from "~/components/modals/fund-amount";
import fundBantu from "~/components/modals/bantu-amount.vue";
export default {
  components: {
    fundAmount,
    fundBantu
  },

  data() {
    return {
      amount: 0,
      wallet: {},
      organisationId: "",
      accountNumber: "0909029389",
      bankName: "Zenith Bank",
      walletAddress: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0",

      paymentData: {
        tx_ref: this.generateReference(),
        amount: 10,
        currency: "USD",
        payment_options: "card,ussd,barter,account, banktransfer,qr,paga",
        redirect_url: "",
        meta: [
          {
            orgId: ""
          }
        ],
        customer: {
          name: "",
          email: "",
          phone_number: ""
        },
        customizations: {
          title: "Fund CHATS Wallet",
          description: " Description",
          logo:
            "https://convexity.s3.us-east-2.amazonaws.com/chats+only+icon+transparent.png"
        },
        callback: this.makePaymentCallback,
        onclose: this.closedPaymentModal
      }
    };
  },

  computed: {
    ...mapGetters("authentication", ["user"])
  },

  mounted() {
    this.loadData();
    this.getWallet();
    console.log("Wallet::", this.wallet);
  },

  methods: {
    payViaService(amount) {
      console.log("beforeSending:::", this.paymentData);
      this.amount = amount;
      this.paymentData.amount = amount;
      this.payWithFlutterwave(this.paymentData);
    },

    makePaymentCallback(response) {
      console.log("PaySuccess?", response);
    },

    closedPaymentModal() {
      console.log("payment is closed");
    },

    generateReference() {
      let date = new Date();
      return date.getTime().toString();
    },

    async fundAccount(amount) {
      try {
        const response = await this.$axios.post("/organisation/bantu/webhook", {
          organisation_id: +this.organisationId,
          xbnAmount: amount
        });

        console.log("bantuResp::", response);
        if (response.status == "success") {
          this.$emit("reload");
          location.reload();
          this.$toast.success(response.message);
        } else {
          this.$toast.error(response.message);
        }
      } catch (err) {
        console.log("bantuerr", err);
      }
    },

    loadData() {
      (this.paymentData.customer.email = this.user.email),
        (this.paymentData.customer.name = this.user.AssociatedOrganisations[0].Organisation.name);
      this.paymentData.customer.phone_number = this.user.AssociatedOrganisations[0].Organisation.phone;
      this.paymentData.meta[0].orgId = this.user.AssociatedOrganisations[0].Organisation.id;
      this.organisationId = this.user.AssociatedOrganisations[0].Organisation.id;
    },

    async getWallet() {
      try {
        const response = await this.$axios.get(
          `/organisation/wallets/main/${+this.organisationId}`
        );

        if (response.status == "success") {
          console.log("Here", response.data);
          this.wallet = response.data.wallet;
        }
      } catch (err) {
        cosole.log("Walleterr:::", err);
      }
    },
    copy(value) {
      if (value.length) {
        navigator.clipboard.writeText(value);
        this.$toast.success("copied to clipboard!");
      }
      return;
    }
  }
};
</script>
<style scoped>
.pay-btn {
  height: 41px;
  background: var(--primary-color);
  border: 1px solid var(--primary-color);
  box-shadow: 0px 2px 4px rgba(23, 206, 137, 0.07);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  color: white;
}

.pay-btn.text {
  color: #17ce89;
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
  border: 0.5px solid #42c18e;
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

.add-card {
  color: var(--primary-black);
  font-size: 1rem;
  border: none;
  background: inherit;
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
.my-cards {
  color: var(--secondary-black);
  font-size: 1rem;
}
.see {
  color: var(--primary-color);
  font-size: 0.875rem;
}
.description {
  color: #7c8db5;
  font-size: 0.875rem;
}
</style>
