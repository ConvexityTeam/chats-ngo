<template>
  <div class="main pb-5">
    <div class="text-center">
      <!-- Logo here -->
      <div class="logo-div">
        <img src="~/assets/img/logo.png" class="" alt="Chats" />
      </div>
      <h3 class="text-white welcome py-4">Welcome To CHATS</h3>
    </div>

    <div class="d-flex justify-content-center align-items-center">
      <div class="card__holder">
        <form @submit.prevent="loginUser">
          <!-- Organisation email here -->
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              class="form-controls"
              :class="{ form__input__error: $v.payload.email.$error }"
              id="email"
              v-model="payload.email"
              @blur="$v.payload.email.$touch()"
            />
          </div>

          <!-- Password here -->
          <div class="form-group pb-2">
            <label for="password">Password</label>
            <input
              type="password"
              class="form-controls"
              :class="{ form__input__error: $v.payload.password.$error }"
              id="password"
              v-model="payload.password"
              @blur="$v.payload.password.$touch()"
            />
          </div>

          <div class="mt-4 text-center">
            <button class="onboarding-btn">
              <span v-if="loading">
                <img
                  src="~/assets/img/vectors/spinner.svg"
                  class="btn-spinner"
                />
              </span>
              <span v-else>Login</span>
            </button>
          </div>
        </form>

        <div class="mt-4 text-center">
          <p class="account">
            Have an account?
            <nuxt-link class="font-bold login" to="/">Sign Up</nuxt-link>
          </p>
          <p class="">
            <nuxt-link class="forgot" to="/forgot-password"
              >Forgot Password?</nuxt-link
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
export default {
  layout: "default",

  data() {
    return {
      loading: false,
      payload: {
        email: "",
        password: "",
      },
    };
  },
  validations: {
    payload: {
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    },
  },

  methods: {
    ...mapActions("authentication", ["commitToken", "commitUser"]),

    async loginUser() {
      try {
        this.loading = true;
        this.$v.payload.$touch();

        if (this.$v.payload.$error === true) {
          this.loading = false;
          this.$toast.error("Please fill in appropriately");
          return;
        }

        const response = await this.$axios.post("/auth/login", this.payload);
        console.log("login response", response);

        if (response.data.code == 200) {
          this.loading = false;
          this.commitToken(response.data.data.token);
          this.commitUser(response.data.data.user);
          this.$router.push("/dashboard");
        }
      } catch (error) {
        this.loading = false;
        this.$toast.error(error.response.data.message);
      }
    },
  },
};
</script>

<style scoped>
.login {
  text-decoration: underline;
  color: var(--primary-black);
  font-weight: 700;
}

.forgot {
  color: var(--primary-black);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.01em;
}

.account {
  color: var(--primary-black);
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0.01em;
}

.welcome {
  font-size: 2.25rem;
  font-weight: 500;
}

.logo-div {
  padding-top: 50px;
}

.main {
  background-image: url("../../assets/img/CHATS bgchats-bg.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.card__holder {
  background: #ffffff;
  border-radius: 10px;
  padding: 2rem 4rem;
  width: 31.25rem;
}
label {
  color: var(--primary-black);
  font-size: 1rem;
  font-weight: 400;
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
