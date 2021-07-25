<template>
  <div class="main container transparent pb-5">
    <div class="row py-4">
      <div class="col-lg-8">
        <!-- Top cards here -->
        <div class="row">
          <!--Total Deposit here -->
          <div class="col-lg-4">
            <div class="card__holder d-flex  p-3">
              <div>
                <img src="~/assets/img/vectors/deposit.svg" alt="deposit" />
              </div>
              <div class="ml-3">
                <p class="text">Total Deposit</p>
                <h4 class="funds">${{ loading ? 0 : 0 }}</h4>
              </div>
            </div>
          </div>

          <!-- Campaign Expenses here -->

          <div class="col-lg-4">
            <div class="card__holder d-flex  p-3">
              <div>
                <disbursed />
              </div>
              <div class="ml-3">
                <p class="text">Expenses</p>
                <h4 class="funds">${{ loading ? 0 : financials.expense }}</h4>
              </div>
            </div>
          </div>

          <!--  Cash Balance here -->

          <div class="col-lg-4">
            <div class="card__holder d-flex  p-3">
              <div>
                <total-balance />
              </div>
              <div class="ml-3">
                <p class="text">Cash Balance</p>
                <h4 class="funds">${{ loading ? 0 : wallet.balance }}</h4>
              </div>
            </div>
          </div>
        </div>

        <!-- Transactions table here -->
        <div class="mt-3">
          <transactions />
        </div>
      </div>

      <div class="col-lg-4">
        <wallet />
      </div>
    </div>
  </div>
</template>

<script>
import transactions from "~/components/tables/transactions";
import wallet from "~/components/tables/wallet";
import { mapGetters } from "vuex";
import disbursed from "~/components/icons/disbursed.vue";
import totalBalance from "~/components/icons/total-balance.vue";
export default {
  layout: "dashboard",
  components: {
    transactions,
    wallet,

    disbursed,
    totalBalance
  },

  data: () => ({
    loading: false,
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
        this.loading = true;
        const response = await this.$axios.get(`/users/info/statistics`);
        if (response.status == "success") {
          console.log("financials::", response.data[0]);
          this.financials = response.data[0];
        }
        this.loading = false;
      } catch (err) {
        this.loading = false;
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
.card__holder {
  background: #ffffff;
  box-shadow: 0px 4px 25px rgba(174, 174, 192, 0.15);
  border-radius: 10px;
}

.text {
  color: #7c8db5;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0px !important;
}
.funds {
  color: #25396f;
  font-weight: 500;
  font-size: 1.5rem;
  padding-top: 5px;
}
.main {
  height: calc(100vh - 72px);
  overflow-y: scroll;
}
</style>
