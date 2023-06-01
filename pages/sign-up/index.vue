<template>
  <div class="main pb-5">
    <div class="text-center">
      <!-- Logo here -->
      <div class="logo-div pt-5">
        <img src="~/assets/img/logo.svg" class="img-fluid" alt="Chats" />
      </div>
      <h3 class="text-white welcome pt-4">
        <span v-if="!isEmailSent"> Welcome To CHATS</span>
        <span v-else>Verify your email</span>
      </h3>
    </div>

    <div class="d-flex justify-content-center align-items-center pt-4">
      <!-- Registration Card Here -->
      <div class="card__holder" v-if="!isEmailSent">
        <form @submit.prevent="registerUser">
          <!-- Organisation name here -->
          <div class="form-group">
            <label for="name">Name of organization</label>
            <input
              type="text"
              class="form-controls"
              placeholder="Enter organization"
              :class="{
                form__input__error: $v.payload.organisation_name.$error,
              }"
              id="name"
              v-model="payload.organisation_name"
              @focus="orgActive = true"
              @blur="$v.payload.organisation_name.$touch()"
            />

            <div class="position-absolute icon-left">
              <organisation-icon :active="orgActive" />
            </div>
          </div>

          <!-- Organisation email here -->
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
              <email-icon :active="emailActive" />
            </div>
          </div>

          <!-- website here -->
          <div class="form-group">
            <label for="email">Website</label>
            <input
              type="url"
              class="form-controls"
              placeholder="http://www.example.com"
              :class="{ form__input__error: $v.payload.website_url.$error }"
              id="website"
              v-model="payload.website_url"
              @focus="webActive = true"
              @blur="$v.payload.website_url.$touch()"
            />
            <div class="position-absolute icon-left">
              <globe-icon :active="webActive" />
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
              <lock-icon :active="passActive" />
            </div>

            <div
              class="position-absolute icon-right"
              @click="showpassword = !showpassword"
            >
              <eye-open v-if="showpassword" />
              <eye-closed v-else />
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
                <img
                  src="~/assets/img/vectors/spinner.svg"
                  class="btn-spinner"
                />
              </span>
              <span v-else>Create account</span>
            </button>
          </div>
        </form>

        <div class="mt-4 text-center">
          <p class="account">
            Have an account?
            <span
              class="font-bold login primary pointer"
              @click="$router.push('/')"
            >
              Login
            </span>
          </p>
        </div>
      </div>

      <div class="card__holder" v-else>
        <section class="d-flex justify-content-center">
          <img src="~/assets/img/svg/verify-email.svg" alt="verify-email" />
        </section>

        <!-- Text here -->
        <section class="mt-4 pt-1">
          <p class="primary-black font-medium sans text-center">
            You’ll need to verify your email to complete sign up
          </p>
          <p class="text-center text-sm input-text poppins">
            An email has been sent to
            <span class="font-medium">{{ payload.email }}</span> with a link to
            verify your account. If you don’t receive it within a few minutes,
            please check your spam folder.
          </p>
        </section>

        <!-- footer region Here -->
        <section
          class="text-center poppins primary-black font-medium pt-3 pb-4"
        >
          Didn’t get the mail?
          <span
            class="primary pointer"
            :class="{ isDisabled: loading }"
            @click="resendEmail"
            >Resend</span
          >
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
import organisationIcon from "~/components/icons/organisation-icon";
import emailIcon from "~/components/icons/email-icon.vue";
import globeIcon from "~/components/icons/globe-icon";
import lockIcon from "~/components/icons/lock-icon.vue";
import eyeClosed from "~/components/icons/eye-closed.vue";
import eyeOpen from "~/components/icons/eye-open.vue";
import PasswordValidation from "~/components/forms/password-validation";
import appConfig from "~/appConfig";

export default {
  layout: "default",

  components: {
    organisationIcon,
    emailIcon,
    globeIcon,
    lockIcon,
    eyeClosed,
    eyeOpen,
    PasswordValidation,
  },

  data() {
    return {
      loading: false,
      orgActive: false,
      emailActive: false,
      webActive: false,
      passActive: false,
      showpassword: false,
      isEmailSent: false,
      payload: {
        organisation_name: "",
        email: "",
        website_url: "https://",
        password: "",
      },
    };
  },

  validations: {
    payload: {
      organisation_name: { required },
      email: { required, email },
      website_url: { required },
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

  mounted() {
    const { isEmailSent } = this.$route.query;
    this.isEmailSent = isEmailSent;
  },

  methods: {
    ...mapActions("authentication", ["commitToken", "commitUser"]),

    async registerUser() {
      try {
        this.loading = true;
        this.$v.payload.$touch();

        if (this.$v.payload.$error === true) {
          return (this.loading = false);
        }

        const response = await this.$axios.post("/auth/ngo-register", {
          ...this.payload,
          host_url: appConfig.HOST_URL,
        });

        console.log("Register response", response);

        if (response.status == "success") {
          this.updateRoute();
        }
      } catch (err) {
        const { message } = err?.response?.data;
        this.$toast.error(message);
        if (message == "Email Already Exists, Recover Your Account") {
          this.$router.push("/");
        }
      } finally {
        this.loading = false;
      }
    },

    async resendEmail() {
      try {
        if (this.loading) return;
        this.loading = true;
        const response = await this.$axios.post(
          "auth/resend-email-confirmation",
          {
            email: this.payload.email,
            host_url: appConfig.HOST_URL,
          }
        );

        if (response.status == "success") {
          this.$toast.success("Email sent successfully");
          this.updateRoute();
        }
      } catch (err) {
        this.$toast.error(err.response?.data?.message);
      } finally {
        this.loading = false;
      }
    },

    updateRoute() {
      this.isEmailSent = true;
      this.$router.push({ path: "/sign-up", query: { isEmailSent: true } });
    },
  },
};
</script>

<style scoped>
.account {
  color: #0b0b0b;
  font-size: 0.875rem;
  font-weight: 700;
  font-family: "Poppins", sans-serif;
}

.account.login {
  text-decoration: none !important;
}

.welcome {
  font-size: 2.25rem;
  font-weight: 500;
}

.main {
  background-image: url("~/assets/img/DSC_1227-min 2 jpeg-min.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100vh;
  overflow: auto;
}

.card__holder {
  background: #ffffff;
  border-radius: 10px;
  padding: 2rem 1.75rem 0.75rem 1.75rem;
  width: 28.125rem;
}

label {
  color: var(--primary-black);
  font-size: 0.875rem;
  font-weight: 400;
  font-family: "Poppins", sans-serif;
}
label.terms {
  font-size: 0.75rem;
  color: #0b0b0b;
}

label > span > a {
  color: #277ef0;
  font-weight: 500;
  text-decoration: none;
}

.password-validity {
  font-size: 0.75rem;
  color: #9da8b6;
  font-weight: 500;
}

.isDisabled {
  cursor: not-allowed !important;
  opacity: 0.6;
}

@media (max-width: 575.98px) {
  .card__holder {
    padding: 2rem;
    width: 21.25rem;
  }
}

@media (min-width: 576px) and (max-width: 767.98px) {
  .card__holder {
    padding: 2rem;
    width: 21.25rem;
  }
}
</style>
