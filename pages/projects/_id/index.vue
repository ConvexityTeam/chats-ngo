<template>
  <div class="pb-5">
    <PartialsLoading v-if="isFunding" />

    <!-- Modals Here -->
    <section>
      <!-- Drawer Here -->
      <drawer :visibleSync="drawer" @close="closeDrawer">
        <!-- cash based campaign -->
        <FormsAddCashBasedProduct
          v-if="details?.type === 'campaign'"
          @close="closeDrawer"
        />
        <!-- item based campaign -->
        <FormsAddItemBasedProduct v-else @close="closeDrawer" />
      </drawer>

      <!-- Public Funding -->
      <Modal id="funding" title="Fund through Crypto">
        <funding />
      </Modal>

      <!-- Funding Prompt  -->
      <Modal
        id="funding-prompt"
        :title="details?.type === 'item' ? 'Create Items' : 'Fund Project'"
      >
        <FormsFundProject
          :details="details"
          @done="$bvModal.show('funding-progress')"
        />
      </Modal>

      <!-- Funding Progress  -->
      <Modal
        id="funding-progress"
        :buttonModified="true"
        @closeModal="checkFundStatus"
      >
        <FormsFundingProgress @done="checkFundStatus" />
      </Modal>
    </section>

    <div class="main container transparent pt-4 mt-2 pb-5">
      <template v-if="loading">
        <div class="row container py-4">
          <Skeleton class="w-25" styles="height: 50px" />
          <div class="ml-auto d-flex align-items-center">
            <Skeleton
              variant="button"
              class="mx-3"
              styles="height: 50px; width: 118px"
            />
            <Skeleton variant="button" styles="height: 50px; width: 118px" />
          </div>
        </div>
      </template>

      <template v-else>
        <back text="Go Back" @click="$router.go(-1)" />
        <!-- search - button region here -->
        <div class="row py-4 mt-2">
          <div class="col-lg-4">
            <div class="row">
              <div class="col-lg-10">
                <!-- Search Box here -->
                <div class="position-relative">
                  <input
                    v-model="searchQuery"
                    type="text"
                    class="form-controls search"
                    placeholder="Search beneficiaries..."
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

          <!-- Buttons here -->
          <div class="d-flex align-items-center ml-auto mx-3">
            <div class="mr-4 align-self-center pt-2">
              <h2
                class="primary poppins text-sm font-medium pointer underline"
                @click="
                  $router.push({
                    path: `/projects/${$route.params.id}/manage-tokens`,
                    query: { method: 'sms' },
                  })
                "
              >
                View / manage SMS token & QR codes
              </h2>
            </div>

            <div class="mr-4">
              <!-- display button if campaign is cash based -->
              <!--  -->
              <div v-if="details?.status === 'pending' || !details.is_funded">
                <Button
                  text="Fund Project"
                  :has-icon="false"
                  custom-styles="height:50px"
                  @click="$bvModal.show('funding-prompt')"
                />
              </div>

              <Button
                v-else
                :text="
                  details.type === 'item'
                    ? 'Distribute Items'
                    : 'Disburse Funds'
                "
                :has-icon="false"
                custom-styles="height:50px; background:#53A6EB"
                :disabled="
                  statuses.includes(details?.status) ||
                  !approvedBeneficiaries.length
                "
                @click="
                  $router.push(`/projects/${$route.params.id}/disbursement`)
                "
              />
            </div>

            <!-- add products or items btn -->
            <div>
              <Button
                :text="details.type === 'item' ? 'Add items' : 'Add Products'"
                custom-styles="height:50px; border: 1px solid #17ce89 !important; font-weight: 600!important;"
                :has-border="true"
                :is-green="true"
                :disabled="details?.status === 'ended'"
                @click="drawer = true"
              />
            </div>

            <!-- <div class="ml-3">
            <Button
              text="Public Funding"
              :has-icon="false"
              custom-styles="height:50px"
              @click="showModal"
              :disabled="true"
            />
          </div> -->
          </div>
        </div>
      </template>

      <!-- Banner Here -->
      <section>
        <banner v-if="details?.status === 'paused'">
          <PauseCampaign
            :date="details.updatedAt"
            @resumeCampaign="resumeCampaign = true"
          />
        </banner>

        <banner v-if="details.is_processing">
          <ProcessingFunding @reload="getDetails" />
        </banner>
      </section>

      <!-- Campaign-Privacy Here -->
      <div
        v-if="details?.type === 'campaign' || details?.type === 'item'"
        :class="{ hidden: details?.status === 'paused' }"
      >
        <GenericPrivacyHolder :details="details" />
      </div>

      <div class="row mt-3">
        <div class="col-lg-8">
          <!-- Project beneficiaries here -->
          <div>
            <TablesCampaignsProjectBeneficiaries
              :query="query"
              :loading="loading"
              :beneficiaryPageNum="beneficiaryPageNum"
              :beneficiaryTotalItems="beneficiaryTotalItems"
              @updateTabIndex="(value) => (tabIndex = value)"
              @updateBeneficiaryState="updateBeneficiaryState"
              @getCampaignBeneficiaries="getCampaignBeneficiaries"
              @updateBeneficiaries="updateBeneficiaries"
            />
          </div>

          <!-- complaints here -->
          <div class="mt-4 pt-2">
            <TablesCampaignsBeneficiaryComplaints
              :campaignId="$router.history.current.params.id"
              :campaignName="details.title"
            />
          </div>

          <!-- Campaign Transactions Here -->
          <div class="mt-4 pt-2">
            <TablesCampaignsCampaignTransactions
              :campaignId="$route.params.id"
              :campaignName="details.title"
              :user="user"
            />
          </div>
        </div>

        <!-- Campaign details here -->
        <div class="col-lg-4">
          <TablesCampaignsDetails
            :loading="loading"
            :details="details"
            :count="approvedBeneficiaries.length"
            :location="location"
            :user="user"
            :resumeCampaign="resumeCampaign"
            @reload="getDetails"
          />

          <!-- Campaign Vendors here -->
          <div class="mt-4">
            <TablesCampaignsVendors :user="user" :remount="remount" />
          </div>

          <!-- Campaign Products here -->
          <div class="mt-4">
            <TablesCampaignsProducts :user="user" :remount="remount" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import banner from "~/components/generic/banner";

import PauseCampaign from "~/components/generic/PauseCampaign";

let screenLoading;

export default {
  name: "CampaignDetails",
  components: { banner, PauseCampaign },

  layout: "dashboard",

  data: () => ({
    tabIndex: 0,
    isFunding: false,
    isImporting: false,
    loading: false,
    orgId: "",
    campaignId: "",
    searchQuery: "",

    checkedNames: [],
    SelectedCampaign: {},
    complaints: [],
    beneficiaries: [],
    details: {},
    location: "",
    resumeCampaign: false,
    title: "",
    drawer: false,
    remount: false,
    statuses: ["pending", "completed", "ongoing"],

    rejectedBeneficiaries: [],
    rejectedBeneficiariesPageNum: 1,
    rejectedBeneficiariesTotalItems: 0,

    approvedBeneficiaries: [],
    approvedBeneficiariesPageNum: 1,
    approvedBeneficiariesTotalItems: 0,

    pendingBeneficiaries: [],
    pendingBeneficiariesPageNum: 1,
    pendingBeneficiariesTotalItems: 0,
  }),

  computed: {
    ...mapGetters("authentication", ["user"]),

    beneficiaryPageNum() {
      const validPageNum =
        this.tabIndex === 0
          ? this.approvedBeneficiariesPageNum
          : this.tabIndex === 1
          ? this.pendingBeneficiariesPageNum
          : this.rejectedBeneficiariesPageNum;

      return validPageNum;
    },

    beneficiaryTotalItems() {
      const validTotalItems =
        this.tabIndex === 0
          ? this.approvedBeneficiariesTotalItems
          : this.tabIndex === 1
          ? this.pendingBeneficiariesTotalItems
          : this.rejectedBeneficiariesTotalItems;

      return validTotalItems;
    },

    query() {
      const valid =
        this.tabIndex === 0
          ? this.approvedBeneficiaries
          : this.tabIndex === 1
          ? this.pendingBeneficiaries
          : this.rejectedBeneficiaries;

      if (this.searchQuery) {
        return valid.filter((benefactor) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) =>
              benefactor?.User?.first_name?.toLowerCase().includes(v)
            );
        });
      } else {
        return valid;
      }
    },
  },

  mounted() {
    this.orgId = this.user?.AssociatedOrganisations[0]?.OrganisationId;
    this.campaignId = this.$route.params.id;

    this.getDetails();
    this.getCampaignBeneficiaries();
  },

  methods: {
    updateBeneficiaryState() {
      this.getCampaignBeneficiaries();
      this.resetView();
      this.getDetails();
    },
    async checkFundStatus() {
      try {
        this.isFunding = true;

        const response = await this.$axios.get(
          `organisations/${this.orgId}/campaigns/${this.campaignId}/fund-status`
        );

        console.log("FUNDSTATUS::", response);

        if (response.data.fund_status === "success") {
          this.getDetails();

          const { title, budget } = this.details;
          const campaignText = `with ${this.$root.$options.filters.formatCurrency(
            budget
          )}`;

          return this.$toast.success(
            `The "${title}" project has been successfully funded ${
              this.details.type === "campaign" ? campaignText : ""
            }`,
            "Project Funded Successfully"
          );
        } else {
          await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
          await this.checkFundStatus(); // Recursive call
        }
      } catch (error) {
      } finally {
        this.isFunding = false;
      }
    },

    async getDetails() {
      try {
        this.loading = true;

        const response = await this.$axios.get(
          `/organisations/${this.orgId}/campaigns/${this.campaignId}`
        );

        if (response.status === "success") {
          this.details = response.data;
          this.location = JSON.parse(response.data?.location?.country);
        }
      } catch (err) {
      } finally {
        this.loading = false;
      }
    },

    async getCampaignBeneficiaries() {
      try {
        this.loading = true;

        const approved = await this.$axios.get(
          `/organisation/${this.orgId}/campaigns/${this.campaignId}/beneficiaries?page=${this.approvedBeneficiariesPageNum}&size=10&approved=true`
        );
        const rejected = await this.$axios.get(
          `/organisation/${this.orgId}/campaigns/${this.campaignId}/beneficiaries?page=${this.rejectedBeneficiariesPageNum}&size=10&rejected=true`
        );
        const pending = await this.$axios.get(
          `/organisation/${this.orgId}/campaigns/${this.campaignId}/beneficiaries?page=${this.pendingBeneficiariesPageNum}&size=10&approved=false&rejected=false`
        );

        if (approved.status === "success")
          this.approvedBeneficiaries = approved.data;
        if (rejected.status === "success")
          this.rejectedBeneficiaries = rejected.data;
        if (pending.status === "success")
          this.pendingBeneficiaries = pending.data;

        console.log("approved beneficiaries:::", approved);
        console.log("rejected beneficiaries:::", rejected);
        console.log("pending beneficiaries:::", pending);

        this.rejectedBeneficiariesPageNum = rejected?.currentPage || 1;
        this.rejectedBeneficiariesTotalItems = rejected?.totalItems;

        this.approvedBeneficiariesPageNum = approved?.currentPage || 1;
        this.approvedBeneficiariesTotalItems = approved?.totalItems;

        this.pendingBeneficiariesPageNum = pending?.currentPage || 1;
        this.pendingBeneficiariesTotalItems = pending?.totalItems;
      } catch (err) {
      } finally {
        this.loading = false;
      }
    },

    async fundCampaign() {
      try {
        this.openScreen();

        const response = await this.$axios.post(
          `organisations/${this.orgId}/campaigns/${this.details?.id}/fund-campaign`
        );

        if (response.status === "success") {
          this.$toast.success(response.message);
          this.$bvModal.hide("funding-prompt");
          await this.getDetails();
          window.location.reload();
        }
      } catch (err) {
        this.$toast.error(err?.response?.data?.message);
      } finally {
        screenLoading.close();
      }
    },

    resetView() {
      this.selectedBenefactors = [];
      this.selectedBenefactorsId = [];
      this.tabIndex = 0;
    },

    updateBeneficiaries(action) {
      if (this.tabIndex === 0) {
        this.approvedBeneficiariesPageNum =
          action === "prev"
            ? this.approvedBeneficiariesPageNum - 1
            : this.approvedBeneficiariesPageNum + 1;
      } else if (this.tabIndex === 1) {
        this.pendingBeneficiariesPageNum =
          action === "prev"
            ? this.pendingBeneficiariesPageNum - 1
            : this.pendingBeneficiariesPageNum + 1;
      } else {
        this.rejectedBeneficiariesPageNum =
          action === "prev"
            ? this.rejectedBeneficiariesPageNum - 1
            : this.rejectedBeneficiariesPageNum + 1;
      }

      this.getCampaignBeneficiaries();
    },

    closeDrawer() {
      this.drawer = false;
      this.remount = true;
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
.main {
  height: calc(100vh - 72px);
  overflow-y: scroll;
}

.col-lg-8 {
  flex: 0 0 63.666667%;
  max-width: 63.666667%;
}

.col-lg-4 {
  flex: 0 0 36.333333%;
  max-width: 36.333333%;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}

.hidden {
  display: none;
}

.action {
  color: #17ce89 !important;
  font-weight: 500 !important;
}
</style>
