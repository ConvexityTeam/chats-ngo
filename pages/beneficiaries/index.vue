<template>
  <div class="main">
    <!-- Top cards here -->
    <div class="row no-gutters pt-lg-4">
      <!-- Beneficiaries here -->
      <div class="col-lg-3">
        <div class="card__holder px-3 pt-2">
          <p class="text">Beneficiaries</p>
          <h4 class="funds">{{  beneficiariesData.beneficiariesCount }}</h4>
          <p class="pb-2">
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
          <h4 class="funds">
            ${{ loading ? 0 : beneficiariesData.disbursed + beneficiariesData.balance }}
          </h4>
        </div>
      </div>

      <!-- Total Amount Disbursed here -->
      <div class="col-lg-3">
        <div class="card__holder px-3 pt-2">
          <p class="text">Total Amount Disbursed</p>
          <h4 class="funds">${{ beneficiariesData.disbursed }}</h4>
        </div>
      </div>

      <!-- Total Balance -->
      <div class="col-lg-3">
        <div class="card__holder px-3 pt-2">
          <p class="text">Total Balance</p>
          <h4 class="funds">${{ beneficiariesData.balance }}</h4>
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

    <!-- Third Beneficiary cards here -->
    <div class="row no-gutters pt-lg-4 mr-3">
      <!-- Beneficiary complaints card here -->
      <div class="w-100">
        <beneficiaryComplaints :beneficiariesData="beneficiariesData" />
      </div>
    </div>

    <!-- Beneficiary transaction here -->
    <beneficiaryTransaction :beneficiariesData="beneficiariesData"  /> 
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
import beneficiaryComplaints from "~/components/tables/beneficiary-complaints";
import beneficiaryTransaction from "~/components/tables/beneficiary-transaction";
export default {
  layout: "dashboard",
  data() {
    return {
      loading: false,
      beneficiariesData: {},
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
    beneficiaryComplaints,
    beneficiaryTransaction,
  },

  mounted() {
    // this.fetchBeneficiariesData();
  },

  methods: {
    async fetchBeneficiariesData() {
      try {
        this.loading = true;

        const response = await this.$axios.get(
          "/beneficiaries",
          this.payload
        );
        if (response.data.code == 200) {
          this.loading = false;

          this.beneficiariesData = response.data.data;
        }

        console.log("allBeneficiaries:::", response);

      } catch (error) {
        this.loading = false;
        this.$toast.error(error.response.data.message);
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
