<template>
  <div class="main pb-5">
    <div class="text-center ">
      <!-- Logo here -->
      <div class="logo-div">
        <img src="~/assets/img/logo.svg" class="img-fluid" alt="Chats" />
      </div>

      <h3 class="text-white welcome py-4">
        Password Recovery
      </h3>

      <!-- banner here -->
      <!-- <div class=" position-relative banner mx-auto" v-if="isSuccess">
        An email with verification code has been sent to {{ payload.email }}
      </div> -->
    </div>

    <div class="d-flex justify-content-center align-items-center">
      <div class="card__holder">
        <!-- Message for step 1 here -->
        <div v-if="!isSuccess && step === 1">
          <p class="font-bold primary-black">
            Forgot your password? that’s not a problem.
          </p>

          <p class="forgot">
            Kindly enter your registered email and we’ll send you a verification
            code to reset your password.
          </p>
        </div>

        <!-- Message for step 2 here -->
        <div v-if="isSuccess && step === 2">
          <p class="font-bold primary-black">
            Confirm verification code
          </p>

          <p class="forgot">
            Kindly enter the verification code sent to <br />
            {{ payload.email }}
          </p>
        </div>

        <!-- Message for step 3 here -->
        <div v-if="isSuccess && step === 3">
          <p class="font-bold primary-black">
            Set a new password
          </p>

          <p class="forgot">
            Choose a new password, something easy to remember.
          </p>
        </div>

        <!-- Step 1 form here -->
        <div v-if="!isSuccess">
          <step-1
            v-if="step === 1"
            @recoverPassword="recoverPassword"
            :loading="loading"
          />
        </div>

        <div v-if="isSuccess">
          <step-2
            v-if="step === 2"
            @handleCode="handleCode"
            :loading="loading"
          />

          <step-3
            v-if="step === 3"
            @resetPassword="resetPassword"
            :loading="loading"
          />
        </div>

        <div v-if="!isSuccess" class="mt-4 ot-2 text-center">
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
import step1 from "~/components/forms/password-recovery/step-1.vue";
import step2 from "~/components/forms/password-recovery/step-2.vue";
import step3 from "~/components/forms/password-recovery/step-3.vue";

import { mapActions } from "vuex";
import email from "vuelidate/lib/validators/email";

export default {
  layout: "default",

  components: {
    step1,
    step2,
    step3
  },

  data: () => ({
    loading: false,
    isSuccess: false,
    step: 1,
    email: "",
    payload: {
      email: ""
      // ref: "",
      // otp: "",
      // password: "",
      // confirm_password: ""
    }
  }),

  methods: {
    ...mapActions("authentication", ["commitToken", "commitUser"]),
    async recoverPassword(value) {
      try {
        this.payload.email = value;
        this.loading = true;
        this.isSuccess = false;

        const response = await this.$axios.post("/auth/password/reset", {
          email: value
        });

        console.log("recover response", response);

        if (response.status == "success") {
          this.$toast.success(
            `An email with verification code has been sent to ${this.payload.email}`
          );
          this.payload.ref = response.data.ref;
          this.isSuccess = true;
          this.step = 2;
        }

        this.loading = false;
      } catch (err) {
        this.loading = false;
        console.log(err);
        this.$toast.error(err.response?.data?.message);
      }
    },

    handleCode(value) {
      this.payload.otp = value; 
      this.step = 3;
    },
    async resetPassword(payload) {
      try {
        this.loading = true;
        this.payload.password = payload.password;
        this.payload.confirm_password = payload.confirm_password;

        const response = await this.$axios.put(
          "/auth/password/reset",
          this.payload
        );

        if (response.status == "success") {
          this.$toast.success(response.message);
          this.$router.push("/");
        }

        console.log("Reset response", response);
        this.loading = false;
      } catch (err) {
        this.loading = false;
        console.log("RESET PASSWORD::", err);
        this.$toast.error(err.response?.data?.message);
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
  bottom: 80px;
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
