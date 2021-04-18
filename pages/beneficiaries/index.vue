<template>
  <div class="main">
    <!-- Top cards here -->
    <div class="row no-gutters pt-lg-4">
      <!-- Beneficiaries here -->
      <div class="col-lg-3">
        <div class="card__holder px-3 pt-2">
          <p class="text">Beneficiaries</p>
          <h4 class="funds">{{ loading ? "0" : count }}</h4>
          <p class="pb-1">
            <nuxt-link to="/beneficiaries/all-beneficiaries" class="percentage"
              >View all</nuxt-link
            >
          </p>
        </div>
      </div>

      <!-- Total amount Received here -->
      <div class="col-lg-3">
        <div class="card__holder px-3 pt-2">
          <p class="text">Total Amount Recieved</p>
          <h4 class="funds pb">$ {{ loading ? "0" : stats.income | formatCurrency}}</h4>
        </div>
      </div>

      <!-- Total Amount Disbursed here -->
      <div class="col-lg-3">
        <div class="card__holder px-3 pt-2">
          <p class="text">Total Amount Disbursed</p>
          <h4 class="funds pb">$ {{ loading ? "0" : stats.expense | formatCurrency }}</h4>
        </div>
      </div>

      <!-- Total Balance -->
      <div class="col-lg-3">
        <div class="card__holder px-3 pt-2">
          <p class="text">Total Balance</p>
          <h4 class="funds pb">$ {{ loading ? "0" : stats.balance | formatCurrency }}</h4>
        </div>
      </div>
    </div>

    <!-- First Beneficiary cards here -->
    <div class="row no-gutters pt-lg-4">
      <!-- Beneficiary By Gender  Cards here -->
      <div class="col-lg-4 pb-3">
        <div class="cards__holder px-3 pt-3">
          <beneficiaryGender />
        </div>
      </div>

      <!-- Beneficiary Age group  Cards here -->
      <div class="col-lg-4 pb-3">
        <div class="cards__holder px-3 pt-3">
          <beneficiaryAge />
        </div>
      </div>

      <!-- Vendor Transaction By Beneficiary  Cards here -->
      <div class="col-lg-4 pb-3">
        <div class="cards__holder px-3 pt-3">
          <beneficiaryPerVendor />
        </div>
      </div>
    </div>

    <!-- Second Beneficiary cards here -->
    <div class="row no-gutters pt-lg-4">
      <!-- Beneficiary Marital card here -->
      <div class="col-lg-4 pb-3">
        <div class="cards__holder px-3 pt-3">
          <beneficiaryMarital />
        </div>
      </div>

      <!-- Beneficiary By Location card here -->
      <div class="col-lg-4 pb-3">
        <div class="cards__holder px-3 pt-3">
          <beneficiaryLocation />
        </div>
      </div>

      <!-- Beneficiary Balances card here -->
      <div class="col-lg-4 pb-3">
        <div class="cards__holder px-3 pt-3">
          <beneficiaryBalances />
        </div>
      </div>
    </div>

    <!-- Beneficiary transaction here -->
    <beneficiaryTransaction />
  </div>
</template>

<script>
import beneficiaryAge from "~/components/charts/beneficiary-age";
import beneficiaryGender from "~/components/charts/beneficiary-gender";
import beneficiaryPerVendor from "~/components/charts/beneficiary-per-vendor";
import beneficiaryBalances from "~/components/charts/beneficiary-balances";
import beneficiaryLocation from "~/components/charts/beneficiary-location";
import beneficiaryMarital from "~/components/charts/beneficiary-marital";
import dot from "~/components/icons/dot";
import rightArrow from "~/components/icons/right-arrow";
import leftArrow from "~/components/icons/left-arrow";
import beneficiaryTransaction from "~/components/tables/beneficiary-transaction";
export default {
  layout: "dashboard",
  data() {
    return {
      loading: false,
      count: "",
      stats: {},
    };
  },
  components: {
    beneficiaryAge,
    beneficiaryGender,
    beneficiaryPerVendor,
    beneficiaryBalances,
    beneficiaryLocation,
    beneficiaryMarital,
    dot,
    rightArrow,
    leftArrow,
    beneficiaryTransaction,
  },

  mounted() {
    this.fetchAllBeneficiaries();
    this.getStats();
    this.getChartData();
  },

  methods: {
    async fetchAllBeneficiaries() {
      try {
        this.loading = true;

        const response = await this.$axios.get("/beneficiaries");
        console.log("Allbeneficiaries:::", response);

        if (response.data.code == 200) {
          this.loading = false;
          this.count = response.data.data.length;
        }
      } catch (error) {
        this.loading = false;
        this.$toast.error(error.response.data.message);

        if (error.response.status == 401) {
          this.$toast.error("Unauthorized, Please Login");
          this.logout();
          this.$router.push("/login");
        }
      }
    },

    async getStats() {
      try {
        this.loading = true;
        const response = await this.$axios.get("/users/info/statistics");
        if (response.data.code == 200) {
          this.loading = false;
          this.stats = response.data.data[0];
        }
        console.log("statsresponse:::", response);
      } catch (err) {
        this.loading = false;
        console.log("statserr:::", err);
      }
    },

    async getChartData() {
      try {
        this.loading = true;
        const response = await this.$axios.get("/users/info/chart");
        // if (response.data.code == 200) {
        //   this.loading = false;
        //   this.stats = response.data.data[0];
        // }
        console.log("chatresponse:::", response);
      } catch (err) {
        this.loading = false;
        console.log("chsrtserr:::", err);
      }
    },
  },
};
</script>

<style scoped>
.main {
  height: calc(100vh - 72px);
  overflow-y: scroll;
}
.paginate {
  color: var(--secondary-black);
  font-size: 0.875rem;
  font-weight: 500;
}
.viewall {
  color: var(--primary-color);
  font-size: 0.875rem;
  text-decoration: none;
}
.vendor-name {
  color: var(--secondary-black);
}

.date {
  color: var(--secondary-black);
  font-size: 1.125rem;
}
.beneficiaries {
  color: var(--secondary-black);
  font-size: 1rem;
  font-weight: 400;
  line-height: 19px;
}
.beneficiaries-count {
  color: var(--secondary-black);
  font-size: 1.875rem;
  font-weight: 500;
  line-height: 35px;
}
.card__holder {
  background: #ffffff;
  box-shadow: 0px 4px 30px rgba(174, 174, 192, 0.2);
  border-radius: 10px;
  width: 246px;
}
.metric__holder {
  background: #ffffff;
  box-shadow: 0px 4px 30px rgba(174, 174, 192, 0.2);
  border-radius: 10px;
}
.cards__holder {
  background: #ffffff;
  box-shadow: 0px 4px 30px rgba(174, 174, 192, 0.2);
  border-radius: 10px;
  width: 340px;
}
.text {
  color: var(--secondary-black);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.188rem;
}
.funds {
  color: var(--secondary-black);
  font-size: 1.5rem;
  font-weight: 500;
}
.funds.pb {
  padding-bottom: 35px;
}
.percentage {
  color: #00bf6f;
  font-size: 0.8 75rem;
}
.total-count {
  color: var(--secondary-black);
  font-weight: 700;
  font-size: 1.125rem;
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
