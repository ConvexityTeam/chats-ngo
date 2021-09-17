<template>
  <form @submit.prevent="sendCode">
    <div class="d-flex">
      <div>
        <PincodeInput v-model="code" :length="6" placeholder="" />
      </div>

      <div>
        <button
          :disabled="isResending"
          type="button"
          class="resend-btn"
          :class="{
            resending: isResending
          }"
          @click="handleResend"
        >
          Resend {{ isResending ? `in ${timeout}s` : "code" }}
        </button>
      </div>
    </div>

    <div class="my-4 pt-2 text-center">
      <button
        class="onboarding-btn"
        :disabled="code.length < 6"
        :class="{ inactive: code.length < 6 }"
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
const time = 30;
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    isResending: false,

    code: "",
    timeout: time
  }),

  components: {
    PincodeInput
  },

  methods: {
    sendCode() {
      this.$emit("handleCode", this.code);
      (this.isResending = false), (this.timeout = time);
    },

    handleResend() {
      this.$emit("resendCode");
      this.countDownTimer();
    },
    countDownTimer() {
      if (this.timeout > 0) {
        this.isResending = true;
        setTimeout(() => {
          this.timeout -= 1;
          this.countDownTimer();
        }, 1000);
        return;
      }

      this.isResending = false;
      this.timeout = time;
    }
  }
};
</script>

<style>
.resend-btn {
  color: #17ce89;
  font-weight: 500;
  font-size: 14px;
  height: 52px;
  display: flex;
  align-items: center;
  border: 1px solid #17ce89;
  background: white;
  border-radius: 5px;
}

.resend-btn.resending {
  opacity: 0.5;
  cursor: not-allowed;
}

input.vue-pincode-input {
  box-shadow: none;
  background: #f5f6f8;
  border-radius: 5px;
  width: 52px;
  height: 52px;
  max-width: inherit;
  padding: 0;
  margin: 0px 20px 0px 0px;
  color: #25396f;
  opacity: 0.7;
  font-weight: bold;
  font-size: 1.125rem;
}

input.vue-pincode-input:focus {
  border: 1px solid #17ce89;
  outline: none;
  box-shadow: none;
}

.inactive {
  background: #bdc6da;
  box-shadow: 0px 2px 4px rgba(23, 206, 137, 0.07);
  color: white;
  cursor: not-allowed;
}
</style>
