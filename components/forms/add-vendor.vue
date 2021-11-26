<template>
  <form @submit.prevent="addVendor" class="mt-4 px-3">
    <!-- Name Section here  here -->
    <div class="row mb-4">
      <!-- First name here -->
      <div class="col-lg-6">
        <label for="first-name"> First Name</label>
        <input
          type="text"
          class="form-controls "
          :class="{
            error: $v.payload.first_name.$error
          }"
          id="first-name"
          placeholder="John"
          v-model="payload.first_name"
          @blur="$v.payload.first_name.$touch()"
        />
      </div>

      <!-- Last name here -->
      <div class="col-lg-6">
        <label for="last-name">Last Name</label>
        <input
          type="text"
          class="form-controls "
          :class="{
            error: $v.payload.last_name.$error
          }"
          id="last-name"
          placeholder="Doe"
          v-model="payload.last_name"
          @blur="$v.payload.last_name.$touch()"
        />
      </div>
    </div>

    <!-- Email Section here  here -->
    <div class="row mb-4">
      <!--  Email here -->
      <div class="col-lg-6">
        <label for="email"> Email</label>
        <input
          type="email"
          class="form-controls "
          :class="{
            error: $v.payload.email.$error
          }"
          id="email"
          placeholder="example@gmail.com"
          v-model="payload.email"
          @blur="$v.payload.email.$touch()"
        />
      </div>
    </div>

    <!-- Store Section here  here -->
    <div class="row mb-4">
      <!-- Store name here -->
      <div class="col-lg-6">
        <label for="store-name"> Store Name</label>
        <input
          type="text"
          class="form-controls "
          :class="{
            error: $v.payload.store_name.$error
          }"
          id="store-name"
          placeholder=""
          v-model="payload.store_name"
          @blur="$v.payload.store_name.$touch()"
        />
      </div>

      <!-- Store Location here -->
      <div class="col-lg-6">
        <label for="location">Store Location</label>

        <div :id="$v.payload.phone.$error ? 'error' : 'vendor'">
          <el-select
            id="location"
            v-model="payload.location.country"
            filterable
            placeholder=""
            @change="handleLocation"
          >
            <el-option
              v-for="(country, i) in countries"
              :key="i"
              :label="country.name"
              :value="country.name"
            >
            </el-option>
          </el-select>
        </div>
      </div>
    </div>

    <!-- Address Section  here -->
    <div class="row mb-4">
      <!-- Store name here -->
      <div class="col-lg-6">
        <label for="store-address"> Address</label>
        <input
          type="text"
          class="form-controls "
          :class="{
            error: $v.payload.address.$error
          }"
          id="store-address"
          placeholder=""
          v-model="payload.address"
          @blur="$v.payload.address.$touch()"
        />
      </div>

      <!-- Store Location here -->
      <div class="col-lg-6">
        <label for="vendor">Phone Number</label>

        <div>
          <vue-tel-input
            id="vendor"
            mode="international"
            class="form-controls"
            :class="{
              error: $v.payload.phone.$error
            }"
            :inputOptions="options"
            v-model="payload.phone"
          ></vue-tel-input>
        </div>
      </div>
    </div>

    <div class="save-btn d-flex pb-3 mt-4">
      <Button
        type="submit"
        :has-icon="false"
        text="Save"
        custom-styles="height:50px;  width: 100%"
        :loading="loading"
        :disabled="loading"
      />
    </div>
  </form>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import countries from "~/plugins/all-countries";
import { mapGetters } from "vuex";
let screenLoading;

export default {
  data: () => ({
    options: { placeholder: "(759) 012-3985" },
    countries: [],
    loading: false,
    orgId: "",
    payload: {
      first_name: "",
      last_name: "",
      email: "",
      store_name: "",
      location: {
        country: "",
        coordinates: []
        // coordinates: [9.081999, 8.675277]
      },
      address: "",
      phone: ""
    }
  }),

  validations: {
    payload: {
      first_name: {
        required
      },
      last_name: {
        required
      },
      email: {
        required,
        email
      },
      store_name: {
        required
      },
      location: {
        country: {
          required
        }
      },
      address: {
        required
      },
      phone: {
        required
      }
    }
  },

  computed: {
    ...mapGetters("authentication", ["user"])
  },

  mounted() {
    this.countries = countries;
    this.orgId = this.user.AssociatedOrganisations[0].OrganisationId;
  },

  methods: {
    async handleLocation() {
      try {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${this.payload.location.country}&key=${process.env.GOOGLE_API}`;

        // Check environmet and use respective url because of google map CORS error
        const request =
          process.env.NODE_ENV === "development"
            ? proxyurl + geocodingUrl
            : geocodingUrl;

        const response = await this.$axios.get(request);

        if (response.status == "OK") {
          const coordinates = Object.values(
            response.results[0].geometry.location
          );

          // Check if in development and if the geocoding request wasnt blocked by CORS
          if (process.env.NODE_ENV === "development") {
            return (this.payload.location.coordinates = coordinates.length
              ? coordinates
              : [9.081999, 8.675277]);
          }

          this.payload.location.coordinates = coordinates;
        }
        console.log("GEOCODED COORD::", this.payload.location.coordinates);
      } catch (err) {
        console.log("LOCATION ERR::", err);
      }
    },
    async addVendor() {
      try {
        this.loading = true;
        this.$v.payload.$touch();

        if (this.$v.payload.$error === true) {
          this.loading = false;
          return;
        }

        this.payload.location = this.payload.location
          ? JSON.stringify(this.payload.location)
          : {};

        this.payload.phone = this.payload.phone.replace(/\s/g, "");

        const response = await this.$axios.post(
          `organisations/${this.orgId}/vendors`,
          this.payload
        );

        if (response.status == "success") {
          this.loading = false;
          this.$emit("reload");
          this.closeModal();
          this.$toast.success(response.message);
        }

        console.log("ADD VENDOR RESPONSE", response);
      } catch (err) {
        console.log("ADDVENDORERR::", { err });
        this.$toast.error(err.response.data.message);
        this.loading = false;
      }
    },

    openScreen() {
      screenLoading = this.$loading({
        lock: true,
        spinner: "el-icon-loading",
        background: "#0000009b"
      });
    },

    closeModal() {
      this.$bvModal.hide("add-vendor");
    }
  }
};
</script>

<style scoped>
label {
  color: var(--tertiary-black);
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.01em;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-controls {
  background: #f5f6f8;
  border-radius: 8px;
  height: 50px;
  padding: 0rem 0.75rem;
}

.form-controls::placeholder {
  color: #646a86;
  font-size: 1rem;
}

.save-btn {
  width: 113px;
}
</style>
