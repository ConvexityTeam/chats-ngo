<template>
  <div class="row">
    <!-- Modal here -->
    <div>
      <Modal id="camera-modal" title="Take a selfie ">
        <WebCam />
      </Modal>
    </div>

    <!-- Form Here -->
    <div class="col-lg-7">
      <div class="form-holder">
        <!-- Toggler here -->
        <div class="d-flex mb-3 w-full ctn-mgt-btn" v-if="isOrganisation">
          <div class="mgt-btn-container">
            <transition name="slide">
              <button
                @click="step = 1"
                type="button"
                class="mgt-btn one"
                :class="{ active: step === 1 }"
              >
                Organisation Profile
              </button>
            </transition>
          </div>

          <div class="mgt-btn-container">
            <button
              @click="step = 2"
              type="button"
              class="mgt-btn two"
              :class="{ active: step === 2 }"
            >
              User Profile
            </button>
          </div>
        </div>

        <!-- Organization profile here  -->
        <section v-if="step === 1 && isOrganisation">
          <!-- Country - State section here  -->
          <div class="row sizing-top">
            <div class="col-lg-6 mb-4">
              <label for="country">Country</label>

              <div>
                <el-select
                  id="dropdown"
                  v-model="payload.organisation_profile.country"
                  @blur="$v.payload.organisation_profile.country.$touch()"
                  filterable
                  placeholder="United States"
                  class="country"
                  :class="{
                    error: $v.payload.organisation_profile.country.$error,
                  }"
                >
                  <el-option
                    v-for="(country, i) in countries"
                    :key="i"
                    :label="country.countryName"
                    :value="country.countryName"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>

            <!-- State Here  -->
            <div class="col-lg-6 mb-4">
              <label for="state-dropdown">State</label>

              <div>
                <el-select
                  id="dropdown"
                  v-model="payload.organisation_profile.state"
                  @blur="$v.payload.organisation_profile.state.$touch()"
                  filterable
                  placeholder="State"
                  class="country"
                  :class="{
                    error: $v.payload.organisation_profile.state.$error,
                  }"
                >
                  <el-option
                    v-for="(state, i) in states"
                    :key="i"
                    :label="state.name"
                    :value="state.name"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>

          <!-- Address -  year section here  -->
          <div class="row">
            <!-- Address  here  -->
            <div class="col-lg-6 mb-4">
              <label for="address">Address</label>
              <input
                type="text"
                id="address"
                placeholder="Address"
                class="form-controls px-3"
                :class="{
                  error: $v.payload.organisation_profile.address.$error,
                }"
                v-model="payload.organisation_profile.address"
                @blur="$v.payload.organisation_profile.address.$touch()"
              />
            </div>

            <!-- Year Founded here  -->
            <div class="col-lg-6 mb-4">
              <label id="year_founded" for="year">Year Founded</label>
              <input
                type="number"
                @wheel="$event.target.blur()"
                id="year_founded"
                class="form-controls px-3"
                :class="{
                  error:
                    $v.payload.organisation_profile.year_of_inception.$error,
                }"
                placeholder="YYYY"
                v-model="payload.organisation_profile.year_of_inception"
                @blur="
                  $v.payload.organisation_profile.year_of_inception.$touch()
                "
              />
            </div>
          </div>

          <!-- Website - OrgID section here  -->
          <div class="row">
            <!-- Website here  -->
            <div class="col-lg-6 mb-4">
              <label for="address">Website</label>
              <input
                type="url"
                id="website"
                placeholder="Website"
                class="form-controls px-3"
                :class="{
                  error: $v.payload.organisation_profile.website_url.$error,
                }"
                v-model="payload.organisation_profile.website_url"
                @blur="$v.payload.organisation_profile.website_url.$touch()"
              />
            </div>

            <!-- Registration ID here  -->
            <div class="col-lg-6 mb-4">
              <label for="address">Registration ID</label>
              <input
                type="url"
                id="registration_id"
                placeholder="CHATS115009"
                class="form-controls px-3"
                :value="registrationId"
                disabled
              />
            </div>
          </div>

          <!-- About Organisation Here -->
          <div class="mb-4">
            <label for="about">About </label>
            <textarea
              id="about"
              placeholder="Short bio here..."
              class="form-controls p-3"
              cols="30"
              rows="4"
              :class="{
                error: $v.payload.organisation_profile.about.$error,
              }"
              v-model="payload.organisation_profile.about"
              @blur="$v.payload.organisation_profile.about.$touch()"
            ></textarea>
          </div>

          <div class="save-btn w-25 mb-2 mt-1">
            <Button
              type="submit"
              :has-icon="false"
              fontSize="1rem"
              text="Save"
              custom-styles="height:50px;  width: 100%"
              :loading="loading"
              :disabled="loading"
              @click="updateOrganisationProfile"
            />
          </div>
        </section>

        <!-- User Profile here  -->
        <section v-else>
          <!-- Country section here  -->
          <div class="row" :class="{ 'sizing-top': isOrganisation }">
            <!-- Country  Here  -->
            <div class="col-lg-6 mb-4">
              <label for="country">Country </label>

              <div>
                <el-select
                  id="dropdown"
                  v-model="payload.user_profile.country"
                  filterable
                  placeholder="United States"
                  input-class="form-controls"
                  @change="
                    (payload.user_profile.first_name = ''),
                      (payload.user_profile.last_name = '')
                  "
                >
                  <el-option
                    v-for="(country, i) in countries"
                    :key="i"
                    :label="country.countryName"
                    :value="country.countryCode"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>

            <!-- Phone number Here  -->
            <client-only>
              <div class="col-lg-6 mb-4">
                <label for="phone">Phone Number</label>
                <vue-tel-input
                  id="phone"
                  mode="international"
                  class="form-controls phone"
                  :inputOptions="options"
                  v-model.trim="payload.user_profile.phone"
                ></vue-tel-input>
              </div>
            </client-only>
          </div>

          <!-- Currency - Address here  -->
          <div class="row">
            <!-- Currency Code  -->
            <div class="col-lg-6 mb-4">
              <label for="country">Default currency</label>
              <el-select
                autocomplete="new-password"
                id="dropdown"
                v-model="payload.user_profile.currency"
                filterable
                placeholder="Currency Code"
              >
                <el-option
                  v-for="(currencyCode, i) in countries"
                  :key="i"
                  :label="`${currencyCode.currencyCode} - ${currencyCode.countryName}`"
                  :value="currencyCode.currencyCode"
                >
                </el-option>
              </el-select>
            </div>

            <!-- Address Here  -->
            <div class="col-lg-6 mb-4">
              <label for="state">Address</label>
              <input
                type="text"
                class="form-controls px-3"
                id="address"
                placeholder="Address"
                v-model="payload.user_profile.address"
              />
            </div>
          </div>

          <section v-if="!displayExtras">
            <!-- Name here -->
            <div class="row">
              <!-- First Name  -->
              <div class="col-lg-6 mb-4">
                <label for="first_name">First Name</label>
                <input
                  type="text"
                  id="first_name"
                  placeholder="Juliana"
                  class="form-controls px-3"
                  :class="{
                    error: $v.payload.user_profile.first_name.$error,
                  }"
                  v-model="payload.user_profile.first_name"
                  @blur="$v.payload.user_profile.first_name.$touch()"
                />
              </div>

              <!-- Last Name -->
              <div class="col-lg-6 mb-4">
                <label for="last_name">Last Name</label>
                <input
                  type="text"
                  id="last_name"
                  placeholder="Orji"
                  class="form-controls px-3"
                  :class="{
                    error: $v.payload.user_profile.last_name.$error,
                  }"
                  v-model="payload.user_profile.last_name"
                  @blur="$v.payload.user_profile.last_name.$touch()"
                />
              </div>
            </div>

            <!-- Gender - marital status -->
            <div class="row">
              <!-- Gender Here  -->
              <div class="col-lg-6 mb-4">
                <label for="state">Gender</label>
                <div>
                  <el-select
                    id="dropdown"
                    v-model="payload.user_profile.gender"
                    filterable
                    placeholder="Gender"
                    class=""
                  >
                    <el-option
                      v-for="(status, i) in gender"
                      :key="i"
                      :label="status.name | capitalize"
                      :value="status.name"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>

              <!-- Marital Status Here  -->
              <div class="col-lg-6 mb-4">
                <label for="state">Marital Status</label>
                <div>
                  <el-select
                    id="dropdown"
                    v-model="payload.user_profile.marital_status"
                    filterable
                    placeholder="Marital Status"
                    class=""
                  >
                    <el-option
                      v-for="(type, i) in marital_status"
                      :key="i"
                      :label="type.name | capitalize"
                      :value="type.name"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
            </div>

            <!-- DOB -->
            <div class="row">
              <!-- Date of Birth Here  -->
              <div class="col-lg-6 mb-4">
                <label for="state">Date of Birth</label>
                <date-picker
                  v-model="payload.user_profile.dob"
                  valueType="format"
                  format="DD-MM-YYYY"
                  placeholder="DD-MM-YYYY"
                  id="dob"
                  :disabled-date="(present) => present >= new Date()"
                ></date-picker>
              </div>
            </div>
          </section>

          <section v-if="payload.user_profile.country == 'NG'">
            <!-- NIN Here -->
            <div class="row">
              <div class="col-lg-6 mb-4">
                <label for="state">National Identity Number</label>
                <input
                  type="text"
                  class="form-controls px-3"
                  id="address"
                  placeholder="Enter NIN"
                  v-model="payload.user_profile.nin"
                />

                <!-- VNIN guide -->
                <!-- <div>
                  <span> Two ways to generate your Virtual NIN for KYC</span>
                  <ul>
                    <li></li>
                  </ul>

                  USSD *346*3*customer NIN*898739# NIMC Official mobile app
                </div> -->
              </div>

              <div class="col-lg-6 align-self-center">
                <button
                  class="pointer verify-btn poppins"
                  @click="verifyIdentity"
                  :disabled="!payload.user_profile.nin"
                >
                  Verify NIN
                </button>
                <!--
                     :disabled="
                      !payload.user_profile.nin ||
                        payload.user_profile.nin.length < 11
                    " -->
              </div>
            </div>

            <!-- NIN verified Data -->
            <div class="row" v-if="isIdentityVerified">
              <!-- First Name  -->
              <div class="col-lg-6 mb-4">
                <label for="first_name">First Name</label>
                <input
                  type="text"
                  id="first_name"
                  placeholder="Juliana"
                  class="form-controls px-3"
                  :class="{
                    error: $v.payload.user_profile.first_name.$error,
                  }"
                  v-model="payload.user_profile.first_name"
                  @blur="$v.payload.user_profile.first_name.$touch()"
                  disabled
                />
              </div>

              <!-- Last Name -->
              <div class="col-lg-6 mb-4">
                <label for="last_name">Last Name</label>
                <input
                  type="text"
                  id="last_name"
                  placeholder="Orji"
                  class="form-controls px-3"
                  :class="{
                    error: $v.payload.user_profile.last_name.$error,
                  }"
                  v-model="payload.user_profile.last_name"
                  @blur="$v.payload.user_profile.last_name.$touch()"
                  disabled
                />
              </div>
            </div>
          </section>

          <!-- Save Button -->
          <div class="col-lg-12 row mb-2 mt-2">
            <div v-if="payload.user_profile.country == 'NG'">
              <Button
                :has-icon="false"
                fontSize="1rem"
                text="Verify liveness"
                custom-styles="height:50px; width: 100%; font-weight: 600!important; padding:0 1.5rem !important;"
                :disabled="loading || !isIdentityVerified"
                @click="openCam"
              />
            </div>

            <div class="save-btn w-25" v-else>
              <Button
                fontSize="1rem"
                :has-icon="false"
                text="Save"
                custom-styles="height:50px; width: 100%; font-weight: 600!important;"
                :loading="loading"
                :disabled="loading"
                @click="updateUserProfile"
              />
            </div>

            <!--  -->
          </div>
        </section>
      </div>
    </div>

    <!-- Logo Here -->
    <div class="col-lg-3">
      <b-card class="profile-card pb-2">
        <div class="d-flex justify-content-center mx-auto -mt-20">
          <div
            class="d-flex align-items-center profile-card-image-holder m-auto overflow-hidden"
          >
            <!--Organisation Photo here -->
            <b-avatar
              :src="file"
              size="150px"
              class="img-fluid p-1"
              variant="light"
            ></b-avatar>

            <label>
              <button
                type="button"
                class="profile-card-btn"
                @click="$refs.fileInput.click()"
              >
                <IconsCamera />
              </button>
              <!-- <IconsCamera /> -->
              <input
                type="file"
                accept="image/png, .pdf"
                @change="handlePhotoUpdate"
                ref="fileInput"
                style="display: none"
              />
            </label>
          </div>
        </div>

        <!-- organisation title here -->
        <b-card-title
          class="mt-4 d-flex justify-content-center text-center pb-1"
        >
          <h6 class="font-bold primary-blue">
            {{ organisationName | capitalize }}
          </h6>
        </b-card-title>

        <!-- reg.ID here -->
        <b-card-text
          class="profile-card-id text-input d-flex justify-content-center pb-1"
          >{{ registrationId }}
        </b-card-text>

        <!-- websiteUrl here -->
        <b-card-text
          class="profile-card-website-url text-sm d-flex justify-content-center"
        >
          <a
            :href="websiteUrl"
            target="_blank"
            rel="noreferrer"
            class="primary-gray font-medium"
          >
            {{ websiteUrl }}</a
          >
        </b-card-text>
      </b-card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { required, maxLength, numeric } from "vuelidate/lib/validators";
import DatePicker from "vue2-datepicker";
import countriesRegions from "~/plugins/countries-regions";
import moment from "moment";

let screenLoading;

// TODO: hide gender ==> downwards data if user selection is NGN. add a field for NIN

export default {
  name: "ProfileSettings",
  components: { DatePicker },

  data() {
    return {
      options: { placeholder: "Phone number" },
      marital_status: [
        { name: "single" },
        { name: "married" },
        { name: "divorced" },
      ],

      gender: [{ name: "male" }, { name: "female" }],
      present: new Date(),
      organisation_id: 0,
      loading: false,
      countries: [],
      isIdentityVerified: false,
      step: 1,
      file: "",

      payload: {
        organisation_profile: {
          country: "",
          state: "",
          address: "",
          year_of_inception: "",
          website_url: "",
          about: "",
        },
        user_profile: {
          first_name: "",
          last_name: "",
          country: "",
          currency: "",
          phone: "",
          location: "",
          address: "",
          gender: "",
          marital_status: "",
          dob: "",
          nin: "",
        },
        logo: {},
      },
    };
  },

  validations: {
    payload: {
      organisation_profile: {
        country: { required },
        state: { required },
        address: { required },
        year_of_inception: { required, maxLength: maxLength(4), numeric },
        website_url: { required },
        about: { required, maxLength: maxLength(300) },
      },

      user_profile: {
        first_name: { required },
        last_name: { required },
      },
    },
  },

  async fetch() {
    const response = await this.$axios.get("/utils/countries");
    this.countries = response.data;
    console.log("countries", this.countries);
  },

  computed: {
    ...mapGetters("authentication", ["user"]),

    isOrganisation() {
      const { registration_type } = this.user;
      return registration_type === "organisation";
    },

    states() {
      const setCountry = this.payload?.organisation_profile?.country;
      console.log("setCountry", setCountry);
      if (setCountry) {
        return countriesRegions.find(
          (country) => setCountry === country.countryName
        )?.regions;
      }

      return [];
    },

    websiteUrl() {
      return this.payload?.organisation_profile?.website_url ?? "";
    },

    displayExtras() {
      return (
        !this.payload.user_profile.country ||
        this.payload.user_profile.country == "NG"
      );
    },

    organisationName() {
      return this.user?.AssociatedOrganisations[0]?.Organisation?.name ?? "";
    },

    registrationId() {
      return (
        this.user?.AssociatedOrganisations[0]?.Organisation?.registration_id ??
        ""
      );
    },
  },

  mounted() {
    this.loadData();
  },

  methods: {
    ...mapActions("authentication", ["commitUserUpdate", "commitUser"]),

    openCam() {
      this.$bvModal.show("camera-modal");
    },

    async updateOrganisationProfile() {
      try {
        this.loading = true;
        this.$v.payload.organisation_profile.$touch();

        if (this.$v.payload.organisation_profile.$error === true) {
          if (this.$v.payload.organisation_profile.country.$error === true) {
            this.$toast.error("Please fill in country");
            return (this.loading = false);
          }
          return (this.loading = false);
        }

        const response = await this.$axios.put(
          `/organisations/${this.organisation_id}/profile`,
          this.payload.organisation_profile
        );

        if (response.status == "success") {
          this.$toast.success(response.message);
          this.commitUserUpdate(response.data);
        }
      } catch (err) {
        console.log("UPDATEORGPROFILEERR::", { err });
        this.$toast.error(err?.response?.data?.message);
      } finally {
        this.loading = false;
      }
    },

    async updateUserProfile() {
      try {
        this.loading = true;
        const { country } = this.payload.user_profile;

        console.log("COUNTRY::", country);

        if (country != "NG") {
          delete this.payload.user_profile.nin;
        }

        this.$v.payload.user_profile.$touch();

        console.log("PL::", this.$v.payload.user_profile);

        if (this.$v.payload.user_profile.$error === true) {
          return (this.loading = false);
        }

        console.log("PL::", this.payload.user_profile);

        const response = await this.$axios.put("/users/profile", {
          ...this.payload.user_profile,
          phone: this.payload.user_profile.phone.replace(/\s/g, ""),
        });

        console.log("USER RESPONSE:::", response);

        if (response.status == "success") {
          this.$toast.success(response.message);

          const data = {
            ...this.user,
            ...response.data,
          };

          this.commitUser(data);
        }

        console.log("UPDATE PROFILE RESPONSE", response);
      } catch (err) {
        console.log("UPDATEUSERPROFILEERR::", { err });
        this.$toast.error(err?.response?.data?.message);
      } finally {
        this.loading = false;
      }
    },

    async verifyIdentity() {
      try {
        this.openScreen();
        const { nin } = this.payload.user_profile;

        const response = await this.$axios.post(
          "https://api.myidentitypay.com/api/v1/biometrics/merchant/data/verification/nin_wo_face",

          {
            number: nin,
          }
        );

        console.log("VERIFY IDENTITY RESPONSE::", response);

        if (response.status) {
          this.isIdentityVerified = true;
          const data = response?.nin_data;

          this.payload.user_profile.first_name = data.firstname;
          this.payload.user_profile.last_name = data.surname;
          this.payload.user_profile.gender = data.gender;
        } else {
          this.$toast.error(response?.message);
        }

        screenLoading.close();
      } catch (err) {
        screenLoading.close();
        console.log("VERIFYIDENTITYERR::", { err });
        this.$toast.error(err?.response?.data?.message);
      }
    },

    loadData() {
      const organisation = this.user?.AssociatedOrganisations[0]?.Organisation;

      this.payload.logo = organisation.logo_link;
      this.file = organisation.logo_link;
      this.organisation_id = organisation.id;

      this.objectAliaser(this.payload.organisation_profile, organisation);
      this.objectAliaser(this.payload.user_profile, this.user);
    },

    objectAliaser(oldObj, newObj) {
      return Object.keys(oldObj).forEach((item) => {
        oldObj[item] = newObj?.[item];
        if (item === "dob") {
          oldObj[item] = moment(newObj?.[item]).format("DD-MM-YYYY");
        }
      });
    },

    handlePhotoUpdate(value) {
      const image = value.target.files[0];
      this.file = URL.createObjectURL(image);
      this.payload.logo = image;
      this.updatephoto();
    },

    async updatephoto() {
      try {
        this.loading = true;
        const formData = new FormData();

        formData.append("logo", this.payload.logo);

        const response = await this.$axios.post(
          `organisations/${this.organisation_id}/logo`,
          formData
        );

        if (response.status == "success") {
          this.$toast.success(response.message);
          this.commitUserUpdate(response.data);
        }
      } catch (err) {
        console.log("UPDATEPROFILEERR::", { err });
        this.$toast.error(err?.response?.data?.message);
      } finally {
        this.loading = false;
      }
    },

    openScreen() {
      screenLoading = this.$loading({
        lock: true,
        spinner: "el-icon-loading",
        background: "#0000009b",
      });
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}

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
  color: #7c8db5;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  background: inherit;
  border-radius: 10px;
}

.mgt-btn.active {
  color: #fff;
  font-weight: 700;
  background: #9dadca;
  border: none;
  border-radius: 10px;
  width: 100%;
}

.slide-enter {
  transform: translateY(50%);
}

.mgt-btn.one {
  padding: 0.6rem 3.5rem;
}

.mgt-btn.two {
  padding: 0.6rem 5.2rem;
}

.profile-card-btn {
  position: absolute;
  top: 120px;
  right: 100px;
  border: none;
  background-color: inherit;
  border-radius: 50px;
  width: 40px;
  height: 40px;
}

.profile-card {
  width: 300px;
  height: 313px;
  background: #ffffff;
  box-shadow: 0px 4px 30px rgba(174, 174, 192, 0.2);
  border-radius: 10px;
  border: none;
  color: var(--primary-text-color);
  padding: 2.5rem;
}

.profile-card-image-holder {
  border-radius: 50%;
  width: 130px;
  height: 130px;
  background: #e7e7e762;
  border: 1px solid var(--primary-color);
  margin-top: -20px;
}

.-mt-20 {
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
  font-size: 1rem;
  font-weight: 500;
  margin-top: -15px;
}

.form-controls.currency,
.phone {
  border: none;
  background-color: none;
  border-radius: 10px;
  padding: 0rem 0.7rem;
}

.sizing-top {
  margin-top: 1.7rem;
}

.form-holder {
  background: #ffffff;
  box-shadow: 0px 4px 30px rgba(174, 174, 192, 0.2);
  border-radius: 10px;
  padding: 2rem;
}

label {
  color: var(--primary-blue);
  font-size: 1rem;
  font-weight: 500;
}

.form-controls {
  background: #f5f6f8;
  border-radius: 8px;
  height: 50px;
  padding: 0rem 0.75rem;
  color: #646a86;
  font-size: 1rem;
}

.form-controls::placeholder {
  color: #646a86;
  font-size: 1rem;
}

.form-controls:disabled {
  background: #ccced1;
  /* opacity: 0.35; */
  color: #646a86;
}

.verify-btn {
  color: #17ce89;
  font-weight: 600;
  font-size: 14px;
  border: none;
  outline: none;
  background: inherit;
}

.verify-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

section {
  transition: all 0.3s ease-in-out;
}

h6 {
  font-size: 1.125rem;
}

textarea {
  resize: none;
}

a:hover {
  color: inherit;
  text-decoration: none;
}
</style>
