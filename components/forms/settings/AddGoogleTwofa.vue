<template>
  <form class="mt-3 px-4" @submit.prevent="handleOtp">
    <h6 class="text-center primary-gray poppins text-sm header">
      Follow the guide below to set up Google authenticator <br />
      for additional layer of security.
    </h6>
    <!-- Authentication Area -->
    <div class="row mb-4 mt-4 pt-3">
      <!-- QR Code  -->
      <div
        class="col-lg-6 d-flex flex-column justify-content-center align-items-center px-3"
      >
        <div
          class="p-3 qrCode d-flex justify-content-center align-items-center"
        >
          <img :src="payload.qrcode_url" class="img-fluid" alt="qrCode" />
        </div>

        <!-- Guide Here -->
        <div class="mt-4 px-3 qrCode-guide">
          <span class="text-left text-xs primary-blue poppins">
            Use Google Authenticator app to scan this QR code,

            <a
              target="_blank"
              href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en&gl=US"
              >Download</a
            >

            the app here if you don’t already have it.
          </span>
        </div>
      </div>

      <!-- Authentication Code -->
      <div class="col-lg-6 d-flex flex-column px-3">
        <div class="secret-code d-flex align-items-center">
          <div class="px-2 text-sm input-text truncate">
            {{ payload.secret }}
          </div>

          <div
            class="copy-code d-flex justify-content-center align-items-center"
            @click="$copy(payload.secret)"
          >
            <IconsCopy />
          </div>
        </div>

        <div>
          <p class="text-left mt-2 text-sm poppins input-text">
            If you have any problem with scanning the QR code, enter this code
            manually into the app
          </p>
        </div>

        <!-- Verification Code Here -->
        <div>
          <span class="primary-blue poppins text-sm pt-3"
            >Verification code from app:</span
          >
          <div class="d-flex justify-content-center align-items-center">
            <PincodeInput
              v-model="otp"
              placeholder="-"
              :length="6"
              autofocus
              size="1"
            />
          </div>
        </div>

        <div class="mt-3">
          <Button
            type="submit"
            :has-icon="false"
            text="Enable 2FA"
            custom-styles="height:40px; width: 100%; border-radius: 5px !important"
            :loading="loading"
            :disabled="otp.length < 6"
          />
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import PincodeInput from "vue-pincode-input";

export default {
  components: { PincodeInput },

  props: {
    payload: {
      type: Object,
      default: () => {},
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    otp: "",
  }),

  methods: {
    handleOtp() {
      if (this.otp.length < 6) return;

      this.$emit("enableTwoFa", {
        otp: Number(this.otp),
        modalName: "addGoogleTwoFa",
        tfa_method: "qrCode",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  line-height: 21px;
  font-weight: 400 !important;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-controls {
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 0 4px;
  border-radius: 4px;
  text-align: center;
  background-color: #f5f6f8;
}
div.vue-pincode-input-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

div.vue-pincode-input-wrapper {
  transform: scale(0.7);
}

input {
  resize: horizontal;
  width: 200px;
}
.style-1 .otp-input-8-field {
  border-radius: 4px;
  border: 1px solid #f5cd79;
}
.style-1 .otp-input-8-field:not(:last-child) {
  margin-right: 0.5rem;
  scale: 0.5;
}

.qrCode {
  border-radius: 8px;
  height: 160px;
  width: 160px;
  border: 1px solid var(--primary-color);

  img {
    /* background-image: url("./assets\img\images.png"); */
    background-repeat: no-repeat;
    background-size: contain;
    width: 100%;
    height: 100%;
  }
}

.qrCode-guide {
  background: #ffffff;
  border: 1px dashed #e0e0e0;
  border-radius: 5px;
  height: 67px;
  display: flex;
  align-items: center;

  span {
    font-weight: 300;

    a {
      text-decoration: none;
      color: var(--primary-color);
      font-weight: 500;
    }
  }
}

.secret-code {
  font-family: "Inconsolata", monospace;
  font-size: 0.875rem;
  border-radius: 5px;
  border: 0.5px dashed #7a809b;
  background-color: #fafafa;
  letter-spacing: 2px;
  height: 35px;
  letter-spacing: 0.1em;
  font-weight: 600;

  .copy-code {
    height: 36px;
    position: relative;
    right: -2px;
    width: 15%;
    background-color: #dfe1ea;
    cursor: pointer;
    border-radius: 0px 8px 8px 0px;
  }
}
</style>
