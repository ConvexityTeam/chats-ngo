<template>
  <div>
    <!-- <div v-if="loading">
      <FullScreenLoader :loading="loading" />
    </div> -->

    <div class="main container transparent pb-5">
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
                <img src="~/assets/img/vectors/deposit.svg" alt="deposit" />

                <div v-if="loading" class="ml-3 w-50">
                  <Skeleton class="mb-2" />
                  <Skeleton />
                </div>

                <div v-else class="ml-3">
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
                <img src="~/assets/img/vectors/spent.svg" alt="spent" />

                <div v-if="loading" class="ml-3 w-50">
                  <Skeleton class="mb-2" />
                  <Skeleton />
                </div>

                <div v-else class="ml-3">
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
                <IconsTotalBalance />

                <div v-if="loading" class="ml-3 w-50">
                  <Skeleton class="mb-2" />
                  <Skeleton />
                </div>

                <div v-else class="ml-3">
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
                    v-model="searchQuery"
                    type="text"
                    class="form-controls search"
                    :placeholder="`Search ${section}...`"
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
            <div v-if="members.length" class="mt-4">
              <b-tabs
                id="profile-tab"
                content-class="mt-1"
                nav-class
                nav-wrapper-class
              >
                <b-tab
                  title="Projects"
                  :active="section === 'campaigns'"
                  class="nav-links"
                  @click="section = 'campaigns'"
                >
                  <div class="mt-4">
                    <BeneficiaryCampaign
                      :campaigns="campaignsQuery"
                      :beneficiaryCampaignPageNum="beneficiaryCampaignPageNum"
                      :beneficiaryCampaignTotalItems="
                        beneficiaryCampaignTotalItems
                      "
                      @updatePage="updateBeneficiaryCampaigns"
                    />
                  </div>
                </b-tab>

                <b-tab
                  title="Beneficiaries"
                  :active="section === 'beneficiaries'"
                  class="nav-links"
                  @click="section = 'beneficiaries'"
                >
                  <div class="mt-4">
                    <TablesBeneficiariesMembers
                      :loading="loading"
                      :phone="userDetails.phone"
                      :beneficiaries="beneficiariesQuery"
                      :beneficiaryMemberPageNum="beneficiaryMemberPageNum"
                      :beneficiaryMemberTotalItems="beneficiaryMemberTotalItems"
                      @updatePage="updateBeneficiaryMembers"
                    />
                  </div>
                </b-tab>
              </b-tabs>
            </div>

            <div v-else>
              <TablesBeneficiariesCampaign
                :loading="loading"
                :campaigns="campaignsQuery"
                :beneficiaryCampaignPageNum="beneficiaryCampaignPageNum"
                :beneficiaryCampaignTotalItems="beneficiaryCampaignTotalItems"
                @updatePage="updateBeneficiaryCampaigns"
              />
            </div>
          </section>
        </div>

        <!-- Personal details here -->
        <div class="col-lg-4">
          <SkeletonSingleCard v-if="loading" />
          <TablesBeneficiariesDetails v-else :user="userDetails" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";

export default {
  name: "BeneficiaryInfo",

  layout: "dashboard",

  data: () => ({
    loading: false,
    walletData: {},
    userDetails: {},
    campaigns: [],
    section: "campaigns",
    searchQuery: "",

    beneficiaryMemberPageNum: 1,
    beneficiaryMemberTotalItems: 0,

    beneficiaryCampaignPageNum: 1,
    beneficiaryCampaignTotalItems: 0,
  }),

  computed: {
    ...mapGetters("authentication", ["user"]),

    name() {
      return `${this.userDetails?.first_name}-${this.userDetails?.last_name}_${this.section}`;
    },

    totalReceived() {
      return `${this.$root.$options.filters.formatCurrency(
        this.walletData?.total_wallet_received
      )}`;
    },

    totalSpent() {
      return `${this.$root.$options.filters.formatCurrency(
        this.walletData?.total_wallet_spent
      )}`;
    },

    totalRemaining() {
      return `${this.$root.$options.filters.formatCurrency(
        this.walletData?.total_wallet_balance
      )}`;
    },

    members() {
      return this.userDetails?.members?.group_members || [];
    },

    campaignsQuery() {
      if (this.searchQuery) {
        return this.campaigns.filter((campaign) =>
          campaign.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      return this.campaigns;
    },

    computedData() {
      if (this.section === "campaigns") return this.computedCampaigns;
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
      return this.campaigns.map((campaign) => {
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

  mounted() {
    this.getDetails();
  },

  methods: {
    updateBeneficiaryCampaigns(action) {
      this.beneficiaryCampaignPageNum =
        action === "prev"
          ? this.beneficiaryCampaignPageNum - 1
          : this.beneficiaryCampaignPageNum + 1;

      this.getDetails();
    },

    async getDetails() {
      try {
        this.loading = true;
        const { OrganisationId } = this.user?.AssociatedOrganisations[0];

        const response = await this.$axios.get(
          `/organisation/${OrganisationId}/beneficiaries/${this.$route.params.id}?page=${this.beneficiaryCampaignPageNum}&size=10`
        );

        if (response.status === "success") {
          this.userDetails = response.data?.user;
          this.walletData = response.data?.response;
          this.campaigns = response.data?.response?.data;
        }

        console.log("response", response);

        this.beneficiaryCampaignPageNum = response.data.response?.currentPage;
        this.beneficiaryCampaignTotalItems = response.data.response?.totalItems;
      } catch (err) {
        console.log("err", err);
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
