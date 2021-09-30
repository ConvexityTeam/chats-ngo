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
                    ${{
                      userDetails.total_wallet_received || 0 | formatCurrency
                    }}
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
                    ${{ userDetails.total_wallet_spent || 0 | formatCurrency }}
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
                    ${{
                      userDetails.total_wallet_balance || 0 | formatCurrency
                    }}
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <!-- Campaigns here -->
          <div class="mt-3">
            <beneficiary-campaign
              :campaigns="userDetails.Campaigns"
              :name="userDetails.first_name + ' ' + userDetails.last_name"
            />
          </div>
        </div>

        <!-- Personal details here -->
        <div class="col-lg-4">
          <beneficiary-details :user="userDetails" />
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
    id: "",
    loading: false,
    userDetails: {}
  }),

  mounted() {
    this.id = this.user.AssociatedOrganisations[0].OrganisationId;
    this.getDetails();
  },

  computed: {
    ...mapGetters("authentication", ["user"])
  },

  methods: {
    async getDetails() {
      try {
        this.openScreen();
        this.loading = true;

        const response = await this.$axios.get(
          `/organisation/${this.id}/beneficiaries/${this.$route.params.id}`
        );
        console.log(" BEN DETAILS::", response);

        if (response.status == "success") {
          screenLoading.close();
          this.loading = false;
          this.userDetails = response.data;
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
