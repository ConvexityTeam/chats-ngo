<template>
  <div class="mt-4 px-4 py-3">
    <div class="row">
      <div v-for="(token, i) in data" :key="i" class="col-lg-4">
        <div
          class="card-holder p-4"
          :class="{ 'html2pdf__page-break': i % 9 === 0 && data.length > 9 }"
        >
          <div class="row">
            <!-- QR code here -->
            <div class="col-lg-6">
              <div class="qr-holder p-2 d-flex">
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
                <p class="text-xs primary-gray">PROJECT</p>
                <p class="primary-blue text-sm font-medium">
                  {{ token.Campaign ? token.Campaign.title : "" }}
                </p>
              </div>

              <!-- AMOUNT -->
              <div class="mb-2">
                <p class="text-xs primary-gray">AMOUNT</p>
                <p class="primary-blue text-sm font-medium">
                  {{ token.amount | formatCurrency }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CompleteQrCodes",

  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.card-holder {
  background: #ffffff;
  border: 1px solid #e1e7ec;
  border-radius: 8px;
  min-height: 193px;
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
