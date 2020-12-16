<template>
  <div class="main">
    <div class="row no-gutters pt-lg-4">
      <!-- Top cards here -->
      <div class="col-lg-3" v-for="i in 4" :key="i">
        <div class="card__holder px-3 pt-2">
          <p class="text">Wallet Balance</p>
          <h4 class="funds">$125,000/N120,000</h4>
          <p class="percentage pb-2">
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
          </p>
        </div>
      </div>
    </div>

    <!-- First Beneficiary cards here -->
    <div class="row no-gutters pt-lg-4">
      <!-- Beneficiary Count Cards here -->
      <div class="col-lg-4 pb-3">
        <div class="cards__holder px-3 pt-3">
          <p class="total-count pb-3">Total Count</p>

          <!-- Beneficiaries Stats  here -->
          <div>
            <p class="beneficiaries">Beneficiaries</p>
            <h4 class="beneficiaries-count">842,000</h4>
          </div>

          <!-- Vendors stats here -->
          <div class="pb-4 mt-4">
            <p class="beneficiaries">Vendors</p>
            <h4 class="beneficiaries-count">142,000</h4>
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
         <beneficiaryLocation/>
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
    <div class="row  no-gutters pt-lg-4">

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

          <div class="d-flex pb-3" v-for="i in 5" :key="i">
            <div>
              <p class="vendor-name">Dangote Flour Mill</p>
            </div>
            <div class="ml-auto">
              <button type="button" class="more-btn">
                <i><dot /></i>
              </button>
            </div>
          </div>

               <div class="d-flex pb-5" >
            <div>
             <nuxt-link class="viewall" to="/vendors">View all</nuxt-link>
            </div>
            <div class="ml-auto">
              <button type="button" class="more-btn">
                <i><dot /></i>
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
export default {
  layout: 'dashboard',
  components: {
    beneficiaryAge,
    beneficiaryGender,
    beneficiaryVendor,
    beneficiaryBalances,
    beneficiaryLocation,
    dot
  },
}
</script>

<style scoped>
.main{
   height: calc(100vh - 72px);
    overflow-y: scroll;
}
.viewall{
  color: var(--primary-color);
  font-size: 0.875rem;
}
.vendor-name{
   color: var(--secondary-black);
}
.more-btn {
  border: none;
  background: inherit;
  box-shadow: none;
}
.more-btn:focus {
  outline: none;
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
</style>
