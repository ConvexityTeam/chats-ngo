<template>
  <div class="main">
      <!-- Top cards here -->
    <div class="row no-gutters pt-lg-4">
      <!-- Beneficiaries here -->
      <div class="col-lg-3" >
        <div class="card__holder px-3 pt-2">
          <p class="text">Beneficiaries</p>
          <h4 class="funds">125,000</h4>
          <p class="pb-2">
            <a href="#Beneficiaries" class="percentage">View all</a>
         
          </p>
        </div>
      </div>

    <!-- Total amount Received here -->
       <div class="col-lg-3" >
        <div class="card__holder px-3 pt-2">
          <p class="text">Total Amount Recieved</p>
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

        <!-- Total Amount Disbursed here -->
       <div class="col-lg-3" >
        <div class="card__holder px-3 pt-2">
          <p class="text">Total Amount Disbursed</p>
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

        <!-- Total Balance -->
       <div class="col-lg-3" >
        <div class="card__holder px-3 pt-2">
          <p class="text">Total Balance</p>
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
         <beneficiaryMarital/>
        </div>
      </div>
  
  <!-- Beneficiary By Location card here -->
        <div class="col-lg-4 pb-3">
        <div class="cards__holder px-3 pt-3">
         <beneficiaryLocation/>
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
    <div class="row  no-gutters pt-lg-4 mr-3">

      <!-- Beneficiary complaints card here -->
   <div class="w-100">
   <beneficiaryComplaints/>
   </div>
  
    </div>
  </div>
</template>

<script>
import beneficiaryAge from '~/components/charts/beneficiary-age'
import beneficiaryGender from '~/components/charts/beneficiary-gender'
import beneficiaryPerVendor from '~/components/charts/beneficiary-per-vendor'
import beneficiaryBalances from '~/components/charts/beneficiary-balances'
import beneficiaryLocation from '~/components/charts/beneficiary-location'
import beneficiaryMarital from '~/components/charts/beneficiary-marital'
import dot from '~/components/icons/dot'
import rightArrow from '~/components/icons/right-arrow'
import leftArrow from '~/components/icons/left-arrow'
import beneficiaryComplaints from '~/components/tables/beneficiary-complaints'
export default {
  layout: 'dashboard',
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
    beneficiaryComplaints
  },
}
</script>

<style scoped>
.main{
   height: calc(100vh - 72px);
    overflow-y: scroll;
}
.paginate{
   color: var(--secondary-black);
   font-size: 0.875rem;
   font-weight: 500
}
.viewall{
  color: var(--primary-color);
  font-size: 0.875rem;
  text-decoration: none;
}
.vendor-name{
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
