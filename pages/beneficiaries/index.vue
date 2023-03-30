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
            <h4 class="funds" :title="amountReceived">
              {{ $truncate(amountReceived) }}
            </h4>
          </div>
        </div>
      </div>

      <!--  Amount Disbursed here -->
      <div class="col-lg-3">
        <div class="card__holder d-flex p-3">
          <div>
            <Disbursed />
          </div>
          <div class="ml-3">
            <p class="text">Amount Disbursed</p>
            <h4 class="funds" :title="amountDisbursed">
              {{ $truncate(amountDisbursed) }}
            </h4>
          </div>
        </div>
      </div>

      <!-- Total Balance -->
      <div class="col-lg-3">
        <div class="card__holder d-flex p-3">
          <div>
            <TotalBalance />
          </div>
          <div class="ml-3">
            <p class="text">Total Balance</p>
            <h4 class="funds" :title="totalBalance">
              {{ $truncate(totalBalance) }}
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
          <BeneficiaryGender />
        </div>
      </div>

      <!-- Beneficiary Age group  Cards here -->
      <div class="col-lg-4 pb-3">
        <div class="cards__holder px-3 pt-3">
          <BeneficiaryAge />
        </div>
      </div>

      <!-- Vendor Transaction By Beneficiary  Cards here -->
      <div class="col-lg-4 pb-3">
        <div class="cards__holder px-3 pt-3">
          <BeneficiaryPerVendor />
        </div>
      </div>
    </div>

    <!-- Second Beneficiary cards here -->
    <div class="row pt-lg-4">
      <!-- Beneficiary Marital card here -->
      <div class="col-lg-4 pb-3">
        <div class="cards__holder px-3 pt-3">
          <BeneficiaryMarital />
        </div>
      </div>

      <!-- Beneficiary By Location card here -->
      <div class="col-lg-4 pb-3">
        <div class="cards__holder px-3 pt-3">
          <BeneficiaryLocation />
        </div>
      </div>

      <!-- Beneficiary Balances card here -->
      <div class="col-lg-4 pb-3">
        <div class="cards__holder px-3 pt-3">
          <BeneficiaryBalances />
        </div>
      </div>
    </div>

    <!-- Beneficiary transaction here -->
    <BeneficiaryTransaction />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BeneficiaryAge from "~/components/charts/beneficiary-age";
import BeneficiaryBalances from "~/components/charts/beneficiary-balances";
import BeneficiaryGender from "~/components/charts/beneficiary-gender";
import BeneficiaryLocation from "~/components/charts/beneficiary-location";
import BeneficiaryMarital from "~/components/charts/beneficiary-marital";
import BeneficiaryPerVendor from "~/components/charts/beneficiary-per-vendor";
import Disbursed from "~/components/icons/disbursed.vue";
import BeneficiaryTransaction from "~/components/tables/beneficiary-transaction";
import TotalBalance from "~/components/icons/total-balance";

export default {
  name: "Beneficiaries",
  layout: "dashboard",
  data() {
    return {
      loading: false,
      id: "",
      campaignDetails: {},
    };
  },

  components: {
    BeneficiaryAge,
    BeneficiaryGender,
    BeneficiaryPerVendor,
    BeneficiaryBalances,
    BeneficiaryLocation,
    BeneficiaryMarital,
    BeneficiaryTransaction,
    Disbursed,
    TotalBalance,
  },

  async fetch() {
    const campaignDetails = await this.$axios.get(
      `/organisations/campaigns/transaction`
    );

    this.campaignDetails = campaignDetails?.data;
  },

  mounted() {
    this.id = this.user.AssociatedOrganisations[0].OrganisationId;
    this.$store.dispatch("beneficiaries/getallBeneficiaries", this.id);
  },

  computed: {
    ...mapGetters("authentication", ["user"]),
    ...mapGetters("beneficiaries", ["beneficiaries"]),

    amountReceived() {
      const { amount_disbursed, balance } = this.campaignDetails;
      const amountReceived = amount_disbursed + balance;

      return `${this.$currency}${this.$root.$options.filters.formatCurrency(
        amountReceived
      )}`;
    },

    amountDisbursed() {
      return `${this.$currency}${this.$root.$options.filters.formatCurrency(
        this.campaignDetails.amount_disbursed
      )}`;
    },

    totalBalance() {
      return `${this.$currency}${this.$root.$options.filters.formatCurrency(
        this.campaignDetails.balance
      )}`;
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

.ml-3 {
  margin-left: 0.75rem !important;
}

.funds {
  color: var(--primary-blue);
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 0.563rem;
  word-break: break-all;
}
</style>
