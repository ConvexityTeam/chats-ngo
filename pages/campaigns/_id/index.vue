<template>
  <div class="pb-5">
    <!-- Modals Here -->
    <section>
      <!-- Public Funding -->
      <Modal id="funding" title="Fund through Crypto">
        <funding />
      </Modal>

      <!-- Approve Benefactors -->
      <Modal id="approve-benefactors" title="Approve Benefactors">
        <ApproveBenefactorsVue
          :benefactors="
            isSingleRequest ? [selectedBenefactor] : selectedBenefactors
          "
          @approveBenefactors="approveBenefactors"
        />
      </Modal>

      <!-- Reject Benefactors -->
      <Modal id="reject-benefactors" title="Reject Benefactors">
        <RejectBenefactorsVue
          :benefactors="
            isSingleRequest ? [selectedBenefactor] : selectedBenefactors
          "
          @rejectBenefactors="rejectBenefactors"
        />
      </Modal>

      <!-- Benefactor Details -->
      <Modal id="benefactor-details" title="Benefactor Details">
        <BenefactorDetailsVue :benefactor="selectedBenefactor" />
      </Modal>

      <!-- Benefactor Questions and Answers -->
      <Modal id="benefactor-q-and-a" title="">
        <BenefactorQAndAVue
          @handleAction="handleAction"
          :questionsAndAnswers="selectedBenefactor?.User?.Answers"
        />
      </Modal>

      <!-- Funding Prompt  -->
      <Modal
        id="funding-prompt"
        :title="details.type == 'item' ? 'Create Items' : 'Fund Campaign'"
      >
        <FundingPrompt @handleFunding="fundCampaign" :details="details" />
      </Modal>

      <!-- Import Beneficiaries -->
      <Modal id="import-beneficiaries" title="Import Beneficiaries">
        <ImportBeneficiaries :orgId="orgId" @imported="updateList" />
      </Modal>

      <!-- Drawer Here -->
      <drawer @close="closeDrawer" :visibleSync="drawer">
        <!-- cash based campaign -->
        <AddCashBasedProduct
          @close="closeDrawer"
          v-if="details?.type == 'campaign'"
        />
        <!-- item based campaign -->
        <AddItemBasedProduct @close="closeDrawer" v-else />
      </drawer>
    </section>

    <div v-if="loading"></div>

    <div class="main container transparent pt-4 mt-2 pb-5" v-else>
      <!-- Back Button -->
      <back text="Go Back" @click="$router.go(-1)" />

      <!-- search - button region here -->
      <div class="row py-4 mt-2">
        <div class="col-lg-4">
          <div class="row">
            <div class="col-lg-10">
              <!-- Search Box here -->
              <div class="position-relative">
                <input
                  type="text"
                  class="form-controls search"
                  placeholder="Search beneficiaries..."
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

        <!-- Buttons here -->
        <div class="d-flex align-items-center ml-auto mx-3">
          <div class="mr-4 align-self-center pt-2">
            <h2
              class="primary poppins text-sm font-medium pointer"
              @click="
                $router.push({
                  path: `/campaigns/${$route.params.id}/manage-tokens`,
                  query: { method: 'sms' },
                })
              "
            >
              View / manage SMS token & QR codes
            </h2>
          </div>

          <div class="mr-4">
            <!-- display button if campaign is cash based -->
            <div v-if="details.status === 'pending' || !details.is_funded">
              <Button
                text="Fund Campaign"
                :has-icon="false"
                custom-styles="height:50px"
                @click="$bvModal.show('funding-prompt')"
                :disabled="
                  details.status === 'pending' || !approvedBeneficiaries.length
                "
              />
            </div>

            <Button
              v-else
              :text="
                details.type == 'item' ? 'Distribute Items' : 'Disburse Funds'
              "
              :has-icon="false"
              custom-styles="height:50px"
              @click="
                $router.push(`/campaigns/${$route.params.id}/disbursement`)
              "
              :disabled="
                statuses.includes(details.status) ||
                !approvedBeneficiaries.length
              "
            />
          </div>

          <!-- add products or items btn -->
          <div>
            <Button
              :text="details.type == 'item' ? 'Add items' : 'Add Products'"
              custom-styles="height:50px; border: 1px solid #17ce89 !important; font-weight: 600!important;"
              :has-border="true"
              :is-green="true"
              @click="drawer = true"
              :disabled="details.is_funded || details.status == 'ended'"
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

      <!-- Banner Here -->
      <section>
        <banner v-if="details.status === 'paused'">
          <PauseCampaign
            @resumeCampaign="resumeCampaign = true"
            :date="details.updatedAt"
          />
        </banner>

        <banner v-if="details.is_processing">
          <ProcessingFunding @reload="getDetails" />
        </banner>
      </section>

      <!-- Campaign-Privacy Here -->
      <div :class="{ hidden: details.status == 'paused' }">
        <PrivacyHolder
          :organisationId="orgId"
          :campaignId="campaignId"
          :is_public="details?.is_public"
          :campaignStatus="details?.status"
        />
      </div>

      <div class="row mt-3">
        <div class="col-lg-8">
          <!-- Campaign beneficiaries here -->
          <div>
            <div class="table-holder mt-2">
              <div class="d-flex align-items-center table-title">
                <h4>Campaign beneficiaries</h4>
                <div class="ml-auto"></div>
              </div>

              <!-- tabs here -->
              <div class="mb-3 d-flex">
                <b-tabs content-class="mt-1" v-model="tabIndex">
                  <!-- Approved beneficiaries here -->
                  <b-tab title="Approved" active title-link-class="beneficiary">
                  </b-tab>

                  <!-- Pending beneficiaries  here -->
                  <b-tab title="Pending" title-link-class="beneficiary">
                  </b-tab>

                  <!-- Rejected beneficiaries  here -->
                  <b-tab title="Rejected" title-link-class="beneficiary">
                  </b-tab>
                </b-tabs>

                <!-- Approve Button here -->
                <div class="d-flex align-items-center ml-auto mr-5">
                  <div
                    v-if="selectedBenefactors.length >= 1 && tabIndex === 1"
                    class="d-flex align-items-center ml-auto mr-3"
                  >
                    <!-- Accept selected benefactor  button here -->
                    <div class="ml-3">
                      <Button
                        text="Approve"
                        :has-icon="false"
                        :has-border="true"
                        custom-styles="border: 1px solid #17CE89 !important; border-radius: 5px !important; font-size: 0.875rem !important; height: 33px !important"
                        @click="handleMultipleBenefactorsModal('approve')"
                      />
                    </div>

                    <!-- Reject selected benefactor  button here -->
                    <div class="ml-3">
                      <Button
                        text="Reject"
                        :has-icon="false"
                        :has-border="true"
                        custom-styles="border: 1px solid #E42C66 !important; color: #E42C66 !important; border-radius: 5px !important; font-size: 0.875rem !important; height: 33px !important"
                        @click="handleMultipleBenefactorsModal('reject')"
                      />
                    </div>
                  </div>

                  <!-- Import Button Here -->
                  <div
                    class="ml-4"
                    v-if="
                      selectedBenefactors.length < 1 ||
                      (selectedBenefactors.length >= 1 && tabIndex !== 1)
                    "
                  >
                    <Button
                      text="Import beneficiaries"
                      :has-icon="true"
                      :is-import="true"
                      :has-border="true"
                      custom-styles="border: 1px solid #17CE89 !important; border-radius: 5px !important; font-size: 0.875rem !important; height: 33px !important; padding: 0 10px !important"
                      @click="$bvModal.show('import-beneficiaries')"
                    />
                  </div>
                </div>
              </div>

              <div v-if="query.length">
                <!-- Table Here -->
                <div>
                  <table class="table table-borderless">
                    <thead>
                      <tr>
                        <th scope="col" v-if="tabIndex === 1">
                          <checkbox
                            @input="handleSelectAll"
                            :checked="
                              selectedBenefactors.length === query.length
                            "
                          />
                        </th>
                        <th scope="col">Beneficiary</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">
                          {{ tabIndex == 0 ? "Email Address" : "Origination" }}
                        </th>
                        <th scope="col">
                          {{ tabIndex == 0 || 2 ? "" : "Actions" }}
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr
                        v-for="(benefactor, i) in query"
                        :key="i"
                        class="table-row"
                      >
                        <td v-if="tabIndex === 1">
                          <checkbox
                            @input="handleCheckbox(benefactor.UserId)"
                            :value="benefactor.UserId"
                            :checked="
                              selectedBenefactorsId.includes(benefactor.UserId)
                            "
                          />
                        </td>
                        <td
                          @click="
                            tabIndex === 1
                              ? getBenefactorDetails(benefactor)
                              : null
                          "
                        >
                          {{
                            benefactor && benefactor.User
                              ? benefactor.User.first_name +
                                " " +
                                benefactor.User.last_name
                              : ""
                          }}
                        </td>

                        <td
                          @click="
                            tabIndex === 1
                              ? getBenefactorDetails(benefactor)
                              : null
                          "
                        >
                          {{
                            benefactor &&
                            benefactor.User &&
                            benefactor.User.phone
                          }}
                        </td>
                        <td
                          @click="
                            tabIndex === 1
                              ? getBenefactorDetails(benefactor)
                              : null
                          "
                        >
                          <span v-if="tabIndex == 0">
                            {{
                              benefactor &&
                              benefactor.User &&
                              benefactor.User.email
                            }}
                          </span>
                          <span v-else>
                            {{ benefactor.source || "-" | capitalize }}
                          </span>
                        </td>

                        <td>
                          <div v-if="tabIndex == 0">
                            <Button
                              text="View"
                              :has-icon="false"
                              :has-border="true"
                              custom-styles="border: 1px solid #17CE89 !important; border-radius: 5px !important; font-size: 0.875rem !important; height: 33px !important"
                              @click="
                                $router.push(
                                  `/beneficiaries/${benefactor.UserId}`
                                )
                              "
                            />
                          </div>

                          <!-- Add accept benefactor button here to accept a single benefactor -->
                          <div
                            v-if="
                              tabIndex == 1 && selectedBenefactors.length < 1
                            "
                          >
                            <div
                              v-if="
                                benefactor.User?.Answers[0]?.questions?.length <
                                1
                              "
                            >
                              <!-- action dropdown here -->
                              <el-dropdown>
                                <el-button type="primary"> Action </el-button>

                                <el-dropdown-menu slot="dropdown">
                                  <el-dropdown-item>
                                    <div
                                      class="text-primary action"
                                      @click="
                                        handleSingleBenefactorModal(
                                          'approve',
                                          benefactor
                                        )
                                      "
                                    >
                                      Approve
                                    </div>
                                  </el-dropdown-item>

                                  <el-dropdown-item>
                                    <div
                                      class="action"
                                      @click="
                                        handleSingleBenefactorModal(
                                          'reject',
                                          benefactor
                                        )
                                      "
                                    >
                                      Reject
                                    </div>
                                  </el-dropdown-item>
                                </el-dropdown-menu>
                              </el-dropdown>
                            </div>

                            <!-- view for button here -->
                            <Button
                              v-if="
                                benefactor.User?.Answers[0]?.questions
                                  ?.length >= 1
                              "
                              text="View Form"
                              :has-icon="false"
                              :has-border="true"
                              custom-styles="border: 1px solid #17CE89 !important; border-radius: 5px !important; font-size: 0.875rem !important; height: 33px !important"
                              @click="displayBenefactorsQandA(benefactor)"
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!-- pagination here -->
                <!-- show pgination if number of pages is greater than 1 -->
                <div v-if="totalNumOfPages > 1">
                  <pagination
                    :currentPageNum="currentPageNum"
                    :numOfItemsPerPage="numOfItemsPerPage"
                    :totalNumOfItems="totalNumOfItems"
                    @updatePage="updatePage"
                  />
                </div>
              </div>

              <div v-else-if="loading" class="text-center"></div>
              <h3 v-else class="text-center no-record">NO RECORD FOUND</h3>
            </div>
          </div>

          <!-- complaints here -->
          <div class="mt-4 pt-2">
            <beneficiary-complaints
              :campaignId="$router.history.current.params.id"
              :campaignName="details.title"
            />
          </div>
        </div>

        <!-- Campaign details here -->
        <div class="col-lg-4">
          <campaign-details
            :details="details"
            :count="approvedBeneficiaries.length"
            :location="location"
            :user="user"
            @reload="getDetails"
            :resumeCampaign="resumeCampaign"
          />

          <!-- Campaign Vendors here -->
          <div class="mt-4">
            <campaign-vendors :user="user" :remount="remount" />
          </div>

          <!-- Campaign Products here -->
          <div class="mt-4">
            <campaign-products :user="user" :remount="remount" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import beneficiaryComplaints from "~/components/tables/campaigns/beneficiary-complaints";
import campaignDetails from "~/components/tables/campaigns/campaign-details";
import banner from "~/components/generic/banner";
import funding from "~/components/forms/funding";
import AddCashBasedProduct from "~/components/forms/AddCashBasedProduct";
import AddItemBasedProduct from "~/components/forms/AddItemBasedProduct";
import campaignVendors from "~/components/tables/campaigns/campaign-vendors";
import campaignProducts from "~/components/tables/campaigns/campaign-products";
import FundingPrompt from "./funding-prompt";
import ImportBeneficiaries from "./import-beneficiaries";
import PrivacyHolder from "~/components/generic/privacy-holder";
import ApproveBenefactorsVue from "~/components/forms/approve-benefactors";
import RejectBenefactorsVue from "~/components/forms/reject-benefactors";
import BenefactorDetailsVue from "~/components/forms/campaign/benefactor-details";
import BenefactorQAndAVue from "~/components/forms/campaign/benefactor-q-and-a";
import PauseCampaign from "~/components/generic/PauseCampaign";
import ProcessingFunding from "~/components/generic/ProcessingFunding";

let screenLoading;

export default {
  layout: "dashboard",
  name: "CampaignProperties",
  data: () => ({
    tabIndex: 1,
    loading: false,
    orgId: "",
    campaignId: "",
    searchQuery: "",
    checkedNames: [],
    SelectedCampaign: {},
    complaints: [],
    beneficiaries: [],
    selectedBenefactors: [],
    selectedBenefactorsId: [],
    selectedBenefactor: {},
    isSingleRequest: false,
    details: {},
    location: "",
    resumeCampaign: false,
    title: "",
    drawer: false,
    remount: false,
    statuses: ["pending", "completed", "ongoing"],
    currentPageNum: 1,
    numOfItemsPerPage: 5,
    totalNumOfItems: 65,
  }),

  components: {
    beneficiaryComplaints,
    campaignDetails,
    banner,
    funding,
    campaignVendors,
    campaignProducts,
    FundingPrompt,
    ImportBeneficiaries,
    PrivacyHolder,
    ApproveBenefactorsVue,
    RejectBenefactorsVue,
    BenefactorDetailsVue,
    BenefactorQAndAVue,
    PauseCampaign,
    ProcessingFunding,
    AddCashBasedProduct,
    AddItemBasedProduct,
  },

  computed: {
    ...mapGetters("authentication", ["user"]),

    totalNumOfPages: function () {
      const remainder = this.totalNumOfItems % this.numOfItemsPerPage;
      const numOfPages = Math.floor(
        (this.totalNumOfItems - remainder) / this.numOfItemsPerPage
      );

      //
      if (remainder < 1) return numOfPages;
      if (remainder >= 1) return numOfPages + 1;
    },

    approvedBeneficiaries() {
      return (
        this.beneficiaries.filter((benefactor) => benefactor.approved) || []
      );
    },

    rejectedBeneficiaries() {
      return (
        this.beneficiaries.filter((benefactor) => benefactor.rejected) || []
      );
    },

    pendingBeneficiaries() {
      return (
        this.beneficiaries.filter(
          (benefactor) => !benefactor.rejected && !benefactor.approved
        ) || []
      );
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
    // displays benefactors details
    getBenefactorDetails(benefactor) {
      this.selectedBenefactor = benefactor;
      setTimeout(() => {
        this.$bvModal.show(`benefactor-details`);
      }, 300);
    },

    // displays benefactor questions and answers modal
    displayBenefactorsQandA(benefactor) {
      this.selectedBenefactor = benefactor;

      setTimeout(() => {
        this.$bvModal.show(`benefactor-q-and-a`);
      }, 300);
    },

    //  Benefactor Questions and Answers action buttons
    handleAction(action) {
      this.handleSingleBenefactorModal(action, this.selectedBenefactor);
    },

    handleCheckbox(value) {
      const index = this.selectedBenefactorsId.indexOf(value);

      if (index > -1) {
        this.selectedBenefactorsId.splice(index, 1);

        const updatedBenefactors = [];
        this.selectedBenefactors.forEach((selectedBenefactor) => {
          if (selectedBenefactor.UserId !== value) {
            updatedBenefactors.push(selectedBenefactor);
          }
        });

        this.selectedBenefactors = updatedBenefactors;
      } else {
        this.selectedBenefactorsId.push(value);

        const isBenefactorInSelectedBenefactors = this.selectedBenefactors.find(
          (selectedBenefactor) => value === selectedBenefactor.UserId
        );

        if (!isBenefactorInSelectedBenefactors) {
          this.query.forEach((item) => {
            if (value === item.UserId) this.selectedBenefactors.push(item);
          });
        }
      }
    },

    handleSelectAll() {
      if (
        this.query.length === this.selectedBenefactors.length ||
        this.query.length === this.selectedBenefactorsId.length
      ) {
        this.selectedBenefactors = [];
        this.selectedBenefactorsId = [];
      } else {
        this.selectedBenefactors = this.query.map(
          (selectedBenefactor) => selectedBenefactor
        );
        this.selectedBenefactorsId = this.query.map(
          (selectedBenefactor) => selectedBenefactor.UserId
        );
      }
    },

    async fundCampaign() {
      try {
        this.openScreen();

        const response = await this.$axios.post(
          `organisations/${this.orgId}/campaigns/${this.details?.id}/fund-campaign`
        );

        if (response.status == "success") {
          this.$toast.success(response.message);
          this.$bvModal.hide("funding-prompt");
          window.location.reload();
        }
      } catch (err) {
        this.$toast.error(err?.response?.data?.message);
      } finally {
        screenLoading.close();
      }
    },

    async getDetails() {
      try {
        this.openScreen();
        this.loading = true;

        const response = await this.$axios.get(
          `/organisations/${this.orgId}/campaigns/${this.campaignId}`
        );

        if (response.status == "success") {
          screenLoading.close();
          this.details = response.data;
          this.location = JSON.parse(response.data?.location?.country);
        }
      } catch (err) {
      } finally {
        screenLoading.close();
        this.loading = false;
      }
    },

    async getCampaignBeneficiaries() {
      try {
        this.openScreen();
        const response = await this.$axios.get(
          `/organisation/${this.orgId}/campaigns/${this.campaignId}/beneficiaries`
        );

        if (response.status == "success") {
          screenLoading.close();
          this.beneficiaries = response.data;
        }
      } catch (err) {
        screenLoading.close();
      }
    },

    handleSingleBenefactorModal(action, benefactor) {
      this.isSingleRequest = true;
      this.selectedBenefactor = benefactor;

      console.log(this.selectedBenefactor);

      setTimeout(() => {
        this.$bvModal.show(`${action}-benefactors`);
      }, 300);

      this.selectedBenefactors = [];
      this.selectedBenefactorsId = [];
    },

    handleMultipleBenefactorsModal(action) {
      this.isSingleRequest = false;

      setTimeout(() => {
        this.$bvModal.show(`${action}-benefactors`);
      }, 300);
    },

    resetView() {
      this.selectedBenefactors = [];
      this.selectedBenefactorsId = [];
      this.tabIndex = 0;
    },

    async approveBenefactors() {
      let benefactorsId = [];

      benefactorsId = this.isSingleRequest
        ? [this.selectedBenefactor?.UserId]
        : this.selectedBenefactorsId;

      try {
        this.openScreen();
        const response = await this.$axios.put(
          `organisation/${this.orgId}/campaigns/${this.$route.params.id}/beneficiaries/approve`,
          { ids: benefactorsId }
        );

        if (response.status == "success") {
          this.getCampaignBeneficiaries();
          this.$toast.success(response.message);
          this.resetView();
          this.getDetails();
        }
      } catch (err) {
      } finally {
        screenLoading.close();
      }
    },

    async rejectBenefactors() {
      let benefactorsId = [];

      benefactorsId = this.isSingleRequest
        ? [this.selectedBenefactor?.UserId]
        : this.selectedBenefactorsId;

      try {
        this.openScreen();
        const response = await this.$axios.put(
          `/organisation/${this.orgId}/campaigns/${this.campaignId}/beneficiaries`,
          {
            beneficiary_id: this.activeBenefactor?.UserId,
            approved: false,
            rejected: true,
          }
        );

        if (response.status == "success") {
          this.getCampaignBeneficiaries();
          this.$toast.success(response.message);
          this.resetView();
        }
      } catch (err) {
      } finally {
        screenLoading.close();
      }
    },

    updatePage(action) {
      this.currentPageNum =
        action === "prev" ? this.currentPageNum - 1 : this.currentPageNum + 1;
    },

    updateList() {
      this.$bvModal.hide("import-beneficiaries");
      this.tabIndex = 1;
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

tr.table-row:nth-child(even) {
  background: #fafafc;
}
tr.table-row:nth-child(even):hover {
  background: #fafafc70;
}
tr.table-row:nth-child(odd) {
  background: #ffffff70;
}

.hidden {
  display: none;
}

.action {
  color: #17ce89 !important;
  font-weight: 500 !important;
}
</style>
