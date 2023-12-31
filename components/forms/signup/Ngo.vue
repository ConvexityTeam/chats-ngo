<template>
  <form class="mt-3" @submit.prevent="registerUser">
    <!-- Organisation name here -->
    <div class="form-group">
      <label for="name">Name of organization</label>
      <input
        id="name"
        v-model="payload.organisation_name"
        type="text"
        class="form-controls"
        placeholder="Enter organization"
        :class="{
          form__input__error: $v.payload.organisation_name.$error,
        }"
        @focus="orgActive = true"
        @blur="$v.payload.organisation_name.$touch()"
      />

      <div class="position-absolute icon-left">
        <IconsOrganisationIcon :active="orgActive" />
      </div>
    </div>

    <!-- Organisation id here -->
    <div class="form-group">
      <label for="registration_id">Registration ID</label>
      <input
        id="registration_id"
        v-model="payload.registration_id"
        type="text"
        class="form-controls less-padded"
        placeholder="Enter Registration ID"
        :class="{
          form__input__error: $v.payload.registration_id.$error,
        }"
        @blur="$v.payload.registration_id.$touch()"
      />
      <span class="primary-gray text-sm"
        >This should be your CaC Id or other verified registration ID</span
      >
    </div>

    <!-- Organisation email here -->
    <div class="form-group">
      <label for="email">Email</label>
      <input
        id="email"
        v-model="payload.email"
        type="email"
        class="form-controls"
        placeholder="example@gmail.com"
        :class="{ form__input__error: $v.payload.email.$error }"
        @focus="emailActive = true"
        @blur="$v.payload.email.$touch()"
      />
      <div class="position-absolute icon-left">
        <IconsEmailIcon :active="emailActive" />
      </div>
    </div>

    <!-- website here -->
    <div class="form-group">
      <label for="email">Website</label>
      <input
        id="website"
        v-model="payload.website_url"
        type="url"
        class="form-controls"
        placeholder="https://www.example.com"
        @focus="webActive = true"
      />
      <div class="position-absolute icon-left">
        <IconsGlobeIcon :active="webActive" />
      </div>
    </div>

    <!-- Password here -->
    <div class="form-group last">
      <label for="password">Password</label>
      <input
        id="password"
        v-model="payload.password"
        :type="showpassword ? 'text' : 'password'"
        class="form-controls"
        placeholder="Enter password"
        :class="{ form__input__error: $v.payload.password.$error }"
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
    orgActive: false,
    emailActive: false,
    webActive: false,
    passActive: false,
    showpassword: false,
    payload: {
      organisation_name: "",
      registration_id: "",
      email: "",
      website_url: "",
      password: "",
      registration_type: "organisation",
    },
  }),

  validations: {
    payload: {
      organisation_name: { required },
      registration_id: { required },
      email: { required, email },
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
