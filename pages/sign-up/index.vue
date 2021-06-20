<template>
  <div class="main pb-5">
    <div class="text-center">
      <!-- Logo here -->
      <div class="logo-div pt-5">
        <img src="~/assets/img/logo.svg" class="img-fluid" alt="Chats" />
      </div>
      <h3 class="text-white welcome pt-4">Welcome To CHATS</h3>
    </div>

    <div class="d-flex justify-content-center align-items-center pt-4">
      <div class="card__holder">
        <form @submit.prevent="registerUser">
          <!-- Organisation name here -->
          <div class="form-group">
            <label for="name">Name of organization</label>
            <input
              type="text"
              class="form-controls"
              placeholder="Enter organization"
              :class="{
                form__input__error: $v.payload.organisation_name.$error
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
              type="website"
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
          <div class="form-group ">
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
            <div class="position-absolute icon-left ">
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

          <!-- Terms here -->
          <!-- <div class="form-group d-flex" style="align-items: flex-end">
            <checkbox id="terms" @input="checkTerms" />

            <div class="ml-3">
              <label for="terms" class="terms"
                >By creating an account, you agree to our
                <span> <a href="#"> Terms of use</a></span> and acknowledge our
                <span> <a href="#"> Privacy Policy.</a></span>
              </label>
            </div>
          </div> -->

          <!-- Submit button here -->
          <div class=" text-center mt-3">
            <button class="onboarding-btn">
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
            <nuxt-link class="font-bold login" to="/">Login</nuxt-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
import organisationIcon from "~/components/icons/organisation-icon.vue";
import emailIcon from "~/components/icons/email-icon.vue";
import globeIcon from "~/components/icons/globe-icon.vue";
import lockIcon from "~/components/icons/lock-icon.vue";
import eyeClosed from "~/components/icons/eye-closed.vue";
import eyeOpen from "~/components/icons/eye-open.vue";
import checkbox from "~/components/generic/checkbox.vue";

export default {
  layout: "default",

  components: {
    organisationIcon,
    emailIcon,
    globeIcon,
    lockIcon,
    checkbox,
    eyeClosed,
    eyeOpen
  },

  data() {
    return {
      loading: false,
      orgActive: false,
      emailActive: false,
      webActive: false,
      passActive: false,
      showpassword: false,
      payload: {
        organisation_name: "",
        email: "",
        website_url: "",
        // terms: false,
        password: ""
      }
    };
  },

  validations: {
    payload: {
      organisation_name: {
        required
      },
      email: {
        required,
        email
      },
      website_url: {
        required
      },
      // terms: {
      //   required
      // },
      password: {
        required
      }
    }
  },

  methods: {
    ...mapActions("authentication", ["commitToken", "commitUser"]),

    checkTerms(value) {
      this.payload.terms = value;
      console.log("PLS:::", this.payload.terms);
    },
    async registerUser() {
      try {
        this.loading = true;
        this.$v.payload.$touch();

        if (this.$v.payload.$error === true) {
          this.loading = false;
          // this.$toast.error("Please fill in appropriately");
          return;
        }

        const response = await this.$axios.post(
          "/auth/ngo-register",
          this.payload
        );

        console.log("Register response", response);

        if (response.status == "success") {
          this.$toast.success(response.message);
          this.loginUser();
        }

        this.loading = false;
      } catch (err) {
        this.$toast.error(err.response.data.message);

        if (
          err.response.data.message ==
          "Email Already Exists, Recover Your Account"
        ) {
          this.$router.push("/");
        }

        this.loading = false;
      }
    },

    async loginUser() {
      try {
        const data = {
          email: this.payload.email,
          password: this.payload.password
        };

        const response = await this.$axios.post("/auth/login", data);

        console.log("login response", response);

        if (response.status == "success") {
          this.commitToken(response.data.token);
          this.commitUser(response.data.user);
          this.$router.push("/settings");
        }
      } catch (err) {
        this.loading = false;
        this.$toast.error(err.response.data.message);
      }
    }
  }
};
</script>

<style scoped>
.account {
  color: #0b0b0b;
  font-size: 0.875rem;
  font-weight: 700;
  font-family: "Noto Sans", sans-serif;
}

.account.login {
  text-decoration: none;
  color: #277ef0;
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
