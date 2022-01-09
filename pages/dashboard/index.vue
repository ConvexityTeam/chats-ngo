<template>
  <div class="main container transparent pb-5">
    <!-- Top cards here -->
    <div class="row pt-4">
      <!-- Wallet balance here -->
      <div class="col-lg-3">
        <div class="card__holder d-flex p-3">
          <wallet-balance />
          <div class="ml-3">
            <p class="text">Wallet Balance</p>
            <h4 class="funds">
              $ {{ loading ? 0 : stats.balance || 0 | formatCurrency }}
            </h4>
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
            <p class="text">Campaign Budget</p>
            <h4 class="funds">$ {{ 0 | formatCurrency }}</h4>
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
            <h4 class="funds">$ {{ 0 | formatCurrency }}</h4>
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
            <p class="text">Campaign Balance</p>
            <h4 class="funds">${{ 0 | formatCurrency }}</h4>
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
          <beneficiaryAge />
        </div>
      </div>

      <!-- Beneficiary By Gender  Cards here -->
      <div class="col-lg-4 pb-3">
        <div class="cards__holder px-3 pt-3">
          <beneficiaryGender />
        </div>
      </div>
    </div>

    <!-- Second Beneficiary cards here -->
    <div class="row">
      <!-- Beneficiary By Location card here -->
      <div class="col-lg-4 pb-3">
        <div class="cards__holder px-3 pt-3">
          <beneficiary-location />
        </div>
      </div>

      <!-- Vendor Transaction By Beneficiary  Cards here -->
      <div class="col-lg-4 pb-3">
        <div class="cards__holder px-3 pt-3">
          <beneficiaryVendor />
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
    <div class="row pt-3">
      <!-- Metric card here -->
      <div class="col-lg-6 pb-3">
        <div class="metric__holder p-4">
          <p class="total-count pb-2">Metrics</p>

          <!-- Maximum Disbursement Date  here -->
          <div>
            <p class="beneficiaries">Maximum Disbursement Date</p>
            <h4 class="date">12/04/2020</h4>
          </div>

          <!-- Minimum Disbursement Date stats here -->
          <div class="mt-4">
            <p class="beneficiaries">Minimum Disbursement Date</p>
            <h4 class="date">12/04/2020</h4>
          </div>

          <!-- Maximum Spending Date Date stats here -->
          <div class="mt-4">
            <p class="beneficiaries">Maximum Spending Date</p>
            <h4 class="date">12/04/2020</h4>
          </div>

          <!-- Maximum Spending Date Date stats here -->
          <div class="mt-4">
            <p class="beneficiaries">Maximum Spending Date</p>
            <h4 class="date">12/04/2020</h4>
          </div>
        </div>
      </div>

      <!-- Vendors card here -->
      <div class="col-lg-6 pb-3">
        <div class="metric__holder p-4">
          <p class="total-count pb-2">Vendors</p>

          <div
            class="d-flex"
            v-for="vendor in displayedVendors"
            :key="vendor.id"
          >
            <div>
              <p class="vendor-name">
                {{ vendor.first_name + " " + vendor.last_name }}
              </p>
            </div>

            <div class="ml-auto">
              <button type="button" class="more-btn">
                <dot />
              </button>
            </div>
          </div>

          <div v-if="!displayedVendors.length">
            <h3 class="text-center no-record">NO RECORD FOUND</h3>
          </div>

          <div class="d-flex" v-if="displayedVendors.length">
            <div class="mt-2">
              <button
                type="button"
                @click="$router.push('vendors/all-vendors')"
                class="d-flex viewall align-items-center"
              >
                <img src="~/assets/img/vectors/eye.svg" alt="see" />
                <span class="ml-2 pt-1">View All</span>
              </button>
            </div>
            <div class="ml-auto d-flex">
              <p class="pt-3 paginate">
                1 - {{ displayedVendors.length }} of {{ vendors.length }}
              </p>
              <button type="button" class="more-btn">
                <leftArrow />
              </button>
              <button type="button" class="more-btn">
                <rightArrow />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import beneficiaryAge from "~/components/charts/beneficiary-age";
import beneficiaryGender from "~/components/charts/beneficiary-gender";
import beneficiaryVendor from "~/components/charts/beneficiary-vendor";
import beneficiaryBalances from "~/components/charts/beneficiary-balances";
import beneficiaryLocation from "~/components/charts/beneficiary-location";
import dot from "~/components/icons/dot";
import rightArrow from "~/components/icons/right-arrow";
import leftArrow from "~/components/icons/left-arrow";
import locateMixin from "~/components/mixins/locate";
import walletBalance from "~/components/icons/wallet-balance.vue";
import totalBalance from "~/components/icons/total-balance.vue";
import disbursed from "~/components/icons/disbursed.vue";
import countries from "~/plugins/countries";
import { mapGetters } from "vuex";

export default {
  layout: "dashboard",
  mixins: [locateMixin],

  components: {
    beneficiaryAge,
    beneficiaryGender,
    beneficiaryVendor,
    beneficiaryBalances,
    beneficiaryLocation,
    dot,
    rightArrow,
    leftArrow,
    walletBalance,
    totalBalance,
    disbursed,
  },

  data() {
    return {
      loading: false,
      beneficiaries: [],
      vendors: [],
      amount: "5000",
      stats: {},

      userLocation: {
        alphaCode: "",
        currencySymbol: "",
        currencyCode: "",
        convertedValue: "5000",
      },
    };
  },

  computed: {
    ...mapGetters("authentication", ["user"]),

    displayedVendors() {
      return this.vendors.slice(0, 6);
    },
  },

  async fetch() {
    const id = this.user?.AssociatedOrganisations[0]?.OrganisationId;

    const beneficiaries = await this.$axios.get(
      `/organisation/${id}/beneficiaries`
    );
    const vendors = await this.$axios.get(`/organisations/${id}/vendors`);

    this.beneficiaries = beneficiaries.data;
    this.vendors = vendors.data;
  },

  mounted() {
    // this.getIp();
    // this.getStats();
  },

  methods: {
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
    getIp() {
      this.$axios
        .get("http://ip-api.com/json")
        .then((response) => {
          console.log({ response: response.data.countryCode });
          this.userLocation.alphaCode = response.data.countryCode;
          this.setCurrency();
          this.convertCurrency();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    setCurrency() {
      const userCountry = countries.filter(
        (countries) => countries.alpha2Code == this.userLocation.alphaCode
      );

      this.userLocation.currencySymbol = userCountry[0].currencies[0].symbol;
      this.userLocation.currencyCode = userCountry[0].currencies[0].code;
    },
    convertCurrency() {
      this.$axios
        .get(`https://fixer-fixer-currency-v1.p.rapidapi.com/convert`, {
          params: {
            from: "USD",
            to: this.userLocation.currencyCode,
            amount: this.amount,
          },
          headers: {
            "x-rapidapi-key":
              "53a42b6342msha5eeed4491364b5p1c9fb1jsn357450c321a9",
            "x-rapidapi-host": "fixer-fixer-currency-v1.p.rapidapi.com",
          },
        })

        .then((response) => {
          // this.userLocation.convertedValue = response.data.result
        })

        .catch((error) => {
          console.log("erroo", error);
        });
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

.vendor-name {
  color: var(--primary-gray);
  font-size: 1rem;
}

.date {
  color: var(--tertiary-black);
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
  color: var(--tertiary-black);
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
  color: var(--tertiary-black);
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 0.563rem;
}
.percentage {
  color: #00bf6f;
  font-size: 0.8 75rem;
}
.total-count {
  color: var(--secondary-black);
  font-weight: bold;
  font-size: 1.125rem;
}
</style>
