<template>
  <div class="main">
    <!-- Top cards here -->
    <div class="row no-gutters pt-lg-4">
      <!-- Beneficiaries here -->
      <div class="col-lg-3">
        <div class="card__holder px-3 pt-2">
          <p class="text">Vendors</p>
          <h4 class="funds">{{ loading ? "0" : allVendors }}</h4>
          <p class="pb-2">
            <nuxt-link to="/vendors/all-vendors" class="percentage">
              View all
            </nuxt-link>
          </p>
        </div>
      </div>

      <!-- Daily Transactions here -->
      <div class="col-lg-3">
        <div class="card__holder px-3 pt-2">
          <p class="text">Daily Transactions</p>
          <h4 class="funds pb">23</h4>
        </div>
      </div>

      <!-- Transaction value here -->
      <div class="col-lg-3">
        <div class="card__holder px-3 pt-2">
          <p class="text">Transaction Value</p>
          <h4 class="funds pb">$125,000/N120,000</h4>
        </div>
      </div>

      <!-- Products Sold Here -->
      <div class="col-lg-3">
        <div class="card__holder px-3 pt-2">
          <p class="text">Products Sold</p>
          <h4 class="funds pb">2600</h4>
        </div>
      </div>
    </div>

    <!-- Vendor Transactions Table here -->
    <div class="no-gutters mr-4">
      <vendorTransaction />
    </div>
  </div>
</template>

<script>
import vendorTransaction from "~/components/tables/vendor-transaction";
export default {
  layout: "dashboard",

  data: () => ({
    loading: false,
    allVendors: "",
  }),

  components: {
    vendorTransaction,
  },

  created() {
    this.fetchAllVendors();
  },

  methods: {
    async fetchAllVendors() {
      try {
        this.loading = true;
        const response = await this.$axios.get("/vendors");

        if (response.data.code == 200) {
          this.loading = false;
          this.allVendors = response.data.data.length;
        }
      } catch (error) {}
    },
  },
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
  box-shadow: 0px 4px 30px rgba(174, 174, 192, 0.2);
  border-radius: 10px;
  width: 246px;
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

.funds.pb {
  padding-bottom: 35px;
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
