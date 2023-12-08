<template>
  <form @submit.prevent="resetPassword">
    <!-- OTP Section -->

    <section class="mt-2">
      <div class="form-group">
        <label for="code"> Enter verification code</label>

        <PincodeInput v-model="payload.otp" :length="6" placeholder="-" />
      </div>

      <div class="d-flex justify-content-center my-4 pt-2">
        <CountdownTimer
          :time="120"
          @resendCode="$emit('resendCode', data.email)"
        />
      </div>
    </section>

    <div class="hr mb-4 mt-3"></div>

    <!-- Password  here -->
    <div class="form-group less-padded">
      <label for="password">New Password</label>
      <input
        id="password"
        v-model="payload.password"
        :type="showpassword ? 'text' : 'password'"
        class="form-controls"
        placeholder="Enter new password"
        :class="{ form__input__error: $v.payload.password.$error }"
        @focus="passwordActive = true"
        @blur="$v.payload.password.$touch()"
      />
      <div class="position-absolute icon-left">
        <IconsLockIcon :active="passwordActive" />
      </div>

      <div
        class="position-absolute icon-right"
        @click="showpassword = !showpassword"
      >
        <IconsEyeOpen v-if="showpassword" />
        <IconsEyeClosed v-else />
      </div>
    </div>

    <div class="password-validity">
      <template v-if="!payload.password.length">
        <p class="pt-2">
          Make sure it's at least 8 characters including a number, special
          character and an uppercase letter.
        </p>
      </template>

      <template v-else>
        <PasswordValidation class="mb-3" :validations="$v.payload.password" />
      </template>
    </div>

    <!--Confirm Password  here -->
    <div class="form-group">
      <label for="confirm_password">Password Confirmation</label>
      <input
        id="confirm_password"
        v-model="payload.confirm_password"
        :type="showConfirm ? 'text' : 'password'"
        class="form-controls"
        placeholder="Re-enter new password"
        :class="{ form__input__error: $v.payload.confirm_password.$error }"
        @focus="confirmActive = true"
        @input="$v.payload.confirm_password.$touch()"
      />
      <div class="position-absolute icon-left">
        <IconsLockIcon :active="confirmActive" />
      </div>

      <div
        class="position-absolute icon-right"
        @click="showConfirm = !showConfirm"
      >
        <IconsEyeOpen v-if="showConfirm" />
        <IconsEyeClosed v-else />
      </div>
    </div>

    <div class="my-4 pt-2 text-center">
      <button
        class="onboarding-btn"
        :disabled="payload.otp.length < 6"
        :class="{ inactive: payload.otp.length < 6 }"
      >
        <span v-if="loading">
          <img src="~/assets/img/vectors/spinner.svg" class="btn-spinner" />
        </span>
        <span v-else>Change password</span>
      </button>
    </div>
  </form>
</template>

<script>
import { required, sameAs, minLength } from "vuelidate/lib/validators";
import PincodeInput from "vue-pincode-input";

export default {
  components: { PincodeInput },

  props: {
    loading: {
      type: Boolean,
      default: false,
    },

    data: {
      type: Object,
      default: () => {},
    },
  },

  data: () => ({
    showpassword: false,
    showConfirm: false,
    passwordActive: false,
    confirmActive: false,
    payload: {
      otp: "",
      password: "",
      confirm_password: "",
    },
  }),

  validations: {
    payload: {
      otp: { required, minLength: minLength(6) },
      password: {
        required,
        minLength: minLength(8),
        containsUppercase: (value) => /[A-Z]/.test(value),
        containsLowercase: (value) => /[a-z]/.test(value),
        containsNumber: (value) => /[0-9]/.test(value),
        containsSpecial: (value) =>
          // eslint-disable-next-line no-useless-escape
          /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value),
      },
      confirm_password: {
        required,
        sameAs: sameAs((vm) => {
          return vm.password;
        }),
      },
    },
  },

  methods: {
    resetPassword() {
      this.$v.payload.$touch();
      if (this.$v.payload.$error) return;

      this.$emit("resetPassword", { ...this.payload, ref: this.data.ref });
    },
  },
};
</script>

<style scoped>
.inactive {
  background: #bdc6da;
  box-shadow: 0px 2px 4px rgba(23, 206, 137, 0.07);
  color: white;
  cursor: not-allowed;
}

label {
  color: #25396f;
  font-weight: 500;
}

.hr {
  border-bottom: 1px solid #7c8db5;
}
</style>
