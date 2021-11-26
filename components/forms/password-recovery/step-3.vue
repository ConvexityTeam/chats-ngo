<template>
  <form @submit.prevent="resetPassword">
    <!-- Password  here -->
    <div class="form-group">
      <label for="email">Password</label>
      <input
        id="password"
        :type="showpassword ? 'text' : 'password'"
        class="form-controls"
        placeholder="Enter new password"
        :class="{ form__input__error: $v.payload.password.$error }"
        v-model="payload.password"
        @focus="passwordActive = true"
        @blur="$v.payload.password.$touch()"
      />
      <div class="position-absolute icon-left ">
        <lock-icon :active="passwordActive" />
      </div>

      <div
        class="position-absolute icon-right"
        @click="showpassword = !showpassword"
      >
        <eye-open v-if="showpassword" />
        <eye-closed v-else />
      </div>
    </div>

    <!--Confirm Password  here -->
    <div class="form-group">
      <label for="email">Password Confirmation</label>
      <input
        id="confirm_password"
        :type="showConfirm ? 'text' : 'password'"
        class="form-controls"
        placeholder="Re-enter new password"
        :class="{ form__input__error: $v.payload.confirm_password.$error }"
        v-model="payload.confirm_password"
        @focus="confirmActive = true"
        @input="$v.payload.confirm_password.$touch()"
      />
      <div class="position-absolute icon-left ">
        <lock-icon :active="confirmActive" />
      </div>

      <div
        class="position-absolute icon-right"
        @click="showConfirm = !showConfirm"
      >
        <eye-open v-if="showConfirm" />
        <eye-closed v-else />
      </div>
    </div>

    <div class="my-4 pt-2 text-center">
      <button :disabled="loading" class="onboarding-btn">
        <span v-if="loading">
          <img src="~/assets/img/vectors/spinner.svg" class="btn-spinner" />
        </span>
        <span v-else>Change password</span>
      </button>
    </div>
  </form>
</template>

<script>
import { required, sameAs } from "vuelidate/lib/validators";
import lockIcon from "~/components/icons/lock-icon.vue";
import eyeClosed from "~/components/icons/eye-closed.vue";
import eyeOpen from "~/components/icons/eye-open.vue";

export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    showpassword: false,
    showConfirm: false,
    passwordActive: false,
    confirmActive: false,

    payload: {
      password: "",
      confirm_password: ""
    },

    email: ""
  }),

  validations: {
    payload: {
      password: {
        required
      },

      confirm_password: {
        required,
        sameAs: sameAs(vm => {
          return vm.password;
        })
      }
    }
  },

  components: {
    lockIcon,
    eyeClosed,
    eyeOpen
  },

  methods: {
    resetPassword() {
      this.$v.payload.$touch();

      if (this.$v.payload.$error === true) {
        this.$toast.error("Please fill in appropriately");
        return;
      }

      this.$emit("resetPassword", this.payload);
    }
  }
};
</script>
