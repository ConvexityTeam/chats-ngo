<template>
  <div class="main pb-5">
    <div class="text-center">
      <!-- Logo here -->
      <div class="logo-div">
        <img src="~/assets/img/logo.svg" class="img-fluid" alt="Chats" />
      </div>
      <h3 class="text-white welcome py-4">
        {{ is2fa ? "Two-factor authentication " : "Hi, welcome back" }}
      </h3>
    </div>

    <div class="d-flex justify-content-center align-items-center">
      <div class="card__holder">
        <!-- 2fa Here -->
        <div v-if="is2fa">
          <FormsLoginTwofa :loading="loading" @verifyToken="verifyToken" />
        </div>

        <template v-else>
          <form @submit.prevent="loginUser">
            <!-- Organisation email here -->
            <div class="form-group">
              <label for="email">Email</label>
              <input
                id="email"
                type="email"
                class="form-controls"
                placeholder="example@gmail.com"
                @focus="emailActive = true"
                :class="{ form__input__error: $v.payload.email.$error }"
                v-model="payload.email"
                @blur="$v.payload.email.$touch()"
              />
              <div class="position-absolute icon-left">
                <IconsEmailIcon :active="emailActive" />
              </div>
            </div>

            <!-- Password here -->
            <div class="form-group">
              <label for="password">Password</label>
              <input
                id="password"
                :type="showpassword ? 'text' : 'password'"
                class="form-controls"
                :class="{ form__input__error: $v.payload.password.$error }"
                autocomplete="current-password"
                placeholder="Enter password"
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

            <div class="mt-4 pt-2 text-center">
              <recaptcha />
              <button :disabled="loading" class="onboarding-btn">
                <span v-if="loading">
                  <img
                    src="~/assets/img/vectors/spinner.svg"
                    class="btn-spinner"
                  />
                </span>
                <span v-else>Log in</span>
              </button>
            </div>
          </form>

          <div class="mt-4 ot-2 text-center">
            <p class="account">
              Don’t have an account?

              <span
                class="font-bold primary login pointer"
                @click="$router.push('/sign-up')"
              >
                Create one
              </span>
            </p>
            <p>
              <span
                class="forgot pointer"
                @click="$router.push('/forgot-password')"
                >Forgot password?</span
              >
            </p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import { mapActions } from "vuex";

export default {
  name: "Login",
  layout: "default",
  middleware: ["loginguard"],

  data: () => ({
    loading: false,
    emailActive: false,
    passActive: false,
    showpassword: false,
    payload: {
      email: "",
      password: "",
      token: "",
    },
  }),

  validations: {
    payload: {
      email: { required, email },
      password: { required },
    },
  },

  computed: {
    is2fa() {
      return !!this.$route.query.is2fa;
    },
  },

  methods: {
    ...mapActions("authentication", ["commitToken", "commitUser"]),

    async loginUser() {
      try {
        this.loading = true;
        this.$v.payload.$touch();

        if (this.$v.payload.$error) {
          return (this.loading = false);
        }

        const recaptchaToken = await this.$recaptcha.getResponse();
        const response = await this.$axios.post("/auth/ngo-login", {
          ...this.payload,
          token: recaptchaToken,
        });

        console.log("login response", response);

        if (response.status === "success") {
          const { user, token } = response.data;
          localStorage.setItem("userToken", token);

          // check for 2fa here
          if (user.is_tfa_enabled) {
            this.$router.push({ path: "/", query: { is2fa: user.tfa_method } });
            return;
          }

          this.grantUserAccess(response.data);
        }
      } catch (err) {
        console.log("ERRR::::", { err });
        this.$toast.error(err?.response?.data?.message);
      } finally {
        this.loading = false;
        localStorage.removeItem("protectedLastRoute");
        this.$recaptcha.reset();
      }
    },

    async grantUserAccess({ user, token }) {
      let protectedLastRoute = localStorage.getItem("protectedLastRoute");
      const invalidRoutes = ["/", "undefined"];
      const { nu } = this.$route.query;

      this.commitToken(token);
      this.commitUser(user);

      if (invalidRoutes.includes(protectedLastRoute)) {
        protectedLastRoute = "/dashboard";
      }

      if (nu) {
        protectedLastRoute = "/settings";
      }

      await this.$router.push(protectedLastRoute || "/dashboard");
    },

    async verifyToken(otp) {
      try {
        this.loading = true;
        const tfa_method = this.$route.query.is2fa;

        const response = await this.$axios.post("auth/2fa/enable", {
          otp,
          tfa_method,
        });

        console.log("OTPRESPONE:::", response);
        if (response.status == "success") {
          this.grantUserAccess(response.data);
        }
      } catch (err) {
        this.$toast.error(err?.response?.data?.message);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.forgot {
  color: #17ce89;
  font-size: 0.75rem;
  font-weight: 600;
  font-family: "Poppins", sans-serif;
  text-decoration: none;
}

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

.logo-div {
  padding: 50px 15px 0px 15px;
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
