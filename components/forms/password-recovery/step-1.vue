<template>
  <form @submit.prevent="recoverPassword">
    <!-- Organisation email here -->
    <div class="form-group">
      <label for="email">Email Address</label>
      <input
        type="email"
        class="form-controls"
        placeholder="example@gmail.com"
        :class="{ form__input__error: $v.email.$error }"
        id="email"
        v-model="email"
        @focus="emailActive = true"
        @blur="$v.email.$touch()"
      />
      <div class="position-absolute icon-left">
        <email-icon :active="emailActive" />
      </div>
    </div>

    <div class="my-4 pt-2 text-center">
      <button :disabled="loading" class="onboarding-btn">
        <span v-if="loading">
          <img src="~/assets/img/vectors/spinner.svg" class="btn-spinner" />
        </span>
        <span v-else>Send me a verification code</span>
      </button>
    </div>
  </form>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import emailIcon from "~/components/icons/email-icon.vue";
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    emailActive: false,
    email: ""
  }),

  validations: {
    email: {
      email,
      required
    }
  },

  components: {
    emailIcon
  },

  methods: {
    recoverPassword() {
      this.$v.$touch();

      if (this.$v.$error === true) {
        this.$toast.error("Please fill in appropriately");
        return;
      }

      this.$emit("recoverPassword", this.email);
    }
  }
};
</script>
