<template>
  <div class="main container transparent pb-5">
    <div class="pt-4 pb-2">
      <back text="Go Back" @click="$router.go(-1)" />
    </div>

    <!-- Modal here -->
    <div>
      <Modal id="edit-product" :title="`Edit ${activeProduct.type}`">
        <editProduct :product="activeProduct" @product-updated="$fetch" />
      </Modal>

      <Modal id="delete-product" :title="`Delete ${activeProduct.type}`">
        <deleteProduct :product="activeProduct" @product-deleted="$fetch" />
      </Modal>
    </div>

    <!-- Search Region here -->
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
    <div class="mt-4">
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
                      <div class="mb-2">
                        <span
                          class="primary-gray text-xs"
                          style="text-transform: uppercase"
                        >
                          category</span
                        >
                        <h6 class="word-content primary-blue font-medium pt-1">
                          {{ product.product_category | capitalize }}
                        </h6>
                      </div>

                      <div class="mb-2">
                        <span
                          class="primary-gray text-xs"
                          style="text-transform: uppercase"
                        >
                          {{ product.type }} TAG</span
                        >
                        <h6 class="word-content primary-blue font-medium pt-1">
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
                        <h6 class="word-content primary-blue font-medium pt-1">
                          {{ $currency }}{{ product.cost | formatCurrency }}
                        </h6>
                      </div>
                    </div>

                    <!-- Vendors here -->
                    <div class="col-lg-5">
                      <div class="mb-2">
                        <span class="primary-gray text-xs">
                          {{
                            product.ProductVendors.length == 1
                              ? "VENDOR"
                              : "VENDORS"
                          }}
                        </span>

                        <h6
                          class="word-content primary-blue font-medium"
                          :class="{ 'pt-1': i === 0 }"
                          v-for="(vendor, i) in product.ProductVendors.slice(
                            0,
                            3
                          )"
                          :key="i + 'vendor'"
                        >
                          {{ vendor.VendorName }}
                        </h6>
                      </div>
                    </div>

                    <!-- Delete actions here -->
                    <div class="col-lg-3" style="align-self: center">
                      <div class="mb-2 d-flex">
                        <!-- Edit button here -->
                        <div>
                          <button
                            class="actions"
                            type="button"
                            @click="handleAction('edit', product)"
                          >
                            <img
                              src="~/assets/img/vectors/prod-edit.svg"
                              alt="edit"
                            />
                          </button>
                        </div>

                        <!-- :disabled="
                              statuses.includes(product.campaign_status)
                            " -->

                        <!-- Delete button here -->
                        <div class="ml-2">
                          <button
                            class="actions"
                            type="button"
                            @click="handleAction('delete', product)"
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
import editProduct from "~/components/forms/edit-product.vue";
import deleteProduct from "~/components/forms/delete-product.vue";

export default {
  name: "Campaign Products",
  layout: "dashboard",
  components: { editProduct, deleteProduct },

  data() {
    return {
      orgId: "",
      searchQuery: "",
      products: [],
      activeProduct: {},
      statuses: ["ongoing", "active", "completed"],
    };
  },

  computed: {
    ...mapGetters("authentication", ["user"]),
    resultQuery() {
      if (this.searchQuery) {
        return this.products.filter((product) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => product && product.tag.toLowerCase().includes(v));
        });
      } else {
        return this.products;
      }
    },
  },

  async fetch() {
    this.orgId = this.user?.AssociatedOrganisations[0]?.OrganisationId;
    const response = await this.$axios.get(
      `organisations/${this.orgId}/campaigns/${this.$route.params.id}/products`
    );
    this.products = response.data;
  },

  methods: {
    handleAction(action, product) {
      this.activeProduct = product;
      this.$bvModal.show(`${action}-product`);
    },
  },
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
  height: 190px;
}

button.actions {
  background: inherit;
  border: none;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
