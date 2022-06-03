<template>
  <div class="d-flex">
    <div v-if="$fetchState.pending"></div>
    <!-- form here -->
    <div class="" v-else-if="Object.keys(payload).length">
      <div class="pt-2 pb-3 w-75 text-center m-auto">
        <span class="font-medium primary-gray">
          Select product or services and assign vendors and price tags.
        </span>
      </div>

      {{ payload.ProductVendors }}

      <form class="px-3">
        <!-- product/service here -->
        <div class="mb-3">
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

        <!-- Tag here -->
        <div class="mb-3">
          <label for="tag">Tag</label>
          <div class="w-100">
            <input
              type="text"
              class="form"
              :class="{ error: $v.payload.tag.$error }"
              id="tag"
              :placeholder="
                `Enter ${
                  !payload.type ? 'product or service' : payload.type
                }  name`
              "
              v-model="payload.tag"
              @blur="$v.payload.tag.$touch()"
            />
          </div>
        </div>

        <!-- Cost here -->
        <div class="mb-3">
          <label for="cost">Cost</label>
          <div class="w-100">
            <input
              type="number"
              class="form"
              :class="{ error: $v.payload.cost.$error }"
              id="cost"
              placeholder="NGN 0.00"
              v-model="payload.cost"
              @blur="$v.payload.cost.$touch()"
            />
          </div>
        </div>

        <!-- Vendor here -->
        <div class="mb-3">
          <label for="vendor">Vendor</label>
          <div id="product" class="w-100">
            <el-select
              v-model="payload.ProductVendors"
              id="vendor"
              placeholder="—Select — "
              multiple
            >
              <el-option
                v-for="(vendor, i) in allVendors"
                :key="vendor.id + i"
                :label="vendor.first_name + ' ' + vendor.last_name"
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
            :disabled="!isComplete"
            @click="createProduct"
          />
        </div>
      </form>
    </div>
    <div v-else></div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import noProducts from "~/components/icons/no-products.vue";
import { mapActions, mapGetters } from "vuex";
let screenLoading;

const greaterThanZero = value => value >= 0;

export default {
  props: {
    product: {
      type: Object,
      default: () => {}
    }
  },

  async fetch() {
    const response = await this.$axios.get(
      `products/${this.product?.id}/product/${this.product?.CampaignId}`
    );

    if (response.status == "success") {
      this.payload = response.data;
    }

    console.log("SINGLE PRD:::", response);
  },

  data: () => ({
    options: ["product", "service"],
    isEdit: false,
    isSuccessful: false,
    products: [],
    orgId: "",

    payload: {
      // type: "",
      // tag: "",
      // cost: "",
      // vendors: []
    }
  }),

  validations: {
    payload: {
      type: {
        required
      },

      tag: {
        required
      },

      cost: {
        required,
        greaterThanZero
      },

      vendors: {
        required
      }
    }
  },

  components: { noProducts },

  mounted() {
    (this.orgId = this.user.AssociatedOrganisations[0].OrganisationId),
      this.getallVendors(this.orgId);
    console.log("computedVendors", this.computedVendors);
    console.log("AVAIL", this.payload?.ProductVendors);
  },

  computed: {
    ...mapGetters("authentication", ["user"]),
    ...mapGetters("vendors", ["allVendors"]),

    computedVendors() {
      // return only the vendors whose id is not in payload.vendors
      return this.allVendors.filter(vendor => {
        return this.payload.ProductVendors;
        // return !this.payload?.ProductVendors?.includes(vendor.id) ?? "";
      });
    },

    isComplete() {
      // return (
      //   this.payload.type &&
      //   this.payload.tag &&
      //   this.payload.cost &&
      //   this.payload.vendors.length
      // );

      return false;
    }
  },

  methods: {
    ...mapActions("vendors", ["getallVendors"]),
    findVendor(id) {
      const vendors = this.allVendors.length ? this.allVendors : [];
      const foundVendor = vendors.filter(vendor => vendor.id === id);
      return foundVendor[0].first_name + " " + foundVendor[0].last_name;
    },
    createProduct() {
      this.$v.payload.$touch();
      console.log("PL:", this.payload);
      if (this.$v.payload.$error === true) {
        return this.$toast.error("Please fill in appropriately");
      }

      if (this.isEdit) {
        this.products[this.payload] = this.payload;
        this.payload = {
          type: "",
          tag: "",
          cost: "",
          vendors: []
        };
        return (this.isEdit = false);
      }

      this.products.push(this.payload);
      this.payload = {
        type: "",
        tag: "",
        cost: "",
        vendors: []
      };
      this.isEdit = false;
    },
    async saveProductTags() {
      try {
        console.log("PRODUCTS::", this.products);
        this.openScreen();
        this.loading = true;

        const response = await this.$axios.post(
          `/organisations/${this.orgId}/campaigns/${this.$route.params.id}/products`,

          this.products
        );

        if (response.status == "success") {
          this.$emit("close");
          screenLoading.close();
          this.$toast.success(response.message);
        }

        console.log("SAVE TAG RESPONSE::", response);
      } catch (err) {
        console.log("SAVE TAG ERR::", err);
        screenLoading.close();
        this.$toast.error(err.response.data?.message);
      }
    },

    editProduct(product) {
      this.isEdit = true;
      this.payload = product;
    },
    deleteProduct(product) {
      const index = this.products.indexOf(product);
      if (index > -1) {
        if (this.isEdit) {
          this.payload = {
            type: "",
            tag: "",
            cost: "",
            vendors: []
          };
        }
        this.isEdit = false;
        this.products.splice(index, 1);
      }
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
