<template>
  <div>
    <template v-if="isResending">
      <span class="primary font-medium">Resend in {{ timeout }}s</span>
    </template>
    <template v-else>
      <button :disabled="loading" @click="handleResend">
        {{ loading ? "Loading..." : "Resend Code" }}
      </button>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    time: {
      type: Number,
      default: 30,
    },
  },

  data() {
    return {
      isResending: false,
      timeout: this.time,
    };
  },

  methods: {
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
      this.timeout = this.time;
    },
  },
};
</script>

<style scoped>
button {
  background: none;
  border: none;
  color: #17ce89;
  font-size: 1rem;
  font-weight: 500;
  outline: none;
}
</style>
