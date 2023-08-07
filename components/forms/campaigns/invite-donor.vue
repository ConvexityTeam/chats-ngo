<template>
  <div class="mt-4 px-3">
    <p class="text-center px-3 mb-3" style="color: #7c8db5">
      Add donor emails you want to invite to this project. The campain is set as
      private, only invited donors will have access.
    </p>

    <form @submit.prevent="sendInvite">
      <!-- Name field  here -->
      <div class="form-group">
        <label for="name"> Email Addresses </label>

        <InputTag
          v-model="inviteeEmail"
          :validate="validateInput"
          placeholder="Enter Email(s)"
        />
      </div>

      <!--Message field  here -->
      <div class="form-group">
        <label for="message">Message (Optional) </label>
        <textarea
          id="message"
          class="form-controls"
          placeholder="Enter product or service name"
          cols="30"
          rows="3"
          v-model="message"
        ></textarea>
      </div>

      <!-- button area here -->
      <div class="d-block my-3">
        <Button
          text="Send invite"
          type="submit"
          :has-icon="false"
          :loading="loading"
          :disabled="inviteeEmail.length < 1"
          custom-styles="height: 41px; border-radius:5px !important; width: 100%; font-size: 14px !important; padding: 0px 25px !important"
        />
      </div>
    </form>
  </div>
</template>

<script>
import InputTag from "vue-input-tag";

export default {
  emits: ["sendInvite"],
  components: { InputTag },
  props: {
    loading: {
      default: false,
    },
  },
  data() {
    return {
      message: "",
      inviteeEmail: [],
    };
  },
  methods: {
    validateInput(value) {
      return /[-a-zA-Z0-9@:%.\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%\+.~#?&//=]*)/.test(
        value
      );
    },
    async sendInvite() {
      const payload = {
        inviteeEmail: this.inviteeEmail,
        message: this.message,
      };

      this.$emit("sendInvite", payload);
    },
  },
};
</script>

<style scoped>
label {
  color: var(--primary-blue);
  font-size: 1rem;
  font-weight: 500;
}

.form-controls {
  border: 1px solid #7c8db5;
  background: white;
  height: 41px;
  padding: 0rem 0.75rem;
}

.form-controls::placeholder {
  color: #646a86;
  font-size: 0.875rem;
  letter-spacing: 0.01em;
}

textarea.form-controls {
  height: auto;
  resize: none;
  padding: 0.75rem;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
