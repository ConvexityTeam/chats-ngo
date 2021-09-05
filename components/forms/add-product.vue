<template>
  <div class="d-flex ">
    <div class="w-50 p-5">
      <div class="mt-2 mb-4">
        <h3 class="tertiary-black font-bold">Add Product / Service</h3>
        <span class="font-medium primary-gray ">
          Select product or services and assign vendors and price tags.
        </span>
      </div>

      <!-- product/service here -->
      <div class="mb-3">
        <label for="product">Product / Service</label>
        <div id="product" class="w-100">
          <el-select
            v-model="payload.product"
            id="product"
            placeholder="—Select — "
          >
            <el-option
              v-for="item in options"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </div>
      </div>

      <!-- Tag here -->
      <div class="mb-3 ">
        <label for="tag">Tag</label>
        <div class="w-100">
          <input
            type="text"
            class="form"
            :class="{ error: $v.payload.tag.$error }"
            id="tag"
            :placeholder="
              `Enter ${
                !payload.product ? 'product or service' : payload.product
              }  name`
            "
            v-model="payload.tag"
            @blur="$v.payload.tag.$touch()"
          />
        </div>
      </div>

      <!-- Cost here -->
      <div class="mb-3 ">
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
            v-model="payload.vendor"
            id="vendor"
            placeholder="—Select — "
            multiple
          >
            <el-option
              v-for="vendor in vendors"
              :key="vendor.id"
              :label="vendor.first_name + ' ' + vendor.last_name"
              :value="vendor.first_name + ' ' + vendor.last_name"
            >
            </el-option>
          </el-select>
        </div>
      </div>

      <!-- Create button here -->
      <div class="mt-4 pt-2">
        <Button
          :text="`Create ${!payload.product ? 'Product' : payload.product}`"
          custom-styles="height:41px; border-radius: 5px; padding: 0px 20px !important"
          :has-border="false"
          :has-icon="false"
          :disabled="!isComplete"
          @click="createProduct"
        />
      </div>
    </div>

    <div class="vl mx-auto" />

    <div class="w-50  py-5 px-4">
      <i
        class="el-dialog__close el-icon el-icon-close float-right mt-2"
        @click="$emit('close')"
      ></i>

      <div class="main transparent" v-if="products.length">
        <!--Save button here -->
        <div class="my-4">
          <Button
            :text="`Save ${!payload.product ? 'Product' : payload.product}`"
            custom-styles="height:41px; border-radius: 5px; padding: 0px 25px !important"
            :has-border="false"
            :has-icon="false"
            @click="saveProduct"
          />
        </div>

        <div
          v-for="(product, i) in products"
          :key="i"
          class="mb-3 product-holder px-4 py-3"
          :class="{ odd: i % 2 !== 0 }"
        >
          <div class="row">
            <!-- Product tag here -->
            <div class="col-lg-4">
              <div class="mb-3">
                <span
                  class="primary-gray text-xs"
                  style="text-transform: uppercase"
                >
                  {{ product.product }} TAG</span
                >
                <h6 class="word-content tertiary-black font-bold">
                  {{ product.tag | capitalize }}
                </h6>
              </div>
              <!-- product cost here -->
              <div>
                <span
                  class="primary-gray text-xs"
                  style="text-transform: uppercase"
                >
                  {{ product.product }} COST</span
                >
                <h6 class="word-content tertiary-black font-bold">
                  NGN {{ product.cost | formatCurrency }}
                </h6>
              </div>
            </div>

            <!-- Vendors here -->
            <div class="col-lg-5">
              <div class="mb-3">
                <span class="primary-gray text-xs">VENDOR(s)</span>
                <h6
                  class="word-content tertiary-black font-bold"
                  v-for="(vendor, i) in product.vendor"
                  :key="i + 'vendor'"
                >
                  {{ vendor | capitalize }}
                </h6>
              </div>
            </div>

            <!-- Delete actions here -->
            <div class="col-lg-3" style="align-self: center">
              <div class="mb-3 d-flex">
                <!-- Edit button here -->
                <div>
                  <button type="button" @click="editProduct(product)">
                    <img src="~/assets/img/vectors/prod-edit.svg" alt="edit" />
                  </button>
                </div>

                <!-- Delete button here -->
                <div class="ml-2">
                  <button type="button" @click="deleteProduct(product)">
                    <img src="~/assets/img/vectors/red-bin.svg" alt="bin" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- no products here -->
      <div v-else class="no-product">
        <div class="d-flex justify-content-center">
          <no-products />
        </div>

        <div class="text-center mt-4 w-75 mx-auto">
          <h5 class="font-bold tertiary-black" style="  font-size: 1.125rem;">
            Nothing in here yet.
          </h5>

          <p class=" font-medium primary-gray">
            Products or services will show up here once you add them on the left
            pane.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import noProducts from "~/components/icons/no-products.vue";

const greaterThanZero = value => value >= 0;

export default {
  data: () => ({
    products: [],
    isEdit: false,

    payload: {
      product: "",
      tag: "",
      cost: "",
      vendor: []
    },

    vendors: [],
    options: ["Product", "Service"]
  }),

  validations: {
    payload: {
      product: {
        required
      },

      tag: {
        required
      },

      cost: {
        required,
        greaterThanZero
      },

      vendor: {
        required
      }
    }
  },

  components: { noProducts },

  mounted() {
    this.fetchVendors();
  },

  computed: {
    isComplete() {
      return (
        this.payload.product &&
        this.payload.tag &&
        this.payload.cost &&
        this.payload.vendor.length
      );
    }
  },

  methods: {
    createProduct() {
      this.$v.payload.$touch();

      if (this.$v.payload.$error === true) {
        this.$toast.error("Please fill in appropriately");
        return;
      }

      if (this.isEdit) {
        this.products[this.payload] = this.payload;
        this.payload = {
          product: "",
          tag: "",
          cost: "",
          vendor: []
        };
        this.isEdit = false;
        return;
      }

      this.products.push(this.payload);
      this.payload = {
        product: "",
        tag: "",
        cost: "",
        vendor: []
      };
      this.isEdit = false;
    },

    async saveProduct() {},

    editProduct(product) {
      this.isEdit = true;
      this.payload = product;
    },

    deleteProduct(product) {
      const index = this.products.indexOf(product);
      if (index > -1) {
        this.products.splice(index, 1);
      }
    },
    async fetchVendors() {
      try {
        const response = await this.$axios.get("/vendors");

        if (response.status == "success") {
          this.vendors = response.data;
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
.main {
  height: calc(100vh - 72px);
  overflow-y: scroll;
}
button {
  background: inherit;
  border: none;
}
div.vl {
  border-left: 1px solid #7c8db5;
  height: auto;
}

.word-content {
  font-size: 1rem;
  word-break: break-all;
  width: 10rem;
  max-width: 10rem;
}

.no-product {
  margin: 120px auto;
}

.product-holder {
  border: 1px solid #f5f6f8;
  box-sizing: border-box;
  border-radius: 0px 10px 10px 0px;
  border-left: 5px solid #17ce89;
}

.product-holder.odd {
  border-left: 5px solid #e42c66;
}

label {
  font-size: 1rem;
  color: var(--tertiary-black);
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
