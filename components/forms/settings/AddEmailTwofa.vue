<template>
  <section class="mt-3 px-4">
    <h6 class="text-center primary-gray poppins text-sm header">
      Follow the guide below to set up Email 2FA for <br />
      additional layer of security.
    </h6>

    <!-- Email Region Here -->
    <div class="mt-4">
      <section class="d-flex align-items-center">
        <h6 class="text-center primary-blue text-sm poppins header">
          A verification code has been sent to
          <span class="primary font-medium">{{ user.email }}.</span> Enter the
          verification code below.
        </h6>
      </section>
    </div>

    <!-- Otp Here -->
    <div class="mt-2 otp-holder">
      <span class="poppins text-sm primary-blue font-normal">
        Verification code from Email:
      </span>

      <div class="pt-2">
        <PincodeInput
          id="sms-pincode"
          v-model="otp"
          placeholder="-"
          :length="6"
          autofocus
          size="1"
        />
      </div>
    </div>

    <div class="mt-4 pt-2 mb-3">
      <Button
        type="submit"
        :has-icon="false"
        text="Enable 2FA"
        font-size="1rem"
        custom-styles="height:52px; width: 100%; border-radius: 5px !important"
        :loading="loading"
        :disabled="otp.length < 6"
        @click="handleOtp"
      />

      <div class="d-flex justify-content-center mt-4 pt-2">
        <CountdownTimer
          :time="120"
          @resendCode="$emit('resendCode', 'email')"
        />
      </div>
    </div>
  </section>
</template>

<script>
import PincodeInput from "vue-pincode-input";
export default {
  name: "AddEmailTwofa",
  components: { PincodeInput },

  props: {
    user: {
      type: Object,
      required: true,
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
        modalName: "addEmailTwoFa",
        tfa_method: "email",
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

.otp-holder {
  margin: auto;
  width: 80%;
}
</style>
