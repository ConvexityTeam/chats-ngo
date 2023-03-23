<template>
  <div>
    <div class="mt-4" style="overflow: auto" v-if="data.length">
      <div
        class="row"
        v-infinite-scroll="load"
        :infinite-scroll-disabled="disabled"
        :infinite-scroll-immediate="false"
      >
        <div
          class="col-lg-4"
          v-for="(token, i) in data.slice(0, count)"
          :key="i"
        >
          <div class="card-holder p-4">
            <div class="row">
              <!-- QR code here -->
              <div class="col-lg-6">
                <div class="qr-holder p-2 d-flex">
                  <!-- <qrcode-vue
                    :value="handleQrCode(token.token)"
                    level="H"
                    :size="120"
                    class="m-auto"
                  /> -->
                  <img
                    :src="token.token"
                    height="150"
                    width="150"
                    class="m-auto"
                    alt=""
                  />
                </div>
              </div>

              <!-- Beneficiary Details here -->
              <div class="col-lg-6">
                <!-- Beneficiary -->
                <div class="mb-2 pb-1">
                  <p class="text-xs primary-gray">BENEFICIARY</p>
                  <p class="primary-blue text-sm font-medium">
                    {{
                      token.Beneficiary
                        ? `${
                            token.Beneficiary.first_name +
                            " " +
                            token.Beneficiary.last_name
                          }`
                        : ""
                    }}
                  </p>
                </div>

                <!-- Campaign -->
                <div class="mb-2 pb-1">
                  <p class="text-xs primary-gray">CAMPAIGN</p>
                  <p class="primary-blue text-sm font-medium">
                    {{ token.Campaign ? token.Campaign.title : "" }}
                  </p>
                </div>

                <!-- AMOUNT -->
                <div class="mb-2">
                  <p class="text-xs primary-gray">AMOUNT</p>
                  <p class="primary-blue text-sm font-medium">
                    <span
                      v-if="token.Campaign && token.Campaign.type == 'item'"
                    >
                      {{ token.amount | formatNumber }}
                    </span>

                    <span v-else>
                      {{ $currency }}{{ token.amount | formatCurrency }}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <p
        class="text-center primary mt-3 mb-4 poppins font-medium"
        v-if="isLoading"
      >
        Load more...
      </p>
    </div>

    <!-- Loader Here -->
    <div v-else-if="loading" class="py-5">
      <div class="text-center loader my-5"></div>
    </div>

    <!-- No Data Here -->
    <h3 v-else class="text-center no-record my-5">NO RECORD FOUND</h3>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";

export default {
  name: "Qr-codes",
  components: { QrcodeVue },

  props: {
    triggerDownload: {
      type: Boolean,
      default: false,
    },

    data: {
      type: Array,
      default: () => [],
    },

    loading: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    count: 6,
    isLoading: false,
  }),

  computed: {
    noMore() {
      return this.count >= this.data.length;
    },
    disabled() {
      return this.isLoading || this.noMore;
    },
  },

  methods: {
    load() {
      this.isLoading = true;
      setTimeout(() => {
        this.count = this.count + 6;
        this.isLoading = false;
      }, 2000);
    },
  },
};
</script>

<style scoped>
.card-holder {
  background: #ffffff;
  border: 1px solid #e1e7ec;
  border-radius: 8px;
  height: 193px;
  margin-bottom: 2rem;
}

.qr-holder {
  border: 1px solid #f5f6f8;
  border-radius: 8px;
  height: 155px;
  justify-content: center;
  align-items: center;
}

.col-md-4 {
  width: 30% !important;
}

p {
  margin-bottom: unset !important;
}
</style>
