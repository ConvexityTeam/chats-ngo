<template>
  <div class="main pb-5">
    <div class="text-center">
      <!-- Logo here -->
      <div class="logo-div">
        <img src="~/assets/img/logo.svg" class="img-fluid" alt="Chats" />
      </div>
      <h3 v-if="!isSuccess" class="text-white welcome py-4">
        Password Recovery
      </h3>

      <div class="banner  mx-auto  my-4" v-if="isSuccess">
        An email has been sent to the provided email address, kindly login to
        your email address to continue.
      </div>
    </div>

    <div class="d-flex justify-content-center align-items-center">
      <div class="card__holder">
        <p class="font-bold primar-black ">
          Forgot your password? that’s not a problem.
        </p>
        <p class="forgot">
          Kindly enter your registered email and we’ll send you a verification
          code to reset your password.
        </p>
        <form @submit.prevent="recoverPassword">
          <!-- Organisation email here -->
          <div class="form-group">
            <label for="email">Email Address</label>
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

          <div class="mt-4 pt-2 text-center">
            <button class="onboarding-btn">
              <span v-if="loading">
                <img
                  src="~/assets/img/vectors/spinner.svg"
                  class="btn-spinner"
                />
              </span>
              <span v-else>Send me a new password</span>
            </button>
          </div>
        </form>

        <div class="mt-4 ot-2 text-center">
          <p class="account">
            <nuxt-link class="font-bold login" to="/">Log in</nuxt-link>
            instead
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
import emailIcon from "~/components/icons/email-icon.vue";

export default {
  layout: "default",

  components: {
    emailIcon
  },

  data() {
    return {
      loading: false,
      emailActive: false,
      isSuccess: false,

      payload: {
        email: ""
      }
    };
  },

  validations: {
    payload: {
      email: {
        required,
        email
      }
    }
  },

  methods: {
    ...mapActions("authentication", ["commitToken", "commitUser"]),
    async recoverPassword() {
      try {
        this.loading = true;
        this.isSuccess = false;
        this.$v.payload.$touch();

        if (this.$v.payload.$error === true) {
          this.loading = false;
          this.$toast.error("Please fill in appropriately");
          return;
        }

        const response = await this.$axios.post(
          "/users/reset-password",
          this.payload
        );

        console.log("recover response", response);

        if (response.status == "success") {
          //   this.$toast.success(response.message);

          this.isSuccess = true;
        }

        this.loading = false;
      } catch (err) {
        this.loading = false;
        this.$toast.error(err.response.data.message);
      }
    }
  }
};
</script>

<style scoped>
.banner {
  background: #019f24;
  opacity: 0.95;
  color: white;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 450px;
  border-radius: 5px;
}

.account {
  color: #0b0b0b;
  font-size: 0.875rem;
  font-weight: 700;
  font-family: "Noto Sans", sans-serif;
}

.login {
  text-decoration: none;
  color: var(--primary-color);
}

.forgot {
  color: #646a86;
  opacity: 0.7;
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
