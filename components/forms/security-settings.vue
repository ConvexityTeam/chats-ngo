<template>
  <div>
    <div class="row">
      <!-- Form Here -->
      <div class="col-lg-7">
        <!-- Modal here -->
        <Modal
          id="addGoogleTwoFa"
          size="lg"
          title="Set up Google Aunthentication"
        >
          <addGoogleTwoFa
            @google2faValidationStatus="handleModalToggle"
            :loading="loading"
          />
        </Modal>
        <div class="form-holder p-4">
          <div>
            <!-- Button togglers here -->
            <div class="d-flex mb-3 w-full ctn-mgt-btn font-medium">
              <div class="mgt-btn-container">
                <button
                  @click="step = 1"
                  type="button"
                  class="mgt-btn one"
                  :class="{ active: step == 1 }"
                >
                  Password
                </button>
              </div>

              <div class="mgt-btn-container">
                <button
                  @click="step = 2"
                  type="button"
                  class="mgt-btn two"
                  :class="{ active: step == 2 }"
                >
                  2-Factor Authentication
                </button>
              </div>
            </div>

            <!-- Step 1 -->
            <form v-if="step == 1" @submit.prevent="updatePassword">
              <div class="form-heading">
                <p class="font-bold primary-black">Change password</p>
                <p class="sub-heading input-text w-50">
                  Choose a new password, something easy to remember.
                </p>
              </div>

              <!-- old password  -->
              <div class="row">
                <div class="col-lg-8 mb-3 input-container">
                  <span class="poppins text-sm"
                    ><label for="state">Old password</label></span
                  >
                  <input
                    :type="showpassword ? 'text' : 'password'"
                    class="form-controls px-5"
                    placeholder="Enter old password"
                    :class="{ error: $v.payload.old_password.$error }"
                    id="password"
                    v-model="payload.old_password"
                    @focus="passActive = true"
                    @blur="$v.payload.old_password.$touch()"
                  />
                  <div class="position-absolute icon-left pl-4">
                    <lock-icon :active="passActive" />
                  </div>

                  <div
                    class="position-absolute icon-right pr-4"
                    @click="showpassword = !showpassword"
                  >
                    <eye-open v-if="showpassword" />
                    <eye-closed v-else />
                  </div>
                </div>
              </div>

              <!-- new password  -->
              <div class="row">
                <div class="col-lg-8 mb-3 input-container">
                  <span class="poppins text-sm"
                    ><label for="password">New password</label></span
                  >
                  <input
                    :type="showpassword2 ? 'text' : 'password'"
                    class="form-controls px-5"
                    placeholder="Enter new password"
                    :class="{ error: $v.payload.new_password.$error }"
                    id="new_password"
                    v-model="payload.new_password"
                    @focus="passActive2 = true"
                    @blur="$v.payload.new_password.$touch()"
                  />
                  <div class="position-absolute icon-left pl-4">
                    <lock-icon :active="passActive2" />
                  </div>

                  <div
                    class="position-absolute icon-right pr-4"
                    @click="showpassword2 = !showpassword2"
                  >
                    <eye-open v-if="showpassword2" />
                    <eye-closed v-else />
                  </div>
                </div>
              </div>

              <!--Confirm new password  -->
              <div class="row">
                <div class="col-lg-8 mb-3 input-container">
                  <span class="poppins text-sm"
                    ><label for="state">Confirm new password</label></span
                  >
                  <input
                    :type="showpassword3 ? 'text' : 'password'"
                    class="form-controls px-5"
                    placeholder="Re-Enter new password"
                    :class="{ error: $v.payload.confirm_newpassword.$error }"
                    id="confirm_password"
                    v-model="payload.confirm_newpassword"
                    @focus="passActive3 = true"
                    @blur="$v.payload.confirm_newpassword.$touch()"
                  />
                  <div class="position-absolute icon-left pl-4">
                    <lock-icon :active="passActive3" />
                  </div>

                  <div
                    class="position-absolute icon-right pr-4"
                    @click="showpassword3 = !showpassword3"
                  >
                    <eye-open v-if="showpassword3" />
                    <eye-closed v-else />
                  </div>
                </div>
              </div>

              <div>
                <div class="save-btn mt-1">
                  <Button
                    type="submit"
                    :has-icon="false"
                    text="Save"
                    custom-styles="height:50px;  width:100%"
                    :loading="loading"
                    :disabled="loading"
                  />
                </div>
              </div>
            </form>

            <!-- "2 Factor Authentication"  -->
            <div v-if="step == 2" class="step2">
              <div class="row pl-3 pr-3 pt-4">
                <div class="col-lg mb-3 google-auth-container">
                  <div class="google-auth-text">
                    <p class="step-2-heading primary-blue">
                      Google Authenticator
                    </p>
                    <p
                      class="step-2-subheadings-heading secondary-black poppins"
                    >
                      Use Google Authenticator to add a second layer of security
                      to your account.
                    </p>
                  </div>
                  <div class="google-auth-toggle" @click="toggleOn = !toggleOn">
                    <toggleOff v-if="!toggleOn" />
                    <toggleOn v-else />
                  </div>
                </div>
              </div>
              <!-- test -->
              <div class="row pl-3 pr-3 pt-1">
                <div class="col-lg mb-3 google-auth-container">
                  <div class="google-auth-text">
                    <p class="step-2-heading primary-blue">Email</p>
                    <p
                      class="step-2-subheadings-heading secondary-black poppins"
                    >
                      Use Google Authenticator to add a second layer of security
                      to your account.
                    </p>
                  </div>
                  <div
                    class="google-auth-toggle"
                    @click="toggleOn2 = !toggleOn2"
                  >
                    <toggleOff v-if="!toggleOn2" />
                    <toggleOn v-else />
                  </div>
                </div>
              </div>

              <div class="row pl-3 pr-3 pt-1">
                <div class="col-lg mb-3 google-auth-container">
                  <div class="google-auth-text">
                    <p class="step-2-heading primary-blue">
                      Text Message (SMS)
                    </p>
                    <p
                      class="step-2-subheadings-heading secondary-black poppins"
                    >
                      Use Google Authenticator to add a second layer of security
                      to your account.
                    </p>
                  </div>
                  <div
                    class="google-auth-toggle"
                    @click="toggleOn3 = !toggleOn3"
                  >
                    <toggleOff v-if="!toggleOn3" />
                    <toggleOn v-else />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, sameAs, minLength } from "vuelidate/lib/validators";
import lockIcon from "~/components/icons/lock-icon.vue";
import eyeClosed from "~/components/icons/eye-closed.vue";
import eyeOpen from "~/components/icons/eye-open.vue";
import toggleOff from "~/components/icons/toggle-off";
import toggleOn from "~/components/icons/toggle-on";
import copy from "~/components/icons/copy";
import check from "~/components/icons/check";
import addGoogleTwoFa from "~/components/forms/add-twofa-email.vue";
import { mapGetters, mapActions } from "vuex";
import Check from "../icons/check.vue";
import Copy from "../icons/copy.vue";

export default {
  name: "SecuritySettings",
  components: {
    lockIcon,
    eyeClosed,
    eyeOpen,
    toggleOff,
    toggleOn,
    addGoogleTwoFa,
    copy,
    check,
    Check,
    Copy
  },

  data: () => ({
    passActive: false,
    passActive2: false,
    passActive3: false,

    showpassword: false,
    showpassword2: false,
    showpassword3: false,
    toggleOn: false,
    toggleOn2: false,
    toggleOn3: false,
    loading: false,
    step: 1,
    payload: {
      old_password: "",
      new_password: "",
      confirm_newpassword: ""
    }
  }),

  validations: {
    payload: {
      old_password: {
        required
      },

      new_password: {
        required,
        minLength: minLength(6)
      },

      confirm_newpassword: {
        required,
        sameAs: sameAs(vm => {
          return vm.new_password;
        })
      }
    }
  },

  watch: {
    toggleOn: function(val) {
      if (val) {
        this.$bvModal.show("addGoogleTwoFa");
      }
    }
  },

  methods: {
    ...mapActions("authentication", ["updateUser"]),
    handleModalToggle(data) {
      this.toggleOn = data;
    },
    async updatePassword() {
      try {
        this.loading = true;

        this.$v.payload.$touch();

        if (this.$v.payload.$error === true) {
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
    }
  }
};
</script>

<style scoped>
/* .auth-layer {
	background-color: red;
} */
.activeFont {
  font-weight: 700 !important;
  color: white !important;
}
.inactiveFont {
  color: var(--input-text-color) !important;
  font-weight: 500 !important;
}

.form-heading {
  margin-top: -4px;
}
.heading {
  font-size: 1rem;
  font-weight: 700;
}
.sub-heading {
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--primary-text-color);
}
.google-auth-container {
  display: flex;
  align-items: center;
  width: 100%;
  height: auto;
  border: 1px solid var(--primary-color);
  border-radius: 10px;
  padding: 0.4rem 0 0.2 1.3rem;
}
.google-auth-text {
  width: 70%;
  margin-top: 0.5rem;
  padding-left: 0.3rem;
}

.step-2-heading {
  font-size: 1rem;
  font-weight: 700;
  color: var(--primary-text-color);
}
.step-2-subheadings-heading {
  margin-top: -5px;
  font-size: 0.875rem;
  font-weight: 300;
  color: var(--input-text-color);
}
.google-auth-toggle {
  margin-left: 70px;
  cursor: pointer;
}

.google-auth {
  display: flex;
  align-items: center;
  background-color: #fafafa;
  justify-content: space-between;
  border-radius: 50px;
  width: 95%;
  height: 40px;
}

.google-auth > .code {
  padding-top: 15px;
}

.google-auth > .code span:last-of-type {
  cursor: pointer;
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
  padding: 0.6rem 6.7rem;
}
.mgt-btn.two {
  padding: 0.6rem 2.8rem;
}

.close-btn {
  position: absolute;
  right: 0;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
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
  color: var(--primary-blue);
  font-size: 0.875rem;
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

.icon2 {
  margin-left: 205px;
  padding-bottom: 8px;
  cursor: pointer;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
