<template>
  <div class="main pb-5">
    <div class="text-center">
      <!-- Logo here -->
      <div class="logo-div">
        <img src="~/assets/img/logo.png" class="img-fluid" alt="Chats" />
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
        password: ""
      }
    };
  },
  validations: {
    payload: {
      email: {
        required,
        email
      },
      password: {
        required
      }
    }
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

        const encrypted = this.CryptoJS.AES.encrypt(
          JSON.stringify(this.payload),
          "PO#64a978c028JA68c40182#!UAOENL#c22eaSNLSJFLJFSD@#31d740239c6243+*9c62439c6b1d41d7402"
        ).toString();

        console.log("PL:::", encrypted);

        const response = await this.$axios.post("/auth/login", {
          data: encrypted
        });

        console.log("login response", response);

        if (response.status == "success") {
          this.commitToken(response.data.token);
          this.commitUser(response.data.user);
          this.$router.push("/dashboard");
        } else {
          this.$toast.error(response.message);
        }
        
        this.loading = false;
      } catch (err) {
        this.loading = false;
      }
    }
  }
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
  padding: 50px 15px 0px 15px;
}

.main {
  background-image: url("../../assets/img/DSC_1227-min 2 jpeg-min.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100vh;
  overflow: auto;
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
