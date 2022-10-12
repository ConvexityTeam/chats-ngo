<template>
  <div class="main  pt-4 pb-5 transparent container">
    <form class="holder" @submit.prevent="submitForm">
      <!-- First and last name -->
      <div class="row">
        <div class="form-group col">
          <input type="text" class="form-controls" :class="{

          }" name="name" id="name" placeholder="First Name" v-model="payload.contact.first_name" />
        </div>
        <div class="form-group col">
          <input type="text" class="form-controls" :class="{

          }" name="name" id="name" placeholder="Last Name" v-model="payload.contact.last_name" />
        </div>
      </div>

      <!-- Email and phone number -->
      <div class="row">
        <div class="form-group col">
          <input type="text" class="form-controls" name="email" id="email" placeholder="Email Address" :class="{

          }" v-model="payload.email" @blur="$v.payload.email.$touch()" />
        </div>
        <div class="form-group col">
          <input type="number" class="form-controls" :class="{

          }" name="phone" id="phone" placeholder="Phone" v-model="payload.contact.phone" />
        </div>
      </div>
      <!-- Subject -->
      <div class="form-group">
        <input type="text" class="form-controls" name="subject" id="subject" placeholder="Subject" :class="{
          error: $v.payload.subject.$error,
        }" v-model="payload.subject" @blur="$v.payload.subject.$touch()" />
      </div>
      <!-- description -->
      <div class="form-group">
        <textarea :class="{
          error: $v.payload.description.$error,
        }" v-model="payload.description" @blur="$v.payload.description.$touch()" rows="30"
          placeholder="Enter something..." class="txt-area"></textarea>
      </div>
      <div class="d-flex justify-content-end w-100">
        <Button type="submit" :has-icon="false" text="Submit" custom-styles="height:50px" :loading="loading"
          :disabled="loading" />
      </div>
    </form>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  name: 'Support',
  layout: 'dashboard',
  data() {
    return {
      loading: false,
      payload: {
        email: '',
        subject: '',
        departmentId: '661286000000006907',
        phone: '',
        contact: {
          email: '',
          first_name: '',
          last_name: '',
        },
        description: '',
      },

    }
  },

  validations: {
    payload: {
      email: {
        required
      },
      subject: {
        required
      },
      description: {
        required
      }
    }
  },

  methods: {
    async submitForm() {
      try {

        this.loading = true
        this.payload.contact.email = this.payload.email

        this.$v.payload.$touch();

        if (this.$v.payload.email.$error === true || this.$v.payload.subject.$error === true || this.$v.payload.description.$error === true) {
          return (this.loading = false);
        }

        const response = await this.$axios.post(
          'organisation/zoho-cretate-ticket',
          this.payload
        );

        if (response.status == "success") {
          this.loading = false;
          this.$toast.success(response.message);
        }

      } catch (error) {
        console.log(error);
        this.$toast.error(error?.response?.data?.message);
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
.main {
  height: calc(100vh - 72px);
  overflow-y: scroll;
}

.container {
  margin-left: -30px;
}

.holder {
  background: #ffffff;
  box-shadow: 0px 4px 30px rgba(174, 174, 192, 0.2);
  border-radius: 10px;
  width: 65%;
  height: auto;
  padding: 30px;
}

.txt-area {
  width: 100%;
  height: 10rem;
  padding: 1rem 2.5rem;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;
  color: #222222;
  background-color: #f5f6f8;
  border: none;
  border-radius: 5px;
  transition: all 0.3s ease;
  outline: none;
}

.txt-area::placeholder {
  color: #7c8db5;
}

.txt-area:focus {
  border: 1px solid var(--primary-color) !important;
}
</style>