<template>
  <div>
    <div class="row">
      <!-- Form Here -->
      <div class="col-lg-7">
        <div class="form-holder p-4">
          <div>
            <!-- User Profile here  -->
            <div>
              <!-- Name section here  -->
              <div class="row">
                <!-- First Name  -->
                <div class="col-lg-6 mb-3">
                  <label for="first_name">First Name</label>
                  <input
                    type="text"
                    id="first_name"
                    placeholder="Juliana"
                    class="profile-control px-3"
                    :class="{ error: $v.payload.first_name.$error }"
                    v-model="payload.first_name"
                    @blur="$v.payload.first_name.$touch()"
                  />
                </div>

                <div class="col-lg-6 mb-3">
                  <label for="last_name">Last Name</label>
                  <input
                    type="text"
                    id="last_name"
                    placeholder="Orji"
                    class="profile-control px-3"
                    :class="{ error: $v.payload.last_name.$error }"
                    v-model="payload.last_name"
                    @blur="$v.payload.last_name.$touch()"
                  />
                </div>
              </div>

              <!-- Email - pHone Number section here  -->
              <div class="row">
                <!-- Email Here  -->
                <div class="col-lg-6 mb-3">
                  <label for="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Julianamonday@gmail.com"
                    class="profile-control px-3"
                    :class="{ error: $v.payload.email.$error }"
                    v-model="payload.email"
                    @blur="$v.payload.email.$touch()"
                  />
                </div>

                <!-- Phone number Here  -->
                <div class="col-lg-6 mb-3">
                  <label for="phone">Phone Number</label>
                  <vue-tel-input
                    id="phone"
                    mode="international"
                    class="profile-control phone-num"
                    :inputOptions="options"
                    v-model="payload.phone"
                  ></vue-tel-input>
                </div>

                <!-- Default currency  -->
                <div class="col-lg-6 mb-3 mt-5">
                  <label for="phone">Default currency</label>
                  <vue-tel-input
                    id="currency"
                    mode="international"
                    class="profile-control currency"
                    :inputOptions="options"
                    v-model="payload.currency"
                  ></vue-tel-input>
                </div>
              </div>
            </div>

            <button
              type="button"
              @click="updateProfile"
              class="px-4 mt-3 py-2 d-flex align-items-center justify-content-center save-btn text-white"
            >
              <span v-if="loading">
                <img src="~/assets/img/vectors/spinner.svg" class="btn-spinner"
              /></span>

              <span v-else>Save</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import countries from "~/plugins/all-countries";
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    name: "ProfileSettings",
    components: {
      Camera
    },
    options: { placeholder: "Phone number" },
    loading: false,
    countries: [],
    step: 1,
    file: {},
    payload: {
      organisation_id: 0,
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address: "",
      state: "",
      country: "",
      registration_id: "",
      year: "",
      logo: {},
      website_url: ""
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
        email,
        required
      },
      phone: {
        required
      },
      address: {
        required
      },
      state: {
        required
      },
      country: {
        required
      },
      registration_id: {
        required
      },
      year: {
        required
      },
      website_url: {
        required
      }
    }
  },

  computed: {
    ...mapGetters("authentication", ["user"])
  },

  mounted() {
    this.countries = countries;
    this.loadData();
    console.log("user:::", this.user);
  },

  methods: {
    ...mapActions("authentication", ["commitUserUpdate"]),
    async updateProfile() {
      try {
        this.loading = true;

        this.$v.payload.$touch();

        if (this.$v.payload.$error === true) {
          if (this.$v.payload.country.$error === true) {
            this.$toast.error("Please select a country");
            this.loading = false;
            return;
          }

          this.loading = false;
          this.$toast.error("Please fill in appropriately");
          return;
        }

        const formData = new FormData();

        const {
          organisation_id,
          first_name,
          last_name,
          email,
          phone,
          address,
          state,
          country,
          registration_id,
          year,
          logo,
          website_url
        } = this.payload;

        formData.append("organisation_id", organisation_id);
        formData.append("first_name", first_name);
        formData.append("last_name", last_name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("address", address);
        formData.append("state", state);
        formData.append("country", country);
        formData.append("registration_id", registration_id);
        formData.append("year", year);
        formData.append("logo", logo);
        formData.append("website_url", website_url);

        const response = await this.$axios.post(
          `/organisation/update-profile`,
          formData
        );

        if (response.status == "success") {
          this.$toast.success(response.message);
          this.commitUserUpdate(response.data.org);
        }

        console.log("updateResponse:::", response);
        this.loading = false;
      } catch (err) {
        console.log("updateerr::::", err.response);
        this.loading = false;
        this.$toast.error(err.response.data.message);
      }
    },

    loadData() {
      this.file = this.user.AssociatedOrganisations[0].Organisation.logo_link;
      this.payload.logo = this.user.AssociatedOrganisations[0].Organisation.logo_link;

      console.log("logo", this.payload.logo, " ---", " file", this.file);

      this.payload.organisation_id = this.user.AssociatedOrganisations[0].Organisation.id;
      this.payload.address = this.user.AssociatedOrganisations[0].Organisation.address;
      this.payload.state = this.user.AssociatedOrganisations[0].Organisation.state;
      this.payload.country = this.user.AssociatedOrganisations[0].Organisation.country;
      this.payload.registration_id = this.user.AssociatedOrganisations[0].Organisation.registration_id;
      this.payload.year = this.user.AssociatedOrganisations[0].Organisation.year_of_inception;
      this.payload.website_url = this.user.AssociatedOrganisations[0].Organisation.website_url;

      this.payload.first_name = this.user.first_name;
      this.payload.last_name = this.user.last_name;
      this.payload.email = this.user.email;
      this.payload.phone = this.user.AssociatedOrganisations[0].Organisation.phone;
    },

    handleFile(value) {
      const file = value.target.files[0];
      console.log("file", value.target.files[0]);
      this.file = URL.createObjectURL(file);
      this.payload.logo = file;
    }
  }
};
</script>

<style scoped>
.ctn-mgt-btn {
  border-radius: 10px;
  background: #f5f6f8;
}
.mgt-btn-container {
  width: 50%;
  display: flex;
  align-content: center;
  justify-content: center;
}
.mgt-btn {
  color: #646a86;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  color: #333333;
  background: inherit;
  border-radius: 10px;
}
.mgt-btn.active {
  color: #fff;
  font-weight: 500;
  background: #9dadca;
  border: none;
  border-radius: 10px;
  width: 100%;
}
.mgt-btn:focus {
  outline: none;
}
.mgt-btn.one {
  padding: 0.6rem 3.5rem;
}
.mgt-btn.two {
  padding: 0.6rem 5.2rem;
}
.profile-control.reg_id {
  background-color: #c7c7c7;
}
.objec-fit {
  object-fit: contain;
}
.logo-text {
  font-weight: 500;
  font-size: 1rem;
  color: var(--primary-color);
}
input[type="file"] {
  display: none;
}
.profile-control.currency {
  border: 1px solid #999999;
  background-color: none;
}
.profile-card {
  background: #ffffff;
  box-shadow: 0px 4px 30px rgba(174, 174, 192, 0.2);
  border-radius: 10px;
  border: none;
  color: var(--primary-text-color);
  padding: 1.5rem;
}
.profile-card-org-name {
  color: var(--primary-text-color);
  font-weight: bold;
  font-size: 1.125rem;
}
.profile-card-image-holder {
  border-radius: 50%;
  width: 150px;
  height: 150px;
  background: #e7e7e7;
  border: none;
  margin-top: -20px;
}
.profile-card-id {
  color: var(--input-text-color);
  font-size: 1rem;
  font-weight: 400;
  margin-top: -15px;
}

.profile-card-website-url {
  color: var(--secondary-text-color);
  font-size: 0.875rem;
  font-weight: 500;
  margin-top: -15px;
}
.close-btn {
  position: absolute;
  right: 0;
  top: 0;
  padding: 0.5rem;
  color: var(--primary-text-color);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
}

.save-btn {
  background: var(--primary-color);
  border-radius: 10px;
  font-size: 1rem;
  border: none;
}
.save-btn:focus {
  outline: none;
}
.form-holder {
  background: #ffffff;
  box-shadow: 0px 4px 30px rgba(174, 174, 192, 0.2);
  border-radius: 10px;
}

label {
  font-size: 1rem;
  font-weight: 500;
  color: #333333;
}

.profile-control {
  width: 100%;
  border: none;
  height: 42px;
  border-radius: 10px;
  background: #f5f6f8;
}
.profile-control.error {
  border: 1px #ee3934 !important;
  border-style: solid solid double solid !important;
}
.profile-control::placeholder {
  color: #333333;
  opacity: 0.5;
  font-size: 0.875rem;
  font-weight: 400;
}

.profile-control:focus {
  outline: none;
  border: 1px solid var(--primary-color) !important;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
