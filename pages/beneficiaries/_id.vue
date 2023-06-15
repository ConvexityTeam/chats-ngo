<template>
  <div>
    <div v-if="loading">
      <FullScreenLoader :loading="loading" />
    </div>

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
                  <h4 class="funds" :title="totalReceived">
                    {{ $truncate(totalReceived) }}
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
                  <h4 class="funds" :title="totalSpent">
                    {{ $truncate(totalSpent) }}
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
                  <h4 class="funds" :title="totalRemaining">
                    {{ $truncate(totalRemaining) }}
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <!-- Campaigns - Group Members here -->

          <section>
            <div class="row mt-5">
              <div class="col-lg-8">
                <!-- Search Box here -->
                <div class="position-relative w-75">
                  <input
                    type="text"
                    class="form-controls search"
                    :placeholder="`Search ${section}...`"
                    v-model="searchQuery"
                  />
                  <img
                    src="~/assets/img/vectors/search.svg"
                    class="search-icon position-absolute"
                    alt="search"
                  />
                </div>
              </div>

              <div class="ml-auto mx-3">
                <csv :data="computedData" :name="`${name}`" />
              </div>
            </div>

            <!-- Tabs Here -->
            <div class="mt-4" v-if="members.length">
              <b-tabs
                content-class="mt-1"
                id="profile-tab"
                nav-class
                nav-wrapper-class
              >
                <b-tab
                  title="Campaigns"
                  :active="section === 'campaigns'"
                  class="nav-links"
                  @click="section = 'campaigns'"
                >
                  <div class="mt-4">
                    <BeneficiaryCampaign :campaigns="campaignsQuery" />
                  </div>
                </b-tab>

                <b-tab
                  title="Beneficiaries"
                  :active="section === 'beneficiaries'"
                  class="nav-links"
                  @click="section = 'beneficiaries'"
                >
                  <div class="mt-4">
                    <BeneficiaryMembers
                      :beneficiaries="beneficiariesQuery"
                      :phone="userDetails.phone"
                    />
                  </div>
                </b-tab>
              </b-tabs>
            </div>

            <div v-else>
              <BeneficiaryCampaign :campaigns="campaignsQuery" />
            </div>
          </section>
        </div>

        <!-- Personal details here -->
        <div class="col-lg-4">
          <BeneficiaryDetails :user="userDetails" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
import TotalBalance from "~/components/icons/total-balance";
import Disbursed from "~/components/icons/disbursed";
import BeneficiaryDetails from "~/components/tables/beneficiaries/beneficiary-details";
import BeneficiaryCampaign from "~/components/tables/beneficiaries/beneficiary-campaign";
import BeneficiaryMembers from "~/components/tables/beneficiaries/BeneficiaryMembers";

export default {
  name: "BeneficiaryInfo",
  layout: "dashboard",
  components: {
    Disbursed,
    TotalBalance,
    BeneficiaryDetails,
    BeneficiaryCampaign,
    BeneficiaryMembers,
  },

  data: () => ({
    loading: false,
    userDetails: {},
    section: "campaigns",
    searchQuery: "",
  }),

  mounted() {
    this.getDetails();
  },

  computed: {
    ...mapGetters("authentication", ["user"]),

    name() {
      return `${this.userDetails?.first_name}-${this.userDetails?.last_name}_${this.section}`;
    },

    totalReceived() {
      return `${this.$currency}${this.$root.$options.filters.formatCurrency(
        this.userDetails?.total_wallet_received
      )}`;
    },

    totalSpent() {
      return `${this.$currency}${this.$root.$options.filters.formatCurrency(
        this.userDetails?.total_wallet_spent
      )}`;
    },

    totalRemaining() {
      return `${this.$currency}${this.$root.$options.filters.formatCurrency(
        this.userDetails?.total_wallet_balance
      )}`;
    },

    members() {
      return this.userDetails?.members?.group_members || [];
    },

    campaignsQuery() {
      const { Campaigns } = this.userDetails;

      if (this.searchQuery) {
        return Campaigns.filter((campaign) =>
          campaign.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      return Campaigns;
    },

    computedData() {
      if (this.section === "campaigns") {
        return this.computedCampaigns;
      }
      return this.computedBeneficiaries;
    },

    beneficiariesQuery() {
      if (this.searchQuery) {
        return this.members.filter((gm) =>
          gm.full_name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      return this.members;
    },

    computedCampaigns() {
      const campaigns = this.userDetails?.Campaigns || [];
      return campaigns.map((campaign) => {
        return {
          Name: campaign.title,
          Budget: campaign.budget,
          "Start Date": moment(campaign.start_date).format(" MMMM DD, YYYY"),
          "End Date": moment(campaign.end_date).format(" MMMM DD, YYYY"),
          Status: campaign.status,
        };
      });
    },

    computedBeneficiaries() {
      return this.members.map((member) => {
        return {
          Beneficiaries: member.full_name,
          "Phone number": member.phone,
          "Date of Birth": moment(member.dob).format(" MMMM DD, YYYY"),
        };
      });
    },
  },

  methods: {
    async getDetails() {
      try {
        this.loading = true;
        const { OrganisationId } = this.user?.AssociatedOrganisations[0];

        const response = await this.$axios.get(
          `/organisation/${OrganisationId}/beneficiaries/${this.$route.params.id}`
        );
        console.log(" BEN DETAILS::", response);

        if (response.status == "success") {
          this.userDetails = response.data;
        }
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
  },
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

.ml-3 {
  margin-left: 0.75rem !important;
}

.funds {
  color: var(--primary-blue);
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 0.563rem;
}
</style>
