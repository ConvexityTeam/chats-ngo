<template>
    <div>
        <div class="row pt-4">
            <div class="col-lg-8">
                <div class="row">
                    <div class="col-lg-5">
                        <!-- Search Box here -->
                        <div class="position-relative">
                            <input
                                type="text"
                                class="form-controls search"
                                placeholder=" Search products..."
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
        </div>

        <!-- Table here -->
        <div class="table-holder mt-4">
            <div
                v-if="products.length"
                class="flex align-items-center table-title"
            >
                <h4>All products</h4>
                <div class="ml-auto"></div>
            </div>
            <table class="table table-borderless" v-if="resultQuery.length">
                <thead>
                    <tr>
                        <th scope="col">Product Name</th>
                        <th scope="col">Vendor</th>
                        <th scope="col">Sales Volume</th>
                        <th scope="col">Total Revenue</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(product, i) in resultQuery"
                        :key="product.i"
                        :class="{ selected: i % 2 == 0 }"
                    >
                        <td>{{ product.product_name }}</td>
                        <td>
                            {{ product.vendor_name }}
                        </td>
                        <td>{{ product.sales_volume | formatCount }}</td>
                        <td>
                            {{ $currency }}
                            {{ product.total_revenue | formatCurrency }}
                        </td>
                        <td>
                            <button type="button" class="more-btn">
                                <dot />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-else-if="loading" class=" text-center"></div>
            <h3 v-else class="text-center no-record">NO RECORD FOUND</h3>
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
        searchQuery: "",
        products: [],
    }),

    computed: {
        resultQuery() {
            if (this.searchQuery) {
                return this.products.filter((product) => {
                    return this.searchQuery
                        .toLowerCase()
                        .split(" ")
                        .every(
                            (v) =>
                                product &&
                                product.name &&
                                product.name.toLowerCase().includes(v)
                        );
                });
            } else {
                return this.products;
            }
        },
    },

    mounted() {
        this.fetchProducts();
    },

    methods: {
        async fetchProducts() {
            try {
                this.loading = true;
                const response = await this.$axios.get("/vendors/products/all");
                if (response.status == "success") {
                    this.loading = false;
                    this.products = response.data;
                }
                console.log("response", response);
            } catch (err) {
                this.loading = false;
                console.log(err);
            }
        },
    },
};
</script>
