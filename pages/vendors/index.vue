<template>
  <div class="main container transparent pb-5">
    <!-- Top cards here -->
    <div class="row pt-4">
      <!-- Vendors here -->
      <div class="col-lg-3">
        <div class="card__holder  p-3">
          <div class="d-flex">
            <img src="~/assets/img/vectors/shop.svg" alt="shop" />
            <div class="ml-3">
              <p class="text">Vendors</p>
              <h4 class="funds">
                {{ loading ? 0 : allVendors.length }}
              </h4>
            </div>
            <div class="ml-auto d-flex align-items-end">
              <button
                type="button"
                @click="$router.push('/vendors/all-vendors')"
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

      <!-- Daily transactions here -->
      <div class="col-lg-3">
        <div class="card__holder d-flex p-3">
          <div>
            <img
              src="~/assets/img/vectors/daily-transactions.svg"
              alt="deposit"
            />
          </div>
          <div class="ml-3">
            <p class="text">Daily transactions</p>
            <h4 class="funds">
              401
            </h4>
          </div>
        </div>
      </div>

      <!--  Transaction value here -->
      <div class="col-lg-3">
        <div class="card__holder d-flex p-3">
          <div>
            <total-balance />
          </div>
          <div class="ml-3">
            <p class="text">Transaction value</p>
            <h4 class="funds">
              $125,000
            </h4>
          </div>
        </div>
      </div>

      <!-- Products sold -->
      <div class="col-lg-3">
        <div class="card__holder d-flex p-3">
          <div>
            <img src="~/assets/img/vectors/products.svg" alt="product" />
          </div>
          <div class="ml-3">
            <p class="text">Products sold</p>
            <h4 class="funds">
              2600
            </h4>
          </div>
        </div>
      </div>
    </div>

    <!-- Vendor Transactions Table here -->
    <div>
      <vendor-transaction />
    </div>
  </div>
</template>

<script>
import vendorTransaction from "~/components/tables/vendor-transaction";
import totalBalance from "~/components/icons/total-balance.vue";
let screenLoading;

export default {
  layout: "dashboard",

  data: () => ({
    loading: false,
    allVendors: []
  }),

  components: {
    vendorTransaction,
    totalBalance
  },

  created() {
    this.fetchAllVendors();
  },

  methods: {
    async fetchAllVendors() {
      try {
        this.openScreen();
        this.loading = true;
        const response = await this.$axios.get("/vendors");

        console.log("allendors:::", response);

        if (response.status == "success") {
          screenLoading.close();
          this.loading = false;
          this.allVendors = response.data;
        }
      } catch (error) {
        this.loading = false;
        screenLoading.close();
      }
    },

    openScreen() {
      screenLoading = this.$loading({
        lock: true,
        spinner: "el-icon-loading",
        background: "#0000009b"
      });
    }
  }
};
</script>

<style scoped>
.main {
  height: calc(100vh - 72px);
  overflow-y: scroll;
}

.viewall {
  color: var(--primary-color);
  font-size: 0.875rem;
  text-decoration: none;
}

.card__holder {
  background: #ffffff;
  box-shadow: 0px 4px 25px rgba(174, 174, 192, 0.15);
  border-radius: 10px;
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
</style>
