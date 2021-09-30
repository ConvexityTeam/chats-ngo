<template>
  <div>
    <div v-if="loading"></div>

    <div class="main container transparent pb-5" v-else>
      <div class="pt-4 mt-2">
        <back text="Go Back" @click="$router.go(-1)" />
      </div>

      <div class="row pt-4">
        <div class="col-lg-8">
          <!-- Top cards here -->
          <div class="row">
            <!-- Total amount Received here -->
            <div class="col-lg-4">
              <div class="card__holder d-flex p-3">
                <div>
                  <img src="~/assets/img/vectors/deposit.svg" alt="deposit" />
                </div>
                <div class="ml-3">
                  <p class="text">Total Recieved</p>
                  <h4 class="funds">
                    $
                    {{ user.wallet ? user.wallet.balance : 0 | formatCurrency }}
                  </h4>
                </div>
              </div>
            </div>

            <!--  Amount Disbursed here -->
            <div class="col-lg-4">
              <div class="card__holder d-flex p-3">
                <div>
                  <img src="~/assets/img/vectors/spent.svg" alt="spent" />
                </div>
                <div class="ml-3">
                  <p class="text">Total Spent</p>
                  <h4 class="funds">
                    $
                    {{ user.wallet ? user.wallet.balance : 0 | formatCurrency }}
                  </h4>
                </div>
              </div>
            </div>

            <!-- Total Balance -->
            <div class="col-lg-4">
              <div class="card__holder d-flex p-3">
                <div>
                  <total-balance />
                </div>
                <div class="ml-3">
                  <p class="text">Total Remaining</p>
                  <h4 class="funds">
                    $
                    {{ user.wallet ? user.wallet.balance : 0 | formatCurrency }}
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <!-- Campaigns here -->
          <div class="mt-3">
            <beneficiary-campaign :campaigns="campaigns" :user="user" />
          </div>
        </div>

        <!-- Personal details here -->
        <div class="col-lg-4">
          <beneficiary-details :user="user" :loading="loading" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import totalBalance from "~/components/icons/total-balance.vue";
import disbursed from "~/components/icons/disbursed.vue";
import beneficiaryDetails from "~/components/tables/beneficiaries/beneficiary-details.vue";
import beneficiaryCampaign from "~/components/tables/beneficiaries/beneficiary-campaign.vue";

let screenLoading;

export default {
  layout: "dashboard",

  components: {
    disbursed,
    totalBalance,
    beneficiaryDetails,
    beneficiaryCampaign
  },

  data: () => ({
    loading: false,
    user: {},
    campaigns: []
  }),

  mounted() {
    console.log("BEnEfacor", this.BENEFACTOR);
    this.getDetails();
  },

  computed: {
    ...mapGetters("beneficiaries", ["BENEFACTOR"]),

    resultQuery() {
      if (this.searchQuery) {
        return this.campaigns.filter(campaign => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every(v => campaign.title.toLowerCase().includes(v));
        });
      } else {
        return this.campaigns;
      }
    }
  },

  methods: {
    async getDetails() {
      try {
        this.openScreen();
        this.loading = true;

        const response = await this.$axios.get(
          `beneficiaries/user/${this.BENEFACTOR.id}`
        );

        this.loading = false;
        if (response.status == "success") {
          screenLoading.close();
          this.loading = false;
          this.user = response.data.user;
          this.campaigns = response.data.associatedCampaigns;
          console.log("beneficiaryDetail:::", response);
        }
      } catch (err) {
        screenLoading.close();
        this.loading = false;
        console.log(err);
      }
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
.main {
  height: calc(100vh - 72px);
  overflow-y: scroll;
}

.card__holder {
  background: #ffffff;
  box-shadow: 0px 4px 25px rgba(174, 174, 192, 0.15);
  border-radius: 10px;
}

.text {
  color: #7c8db5;
  font-size: 0.875rem;
  font-weight: 500;
}

.funds {
  color: var(--tertiary-black);
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 0.563rem;
}
</style>
