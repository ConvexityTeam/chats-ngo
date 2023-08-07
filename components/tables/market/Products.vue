<template>
  <div class="proposal-details-holder p-4">
    <h4 class="proposal-details-header poppins pt-2 mb-4">Products</h4>

    <div v-if="products.length">
      <div
        v-for="(product, i) in products"
        :key="i"
        class="mb-4 product-container"
        :class="{ odd: i % 2 !== 0 }"
      >
        <div class="row">
          <!-- Product tag here -->
          <div class="col-lg-6">
            <div class="mb-4">
              <span class="d-block primary-gray text-xs pb-2 text-uppercase">
                Product name
              </span>
              <h6 class="word-content primary-blue font-medium mb-0">
                {{ product.tag | capitalize }}
              </h6>
            </div>

            <!-- product cost here -->
            <div>
              <span class="d-block primary-gray text-xs pb-2 text-uppercase">
                UNIT COST
              </span>

              <h6 class="word-content primary-blue font-medium mb-0">
                {{ product.cost | formatCurrency }}
              </h6>
            </div>
          </div>

          <!-- quantity here -->
          <div class="col-lg-6">
            <div>
              <span class="d-block primary-gray text-xs pb-2 text-uppercase">
                Quantity
              </span>

              <h6 class="word-content primary-blue font-medium mb-0">
                {{ product.quantity | formatNumber }}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h3 v-else class="no-record text-center no-record">NO RECORD FOUND</h3>
  </div>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.product-container {
  display: flex;
  padding: 16px 12px;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
  border-radius: 10px;
  border: 1px solid var(--secondary-greeen-1, #35c78a);
  background: var(--white, #fff);
}

.proposal-details-header {
  color: #25396f;
  font-weight: bold;
  font-size: 1.125rem;
}

.proposal-details-inner {
  border: 1px solid #17ce89;
  border-radius: 10px;
  position: relative;
}

.proposal-captions {
  color: #25396f;
  font-family: "Poppins", sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
}

.proposal-answers {
  color: #25396f;
  font-size: 0.875rem;
  text-align: right;
}

.proposal-divider {
  border-bottom: 1px solid #f5f6f8;
}
.el-dropdown-menu {
  padding: 1rem 0rem;
  border-radius: 0.5rem;
  width: 18rem;
}
.el-dropdown-menu > .el-dropdown-item > span {
  font-family: "DM Sans";
  width: 100%;
  display: block;
  font-size: 1rem;
  padding: 0.2rem;
  border-bottom: 0.2px solid #f5f6f8;
  color: #25396f;
  text-align: left;
  cursor: pointer;
}
</style>
