<template>
  <div>
    <div class="main container transparent pb-5">
      <div class="pt-4 mt-2">
        <back text="Go Back" @click="$router.go(-1)" />
      </div>

      <div class="row pt-4">
        <div class="col-lg-8">
          <!-- Top cards here -->
          <div class="row">
            <!-- Total amount Received here -->
            <div class="col-lg-4">
              <div class="card__holder d-flex p-3">
                <img src="~/assets/img/vectors/deposit.svg" alt="deposit" />

                <div v-if="loading" class="ml-3 w-50">
                  <Skeleton class="mb-2" />
                  <Skeleton />
                </div>

                <div v-else class="ml-3">
                  <p class="text">Total Recieved</p>
                  <h4 class="funds" :title="totalReceived">
                    {{ $truncate(totalReceived) }}
                  </h4>
                </div>
              </div>
            </div>

            <!--  Amount Disbursed here -->
            <div class="col-lg-4">
              <div class="card__holder d-flex p-3">
                <img src="~/assets/img/vectors/spent.svg" alt="spent" />

                <div v-if="loading" class="ml-3 w-50">
                  <Skeleton class="mb-2" />
                  <Skeleton />
                </div>

                <div v-else class="ml-3">
                  <p class="text">Total Spent</p>
                  <h4 class="funds" :title="totalSpent">
                    {{ $truncate(totalSpent) }}
                  </h4>
                </div>
              </div>
            </div>

            <!-- Total Balance -->
            <div class="col-lg-4">
              <div class="card__holder d-flex p-3">
                <IconsTotalBalance />

                <div v-if="loading" class="ml-3 w-50">
                  <Skeleton class="mb-2" />
                  <Skeleton />
                </div>

                <div v-else class="ml-3">
                  <p class="text">Total Remaining</p>
                  <h4 class="funds" :title="totalRemaining">
                    {{ $truncate(totalRemaining) }}
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <!-- Campaigns here -->
          <div class="mt-3">
            <TablesVendorsProducts
              :loading="loading"
              :products="products"
              :name="`${vendor.first_name} ${vendor.last_name}`"
              :productsPageNum="productsPageNum"
              :productsTotalItems="productsTotalItems"
              @updatePage="updateProductsPage"
            />
          </div>
        </div>

        <!-- Personal details here -->
        <div class="col-lg-4">
          <SkeletonSingleCard v-if="loading" />
          <TablesVendorsDetails v-else :user="vendor" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "VendorInfo",

  layout: "dashboard",

  data: () => ({
    id: "",
    loading: false,
    vendor: {},
    products: [],

    productsPageNum: 1,
    productsTotalItems: 0,
  }),

  computed: {
    ...mapGetters("authentication", ["user"]),

    totalReceived() {
      return `${this.$root.$options.filters.formatCurrency(
        this.vendor.total_received
      )}`;
    },

    totalSpent() {
      return `${this.$root.$options.filters.formatCurrency(
        this.vendor.total_spent
      )}`;
    },

    totalRemaining() {
      const balance = this.vendor.total_received - this.vendor.total_spent;
      return `${this.$root.$options.filters.formatCurrency(balance)}`;
    },
  },

  mounted() {
    this.id = this.user?.AssociatedOrganisations[0]?.OrganisationId;
    this.getDetails();
  },

  methods: {
    updateProductsPage(action) {
      this.productsPageNum =
        action === "prev" ? this.productsPageNum - 1 : this.productsPageNum + 1;

      this.getDetails();
    },

    async getDetails() {
      try {
        this.loading = true;
        const response = await this.$axios.get(
          `organisations/${this.id}/vendors/${this.$route.params.id}?page=${this.productsPageNum}&size=10`
        );

        if (response.status === "success") {
          this.vendor = response.data;
          this.products = response.data.products.data.reverse();
        }

        this.productsPageNum = response.data.products?.currentPage;
        this.productsTotalItems = response.data.products?.totalItems;
      } catch (err) {
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.main {
  height: calc(100vh - 72px);
  overflow-y: scroll;
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
}
</style>
