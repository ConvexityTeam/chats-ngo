<template>
  <div>
    <div v-if="$fetchState.pending" class="loader mx-auto my-5"></div>

    <!-- form here -->
    <div v-else-if="Object.keys(payload).length">
      <form class="mt-5 px-3">
        <!-- product/service here -->
        <div class="mb-3" v-if="!isItem">
          <label for="product">Product / Service</label>
          <div id="product" class="w-100">
            <el-select
              v-model="payload.type"
              id="product"
              placeholder="—Select — "
            >
              <el-option
                v-for="item in options"
                :key="item"
                :label="item | capitalize"
                :value="item"
              >
              </el-option>
            </el-select>
          </div>
        </div>

        <!-- Category here -->
        <div class="mb-3" v-if="!isItem">
          <label for="product">Category</label>
          <div id="product" class="w-100">
            <el-select
              v-model="payload.product_category"
              id="product"
              placeholder="—Select — "
            >
              <el-option
                v-for="item in categories"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </div>
        </div>

        <!-- Tag here -->
        <div class="mb-3">
          <label for="tag">Tag</label>
          <div class="w-100">
            <input
              type="text"
              class="form"
              id="tag"
              :placeholder="`Enter ${
                !payload.type ? 'product or service' : payload.type
              }  name`"
              v-model="payload.tag"
            />
          </div>
        </div>

        <!-- Cost here -->
        <div class="mb-3" v-if="!isItem">
          <label for="cost">Cost</label>
          <div class="w-100">
            <input
              type="number"
              class="form"
              id="cost"
              placeholder="NGN 0.00"
              v-model="payload.cost"
            />
          </div>
        </div>

        <!-- Vendor here -->
        <div class="mb-3">
          <label for="vendor">
            {{ payload.ProductVendors.length === 1 ? "Vendor" : "Vendors" }}
          </label>
          <div id="product" class="w-100">
            <el-select
              v-model="vendorIds"
              id="vendor"
              placeholder="—Select — "
              multiple
              disabled
            >
              <el-option
                v-for="vendor in payload.ProductVendors"
                :key="vendor.id"
                :label="vendor.VendorName"
                :value="vendor.id"
              >
              </el-option>
            </el-select>
          </div>
        </div>

        <!-- Create button here -->
        <div class="pt-1 pb-3">
          <Button
            text="Save"
            custom-styles="height:41px; border-radius: 5px; padding: 0px 20px !important; width: 100% !important"
            :has-border="false"
            :has-icon="false"
            :loading="loading"
            :disabled="loading"
            @click="saveProduct"
          />
        </div>
      </form>
    </div>
    <div v-else class="no-record text-center">Data not found</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { categories } from "~/utils/helpers";

export default {
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    ...mapGetters("authentication", ["user"]),

    isItem() {
      return this.product?.type === "item";
    },
  },

  data: () => ({
    categories,
    loading: false,
    options: ["product", "service"],
    orgId: "",
    payload: {},
    vendorIds: [],
  }),

  async fetch() {
    const response = await this.$axios.get(
      `products/${this.product?.id}/product/${this.product?.CampaignId}`
    );

    if (response.status == "success") {
      this.payload = response.data;
      this.vendorIds = this.payload?.ProductVendors?.map((vendor) => vendor.id);
    }
    console.log("SINGLE PRD:::", response);
  },

  mounted() {
    this.orgId = this.user?.AssociatedOrganisations[0]?.OrganisationId;
  },

  methods: {
    async saveProduct() {
      try {
        this.loading = true;
        const response = await this.$axios.post(
          `organisations/product/${this.orgId}/${this.$route.params.id}/update`,
          {
            ProductId: this.payload?.id,
            tag: this.payload?.tag,
            cost: this.payload?.cost,
            type: this.payload?.type,
            product_category: this.payload?.product_category,
          }
        );

        if (response.status == "success") {
          this.$bvModal.hide("edit-product");
          this.$toast.success(response.message);
          this.$emit("product-updated");
        }

        console.log("UPDATERESPONSE:;", response);
      } catch (error) {
        console.log("ERROR:::", error);
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

button.actions {
  background: inherit;
  border: none;
}

div.vl {
  border-left: 1px solid #7c8db5;
  height: 100vh;
}

label {
  font-size: 1rem;
  color: var(--primary-blue);
  font-weight: 500;
  letter-spacing: 0.01em;
  margin-bottom: 0.25rem;
}

.form {
  height: 41px;
  border: 1px solid #7c8db5;
  box-sizing: border-box;
  border-radius: 5px;
  color: #222222;
  background: inherit;
  width: 100%;
  transition: all 0.3s ease;
  padding: 0rem 1rem;
  font-weight: 500;
  font-size: 1rem;
}

.form.error {
  border: 1px #ee3934 !important;
  border-style: solid solid double solid !important;
}

.form:focus {
  border: 1px solid var(--primary-color) !important;
  outline: none;
}

.form::placeholder {
  letter-spacing: 0.01em;
  font-size: 0.875rem;
  color: #646a86;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
