<template>
  <form @submit.prevent="registerUser" class="mt-3">
    <!-- First Name name here -->
    <div class="form-group">
      <label for="first_name">First name</label>
      <input
        type="text"
        class="form-controls less-padded"
        placeholder="First name"
        :class="{
          form__input__error: $v.payload.first_name.$error,
        }"
        id="first_name"
        v-model="payload.first_name"
        @blur="$v.payload.first_name.$touch()"
      />
    </div>

    <!-- First Name name here -->
    <div class="form-group">
      <label for="last_name">Last name</label>
      <input
        type="text"
        class="form-controls less-padded"
        placeholder="Last name"
        :class="{
          form__input__error: $v.payload.last_name.$error,
        }"
        id="last_name"
        v-model="payload.last_name"
        @blur="$v.payload.last_name.$touch()"
      />
    </div>

    <!--  email here -->
    <div class="form-group">
      <label for="email">Email</label>
      <input
        type="email"
        class="form-controls"
        placeholder="example@gmail.com"
        :class="{ form__input__error: $v.payload.email.$error }"
        id="email"
        v-model="payload.email"
        @focus="emailActive = true"
        @blur="$v.payload.email.$touch()"
      />
      <div class="position-absolute icon-left">
        <IconsEmailIcon :active="emailActive" />
      </div>
    </div>

    <!-- Password here -->
    <div class="form-group last">
      <label for="password">Password</label>
      <input
        :type="showpassword ? 'text' : 'password'"
        class="form-controls"
        placeholder="Enter password"
        :class="{ form__input__error: $v.payload.password.$error }"
        id="password"
        v-model="payload.password"
        @focus="passActive = true"
        @blur="$v.payload.password.$touch()"
      />
      <div class="position-absolute icon-left">
        <IconsLockIcon :active="passActive" />
      </div>

      <div
        class="position-absolute icon-right"
        @click="showpassword = !showpassword"
      >
        <IconsEyeOpen v-if="showpassword" />
        <IconsEyeClosed v-else />
      </div>
    </div>

    <!--Password Validity here  -->
    <div class="password-validity">
      <template v-if="!payload.password.length">
        <p class="pt-2">
          Make sure it's at least 8 characters including a number, special
          character and an uppercase letter.
        </p>
      </template>

      <template v-else>
        <PasswordValidation :validations="$v.payload.password" />
      </template>
    </div>

    <recaptcha />

    <!-- Submit button here -->
    <div class="text-center mt-4">
      <button :disabled="loading" class="onboarding-btn">
        <span v-if="loading">
          <img src="~/assets/img/vectors/spinner.svg" class="btn-spinner" />
        </span>
        <span v-else>Create account</span>
      </button>
    </div>
  </form>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
  name: "OrganisationSignup",

  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    emailActive: false,
    passActive: false,
    showpassword: false,
    payload: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      registration_type: "individual",
    },
  }),

  validations: {
    payload: {
      first_name: { required },
      last_name: { required },
      email: { required, email },
      password: {
        required,
        minLength: minLength(8),
        containsUppercase: (value) => /[A-Z]/.test(value),
        containsLowercase: (value) => /[a-z]/.test(value),
        containsNumber: (value) => /[0-9]/.test(value),
        containsSpecial: (value) =>
          /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value),
      },
    },
  },

  methods: {
    registerUser() {
      this.$v.payload.$touch();
      if (this.$v.payload.$error) return;

      this.$emit("registerUser", this.payload);
    },
  },
};
</script>

<style scoped>
label {
  color: var(--primary-black);
  font-size: 0.875rem;
  font-weight: 400;
  font-family: "Poppins", sans-serif;
}
</style>
