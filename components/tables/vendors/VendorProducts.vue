<template>
  <div>
    <div class="row pt-4 mt-2">
      <div class="col-lg-8">
        <div class="row">
          <div class="col-lg-8">
            <!-- Search Box here -->
            <div class="position-relative">
              <input
                type="text"
                class="form-controls search"
                placeholder="Search products..."
                v-model="searchQuery"
              />
              <img
                src="~/assets/img/vectors/search.svg"
                class="search-icon position-absolute"
                alt="search"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="ml-auto mx-3">
        <csv :data="computedData" :name="`${name} products`" />
      </div>
    </div>

    <!-- Table here -->
    <div class="table-holder mt-4">
      <div class="flex align-items-center table-title">
        <h4>Products</h4>
        <div class="ml-auto"></div>
      </div>

      <table class="table table-borderless" v-if="resultQuery.length">
        <thead>
          <tr>
            <th scope="col">Tag</th>
            <th scope="col">Type</th>
            <th scope="col">Cost</th>
            <th scope="col">Created</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="product in resultQuery" :key="product.id">
            <td class="campaign-title">{{ product.tag }}</td>
            <td class="px-2">
              <div
                class="status w-50"
                :class="{
                  progress: product.type === 'item',
                  pending: product.type === 'service',
                  completed: product.type === 'product',
                }"
              >
                <span class="px-3"> {{ product.type | capitalize }}</span>
              </div>
            </td>

            <td>{{ product.cost | formatCurrency }}</td>
            <td>{{ product.createdAt | formatDate }}</td>
          </tr>
        </tbody>
      </table>

      <h3 v-else class="text-center no-record">NO RECORD FOUND</h3>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: {
    products: {
      type: Array,
      default: () => [],
    },
    name: {
      type: String,
      default: "",
    },
  },

  data: () => ({
    searchQuery: "",
  }),

  mounted() {
    console.log("products", this.products);
  },

  computed: {
    resultQuery() {
      if (this.searchQuery) {
        const data = this.products ? this.products : [];
        return data.filter((product) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => product.tag.toLowerCase().includes(v));
        });
      } else {
        return this.products;
      }
    },
    computedData() {
      return this.products.map((product) => {
        return {
          Tag: product.tag,
          Type: product.type,
          Cost: product.cost,
          Created: moment(product.createdAt).format(" MMMM DD, YYYY"),
        };
      });
    },
  },
};
</script>

<style scoped>
.campaign-title {
  max-width: 10rem;
}
.filter {
  top: 12px;
  left: 11px;
}
select {
  border-left: 0px;
  padding-left: 40px;
  box-shadow: none;
}

.main {
  height: calc(100vh - 72px);
  overflow-y: scroll;
}

.create {
  background: var(--primary-color);
}

::placeholder {
  color: #999999;
  font-size: 1rem;
}

.form-controls {
  height: 50px;
}

select.form-control {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  height: 50px;
  border-radius: 10px;
}

.create {
  border-radius: 10px;
  color: white;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  height: 50px;
}
</style>
