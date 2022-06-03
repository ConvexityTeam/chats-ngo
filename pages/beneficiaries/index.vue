<template>
  <div class="main container transparent pb-5">
    <!-- Top cards here -->
    <div class="row pt-4">
      <!-- Beneficiaries here -->
      <div class="col-lg-3">
        <div class="card__holder p-3">
          <div class="d-flex">
            <img
              src="~/assets/img/vectors/group-beneficiaries.svg"
              alt="beneficiaries"
            />
            <div class="ml-3">
              <p class="text">Beneficiaries</p>
              <h4 class="funds">
                {{ beneficiaries.length || 0 }}
              </h4>
            </div>
            <div class="ml-auto d-flex align-items-end">
              <button
                type="button"
                @click="$router.push('/beneficiaries/all-beneficiaries')"
                class="d-flex viewall align-items-center"
              >
                <img src="~/assets/img/vectors/eye.svg" alt="see" />
                <span class="ml-2 pt-1">View </span>
              </button>
            </div>
            <!-- <button class="viewall d-flex ">kk</button> -->
          </div>
        </div>
      </div>

      <!-- Total amount Received here -->
      <div class="col-lg-3">
        <div class="card__holder d-flex p-3">
          <div>
            <img src="~/assets/img/vectors/deposit.svg" alt="deposit" />
          </div>
          <div class="ml-3">
            <p class="text">Amount Recieved</p>
            <h4 class="funds">
              {{ $currency }}{{ loading ? 0 : stats.income | formatCurrency }}
            </h4>
          </div>
        </div>
      </div>

      <!--  Amount Disbursed here -->
      <div class="col-lg-3">
        <div class="card__holder d-flex p-3">
          <div>
            <disbursed />
          </div>
          <div class="ml-3">
            <p class="text">Amount Disbursed</p>
            <h4 class="funds">
              {{ $currency }}{{ loading ? 0 : stats.expense | formatCurrency }}
            </h4>
          </div>
        </div>
      </div>

      <!-- Total Balance -->
      <div class="col-lg-3">
        <div class="card__holder d-flex p-3">
          <div>
            <total-balance />
          </div>
          <div class="ml-3">
            <p class="text">Total Balance</p>
            <h4 class="funds">
              {{ $currency
              }}{{
                loading ? 0 : (stats.income - stats.expense) | formatCurrency
              }}
            </h4>
          </div>
        </div>
      </div>
    </div>

    <!-- First Beneficiary cards here -->
    <div class="row pt-4">
      <!-- Beneficiary By Gender  Cards here -->
      <div class="col-lg-4 pb-3">
        <div class="cards__holder px-3 pt-3">
          <beneficiary-gender />
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
    <div class="row pt-lg-4">
      <!-- Beneficiary Marital card here -->
      <div class="col-lg-4 pb-3">
        <div class="cards__holder px-3 pt-3">
          <beneficiary-marital />
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
    <beneficiary-transaction />
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
import totalBalance from "~/components/icons/total-balance.vue";
import disbursed from "~/components/icons/disbursed.vue";
import beneficiaryTransaction from "~/components/tables/beneficiary-transaction";
import { mapActions, mapGetters } from "vuex";

export default {
  layout: "dashboard",
  data() {
    return {
      loading: false,
      id: "",
      stats: {}
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
    disbursed,
    totalBalance
  },

  mounted() {
    this.id = this.user.AssociatedOrganisations[0].OrganisationId;
    this.getallBeneficiaries(this.id);
    this.getStats();
    console.log("STATS:::", this.stats);
    this.getChartData();
  },

  computed: {
    ...mapGetters("authentication", ["user"]),
    ...mapGetters("beneficiaries", ["beneficiaries"])
  },

  methods: {
    ...mapActions("beneficiaries", ["getallBeneficiaries"]),

    async getStats() {
      try {
        this.loading = true;
        const response = await this.$axios.get("/users/info/statistics");
        if (response.status == "success") {
          this.loading = false;
          this.stats = response.data[0];
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
    }
  }
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
  margin-left: auto;
  display: flex;
  align-items: flex-end;
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
  box-shadow: 0px 4px 25px rgba(174, 174, 192, 0.15);
  border-radius: 10px;
}

.cards__holder {
  background: #ffffff;
  box-shadow: 0px 4px 25px rgba(174, 174, 192, 0.15);
  border-radius: 10px;
  height: 300px;
}

.text {
  color: #7c8db5;
  font-size: 0.875rem;
  font-weight: 500;
}

.funds {
  color: var(--primary-blue);
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 0.563rem;
  word-break: break-all;
}
</style>
