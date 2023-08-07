<template>
  <div class="d-flex">
    <!-- form here -->
    <div class="w-50 p-5">
      <div class="mt-2 mb-4">
        <h3 class="primary-blue font-bold">Create Proposal Request</h3>
      </div>

      <!-- Step here -->
      <section class="pt-4">
        <el-steps :active="currentStep" finish-status="success">
          <el-step title="Basic Details"></el-step>
          <el-step title="Add Products" class="test"></el-step>
        </el-steps>
      </section>

      <!-- basic details -->
      <section v-if="currentStep == 1">
        <FormsMarketBasicDetails
          @changeStep="(value) => (currentStep = value)"
          @campaignSelected="(value) => (setCampaign = value)"
        />
      </section>

      <!-- add project -->
      <section v-else class="mb-4">
        <FormsMarketAddProducts
          :isEdit="isEdit"
          :activeProduct="payload"
          @editDone="isEdit = false"
          @addProduct="addProduct"
        />
      </section>
    </div>

    <div class="vl mx-auto" />

    <div class="w-50 py-5 px-4 position-relative">
      <div>
        <FormsMarketProducts
          :campaignId="setCampaign"
          :user="user"
          :products="products"
          @handleProduct="handleProduct"
          @closeDrawer="$emit('close')"
          @modalClosed="$emit('modalClosed')"
        />
      </div>

      <i
        class="el-dialog__close el-icon el-icon-close float-right mt-2"
        @click="$emit('close')"
      ></i>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    currentStep: 1,
    isEdit: false,
    orgId: "",
    setCampaign: "",
    products: [],
    payload: {},
  }),

  computed: {
    ...mapGetters("authentication", ["user"]),
  },

  methods: {
    addProduct(data) {
      if (this.isEdit) {
        this.products[data] = data;
        return (this.isEdit = false);
      }
      this.products.push(data);
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
            product_category: "",
            vendors: [],
          };
        }
        this.isEdit = false;
        this.products.splice(index, 1);
      }
    },

    handleProduct(action, product) {
      if (action === "edit") {
        this.editProduct(product);
      } else {
        this.deleteProduct(product);
      }
    },
  },
};
</script>

<style scoped>
div.vl {
  border-left: 1px solid #7c8db5;
  height: 100vh;
}

.el-dialog__close {
  right: 24px;
  position: absolute;
  top: 12px;
}
</style>
