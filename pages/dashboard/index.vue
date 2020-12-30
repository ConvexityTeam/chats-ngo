<template>
  <div class="main">
    <!-- Top cards here -->
    <div class="row no-gutters pt-lg-4">
      <!-- Wallet balance here -->
      <div class="col-lg-3">
        <div class="card__holder px-3 pt-2">
          <p class="text">Wallet Balance</p>
          <h4 class="funds pb-3 d-flex">
            {{ userLocation.currencySymbol + userLocation.convertedValue}}
          </h4>
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

      <!-- Total amount Received here -->
      <div class="col-lg-3">
        <div class="card__holder px-3 pt-2">
          <p class="text">Total Amount Recieved</p>
          <h4 class="funds pb-3">   {{ userLocation.currencySymbol + userLocation.convertedValue}}</h4>
        </div>
      </div>

      <!-- Total Amount Disbursed here -->
      <div class="col-lg-3">
        <div class="card__holder px-3 pt-2">
          <p class="text">Total Amount Disbursed</p>
          <h4 class="funds pb-3">   {{ userLocation.currencySymbol + userLocation.convertedValue}}</h4>
        </div>
      </div>

      <!-- Total Balance -->
      <div class="col-lg-3">
        <div class="card__holder px-3 pt-2">
          <p class="text">Total Balance</p>
          <h4 class="funds pb-3"> {{ userLocation.currencySymbol + userLocation.convertedValue}}</h4>
        </div>
      </div>
    </div>

    <!-- First Beneficiary cards here -->
    <div class="row no-gutters pt-lg-4">
      <!-- Beneficiary Count Cards here -->
      <div class="col-lg-4 pb-4">
        <div class="cards__holder px-3 pt-3">
          <p class="total-count pb-4">Total Count</p>

          <!-- Beneficiaries Stats  here -->
          <div class="pb-4">
            <p class="beneficiaries">Beneficiaries</p>
            <h4 class="beneficiaries-count">{{ beneficiaryCount }}</h4>
          </div>

          <!-- Vendors stats here -->
          <div class="pb-5">
            <p class="beneficiaries">Vendors</p>
            <h4 class="beneficiaries-count pb-3">{{ allVendors.length }}</h4>
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
    <div class="row no-gutters pt-lg-4">
      <!-- Beneficiary By Location card here -->
      <div class="col-lg-4 pb-3">
        <div class="cards__holder px-3 pt-3">
          <beneficiaryLocation />
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
    <div class="row no-gutters pt-lg-4">
      <!-- Metric card here -->
      <div class="col-lg-5 pb-3">
        <div class="metric__holder px-3 pt-3">
          <p class="total-count pb-3">Metrics</p>

          <!-- Maximum Disbursement Date  here -->
          <div>
            <p class="beneficiaries">Maximum Disbursement Date</p>
            <h4 class="date">12/04/2020</h4>
          </div>

          <!-- Minimum Disbursement Date stats here -->
          <div class="pb-4 mt-4">
            <p class="beneficiaries">Minimum Disbursement Date</p>
            <h4 class="date">12/04/2020</h4>
          </div>

          <!-- Maximum Spending Date Date stats here -->
          <div class="pb-4">
            <p class="beneficiaries">Maximum Spending Date</p>
            <h4 class="date">12/04/2020</h4>
          </div>

          <!-- Maximum Spending Date Date stats here -->
          <div class="pb-4">
            <p class="beneficiaries">Maximum Spending Date</p>
            <h4 class="date">12/04/2020</h4>
          </div>
        </div>
      </div>

      <!-- Vendors card here -->
      <div class="col-lg-6 ml-auto pb-3">
        <div class="metric__holder mr-4 px-3 pt-3">
          <p class="total-count pb-3">Vendors</p>

          <div class="d-flex pb-3" v-for="vendor in allVendors.slice(0, 5)" :key="vendor.id">
            <div>
              <p class="vendor-name">{{vendor.first_name}}</p>
            </div>
            <div class="ml-auto">
              <button type="button" class="more-btn">
                <i><dot /></i>
              </button>
            </div>
          </div>

          <div class="d-flex pb-2">
            <div class="mt-2">
              <nuxt-link class="viewall" to="/vendors">View all</nuxt-link>
            </div>
            <div class="ml-auto d-flex">
              <p class="pt-3 paginate">1 - 10 of 24</p>
              <button type="button" class="more-btn">
                <i><leftArrow /></i>
              </button>
              <button type="button" class="more-btn">
                <i><rightArrow /></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import beneficiaryAge from '~/components/charts/beneficiary-age'
import beneficiaryGender from '~/components/charts/beneficiary-gender'
import beneficiaryVendor from '~/components/charts/beneficiary-vendor'
import beneficiaryBalances from '~/components/charts/beneficiary-balances'
import beneficiaryLocation from '~/components/charts/beneficiary-location'
import dot from '~/components/icons/dot'
import rightArrow from '~/components/icons/right-arrow'
import leftArrow from '~/components/icons/left-arrow'
import locateMixin from '~/components/mixins/locate'
import countries from '~/plugins/countries'
export default {
  layout: 'dashboard',
  mixins: [locateMixin],
  data() {
    return {
      allVendors:[],
      beneficiaryCount: '20',
      amount: '5000',

      userLocation: {
        alphaCode: '',
        currencySymbol: '',
        currencyCode: '',
        convertedValue: '5000',
      },
    }
  },

  components: {
    beneficiaryAge,
    beneficiaryGender,
    beneficiaryVendor,
    beneficiaryBalances,
    beneficiaryLocation,
    dot,
    rightArrow,
    leftArrow,
  },

  created() {
    this.fetchAllVendors();
    this.fetchAllBeneficiaries();
    this.getIp();
  },

  methods: {
    getIp() {
      this.$axios
        .get('http://ip-api.com/json')
        .then((response) => {
          console.log({ response: response.data.countryCode })
          this.userLocation.alphaCode = response.data.countryCode
          this.setCurrency()
          this.convertCurrency()
        })
        .catch((err) => {
          console.log(err)
        })
    },

    setCurrency() {
      const userCountry = countries.filter(
        (countries) => countries.alpha2Code == this.userLocation.alphaCode,
      )

      this.userLocation.currencySymbol = userCountry[0].currencies[0].symbol
      this.userLocation.currencyCode = userCountry[0].currencies[0].code
    },

    convertCurrency() {
      this.$axios
        .get(`https://fixer-fixer-currency-v1.p.rapidapi.com/convert`, {
          params: {
            from: 'USD',
            to: this.userLocation.currencyCode,
            amount: this.amount,
          },
          headers: {
            'x-rapidapi-key':
              '53a42b6342msha5eeed4491364b5p1c9fb1jsn357450c321a9',
            'x-rapidapi-host': 'fixer-fixer-currency-v1.p.rapidapi.com',
          },
        })

        .then((response) => {
          // this.userLocation.convertedValue = response.data.result
        })

        .catch((error) => {
          console.log('erroo',error)
        })
    },

    async fetchAllBeneficiaries() {
      try {
        const response = await this.$axios.get('/beneficiaries')
        console.log({response:response})
        this.beneficiaryCount = response.data.data.length
      } catch (error) {
         console.log('erroo',error)
      }
    },

    async fetchAllVendors() {
      try {
        const response = await this.$axios.get('/vendors')
        this.allVendors = response.data.data

        console.log('all', this.allVendors)
        console.log('vendors', response)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
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
