<template>
  <div class="mr-4">
    <!-- Transactions Table here -->
    <div class="holder">
      <div class="d-flex px-4 pt-3">
        <div>
          <h4 class="header">All Products</h4>
        </div>

        <div class="ml-auto d-flex filter">
          <p>Sort by:</p>
          <div class="mx-2">
            <select name="" id="">
              <option value="gender">Highest</option>
            </select>
          </div>
        </div>
      </div>
      <table class="table table-borderless">
        <thead>
          <tr>
            <th scope="col">Product Name</th>
            <th scope="col">Vendor</th>
            <th scope="col">Sales Volume</th>
            <th scope="col">Total Revenue</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.name }}</td>
            <td>Dangote Flour</td>
            <td>{{ product.quantity | formatCount }}</td>
            <td>$ {{ product.price | formatCurrency }}</td>
            <td>
              <button type="button" class="more-btn"><dot /></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import dot from "~/components/icons/dot";
export default {
  components: {
    dot,
  },

  data: () => ({
    loading: false,
    products: [],
  }),

  mounted() {
    this.fetchProducts();
  },

  methods: {
    async fetchProducts() {
      try {
        this.loading = true;
        const response = await this.$axios.get("/vendors/products/all");
        if ((response.data.code = 200)) {
          this.loading = false;
          this.products = response.data.data;
        }
        console.log("response", response);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
.header {
  color: var(--secondary-black);
  font-weight: 700;
  font-size: 1.125rem;
}
.filter {
  color: #4f4f4f;
  font-size: 1rem;
  font-weight: 500;
}
select {
  border: none;
  color: var(--secondary-black);
}
select:focus {
  outline: none;
}
.holder {
  background: #ffffff;
  box-shadow: 0px 4px 30px rgba(174, 174, 192, 0.2);
  border-radius: 10px;
  margin-top: 30px;
}

.table thead th {
  color: #4f4f4f;
  letter-spacing: 0.01em;
  font-size: 1rem;
  font-weight: 700;
}
.table th,
.table td {
  padding: 0.75rem 2rem;
  color: var(--secondary-black);
  font-size: 1rem;
}
::placeholder {
  color: #999999;
  font-size: 1rem;
}
</style>
