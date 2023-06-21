<template>
  <div class="row">
    <div class="col-lg-8">
      <!-- Modals Here -->
      <template>
        <!-- Google TwoFa -->
        <Modal
          id="addGoogleTwoFa"
          size="lg"
          title="Set up Google Aunthentication"
          @closeModal="setTwofaMethod"
        >
          <FormsSettingsAddGoogleTwofa
            @enableTwoFa="enableTwoFa"
            :payload="payload"
            :loading="loading"
          />
        </Modal>

        <!-- Email Twofa -->
        <Modal
          id="addEmailTwoFa"
          title="Set up Email 2FA"
          @closeModal="setTwofaMethod"
        >
          <FormsSettingsAddEmailTwofa
            @enableTwoFa="enableTwoFa"
            @resendCode="(tfa_method) => handleSetup(null, tfa_method)"
            :user="user"
            :loading="loading"
          />
        </Modal>

        <!-- SMS Twofa -->
        <Modal
          id="addSmsTwoFa"
          title="Set up Phone 2FA"
          @closeModal="setTwofaMethod"
        >
          <FormsSettingsAddSmsTwofa
            @enableTwoFa="enableTwoFa"
            @resendCode="(tfa_method) => handleSetup(null, tfa_method)"
            :user="user"
            :loading="loading"
          />
        </Modal>
      </template>

      <div class="form-holder">
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

          <div title="Not available" class="mgt-btn-container">
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
        <template v-if="step == 1">
          <FormsSettingsChangePassword />
        </template>

        <!-- "2 Factor Authentication"  -->
        <div v-if="step == 2" class="step2">
          <!-- Google 2FA -->
          <section class="row px-3 pt-4">
            <div class="p-4 mb-3 google-auth-container">
              <section class="d-flex align-items-center">
                <div>
                  <h6 class="step-2-heading primary-blue">
                    Google Authenticator
                  </h6>
                  <span class="step-2-subheadings-heading poppins">
                    Use the Google Authenticator app to generate one time
                    security codes.
                  </span>
                </div>

                <div class="ml-auto">
                  <Toggle
                    v-model="googleAuthEnabled"
                    :disabled="googleAuthEnabled"
                    isLarge
                    @input="handleSetup('addGoogleTwoFa', 'qrCode')"
                  />
                </div>
              </section>

              <!-- Connected Status -->
              <section
                class="mt-3 p-3 bound-holder"
                v-if="user.tfa_method == 'qrCode'"
              >
                <IconsCheck />

                <span class="ml-2 poppins primary-gray text-sm">
                  Added {{ user.tfa_binded_date | formatDate }}
                </span>
              </section>
            </div>
          </section>

          <!-- Email 2FA -->
          <section class="row px-3 pt-1">
            <div class="p-4 mb-3 google-auth-container">
              <section class="d-flex align-items-center">
                <div>
                  <h6 class="step-2-heading primary-blue">Email</h6>
                  <span class="step-2-subheadings-heading poppins">
                    Activate Email 2FA setting.
                  </span>
                </div>

                <div class="ml-auto">
                  <Toggle
                    v-model="emailAuthEnabled"
                    :disabled="emailAuthEnabled"
                    isLarge
                    @input="handleSetup('addEmailTwoFa', 'email')"
                  />
                </div>
              </section>

              <!-- Connected Status -->
              <section
                class="mt-3 p-3 bound-holder"
                v-if="user.tfa_method == 'email'"
              >
                <IconsCheck />

                <span class="ml-2 poppins primary-gray text-sm">
                  Added {{ user.tfa_binded_date | formatDate }}
                </span>

                <span class="ml-4 poppins primary-blue text-sm">
                  Binded Email:
                  <span class="font-semibold inconsolata truncate">{{
                    user.email
                  }}</span>
                </span>
              </section>
            </div>
          </section>

          <!-- SMS 2FA -->
          <section class="row px-3 pt-1">
            <div class="p-4 mb-4 google-auth-container">
              <section class="d-flex align-items-center">
                <div>
                  <h6 class="step-2-heading primary-blue">
                    Text Message (SMS)
                  </h6>
                  <span class="step-2-subheadings-heading poppins">
                    Activate SMS 2FA setting.
                  </span>
                </div>

                <div class="ml-auto">
                  <Toggle
                    v-model="smsAuthEnabled"
                    :disabled="smsAuthEnabled"
                    isLarge
                    @input="handleSetup('addSmsTwoFa', 'sms')"
                  />
                </div>
              </section>

              <!-- Connected Status -->
              <section
                class="mt-3 p-3 bound-holder"
                v-if="user.tfa_method == 'sms'"
              >
                <IconsCheck />

                <span class="ml-2 poppins primary-gray text-sm">
                  Added {{ user.tfa_binded_date | formatDate }}
                </span>

                <span class="ml-4 poppins primary-blue text-sm">
                  Binded Phone number:
                  <span class="font-semibold inconsolata truncate">{{
                    user.phone
                  }}</span>
                </span>
              </section>
            </div>
          </section>
        </div>
      </div>
    </div>

    <div v-if="isLoading">
      <FullScreenLoader :loading="isLoading" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "SecuritySettings",
  data: () => ({
    step: 1,
    isLoading: false,
    loading: false,
    googleAuthEnabled: false,
    emailAuthEnabled: false,
    smsAuthEnabled: false,
    payload: {},
  }),

  computed: {
    ...mapState("authentication", ["user"]),
  },

  mounted() {
    console.log("USERRRRR::::", this.user);
    this.setTwofaMethod();
  },

  methods: {
    ...mapActions("authentication", ["commitUser"]),

    setTwofaMethod() {
      const { tfa_method } = this.user;
      console.log("tfa_method:::::", tfa_method, "USER:::", this.user);
      if (tfa_method) {
        this.googleAuthEnabled = tfa_method.includes("qrCode");
        this.emailAuthEnabled = tfa_method.includes("email");
        this.smsAuthEnabled = tfa_method.includes("sms");
      }
    },
    async handleSetup(modalName, tfa_method) {
      try {
        this.isLoading = true;
        const response = await this.$axios.post("auth/2fa/init", {
          tfa_method,
        });

        if (response.status == "success") {
          this.payload = response?.data;
          this.$bvModal.show(modalName);
        }
      } catch (err) {
        this.$toast.error(err.response?.data?.message);
      } finally {
        this.isLoading = false;
        this.setTwofaMethod();
      }
    },
    async enableTwoFa({ otp, modalName, tfa_method }) {
      try {
        this.loading = true;
        const response = await this.$axios.post("auth/2fa/enable", {
          otp,
          tfa_method,
        });
        console.log("enableTwoFaresponse:::", response);

        if (response.status == "success") {
          this.$toast.success(response.message);
          this.$bvModal.hide(modalName);

          // Should update user state on the store and then call setTwofaMethod
          const { user } = response?.data;
          this.commitUser(user);
          this.setTwofaMethod();
        }
      } catch (err) {
        this.$toast.error(err.response.data.message);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.google-auth-container {
  width: 100%;
  border: 1px solid var(--primary-color);
  border-radius: 10px;
  padding: 0.4rem 0 0.2 1.3rem;
}

.step-2-heading {
  font-size: 1rem;
  font-weight: 700;
  color: var(--primary-text-color);
}
.step-2-subheadings-heading {
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--primary-gray);
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
.mgt-btn:focus {
  outline: none;
}
.mgt-btn.one {
  padding: 0.6rem 6.7rem;
}
.mgt-btn.two {
  padding: 0.6rem 2.8rem;
}
.form-holder {
  padding: 2rem;
  background: #ffffff;
  box-shadow: 0px 4px 30px rgba(174, 174, 192, 0.2);
  border-radius: 10px;
}

.bound-holder {
  height: 48px;
  background: #fafafa;
  border-radius: 30px;
  display: flex;
  align-items: center;
}
</style>
