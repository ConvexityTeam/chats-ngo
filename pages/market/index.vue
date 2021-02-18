<template>
  <div class="main pt-lg-4">
    <div class="d-flex flex-wrap no-gutters">
      <!-- Welcome message here -->
      <div class="message-div">
        <div class="card__holder p-3">
          <div class="d-flex">
            <div>
              <h4 class="welcome-header">Welcome To The Market Dashboard!</h4>

              <p class="description">
                Here you can view the top products, product popularity by
                location, gender, and age group.
              </p>

              <p class="description">Need a detailed report?</p>

              <button class="export-btn py-3 px-4 mt-3">Export as CSV</button>
            </div>
            <!-- image here -->
            <div class="ml-auto">
              <img src="~/assets/img/lady.svg" alt />
            </div>
          </div>
        </div>
      </div>

      <!-- Market stats here -->
      <div class="stats-div ml-5">
        <div class="card__holder p-4 mr-4">
          <!-- Total products sold -->
          <div class="mb-4">
            <p class="total">Total Products Sold</p>
            <h4 class="amount">26,000</h4>
          </div>

          <!-- Total products sold -->
          <div class="mb-4">
            <p class="total">Total Products Value</p>
            <h4 class="amount">$1,260,000</h4>
          </div>
        </div>
      </div>
    </div>

    <!-- Graphs here -->
    <div class="d-flex flex-wrap no-gutters mt-4">
      <!-- Products by Gender -->
      <div class="gender-div">
        <div class="card__holder p-3">
          <h4 class="pb-3 gender-header">Products By Gender</h4>
          <div class="d-flex">
            <productsGenderFemale />

            <productsGenderMale />
          </div>
        </div>
      </div>

      <!-- Products by Age group -->
      <div class="age-div ml-3">
        <div class="card__holder p-3">
          <productsAgeGroup/>
        </div>
      </div>
    </div>

    <!-- All Products table here -->
    <div>
    <allProducts/>
    </div>
  </div>
</template>

<script>
import productsGenderFemale from '~/components/charts/products-gender-female'
import productsGenderMale from '~/components/charts/products-gender-male'
import productsAgeGroup from '~/components/charts/products-age-group'
import allProducts from '~/components/tables/all-products'
export default {
  layout: 'dashboard',
  components: {
    productsGenderFemale,
    productsGenderMale,
    productsAgeGroup,
    allProducts
  },
}
</script>

<style scoped>
.chart-title {
  color: var(--secondary-black);
  font-size: 1rem;
  font-weight: 500;
}
.gender-header {
  color: var(--secondary-black);
  font-size: 1.125rem;
  font-weight: 700;
}
.gender-div {
  width: 56%;
}
.age-div {
  width: 40%;
}
.amount {
  color: black;
  font-weight: 500;
  font-size: 2.25rem;
}
.total {
  color: var(--secondary-black);
  font-size: 1rem;
}
.welcome-header {
  color: var(--secondary-black);
  font-weight: 700;
  font-size: 1.5rem;
}
.card__holder {
  background: #ffffff;
  box-shadow: 0px 4px 30px rgba(174, 174, 192, 0.2);
  border-radius: 10px;
}
.description {
  color: #4f4f4f;
  font-size: 1rem;
}
.message-div {
  width: 65%;
}
.stats-div {
  width: 30%;
}
.main {
  height: calc(100vh - 72px);
  overflow-y: scroll;
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
