<template>
  <div>
    <div class="row no-gutters mt-4">
      <!-- Logo Here -->
      <div class="col-lg-4 mx-auto">
        <div class="d-flex image-holder justify-content-center mx-auto">
          <div class="m-auto">
            <img
              v-if="file != null"
              :src="file"
              class="objec-fit"
              alt="Logo"
              height="75"
              width="75"
            />
          </div>
        </div>
        <div class="mt-4 d-flex justify-content-center">
          <h5 class="org-name">
            {{
              user.AssociatedOrganisations
                ? user.AssociatedOrganisations[0].Organisation.name
                : ""
            }}
          </h5>
        </div>
        <div class="mt-1 d-flex justify-content-center">
          <label>
            <p class="logo-text">Upload Logo</p>
            <input type="file" accept="image/png, .pdf" @change="handleFile" />
          </label>
        </div>

        <code>
          <pre
            >{{ payload }}
</pre
          >
        </code>
      </div>

      <!-- Form Here -->
      <div class="col-lg-8 px-4">
        <div class="form-holder p-4">
          <div>
            <!-- Button togglers here -->
            <div class="d-flex mb-3">
              <div>
                <button
                  @click="step = 1"
                  type="button"
                  class="py-1 mgt-btn"
                  :class="{ active: step == 1 }"
                >
                  Organisation Profile
                </button>
              </div>

              <div>
                <button
                  @click="step = 2"
                  type="button"
                  class="px-2 py-1 mgt-btn"
                  :class="{ active: step == 2 }"
                >
                  User Profile
                </button>
              </div>
            </div>

            <!-- Organization profile here  -->
            <div v-if="step == 1">
              <!-- Country - State section here  -->
              <div class="row">
                <!-- Country Here  -->
                <div class="col-lg-6 mb-3">
                  <label for="country">Country</label>

                  <div id="balance" class="w-full relative">
                    <el-select
                      v-model="payload.country"
                      filterable
                      placeholder="Canada"
                      id="country"
                    >
                      <el-option
                        v-for="country in countries"
                        :key="country.name"
                        :label="country.name"
                        :value="country.name"
                      >
                      </el-option>
                    </el-select>
                  </div>
                </div>

                <!-- State Here  -->
                <div class="col-lg-6 mb-3">
                  <label for="state">State</label>
                  <input
                    type="text"
                    id="state"
                    placeholder="Kaduna"
                    class="profile-control px-3"
                    :class="{ error: $v.payload.state.$error }"
                    v-model="payload.state"
                    @blur="$v.payload.state.$touch()"
                  />
                </div>
              </div>

              <!-- Address - Year section here  -->
              <div class="row">
                <!-- Address here  -->
                <div class="col-lg-6 mb-3">
                  <label for="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    placeholder="Address"
                    class="profile-control px-3"
                    :class="{ error: $v.payload.address.$error }"
                    v-model="payload.address"
                    @blur="$v.payload.address.$touch()"
                  />
                </div>

                <!-- Year Founded here  -->
                <div class="col-lg-6 mb-3">
                  <label for="year">Year Founded</label>
                  <input
                    type="number"
                    id="year"
                    placeholder="Year Founded"
                    class="profile-control px-3"
                    :class="{ error: $v.payload.year.$error }"
                    v-model="payload.year"
                    @blur="$v.payload.year.$touch()"
                  />
                </div>
              </div>

              <!-- Website - OrgID section here  -->
              <div class="row">
                <!-- Address here  -->
                <div class="col-lg-6 mb-3">
                  <label for="address">Website</label>
                  <input
                    type="url"
                    id="website"
                    placeholder="Website"
                    class="profile-control px-3"
                    :class="{ error: $v.payload.website_url.$error }"
                    v-model="payload.website_url"
                    @blur="$v.payload.website_url.$touch()"
                  />
                </div>

                <!-- Year Founded here  -->
                <div class="col-lg-6 mb-3">
                  <label for="year">Registration ID</label>
                  <input
                    type="text"
                    id="year"
                    placeholder="ID From Designated Country"
                    class="profile-control px-3"
                    :class="{ error: $v.payload.registration_id.$error }"
                    v-model="payload.registration_id"
                    @blur="$v.payload.registration_id.$touch()"
                  />
                </div>
              </div>
            </div>

            <!-- USer Profile here  -->
            <div v-if="step == 2">
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
                <!-- Phone number Here  -->
                <div class="col-lg-6 mb-3">
                  <label for="phone">Phone Number</label>
                  <vue-tel-input
                    id="phone"
                    mode="international"
                    class="profile-control"
                    :inputOptions="options"
                    v-model="payload.phone"
                  ></vue-tel-input>
                </div>

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
import { mapGetters } from "vuex";
export default {
  data: () => ({
    options: { placeholder: "09065233507" },
    loading: false,
    countries: [],
    step: 1,
    file: null,
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
      logo: null,
      website_url: "",
    },
  }),

  validations: {
    payload: {
      first_name: {
        required,
      },
      last_name: {
        required,
      },
      email: {
        email,
        required,
      },
      phone: {
        required,
      },
      address: {
        required,
      },
      state: {
        required,
      },
      country: {
        required,
      },
      registration_id: {
        required,
      },
      year: {
        required,
      },
      logo: {
        required,
      },
      website_url: {
        required,
      },
    },
  },

  computed: {
    ...mapGetters("authentication", ["user"]),
  },

  mounted() {
    this.countries = countries;
    this.loadData();
    console.log("user:::", this.user);
  },

  methods: {
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
          if (this.$v.payload.logo.$error === true) {
            this.$toast.error("Please select a logo");
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
          website_url,
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

        if (response.data.status == "success") {
          this.$toast.success(response.data.message);
          //   this.loadData();
        }

        console.log("updateResponse:::", response);
        this.loading = false;
      } catch (err) {
        console.log("updateerr::::", err);
        this.loading = false;
        this.$toast.error(error.response.data.message);
      }
    },

    loadData() {
      this.file = this.user.AssociatedOrganisations[0].Organisation.logo_link;
      this.payload.logo = this.user.AssociatedOrganisations[0].Organisation.logo_link;

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
      this.payload.phone = this.user.phone;
    },

    handleFile(value) {
      const file = value.target.files[0];
      console.log("file", value.target.files[0]);
      this.file = URL.createObjectURL(file);
      this.payload.logo = file;
    },
  },
};
</script>

<style scoped>
.mgt-btn {
  color: #333333;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  color: #333333;
  background: inherit;
}
.mgt-btn.active {
  color: var(--primary-color);
  font-weight: 500;
  background: #fafafa;
  border: 1px solid #e0dbdb;
  border-radius: 3px;
}
.mgt-btn:focus {
  outline: none;
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
.org-name {
  color: #333333;
  font-weight: bold;
  font-size: 1.125rem;
}
.image-holder {
  border-radius: 50%;
  width: 96px;
  height: 96px;
  background: #e7e7e7;
  border: none;
  margin-top: 55px;
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
  border: 1px solid #999999;
  height: 42px;
  border-radius: 10px;
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