<template>
  <form @submit.prevent="verifyToken">
    <!-- Pin Region -->
    <section>
      <span class="primary-black font-bold">Two-factor authentication </span>
      <p class="pt-2 input_text">
        Kindly enter your two-factor authentication code
      </p>

      <div class="mt-4 pt-2">
        <PincodeInput v-model="otp" :length="6" placeholder="-" />
      </div>
    </section>

    <div class="mt-4 pt-2 pb-4 text-center">
      <button
        type="submit"
        :disabled="loading"
        class="onboarding-btn"
        :class="{ inactive: otp.length < 6 }"
      >
        <span v-if="loading">
          <img src="~/assets/img/vectors/spinner.svg" class="btn-spinner" />
        </span>
        <span v-else>Continue</span>
      </button>
    </div>
  </form>
</template>

<script>
import PincodeInput from "vue-pincode-input";
export default {
  name: "Twofa",
  components: { PincodeInput },

  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    otp: "",
  }),

  methods: {
    verifyToken() {
      if (this.otp.length < 6) return;
      this.$emit("verifyToken", this.otp);
    },
  },
};
</script>

<style lang="scss" scoped>
.input_text {
  color: #9297aa;
}

button {
  &.inactive {
    background: #bdc6da;
    box-shadow: 0px 2px 4px rgba(23, 206, 137, 0.07);
    color: white;
    cursor: not-allowed;
  }
}
</style>
