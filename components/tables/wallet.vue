<template>
  <div class="ml-2">
    <fundAmount @sentAmount="payViaService" />
    <fundBantu @fundAccount="fundAccount" />

    <div class="holder p-3">
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
      <div class="mt-3">
        <!-- Pay with Flutterwave here -->
        <div class="option-holder p-3 mb-3">
          <div>
            <h5 class="option-header">Fund Through Flutterwave</h5>
            <p class="description">
              You can fund your NGO wallet usuing a mastercard or Visa card.
            </p>

            <button
              type="button"
              class="pay-btn"
              @click="$bvModal.show('fund-amount')"
            >
              Pay Now
            </button>
          </div>
        </div>

        <!-- Pay with Bantu here -->
        <div class="option-holder p-3 mb-3">
          <div>
            <h5 class="option-header">Fund Through Bantu</h5>
            <p class="description" style="word-break: break-word">
              You can fund your NGO wallet using Bantu. Wallet Address:
              {{ wallet.bantuAddress }}
            </p>

            <button
              type="button"
              class="pay-btn"
              @click="$bvModal.show('fund-bantu')"
            >
              Initiate account Funding
            </button>
          </div>
        </div>

        <!--Pay With Bank Transfer here -->
        <div class="option-holder p-3 mb-3">
          <div>
            <h5 class="option-header">Pay With Bank Transfer</h5>
            <p class="description">
              You can fund your account by paying into the below bank account.
              <br />
              Bank Name: Zenith Bank
              <br />
              Account Number:
              <span ref="account">0909029389</span>
            </p>

            <button type="button" @click="copyNumber" class="pay-btn">
              Copy Number
            </button>
          </div>
        </div>

        <!--Pay With Wallet here -->
        <div class="option-holder p-3 mb-3">
          <div>
            <h5 class="option-header">Pay Into Our Wallet</h5>
            <p class="description">
              You can pay into our stablecoin wallet. To do so, generate a
              payment address.
            </p>

            <button type="button" class="pay-btn">Generate address</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import fundAmount from "~/components/modals/fund-amount";
import fundBantu from "~/components/modals/bantu-amount.vue";
export default {
  props: {
    wallet: {
      type: Object
    }
  },

  components: {
    fundAmount,
    fundBantu
  },

  data() {
    return {
      amount: 0,
      organisationId: "",
      paymentData: {
        tx_ref: this.generateReference(),
        amount: 10,
        currency: "USD",
        payment_options: "card,ussd,barter,account, banktransfer,qr,paga",
        redirect_url: "",
        meta: {
          id: ""
        },
        customer: {
          name: "",
          email: "",
          phone_number: "",
          id: ""
        },
        customizations: {
          title: "Fund CHATS Wallet",
          description: " Description",
          logo:
            "https://convexity.s3.us-east-2.amazonaws.com/chats+transparent.png"
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
    console.log("Wallet::", this.wallet);
  },

  methods: {
    payViaService(amount) {
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
          organisationId: +this.organisationId,
          xbnAmount: amount
        });
        console.log("bantuResp::", response);
      } catch (err) {
        console.log("bantuerr", err);
      }
    },

    loadData() {
      (this.paymentData.customer.email = this.user.email),
        (this.paymentData.customer.name = this.user.AssociatedOrganisations[0].Organisation.name);
      this.paymentData.customer.phone_number = this.user.AssociatedOrganisations[0].Organisation.phone;
      this.paymentData.customer.id = this.user.AssociatedOrganisations[0].Organisation.id;
      this.paymentData.meta.id = this.user.AssociatedOrganisations[0].Organisation.id;
      this.organisationId = this.user.AssociatedOrganisations[0].Organisation.id;
    },

    copyNumber() {
      try {
        navigator.clipboard.writeText(this.$refs.account.innerHTML);
        this.$toast.success("copied to clipboard!");
      } catch (error) {
        this.$toast.error("couldn't copy!");
      }
    }
  }
};
</script>
<style scoped>
.pay-btn {
  color: var(--primary-color);
  font-weight: 500;
  font-size: 1rem;
  line-height: 26px;
  border: none;
  background: inherit;
}
.option-header {
  color: var(--secondary-black);
  font-weight: 500;
  font-size: 1rem;
}
.option-holder {
  border: 1px solid #999999;
  box-sizing: border-box;
  border-radius: 10px;
}
.add-card {
  color: var(--primary-black);
  font-size: 1rem;
  border: none;
  background: inherit;
}
.holder {
  background: #ffffff;
  box-shadow: 0px 4px 30px rgba(174, 174, 192, 0.2);
  border-radius: 10px;
}
.header {
  color: var(--secondary-black);
  font-weight: 700;
  font-size: 1.125rem;
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
  color: var(--secondary-black);
  font-size: 0.875rem;
}
</style>
