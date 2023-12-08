<template>
  <div>
    <div class="mb-4">
      <label for="product"> Product / Service </label>
      <div id="product" class="w-100">
        <el-select id="product" v-model="payload.type" placeholder="—Select — ">
          <el-option
            v-for="item in productTypes"
            :key="item"
            :label="item | capitalize"
            :value="item"
          >
          </el-option>
        </el-select>
      </div>
    </div>

    <div class="mb-4">
      <label for="product">Category type</label>
      <div id="product" class="w-100">
        <el-select
          id="product"
          v-model="payload.category_id"
          placeholder="—Select — "
        >
          <el-option
            v-for="item in categoryTypes"
            :key="item.id"
            :label="item.name | capitalize"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
    </div>

    <div class="product_details">
      <div class="mb-3">
        <label for=""> Product name </label>
        <div class="w-100">
          <input
            id="name"
            v-model="payload.tag"
            type="text"
            class="form"
            :class="{ error: $v.payload.type.$error }"
            :placeholder="`Enter ${payload.type} name`"
            @blur="$v.payload.tag.$touch()"
          />
        </div>
      </div>

      <div class="mb-3">
        <label> Unit Cost of Item </label>
        <div class="w-100">
          <input
            id="unit_cost"
            v-model="payload.cost"
            v-disable-wheel
            type="number"
            class="form"
            placeholder="NGN 0.00"
            :class="{ error: $v.payload.cost.$error }"
            @blur="$v.payload.cost.$touch()"
          />
        </div>
      </div>

      <div class="mb-3">
        <label> Quantity </label>
        <div class="w-100">
          <input
            id="quantity"
            v-model="payload.quantity"
            v-disable-wheel
            type="number"
            class="form"
            placeholder="0"
            :class="{ error: $v.payload.quantity.$error }"
            @blur="$v.payload.quantity.$touch()"
          />
        </div>
      </div>

      <div class="w-100 details_row_product mb-3">
        <span class="key">Total:</span>
        <span class="value primary-blue">{{
          totalAmount | formatCurrency
        }}</span>
      </div>

      <div class="mt-3">
        <Button
          :text="` ${isEdit ? 'Update' : 'Create'}  ${
            !payload.type ? 'Product' : payload.type
          }`"
          custom-styles="height:52px; border-radius: 8px; padding: 16px 44px !important"
          :has-border="false"
          :has-icon="false"
          :disabled="!isComplete"
          @click="createProduct"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";

const greaterThanZero = (value) => value >= 0;

export default {
  name: "AddProposalProduct",

  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },

    activeProduct: {
      type: Object,
      default: () => ({}),
    },
  },

  data: () => ({
    productTypes: ["product", "service"],
    categoryTypes: [],
    payload: {
      type: "",
      tag: "",
      cost: "",
      quantity: "",
      category_id: "",
    },
  }),

  async fetch() {
    this.id = this.user?.AssociatedOrganisations[0]?.OrganisationId;
    const { data } = await this.$axios.get(
      `/organisation/category-type/${this.id}`
    );

    this.categoryTypes = data;
  },

  computed: {
    ...mapGetters("authentication", ["user"]),

    totalAmount() {
      return this.payload.quantity * this.payload.cost;
    },

    isComplete() {
      return (
        this.payload.type &&
        this.payload.tag &&
        this.payload.cost &&
        this.payload.quantity &&
        this.payload.category_id
      );
    },
  },

  watch: {
    isEdit(value) {
      if (value) {
        this.payload = this.activeProduct;
      }
    },
  },

  validations: {
    payload: {
      type: { required },
      tag: { required },
      cost: { required, greaterThanZero },
      quantity: { required, greaterThanZero },
      category_id: { required },
    },
  },

  methods: {
    createProduct() {
      this.$emit("addProduct", this.payload);

      this.payload = {
        type: "",
        tag: "",
        cost: "",
        quantity: "",
        category_id: "",
      };

      this.$v.payload.$reset();
    },
  },
};
</script>

<style scoped>
.form::placeholder {
  letter-spacing: 0.01em;
  font-size: 0.875rem;
  color: #646a86;
}

.product_details {
  border-left: 3px solid #17ce89;
  padding: 16px;
}
.details_row_product {
  column-gap: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.details_row_product .key {
  color: #25396f;
  font-size: 14px;
  text-transform: capitalize;
}
.details_row_product .value {
  font-weight: bold;
}

label {
  font-size: 1rem;
  color: var(--primary-blue);
  font-weight: 500;
  letter-spacing: 0.01em;
  margin-bottom: 0.25rem;
}

.form {
  height: 52px;
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
</style>
