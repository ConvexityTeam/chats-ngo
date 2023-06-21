<template>
  <form @submit.prevent="updatePassword">
    <div class="form-heading pt-2">
      <p class="font-bold primary-black">Change password</p>
      <p class="input-text w-75">
        Choose a new password, something easy to <br />
        remember.
      </p>
    </div>

    <!-- old password  -->
    <div class="row">
      <div class="col-lg-8 mb-3 input-container">
        <span class="poppins text-sm"
          ><label for="state">Old Password</label></span
        >
        <input
          :type="showpassword ? 'text' : 'password'"
          class="form-controls px-5"
          placeholder="Enter old password"
          autocomplete="current-password"
          :class="{ error: $v.payload.old_password.$error }"
          id="password"
          v-model="payload.old_password"
          @focus="passActive = true"
          @blur="$v.payload.old_password.$touch()"
        />
        <div class="position-absolute icon-left pl-4">
          <IconsLockIcon :active="passActive" />
        </div>

        <div
          class="position-absolute icon-right pr-4"
          @click="showpassword = !showpassword"
        >
          <IconsEyeOpen v-if="showpassword" />
          <IconsEyeClosed v-else />
        </div>
      </div>
    </div>

    <!-- new password  -->
    <div class="row">
      <div class="col-lg-8 input-container">
        <span class="poppins text-sm"
          ><label for="password">New Password</label></span
        >
        <input
          :type="showpassword2 ? 'text' : 'password'"
          class="form-controls px-5"
          placeholder="Enter new password"
          autocomplete="new-password"
          :class="{ error: $v.payload.new_password.$error }"
          id="new_password"
          v-model="payload.new_password"
          @focus="passActive2 = true"
          @blur="$v.payload.new_password.$touch()"
        />
        <div class="position-absolute icon-left pl-4">
          <IconsLockIcon :active="passActive2" />
        </div>

        <div
          class="position-absolute icon-right pr-4"
          @click="showpassword2 = !showpassword2"
        >
          <IconsEyeOpen v-if="showpassword2" />
          <IconsEyeClosed v-else />
        </div>
      </div>
    </div>

    <!--Password Validity here  -->
    <div class="password-validity mb-3">
      <template v-if="!payload.new_password.length">
        <p class="pt-2">
          Make sure it's at least 8 characters including a number, special
          character and an uppercase letter.
        </p>
      </template>

      <template v-else>
        <PasswordValidation :validations="$v.payload.new_password" />
      </template>
    </div>

    <!--Confirm new password  -->
    <div class="row">
      <div class="col-lg-8 mb-3 input-container">
        <span class="poppins text-sm"
          ><label for="state">Confirm New Password</label></span
        >
        <input
          :type="showpassword3 ? 'text' : 'password'"
          class="form-controls px-5"
          placeholder="Re-Enter new password"
          autocomplete="new-password"
          :class="{ error: $v.payload.confirm_newpassword.$error }"
          id="confirm_password"
          v-model="payload.confirm_newpassword"
          @focus="passActive3 = true"
          @blur="$v.payload.confirm_newpassword.$touch()"
        />
        <div class="position-absolute icon-left pl-4">
          <IconsLockIcon :active="passActive3" />
        </div>

        <div
          class="position-absolute icon-right pr-4"
          @click="showpassword3 = !showpassword3"
        >
          <IconsEyeOpen v-if="showpassword3" />
          <IconsEyeClosed v-else />
        </div>
      </div>
    </div>

    <div>
      <div class="save-btn mt-2 w-25">
        <Button
          type="submit"
          fontSize="1rem"
          :has-icon="false"
          text="Save"
          custom-styles="height:50px;  width:100%; font-size: 1rem !important;"
          :loading="loading"
          :disabled="loading"
        />
      </div>
    </div>
  </form>
</template>

<script>
import { required, sameAs, minLength } from "vuelidate/lib/validators";

export default {
  name: "ChangePassword",

  data: () => ({
    loading: false,

    passActive: false,
    passActive2: false,
    passActive3: false,

    showpassword: false,
    showpassword2: false,
    showpassword3: false,

    payload: {
      old_password: "",
      new_password: "",
      confirm_newpassword: "",
    },
  }),

  validations: {
    payload: {
      old_password: { required },
      new_password: {
        required,
        minLength: minLength(8),
        containsUppercase: (value) => /[A-Z]/.test(value),
        containsLowercase: (value) => /[a-z]/.test(value),
        containsNumber: (value) => /[0-9]/.test(value),
        containsSpecial: (value) =>
          /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value),
      },
      confirm_newpassword: {
        required,
        sameAs: sameAs((vm) => {
          return vm.new_password;
        }),
      },
    },
  },

  methods: {
    async updatePassword() {
      try {
        this.loading = true;
        this.$v.payload.$touch();

        if (this.$v.payload.$error) {
          return (this.loading = false);
        }

        delete this.payload?.confirm_newpassword;
        const response = await this.$axios.put("/users/password", this.payload);

        if (response.status == "success") {
          this.$toast.success(response.message);
        }

        console.log("Reset response", response);
        this.loading = false;
      } catch (err) {
        this.loading = false;
        console.log("RESET PASSWORD::", err);
        this.$toast.error(err.response?.data?.message);
      }
    },
  },
};
</script>

<style scoped>
label {
  color: var(--primary-black);
  font-size: 0.875rem;
}

.password-validity {
  width: 70%;
}

.form-controls {
  background: #f5f6f8;
  border-radius: 8px;
  height: 50px;
  padding: 0rem 0.75rem;
}

.form-controls::placeholder {
  color: #8f94a7;
  font-size: 0.875rem;
}
</style>
