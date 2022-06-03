<template>
  <div class="main pt-4 pb-5 transparent container">
    <div class="row">
      <!-- Welcome message here -->
      <div class="col-lg-8">
        <div class="card__holder h-260 p-4">
          <div class="d-flex">
            <div>
              <h4 class="welcome-header">Welcome To The Market Dashboard!</h4>

              <p class="description">
                Here you can view the top products, product popularity by
                location, gender, and age group.
              </p>

              <p class="description">Need a detailed report?</p>

              <div class="mt-4">
                <csv :data="computedData" name="beneficiaries" />
              </div>
            </div>
            <!-- image here -->
            <div class="ml-auto">
              <img src="~/assets/img/lady.svg" alt />
            </div>
          </div>
        </div>
      </div>

      <!-- Market stats here -->
      <div class="col-lg-4">
        <div class="card__holder h-260 p-4">
          <!-- Total products sold -->
          <div class="d-flex">
            <div>
              <img src="~/assets/img/vectors/pounds.svg" alt="sold" />
            </div>

            <div class="ml-4">
              <p class="total">Total Products Sold</p>
              <h4 class="amount">
                {{
                  data.sum_quantity == null
                    ? 0
                    : data.sum_quantity | formatNumber
                }}
              </h4>
            </div>
          </div>
          <hr class="mb-4" />
          <!-- Total products value -->
          <div class="mb-4 d-flex">
            <div>
              <img src="~/assets/img/vectors/dollar.svg" alt="sold" />
            </div>

            <div class="ml-4">
              <p class="total">Total Products Value</p>
              <h4 class="amount">
                {{ $currency
                }}{{
                  data.sum_value == null ? "0" : data.sum_value | formatCurrency
                }}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Graphs here -->
    <div class="row mt-4 pt-2">
      <!-- Products by Gender -->
      <div class="col-lg-8">
        <div class="cards__holder p-4">
          <h4 class="pb-2 gender-header">Products By Gender</h4>
          <div class="d-flex justify-content-between">
            <div class="gender">
              <span class="description" style="font-weight: 500"> Female</span>

              <products-gender-female />
            </div>

            <div>
              <span class="description" style="font-weight: 500"> Male</span>
              <products-gender-male />
            </div>
          </div>
        </div>
      </div>

      <!-- Products by Age group -->
      <div class="col-lg-4">
        <div class="cards__holder p-4">
          <h4 class="pb-2 gender-header">Products By Age Group</h4>
          <products-age-group />
        </div>
      </div>
    </div>

    <!-- All Products table here -->
    <div>
      <all-products />
    </div>
  </div>
</template>

<script>
import productsGenderFemale from "~/components/charts/products-gender-female";
import productsGenderMale from "~/components/charts/products-gender-male";
import productsAgeGroup from "~/components/charts/products-age-group";
import allProducts from "~/components/tables/all-products";

export default {
  layout: "dashboard",
  transition: "page",
  components: {
    productsGenderFemale,
    productsGenderMale,
    productsAgeGroup,
    allProducts
  },
  data: () => ({
    loading: false,
    data: {}
  }),

  mounted() {
    this.getSoldProductsValue();
  },

  computed: {
    computedData() {
      // return this.beneficiaries.map(benefactor => {
      //   return {
      //     Name: benefactor.first_name + " " + benefactor.last_name,
      //     Phone_Number: benefactor.phone,
      //     Email_Address: benefactor.email,
      //     location: benefactor.location,
      //     Gender: benefactor.gender,
      //     Marital_Status: benefactor.marital_status,
      //     Created: moment(benefactor.createdAt).format("dddd, MMMM DD, YYYY")
      //   };
      // });
    }
  },

  methods: {
    async getSoldProductsValue() {
      try {
        this.loading = true;
        const response = await this.$axios.get("/vendors/products/sold/value");
        if (response.status == "success") {
          this.loading = false;
          this.data = response.data[0];
        }
        console.log("productsValue:::", response);
      } catch (err) {
        console.log(err);
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.chart-title {
  color: var(--secondary-black);
  font-size: 1rem;
  font-weight: 500;
}
.gender-header {
  color: var(--primary-blue);
  font-size: 1.125rem;
  font-weight: 700;
}

.amount {
  color: var(--primary-blue);
  font-weight: 500;
  font-size: 1.75rem;
}
.total {
  color: #7c8db5;
  font-size: 1rem;
}
.welcome-header {
  color: var(--primary-blue);
  font-weight: 700;
  font-size: 1.5rem;
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

.description {
  color: var(--primary-blue);
  font-size: 1rem;
}

.stats-div {
  width: 30%;
}
.main {
  height: calc(100vh - 72px);
  overflow-y: scroll;
}
.h-260 {
  height: 260px;
}
hr {
  border-top: 1px solid #f5f6f8;
}
</style>
