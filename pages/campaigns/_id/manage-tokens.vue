<template>
  <div class="holder">
    <Back
      text="Back to campaigns"
      customStyles="font-weight: 400!important"
      @click="$router.push('/campaigns')"
    />

    <!-- Search Region Here -->
    <div class="row pt-4 mt-3">
      <div class="col-lg-8">
        <div class="row">
          <div class="col-lg-5">
            <!-- Search Box here -->
            <div class="position-relative">
              <input
                type="text"
                class="form-controls search"
                placeholder="Search by beneficiary..."
                v-model="searchQuery"
              />
              <img
                src="~/assets/img/vectors/search.svg"
                class="search-icon position-absolute"
                alt="search"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Buuttons Here -->
      <div class="ml-auto">
        <!-- SMS Buttons here -->
        <div class="d-flex" v-if="tokenType === 'sms'">
          <Button
            :has-border="true"
            :has-icon="false"
            fontSize="1rem"
            text="Resend token"
            custom-styles="height:50px; font-weight: 600!important; font-size: 16px!important"
            :disabled="!selectedTokens.length"
            @click="resendToken"
          />

          <div class="ml-3 pl-1">
            <Csv
              name="SMS_Tokens"
              text="Export"
              :data="resultQuery"
              fontSize="1rem"
            />
          </div>
        </div>

        <!-- QR Button Here -->
        <div v-if="tokenType === 'qr'">
          <button
            class="print-btn d-flex poppins font-medium align-items-center"
            @click="triggerDownload = true"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 17H17V22H7V17ZM19 20V15H5V20H3C2.73478 20 2.48043 19.8946 2.29289 19.7071C2.10536 19.5196 2 19.2652 2 19V9C2 8.73478 2.10536 8.48043 2.29289 8.29289C2.48043 8.10536 2.73478 8 3 8H21C21.2652 8 21.5196 8.10536 21.7071 8.29289C21.8946 8.48043 22 8.73478 22 9V19C22 19.2652 21.8946 19.5196 21.7071 19.7071C21.5196 19.8946 21.2652 20 21 20H19ZM5 10V12H8V10H5ZM7 2H17C17.2652 2 17.5196 2.10536 17.7071 2.29289C17.8946 2.48043 18 2.73478 18 3V6H6V3C6 2.73478 6.10536 2.48043 6.29289 2.29289C6.48043 2.10536 6.73478 2 7 2Z"
                fill="white"
              />
            </svg>

            <span class="ml-2">Print</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Tab Here -->
    <div class="mt-4 pt-2">
      <b-tabs
        content-class="mt-1"
        id="token-tab"
        nav-class
        nav-wrapper-class
        lazy
      >
        <!-- SMS Tokens tab here -->
        <b-tab
          title="SMS Tokens"
          :active="tokenType === 'sms'"
          @click="handleTabClick('sms')"
        >
          <SmsTokens
            :loading="loading"
            :data="resultQuery"
            :isCleared="isCleared"
            @resendToken="handleSingleToken"
            @handleSelected="data => (selectedTokens = data)"
          />
        </b-tab>

        <!-- QR Codes tab here -->
        <b-tab
          title="QR Codes"
          :active="tokenType === 'qr'"
          @click="handleTabClick('qr')"
        >
          <QrCodes
            :loading="loading"
            :data="resultQuery"
            :triggerDownload="triggerDownload"
          />

          <!-- Pdf downloader here -->
          <Pdf
            :triggerDownload="triggerDownload"
            @download-complete="triggerDownload = false"
            :campaignDetails="qrCodes"
          >
            <CompleteQrCodes :data="qrCodes" />
          </Pdf>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import SmsTokens from "~/components/tables/campaigns/sms-tokens.vue";
import QrCodes from "~/components/tables/campaigns/qr-codes.vue";
import CompleteQrCodes from "~/components/tables/campaigns/complete-qr-codes.vue";
import { mapGetters } from "vuex";
let screenLoading;

export default {
  name: "Manage-tokens",
  middleware: "authenticated",
  components: { SmsTokens, QrCodes, CompleteQrCodes },

  data: () => ({
    loading: false,
    triggerDownload: false,
    isCleared: false,
    searchQuery: "",
    smsTokens: [],
    qrCodes: [],
    selectedTokens: []
  }),

  computed: {
    ...mapGetters("authentication", ["user"]),
    resultQuery() {
      const data = this.tokenType === "sms" ? this.smsTokens : this.qrCodes;
      if (this.searchQuery) {
        return data.filter(benefactor => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every(v =>
              benefactor?.Beneficiary?.first_name?.toLowerCase().includes(v)
            );
        });
      } else {
        return data;
      }
    },

    tokenType() {
      return this.$route.query.method;
    }
  },

  watch: {
    "route.meta.reload": function(value) {
      if (value) {
        this.fetchTokens();
      }
    }
  },

  mounted() {
    this.fetchTokens();
  },

  methods: {
    async fetchTokens() {
      try {
        const campaignId = this.$route.params.id;
        const orgId = this.user?.AssociatedOrganisations[0]?.OrganisationId;

        this.loading = true;
        const [smsTokens, qrCodes] = await Promise.all([
          this.$axios.get(
            `/organisations/${orgId}/${campaignId}/smstoken/tokens/1`
          ),
          this.$axios.get(
            `/organisations/${orgId}/${campaignId}/papertoken/tokens/1`
          )
        ]);

        console.log("smsTokens:::", smsTokens);

        if (smsTokens.status == "success") {
          this.smsTokens = smsTokens.data?.tokens;
        }

        if (qrCodes.status == "success") {
          console.log("qrCodes", qrCodes.data.tokens);
          this.qrCodes = qrCodes.data?.tokens;
        }
      } catch (err) {
        console.log(err);
        this.$toast.error(err?.response?.data?.message);
      } finally {
        this.loading = false;
      }
    },
    async resendToken() {
      try {
        this.openScreen();
        const response = await this.$axios.post(
          `organisations/beneficiaries/sms-token`,
          {
            beneficiaryIds: this.selectedTokens
          }
        );
        console.log("REsponse:::", response);

        if (response.status == "success") {
          this.isCleared = true;
          this.$toast.success(
            `SMS token sent to ${this.selectedTokens.length} ${
              this.selectedTokens.length === 1 ? "beneficiary" : "beneficiaries"
            } `
          );
          this.selectedTokens = [];
        }
        screenLoading.close();
      } catch (err) {
        screenLoading.close();
        console.log(err);
        this.$toast.error(err?.response?.data?.message);
      }
    },
    handleSingleToken(id) {
      if (this.selectedTokens.includes(id)) {
        this.selectedTokens = this.selectedTokens.filter(v => v != id);
      } else {
        this.selectedTokens.push(id);
        this.resendToken();
      }
    },

    handleTabClick(tokenType) {
      this.$router.replace({
        path: this.$route.path,
        query: { method: tokenType }
      });
    },

    openScreen() {
      screenLoading = this.$loading({
        lock: true,
        spinner: "el-icon-loading",
        background: "#0000009b"
      });
    }
  }
};
</script>

<style scoped>
.holder {
  padding: 4rem 7.125rem;
}

.print-btn {
  background: #17ce89;
  border: 1px solid #17ce89;
  border-radius: 8px;
  height: 50px;
  color: white;
  padding: 0 1.125rem;
}
</style>

<style>
#token-tab__BV_tab_controls_ > .nav-item > .nav-link {
  font-family: "Poppins", sans-serif;
  font-size: 1rem;
  font-weight: 500;
  color: #7c8db5;
  padding: 0.5rem;
}

#token-tab__BV_tab_controls_ > .nav-item > .active {
  font-weight: 500;
  color: #17ce89;
}

#token-tab__BV_tab_controls_ {
  padding: 0 !important;
}

#token-tab__BV_tab_controls_ > .nav-item:nth-child(2) {
  margin-left: 2rem;
}
</style>
