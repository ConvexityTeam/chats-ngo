<template>
  <div class="main pt-4 pb-5 transparent container">
    <form class="holder" @submit.prevent="submitForm">
      <!-- First and last name -->
      <div class="row">
        <div class="form-group col">
          <input
            type="text"
            class="form-controls"
            name="name"
            id="name"
            placeholder="First Name"
            :value="user.first_name"
            disabled
          />
        </div>
        <div class="form-group col">
          <input
            type="text"
            class="form-controls"
            name="name"
            id="name"
            placeholder="Last Name"
            :value="user.last_name"
            disabled
          />
        </div>
      </div>

      <!-- Email and phone number -->
      <div class="row">
        <div class="form-group col">
          <input
            type="email"
            class="form-controls"
            name="email"
            id="email"
            placeholder="Email Address"
            :value="user.email"
            disabled
          />
        </div>

        <div class="form-group col">
          <vue-tel-input
            id="phone"
            name="phone"
            placeholder="Phone"
            mode="international"
            class="form-controls phone_disabled phone"
            :value="user.phone"
            disabled
          ></vue-tel-input>
        </div>
      </div>

      <!-- Subject -->
      <div class="form-group">
        <input
          type="text"
          class="form-controls"
          name="subject"
          id="subject"
          placeholder="Subject"
          :class="{
            error: $v.payload.subject.$error,
          }"
          v-model="payload.subject"
          @blur="$v.payload.subject.$touch()"
        />
      </div>

      <!-- description -->
      <div class="form-group">
        <textarea
          :class="{
            form__input__error: $v.payload.description.$error,
          }"
          v-model="payload.description"
          @blur="$v.payload.description.$touch()"
          rows="30"
          placeholder="Enter something..."
        ></textarea>
      </div>

      <div class="d-flex justify-content-end w-100">
        <Button
          type="submit"
          :has-icon="false"
          text="Submit"
          custom-styles="height:50px"
          :loading="loading"
          :disabled="loading"
        />
      </div>
    </form>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";

export default {
  name: "Support",
  layout: "dashboard",

  data: () => ({
    loading: false,
    payload: {
      description: "",
      subject: "",
    },
  }),

  validations: {
    payload: {
      subject: { required },
      description: { required },
    },
  },

  computed: {
    ...mapGetters("authentication", ["user"]),
  },

  methods: {
    async submitForm() {
      try {
        this.loading = true;
        this.$v.payload.$touch();

        if (this.$v.payload.$error) {
          return (this.loading = false);
        }

        const data = {
          email: this.user.email,
          ...this.payload,
          contact: {
            email: this.user.email,
            firstName: this.user.first_name,
            lastName: this.user.last_name,
          },
        };

        const response = await this.$axios.post(
          "organisation/zoho-cretate-ticket",
          data
        );

        if (response.status == "success") {
          this.$toast.success(response.message);
          this.resetPayload();
        }
      } catch (error) {
        console.log(error);
        this.$toast.error(error?.response?.data?.message);
      } finally {
        this.loading = false;
      }
    },

    resetPayload() {
      this.payload = {
        description: "",
        subject: "",
      };

      this.$v.$reset();
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  height: calc(100vh - 72px);
  overflow-y: scroll;
}

.holder {
  background: #ffffff;
  box-shadow: 0px 4px 30px rgba(174, 174, 192, 0.2);
  border-radius: 10px;
  width: 65%;
  height: auto;
  padding: 30px;
}

.form-controls {
  padding: 0 0.75rem;

  &::placeholder {
    color: #7c8db5;
    font-size: 1rem;
  }

  &:disabled {
    background: #ccced1;
    color: #646a86;
  }
}

textarea {
  width: 100%;
  height: 10rem;
  padding: 1rem 0.75rem;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;
  color: #222222;
  background-color: #f5f6f8;
  border: none;
  border-radius: 5px;
  transition: all 0.3s ease;
  resize: none;
  outline: none;

  &::placeholder {
    color: #7c8db5;
    font-size: 1rem;
  }

  &:focus {
    border: 1px solid var(--primary-color) !important;
  }

  &.form__input__error {
    border: 1px solid #ff0000 !important;
  }
}

.phone_disabled {
  background: #ccced1;
  color: #646a86;
}
</style>

<style>
.phone {
  border: none;
  background-color: none;
  border-radius: 5px;
  padding: 0rem 0.7rem;
}
</style>
