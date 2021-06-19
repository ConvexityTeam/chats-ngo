<template>
  <div class="main container">
    <div class="row no-gutters">
      <div class="col-lg-8">
        <!-- Top cards here -->
        <div class="row pt-lg-4">
          <!--Total Deposit here -->
          <div class="col-lg-4">
            <div class="card__holder px-3 pt-2 pb-2">
              <p class="text">Total Deposit</p>
              <h4 class="funds">${{wallet.balance }}</h4>
              <!-- <p class="percentage pb-2">
                2.5%
                <span class="mx-1">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.06659 1.33514e-05C4.90339 -0.000432014 4.74003 0.0629158 4.62262 0.190026L0.517362 4.63447C0.303943 4.86552 0.328941 5.21648 0.573196 5.41837C0.817451 5.62025 1.18847 5.5966 1.40189 5.36555L4.48338 2.02946L4.48338 9.44444C4.48338 9.75127 4.74632 10 5.07068 10C5.39504 10 5.65798 9.75127 5.65798 9.44444L5.65798 2.03883L8.74013 5.36614C8.95389 5.59691 9.32495 5.62006 9.5689 5.41785C9.81285 5.21564 9.83733 4.86465 9.62356 4.63388L5.55655 0.243358C5.45086 0.096467 5.27268 0 5.07068 0C5.06932 0 5.06795 4.76837e-06 5.06659 1.33514e-05Z"
                      fill="#00BF6F"
                    />
                  </svg>
                </span>
              </p> -->
            </div>
          </div>

          <!-- Campaign Expenses here -->
          <div class="col-lg-4">
            <div class="card__holder px-3 pt-2 pb-2">
              <p class="text">Campaign Expenses</p>
              <h4 class="funds">${{ financials.expense }}</h4>
            </div>
          </div>

          <!--  Cash Balance here -->
          <div class="col-lg-4">
            <div class="card__holder px-3 pt-2 pb-2">
              <p class="text">Cash Balance</p>
              <h4 class="funds">${{ wallet.balance }}</h4>
            </div>
          </div>
        </div>

        <!-- Transactions table here -->
        <div>
          <transactions />
        </div>
      </div>

      <div class="col-lg-4">
        <wallet :wallet="wallet" @reload="getWallet" />
      </div>
    </div>
  </div>
</template>

<script>
import transactions from "~/components/tables/transactions";
import wallet from "~/components/tables/wallet";
import { mapGetters } from "vuex";
export default {
  layout: "dashboard",
  components: {
    transactions,
    wallet
  },

  data: () => ({
    wallet: {},
    financials: {}
  }),

  computed: {
    ...mapGetters("authentication", ["user"])
  },

  mounted() {
    this.organisationId = this.user.AssociatedOrganisations[0].Organisation.id;
    this.getWallet();
    this.getFinancials();
  },

  methods: {
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

    async getFinancials() {
      try {
        const response = await this.$axios.get(`/users/info/statistics`);
        if (response.status == "success") {
          console.log("financials::", response.data[0]);
          this.financials = response.data[0];
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
.card__holder {
  background: #ffffff;
  box-shadow: 0px 4px 30px rgba(174, 174, 192, 0.2);
  border-radius: 10px;
  width: 210px;
}
.main {
  height: calc(100vh - 72px);
  overflow-y: scroll;
}
/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
