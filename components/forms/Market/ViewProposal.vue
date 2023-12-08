<template>
  <div class="_container">
    <div class="w-50 left-section">
      <div class="left-section-container">
        <div class="profile_picture">
          <b-avatar
            :src="activeProposal?.profile_pic"
            size="96px"
            class="img-fluid"
            variant="light"
          ></b-avatar>
        </div>

        <div class="profile_details">
          <div class="header">
            <h5>
              {{ `${activeProposal?.first_name} ${activeProposal?.last_name}` }}
            </h5>
            <p>ID: {{ activeProposal?.id }}</p>
          </div>

          <div class="row">
            <span class="key">Phone number:</span>
            <span class="value"> {{ activeProposal?.phone }} </span>
          </div>

          <div class="row">
            <span class="key">Email address:</span>
            <span class="value"> {{ activeProposal?.email }} </span>
          </div>

          <!-- <div class="w-100">
            <Button
              text="Contact Vendor"
              :has-icon="false"
              :has-border="true"
              custom-styles="border: 1px solid #17CE89 !important; border-radius: 4px !important; width: 100%  !important; font-size: 0.875rem !important; height: 44px !important"
            />
          </div> -->
        </div>

        <div class="overview">
          <h4>Proposal Overview</h4>

          <div class="content">
            <div class="list">
              <span>PROPOSED BUDGET</span>
              <p class="font-medium">
                {{ activeProposal?.proposed_budget | formatCurrency }}
              </p>
            </div>

            <div class="list">
              <span>Date SUBMITTED</span>
              <p class="font-medium">
                {{ activeProposal?.submitted_date | formatDate }}
              </p>
            </div>
          </div>
        </div>

        <div class="btn_container">
          <Button
            text="Ignore"
            :has-icon="false"
            :has-border="true"
            custom-styles="flex: 1 1 0 !important; border: 1px solid #17CE89 !important; border-radius: 4px !important; width: 100%  !important; font-size: 0.875rem !important; height: 52px !important"
            @click="$emit('close')"
          />

          <Button
            text="Accept"
            :has-icon="false"
            custom-styles="flex: 1 1 0 !important; width: 100%  !important; font-size: 0.875rem !important;  border-radius: 4px !important;  height: 52px !important"
            @click="acceptProposal"
          />
        </div>
      </div>
    </div>

    <div class="vl mx-auto" />

    <div class="w-50 right-section">
      <span class="close-icon">
        <i
          class="el-dialog__close el-icon el-icon-close float-right mt-n3"
          @click="$emit('close')"
        ></i>
      </span>

      <div class="right-section-container">
        <!-- divider -->
        <div class="divider">
          <span class="divider-line"></span>
          <span class="divider-text"> PRODUCT Proposals </span>
          <span class="divider-line"></span>
        </div>

        <div
          v-for="(product, i) in products"
          :key="i"
          class="product_container"
        >
          <div class="product_row">
            <span class="key">Product:</span>
            <span class="value"> {{ product.tag | capitalize }} </span>
          </div>
          <div class="product_row">
            <span class="key">Quantity:</span>
            <span>
              <span class="value"> {{ product.quantity | formatNumber }} </span>
            </span>
          </div>

          <div class="product_row">
            <span class="key">Unit Price:</span>
            <span class="value">
              {{ product.cost | formatCurrency }}
            </span>
          </div>
          <div class="product_row">
            <span class="key">Total:</span>
            <span class="value">
              {{ (product.quantity * product.cost) | formatCurrency }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let screenLoading;

export default {
  props: {
    activeProposal: {
      type: Object,
      default: () => ({}),
    },

    campaign: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    products() {
      return this.activeProposal?.proposalOwner?.proposal_products ?? [];
    },
  },

  methods: {
    async acceptProposal() {
      try {
        this.openScreen();
        const response = await this.$axios.post(
          `/organisation/approve-proposal`,
          {
            campaign_id: this.campaign.id,
            vendor_id: this.activeProposal.id,
            proposal_owner_id: this.acceptProposal.proposalOwner.id,
          }
        );

        if (response.status === "success") {
          this.$toast.success(response.message);
          this.$emit("vendorApproved");
        }
      } catch (err) {
      } finally {
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
._container {
  display: flex;
  gap: 24px;
}
.main {
  height: calc(100vh - 72px);
  overflow-y: scroll;
}

button.actions {
  background: inherit;
  border: none;
}

label {
  font-size: 1rem;
  color: var(--primary-blue);
  font-weight: 500;
  letter-spacing: 0.01em;
  margin-bottom: 0.25rem;
}

.divider {
  display: flex;
  align-items: center;
  width: 100%;
}
.divider .divider-line {
  height: 0.5px;
  width: 100%;
  flex: 1 1 0%;
  background: #f5f6f8;
}
.divider .divider-text {
  text-transform: uppercase;
  padding: 8px 12px;
  border-radius: 100px;
  background: #eefcf6;
  color: #35c78a;
  margin: auto 6px;
  font-size: 12px;
  font-weight: 500;
}
.right-section,
.left-section {
  padding: 64px 24px;
  position: relative;
  gap: 8px;
  flex: 1 0 0;
  align-self: stretch;
  width: 100%;
}
.left-section-container {
  display: flex;
  padding: 32px 40px 64px 40px;
  flex-direction: column;
  gap: 24px;
  align-self: stretch;
  border-radius: 10px;
  background: #fff;
}
.right-section-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
  width: 100%;
}
.product_container {
  display: flex;
  padding: 12px;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  align-self: stretch;
  border-radius: 8px;
  border: 1px dashed var(--secondary-text, #7c8db5);
  background: var(--bg-color, #fafafa);
}
.product_row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
}
.product_row .key,
.product_row .value {
  color: #25396f;
  text-transform: capitalize;
  font-weight: 500;
}
.product_row .value {
  font-weight: 700;
}
.btn_container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  width: 85%;
  margin: 0;
}
.close-icon {
  position: absolute;
  top: 2.2rem;
  right: 1rem;
  /* padding: 1rem;  */
}
.profile_picture {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 85% !important;
}
.profile_details {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  align-self: stretch;
  width: 85%;
}
.profile_details .header {
  gap: 8px;
}
.profile_details .header h5 {
  color: #25396f;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.18px;
}
.profile_details .header p {
  color: #7c8db5;
  letter-spacing: 0.16px;
  margin: 0;
}
.profile_details .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 9px;
  align-self: stretch;
  width: 100%;
  margin: -3px auto auto auto;
  border-bottom: 0.1px solid #f5f6f8;
  padding-bottom: 8px;
}
.profile_details .row .key {
  color: #25396f;
  font-size: 14px;
  text-transform: capitalize;
}
.profile_details .row .value {
  color: #25396f;
  font-size: 14px;
  text-transform: capitalize;
  font-weight: 700;
}
.overview {
  gap: 8px;
  align-self: stretch;
}
.overview h4 {
  color: #25396f;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.16px;
}
.overview .content {
  display: flex;
  padding: 16px;
  justify-content: space-between;
  align-items: center;
  column-gap: 16px;
  border-radius: 8px;
  border: 1px dashed #7c8db5;
  background: #fcfcfe;
}
.overview .content .list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 0 0;
  height: fit-content;
}
.overview .content .list > span {
  color: #7c8db5;
  display: block;
  margin-bottom: 8px;
  font-size: 12px;
  text-transform: uppercase;
}
.overview .content .list p {
  color: #25396f;
  margin-bottom: 0;
}
</style>
