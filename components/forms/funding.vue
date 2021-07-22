<template>
  <div class="px-3">
    <!-- source here -->
    <div class="my-2">
      <div
        class="d-flex justify-content-between align-items-center tab-holder p-2"
      >
        <div><span>Fund with Fiat</span></div>
        <div><span>Fund with Crypto</span></div>
      </div>
    </div>

    <div class="text-center py-2">
      <span class="text poppins">Select Crypto to fund with</span>
    </div>

    <!-- token outlets here -->
    <div>
      <token-outlets @handleToken="handleToken" />
    </div>

    <!-- barcode gere -->
    <div class="my-2 d-flex justify-content-center">
      <div class="qr-holder"></div>
    </div>

    <div>
      <!-- copy address here -->
      <div class=" position-relative mt-3">
        <label for="address" class="poppins">Copy Address</label>
        <!-- icon here -->
        <div class="position-absolute token-holder" v-if="token.img">
          <img :src="token.img" height="24" width="24" :alt="token.token" />
        </div>
        <input
          type="text"
          id="ddress"
          disabled
          value="TAFLGx4m18ubcAk3XVio98FNRy9N3cQZ3z"
          class="form-controls px-5"
          ref="address"
        />
        <!-- copy-region here -->
        <div class="position-absolute copy-holder">
          <button
            class="copy-btn px-3 d-flex align-items-center justify-content-center"
          >
            <img src="~/assets/img/vectors/copy-btn-2.svg" alt="" />
          </button>
        </div>
      </div>

      <p class="caution poppins">
        Please send only Tether , TRC-20 USDT to this address, as sending any
        other cryptocurrency will be lost.
      </p>
    </div>
  </div>
</template>

<script>
import tokenOutlets from "~/components/generic/token-outlets.vue";

export default {
  components: { tokenOutlets },

  data: () => ({
    token: {},
    activeTab: 2
  }),

  methods: {
    handleToken(token) {
      this.token = token;
    }
  }
};
</script>

<style scoped>
.tab-holder {
  background: #f5f6f8;
  border-radius: 8px;
  font-size: 1rem;
  color: #646a86;
}

.text {
  color: #25396f;
  font-size: 0.875rem;
}

.qr-holder {
  border: 1px solid #17ce89;
  box-sizing: border-box;
  border-radius: 8px;
  width: 180px;
  height: 180px;
}
label {
  color: #25396f;
  font-size: 0.875rem;
}
.form-controls {
  background: #fafafa;
  border: 1px dashed #7a809b;
  color: #7a809b;
  font-family: "Inconsolata", monospace;
  font-size: 0.875rem;
  height: 50px;
}
.caution {
  color: #e42c66;
  font-size: 0.75rem;
  padding-top: 5px;
}

.token-holder {
  bottom: 13px;
  left: 16px;
}

.copy-btn {
  border: none;
  background: #dfe1ea;
  border-radius: 0px 5px 5px 0px;
  height: 50px;
}

.copy-holder {
  right: 0;
  bottom: 0;
}
</style>
