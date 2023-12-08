<template>
  <div class="pl-4">
    <!-- Modal here -->
    <Modal id="create-proposal-success" :buttonModified="true" title=" ">
      <FormsMarketSuccess @modalClosed="$emit('modalClosed')" />
    </Modal>

    <div v-if="products.length" class="main transparent">
      <!--Save button here -->
      <div class="my-4">
        <Button
          text="Post Proposal request"
          custom-styles="height:41px; border-radius: 5px; padding: 0px 18px !important"
          :has-border="false"
          :has-icon="false"
          :disabled="loading"
          @click="postProposalRequest"
        />
      </div>

      <!-- Added Product tags Here -->
      <div
        v-for="(product, i) in products"
        :key="i"
        class="mb-3 product-holder px-4 py-3"
        :class="{ odd: i % 2 !== 0 }"
      >
        <div class="row">
          <!-- Product tag here -->
          <div class="col-lg-4">
            <div class="mb-2">
              <span
                class="primary-gray text-xs"
                style="text-transform: uppercase"
              >
                Product name
              </span>
              <h6 class="word-content primary-blue font-medium">
                {{ product.tag | capitalize }}
              </h6>
            </div>

            <!-- product cost here -->
            <div>
              <span
                class="primary-gray text-xs"
                style="text-transform: uppercase"
              >
                UNIT COST
              </span>

              <h6 class="word-content primary-blue font-medium">
                {{ product.cost | formatCurrency }}
              </h6>
            </div>
          </div>

          <!-- quantity here -->
          <div class="col-lg-5">
            <div>
              <span
                class="primary-gray text-xs"
                style="text-transform: uppercase"
              >
                Quantity
              </span>

              <h6 class="word-content primary-blue font-medium">
                {{ product.quantity | formatNumber }}
              </h6>
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
                  @click="$emit('handleProduct', 'edit', product)"
                >
                  <img src="~/assets/img/vectors/prod-edit.svg" alt="edit" />
                </button>
              </div>

              <!-- Delete button here -->
              <div class="ml-2">
                <button
                  class="actions"
                  type="button"
                  @click="$emit('handleProduct', 'delete', product)"
                >
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
      <div class="text-center mt-5 pt-5 w-75 mx-auto">
        <IconsNoProduct />
        <h5 class="font-bold primary-blue text-md pt-4">
          Nothing in here yet.
        </h5>

        <p class="font-medium primary-gray">
          Products or services will show up here once you add them on the left
          pane.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
let screenLoading;

export default {
  props: {
    products: {
      type: Array,
      default: () => [],
    },

    user: {
      type: Object,
      default: () => ({}),
    },

    campaignId: {
      type: [String, Number],
      default: "",
    },
  },

  data: () => ({
    loading: false,
  }),

  methods: {
    async postProposalRequest() {
      try {
        this.loading = true;
        this.openScreen();
        const id = this.user?.AssociatedOrganisations[0]?.OrganisationId;

        const response = await this.$axios.post(
          `organisation/${id}/proposal-requests/${this.campaignId}`,
          this.products
        );

        if (response.status === "success") {
          this.$emit("closeDrawer");
          this.$bvModal.show("create-proposal-success");
        }

        console.log("CREATE PROPOSAL:::", response);
      } catch (err) {
      } finally {
        this.loading = false;
        screenLoading.close();
      }
    },

    openScreen() {
      screenLoading = this.$loading({
        lock: true,
        spinner: "el-icon-loading",
        background: "#0000009b",
      });
    },
  },
};
</script>

<style scoped>
.main {
  height: calc(100vh - 72px);
  overflow-y: scroll;
}

.product-holder {
  box-shadow: 0px 4px 8px 0px rgba(174, 174, 192, 0.2);
}

button.actions {
  background: inherit;
  border: none;
}
</style>
