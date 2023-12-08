<template>
  <div class="main container transparent pb-5">
    <!-- Top cards here -->
    <div class="row pt-4">
      <!-- Vendors here -->
      <div class="col-lg-3">
        <div class="card__holder p-3">
          <div class="d-flex">
            <img src="~/assets/img/vectors/shop.svg" alt="shop" />

            <div v-if="$fetchState.pending" class="ml-3 w-50">
              <Skeleton class="mb-2" />
              <Skeleton />
            </div>

            <div v-else class="ml-3">
              <p class="text">Vendors</p>
              <h4 class="funds">
                {{ totalVendors || 0 }}
              </h4>
            </div>
          </div>
        </div>
      </div>

      <!-- Daily transactions here -->
      <div class="col-lg-3">
        <div class="card__holder d-flex p-3">
          <img
            src="~/assets/img/vectors/daily-transactions.svg"
            alt="deposit"
          />

          <div v-if="$fetchState.pending" class="ml-3 w-50">
            <Skeleton class="mb-2" />
            <Skeleton />
          </div>

          <template v-else>
            <div class="ml-3">
              <p class="text">Transactions</p>
              <h4 class="funds">
                {{ transactionsCount || 0 }}
              </h4>
            </div>

            <div class="ml-auto d-flex align-items-end">
              <button
                type="button"
                class="d-flex viewall align-items-center"
                @click="$router.push('/vendors/transactions')"
              >
                <img src="~/assets/img/vectors/eye.svg" alt="see" />
                <span class="ml-2">View </span>
              </button>
            </div>
          </template>
        </div>
      </div>

      <!--  Transaction value here -->
      <div class="col-lg-3">
        <div class="card__holder d-flex p-3">
          <IconsTotalBalance />

          <div v-if="$fetchState.pending" class="ml-3 w-50">
            <Skeleton class="mb-2" />
            <Skeleton />
          </div>

          <div v-else class="ml-3">
            <p class="text">Transaction value</p>
            <h4 class="funds">
              {{ totalProductValue || 0 | formatCurrency }}
            </h4>
          </div>
        </div>
      </div>

      <!-- Products sold -->
      <div class="col-lg-3">
        <div class="card__holder d-flex p-3">
          <img src="~/assets/img/vectors/products.svg" alt="product" />

          <div v-if="$fetchState.pending" class="ml-3 w-50">
            <Skeleton class="mb-2" />
            <Skeleton />
          </div>

          <div v-else class="ml-3">
            <p class="text">Products sold</p>
            <h4 class="funds">
              {{ totalProductsSold || 0 }}
            </h4>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-2">
      <TablesVendorsAll @updateVendors="updateVendors" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Vendors",

  layout: "dashboard",

  data: () => ({
    loading: false,
    orgId: "",
    summary: {},
    transactionsCount: "",
    totalProductValue: "",
    totalProductsSold: "",
    totalVendors: 0,
  }),

  async fetch() {
    try {
      const orgId = this.user?.AssociatedOrganisations[0]?.OrganisationId;

      const [summaryResponse, totalProductResponse] = await Promise.all([
        this.$axios.get(`organisations/${orgId}/vendors/summary`),
        this.$axios.get(`orders/total-sold-value/${orgId}`),
      ]);

      if (summaryResponse.status === "success") {
        const summaryData = summaryResponse.data;
        this.summary = summaryData?.today_stat;
        this.transactionsCount = summaryData?.Transactions.length;
      }

      if (totalProductResponse.status === "success") {
        this.loading = false;
        const totalProductData = totalProductResponse.data;
        this.totalProductsSold = totalProductData?.total_product_sold;
        this.totalProductValue = totalProductData?.total_product_value;
      }
    } catch (err) {
      this.loading = false;
      console.error(err);
    }
  },

  computed: {
    ...mapGetters("authentication", ["user"]),
  },

  methods: {
    updateVendors(total) {
      this.totalVendors = total;
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
  box-shadow: 0px 4px 25px rgba(174, 174, 192, 0.15);
  border-radius: 10px;
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
