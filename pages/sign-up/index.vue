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
      <div class="card__holder">
        <!-- Registrotion Forms -->
        <div v-if="!isEmailSent">
          <!-- Tabs Here -->
          <section v-if="type">
            <el-tabs
              v-model="type"
              stretch
              id="registration"
              @tab-click="handleClick"
            >
              <el-tab-pane label="Individual" name="individual">
                <FormsSignupIndividual
                  v-if="type == 'individual'"
                  @registerUser="registerUser"
                />
              </el-tab-pane>

              <el-tab-pane label="NGOs" name="ngo">
                <FormsSignupNgo
                  v-if="type == 'ngo'"
                  @registerUser="registerUser"
                />
              </el-tab-pane>
            </el-tabs>
          </section>

          <section v-else>
            <FormsSignupUserType />
          </section>

          <div class="mt-4 text-center">
            <p class="account">
              Already have an account?
              <span class="login primary pointer" @click="$router.push('/')">
                Login
              </span>
            </p>
          </div>
        </div>

        <!-- Email Sent region -->
        <div v-else>
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
              <span class="font-medium">{{ payload.email }}</span> with a link
              to verify your account. If you don’t receive it within a few
              minutes, please check your spam folder.
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
  </div>
</template>

<script>
import { mapActions } from "vuex";
import appConfig from "~/appConfig";

export default {
  layout: "default",
  name: "Signup",

  data: () => ({
    loading: false,
    isEmailSent: false,
    payload: {},
    // activeName: "first",
  }),

  computed: {
    type: {
      get() {
        return this.$route.query.type;
      },
      set(value) {
        this.$router.push({ query: { type: value } });
      },
    },
  },

  mounted() {
    const { isEmailSent } = this.$route.query;
    this.isEmailSent = isEmailSent;
  },

  methods: {
    ...mapActions("authentication", ["commitToken", "commitUser"]),

    async registerUser(payload) {
      try {
        this.loading = true;
        this.payload = payload;

        const response = await this.$axios.post("/auth/ngo-register", {
          payload,
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

    handleClick(tab) {
      const { index } = tab;

      if (index == 0) {
        this.type = "individual";
      } else {
        this.type = "ngo";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.account {
  color: #222222;
  font-size: 0.875rem;
  font-weight: 500;

  .login {
    text-decoration: underline !important;
    font-weight: 700;
  }
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
