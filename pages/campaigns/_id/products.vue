<template>
  <div class="main container transparent pb-5">
    <div class="pt-4 pb-2">
      <back text="Go Back" @click="$router.go(-1)" />
    </div>

    <div class="row pt-4 mt-2">
      <div class="col-lg-8">
        <div class="row">
          <div class="col-lg-5">
            <!-- Search Box here -->
            <div class="position-relative">
              <input
                type="text"
                class="form-controls search"
                placeholder="Search product..."
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
    <div class=" mt-4">
      <div v-if="$fetchState.pending" class="text-center loader mb-5"></div>

      <!-- Products here -->
      <div v-else-if="resultQuery.length">
        <div class="row">
          <div class="col-lg-10">
            <div class="row pt-3">
              <!-- Product list here -->
              <div
                class="col-lg-6"
                v-for="(product, i) in resultQuery"
                :key="i"
              >
                <div class="product-tag mb-3 px-4 py-3">
                  <div class="row">
                    <!-- Product tag here -->
                    <div class="col-lg-4">
                      <div class="mb-3">
                        <span
                          class="primary-gray text-xs"
                          style="text-transform: uppercase"
                        >
                          {{ product.type }} TAG</span
                        >
                        <h6 class="word-content primary-blue font-bold">
                          {{ product.tag | capitalize }}
                        </h6>
                      </div>
                      <!-- product cost here -->
                      <div>
                        <span
                          class="primary-gray text-xs"
                          style="text-transform: uppercase"
                        >
                          {{ product.type }} COST</span
                        >
                        <h6 class="word-content primary-blue  font-bold">
                          NGN {{ product.cost | formatCurrency }}
                        </h6>
                      </div>
                    </div>

                    <!-- Vendors here -->
                    <div class="col-lg-5">
                      <div class="mb-3">
                        <span class="primary-gray text-xs">VENDOR(s)</span>
                        <!-- <h6
                  class="word-content tertiary-black font-bold"
                  v-for="(vendor, i) in product.vendors"
                  :key="i + 'vendor'"
                >
                  {{ findVendor(vendor) }}
                </h6> -->
                      </div>
                    </div>

                    <!-- Delete actions here -->
                    <div class="col-lg-3" style="align-self: center">
                      <div class="mb-3 d-flex">
                        <!-- Edit button here -->
                        <div>
                          <button
                            class="actions"
                            type="button"
                            @click="editProduct(product)"
                          >
                            <img
                              src="~/assets/img/vectors/prod-edit.svg"
                              alt="edit"
                            />
                          </button>
                        </div>

                        <!-- Delete button here -->
                        <div class="ml-2">
                          <button
                            class="actions"
                            type="button"
                            @click="deleteProduct(product)"
                          >
                            <img
                              src="~/assets/img/vectors/red-bin.svg"
                              alt="bin"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h3 v-else class="text-center no-record">NO RECORD FOUND</h3>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
let screenLoading;

export default {
  layout: "dashboard",

  data() {
    return {
      searchQuery: "",
      products: []
    };
  },

  computed: {
    ...mapGetters("authentication", ["user"]),
    resultQuery() {
      if (this.searchQuery) {
        return this.products.filter(product => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every(v => product && product.tag.toLowerCase().includes(v));
        });
      } else {
        return this.products;
      }
    }
  },

  async fetch() {
    const id = this.user?.AssociatedOrganisations[0]?.OrganisationId;
    const response = await this.$axios.get(
      `organisations/${id}/campaigns/${this.$route.params.id}/products`
    );

    this.products = response.data;
  },

  methods: {
    editProduct(product) {
      console.log("edit product", product);
    },

    deleteProduct(product) {
      console.log("delete product", product);
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

.form-controls {
  height: 50px;
}

.product-tag {
  background: #ffffff;
  border: 1px solid #e1e7ec;
  border-radius: 10px;
  height: 146px;
}

button.actions {
  background: inherit;
  border: none;
}
</style>
