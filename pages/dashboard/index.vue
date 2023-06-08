<template>
  <div class="main container transparent pb-5">
    <!-- Top cards here -->
    <div class="row pt-4">
      <!-- Wallet balance here -->
      <div class="col-lg-3">
        <div class="card__holder d-flex p-3">
          <ItemDistributed />

          <div class="ml-3">
            <p class="text">Items Distributed</p>

            <h4 class="funds">
              {{ wallet.total_items_distributed || 0 | formatNumber }}
            </h4>
          </div>
        </div>
      </div>

      <!-- Campaign Budget -->
      <div class="col-lg-3">
        <div class="card__holder d-flex p-3">
          <div>
            <img src="~/assets/img/vectors/deposit.svg" alt="deposit" />
          </div>
          <div class="ml-3">
            <p class="text">Campaign Budget</p>
            <h4 class="funds" :title="campaignBudget">
              {{ $truncate(campaignBudget) }}
            </h4>
          </div>
        </div>
      </div>

      <!--  Amount Disbursed here -->
      <div class="col-lg-3">
        <div class="card__holder d-flex p-3">
          <Disbursed />

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
          <TotalBalance />

          <div class="ml-3">
            <p class="text">Campaign Balance</p>
            <h4 class="funds" :title="campaignBalance">
              {{ $truncate(campaignBalance) }}
            </h4>
          </div>
        </div>
      </div>
    </div>

    <!-- First Beneficiary cards here -->
    <div class="row pt-4">
      <!-- Beneficiary Count Cards here -->
      <div class="col-lg-4 pb-3">
        <div class="cards__holder p-4">
          <p class="total-count pb-2">Total Count</p>

          <!-- Beneficiaries Stats  here -->
          <div class="pb-3">
            <div class="stats-holder d-flex align-items-center px-3 w-50">
              <img
                src="~/assets/img/vectors/beneficiaries.svg"
                alt="beneficiaries"
              />

              <div class="ml-2 pt-3">
                <p class="beneficiaries">Beneficiaries</p>
              </div>
            </div>
            <h4 class="beneficiaries-count m-3">
              {{ beneficiaries.length || 0 | formatNumber }}
            </h4>
          </div>

          <!-- Vendors stats here -->
          <div class="pb-3">
            <div class="stats-holder d-flex align-items-center px-3 w-50">
              <img src="~/assets/img/vectors/vendors.svg" alt="vendors" />

              <div class="ml-2 pt-3">
                <p class="beneficiaries">Vendors</p>
              </div>
            </div>
            <h4 class="beneficiaries-count m-3">
              {{ vendors.length || 0 | formatNumber }}
            </h4>
          </div>
        </div>
      </div>

      <!-- Beneficiary Age group  Cards here -->
      <div class="col-lg-4 pb-3">
        <div class="cards__holder px-3 pt-3">
          <BeneficiaryAge />
        </div>
      </div>

      <!-- Beneficiary By Gender  Cards here -->
      <div class="col-lg-4 pb-3">
        <div class="cards__holder px-3 pt-3">
          <BeneficiaryGender />
        </div>
      </div>
    </div>

    <!-- Second Beneficiary cards here -->
    <div class="row">
      <!-- Beneficiary By Location card here -->
      <div class="col-lg-4 pb-3">
        <div class="cards__holder px-3 pt-3">
          <BeneficiaryLocation />
        </div>
      </div>

      <!-- Vendor Transaction By Beneficiary  Cards here -->
      <div class="col-lg-4 pb-3">
        <div class="cards__holder px-3 pt-3">
          <BeneficiaryVendor />
        </div>
      </div>

      <!-- Beneficiary Balances card here -->
      <div class="col-lg-4 pb-3">
        <div class="cards__holder px-3 pt-3">
          <BeneficiaryBalances />
        </div>
      </div>
    </div>

    <!-- Third Beneficiary cards here -->
    <div class="row pt-3">
      <!-- Metric card here -->
      <div class="col-lg-6 pb-3">
        <div class="metric__holder p-4">
          <p class="total-count pb-2">Metrics</p>

          <div v-if="$fetchState.pending" class="loader mt-5"></div>

          <div v-else-if="isMetricData">
            <!-- Maximum Disbursement Date  here -->

            <div>
              <p class="beneficiaries">Maximum Disbursement Date</p>
              <h4 class="date">
                {{ metricsData.maxDisbursedDate | formatDate }}
              </h4>
            </div>

            <!-- Minimum Disbursement Date stats here -->
            <div class="mt-4">
              <p class="beneficiaries">Minimum Disbursement Date</p>
              <h4 class="date">
                {{ metricsData.minDisbursedDate | formatDate }}
              </h4>
            </div>

            <!-- Maximum Spending Date Date stats here -->
            <div class="mt-4">
              <p class="beneficiaries">Maximum Spending Date</p>
              <h4 class="date">
                {{ metricsData.maxSpendDate | formatDate }}
              </h4>
            </div>

            <!-- Maximum Spending Date Date stats here -->
            <div class="mt-4">
              <p class="beneficiaries">Minimum Spending Date</p>
              <h4 class="date">
                {{ metricsData.minSpendDate | formatDate }}
              </h4>
            </div>
          </div>

          <div v-else>
            <h3 class="text-center no-record my-4">NO RECORD FOUND</h3>
          </div>
        </div>
      </div>

      <!-- Vendors card here -->
      <div class="col-lg-6 pb-3">
        <div class="metric__holder p-4">
          <div class="d-flex flex-column h-100">
            <p class="total-count pb-2">Vendors</p>

            <div v-if="$fetchState.pending" class="loader"></div>

            <div v-else-if="vendors.length">
              <div
                class="d-flex"
                v-for="vendor in displayedVendors"
                :key="vendor.id"
              >
                <div>
                  <span class="vendor-name">
                    {{ `${vendor.first_name} ${vendor.last_name}` }}
                  </span>
                </div>
              </div>
            </div>

            <div v-else>
              <h3 class="text-center no-record my-4">NO RECORD FOUND</h3>
            </div>

            <div
              class="d-flex h-100 align-items-end"
              v-if="displayedVendors.length"
            >
              <div class="">
                <button
                  type="button"
                  @click="$router.push('/vendors')"
                  class="d-flex viewall align-items-center"
                >
                  <img src="~/assets/img/vectors/eye.svg" alt="see" />
                  <span class="ml-2 pt-1">View All</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BeneficiaryAge from "~/components/charts/beneficiary-age";
import BeneficiaryBalances from "~/components/charts/beneficiary-balances";
import BeneficiaryGender from "~/components/charts/beneficiary-gender";
import BeneficiaryLocation from "~/components/charts/beneficiary-location";
import BeneficiaryVendor from "~/components/charts/beneficiary-vendor";
import Disbursed from "~/components/icons/disbursed";
import TotalBalance from "~/components/icons/total-balance";
import ItemDistributed from "~/components/icons/item-distributed";

export default {
  name: "Dashboard",
  layout: "dashboard",

  components: {
    BeneficiaryAge,
    BeneficiaryGender,
    BeneficiaryVendor,
    BeneficiaryBalances,
    BeneficiaryLocation,
    ItemDistributed,
    TotalBalance,
    Disbursed,
  },

  data() {
    return {
      loading: false,
      beneficiaries: [],
      vendors: [],
      wallet: {},
      campaignDetails: {},
      metricsData: {},
    };
  },

  computed: {
    ...mapGetters("authentication", ["user"]),

    displayedVendors() {
      return this.vendors.slice(0, 5);
    },

    campaignBudget() {
      return `${this.$currency}${this.$root.$options.filters.formatCurrency(
        this.campaignDetails.campaign_budget
      )}`;
    },

    amountDisbursed() {
      return `${this.$currency}${this.$root.$options.filters.formatCurrency(
        this.campaignDetails.amount_disbursed
      )}`;
    },

    campaignBalance() {
      return `${this.$currency}${this.$root.$options.filters.formatCurrency(
        this.campaignDetails.balance
      )}`;
    },

    isMetricData() {
      // check if the properties of the object have values
      return Object.values(this.metricsData).every((x) => x != null);
    },
  },

  async fetch() {
    const id = parseInt(this.user?.AssociatedOrganisations[0]?.OrganisationId);

    const beneficiaries = await this.$axios.get(
      `/organisation/${id}/beneficiaries`
    );
    const vendors = await this.$axios.get(`/organisations/${id}/vendors`);
    const wallet = await this.$axios.get(`/organisations/${id}/wallets`);
    const campaignDetails = await this.$axios.get(
      `/organisations/campaigns/transaction`
    );
    const metricsData = await this.$axios.get(`/organisations/matrics`);

    this.beneficiaries = beneficiaries.data;
    this.vendors = vendors?.data;
    this.wallet = wallet?.data?.MainWallet;
    this.campaignDetails = campaignDetails?.data;
    this.metricsData = metricsData?.data;
  },
};
</script>

<style scoped>
.ml-3 {
  margin-left: 0.75rem !important;
}
.main {
  height: calc(100vh - 72px);
  overflow-y: scroll;
}

.paginate {
  color: var(--secondary-black);
  font-size: 0.875rem;
  font-weight: 500;
}

.vendor-name {
  color: var(--primary-gray);
  font-size: 1rem;
  padding-bottom: 1rem;
  display: block;
}

.date {
  color: var(--primary-blue);
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 8px;
}

.stats-holder {
  background: #f5f6f8;
  border-radius: 30px;
  height: 36px;
}

.beneficiaries {
  color: var(--primary-gray);
  font-size: 1rem;
  line-height: 19px;
}

.beneficiaries-count {
  color: var(--primary-blue);
  font-size: 1.5rem;
  font-weight: 500;
}

.card__holder {
  background: #ffffff;
  box-shadow: 0px 4px 25px rgba(174, 174, 192, 0.15);
  border-radius: 10px;
}

.metric__holder {
  background: #ffffff;
  box-shadow: 0px 4px 25px rgba(174, 174, 192, 0.15);
  border-radius: 10px;
  height: 346px;
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

.percentage {
  color: #00bf6f;
  font-size: 0.8 75rem;
}

.total-count {
  color: #333333;
  font-weight: bold;
  font-size: 1.125rem;
}
</style>
