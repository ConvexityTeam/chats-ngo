<template>
  <div class="pb-5">
    <div v-if="loading"></div>

    <div class="main container transparent pt-4 mt-2 pb-5" v-else>
      <!-- Modas Here -->
      <section>
        <!-- Public Funding -->
        <Modal id="funding" title="Fund through Crypto">
          <funding />
        </Modal>

        <!-- Approve Benefactors -->
        <Modal id="approve-benefactors" title="Approve Benefactors">
          <approve-benefactors
            :benefactors="
              isSingleRequest ? [selectedBenefactor] : selectedBenefactors
            "
            @approveBenefactors="approveBenefactors"
          />
        </Modal>

        <!-- Reject Benefactors -->
        <Modal id="reject-benefactors" title="Reject Benefactors">
          <reject-benefactors
            :benefactors="
              isSingleRequest ? [selectedBenefactor] : selectedBenefactors
            "
            @rejectBenefactors="rejectBenefactors"
          />
        </Modal>

        <!-- Funding Prompt  -->
        <Modal id="funding-prompt" title="Fund Campaign">
          <FundingPrompt @handleFunding="fundCampaign" />
        </Modal>

        <!-- Import Beneficiaries -->
        <Modal id="import-beneficiaries" title="Import Beneficiaries">
          <ImportBeneficiaries :orgId="orgId" @imported="updateList" />
        </Modal>
      </section>

      <!-- Drawer Here -->
      <el-drawer
        :visible.sync="drawer"
        size="75%"
        :with-header="false"
        :direction="direction"
      >
        <add-product @close="closeDrawer" />
      </el-drawer>

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
            <Button
              v-if="details.status === 'pending' || !details.is_funded"
              text="Fund Campaign"
              :has-icon="false"
              custom-styles="height:50px"
              @click="$bvModal.show('funding-prompt')"
              :disabled="details.status === 'pending'"
            />

            <Button
              v-else
              text="Disburse Funds"
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

          <div>
            <Button
              text="Add Products"
              custom-styles="height:50px; border: 1px solid #17ce89 !important; font-weight: 600!important;"
              :has-border="true"
              :is-green="true"
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

      <!-- Banner Here -->
      <div v-if="details.status === 'paused'" class="">
        <banner
          :date="details.updatedAt"
          @resumeCampaign="resumeCampaign = true"
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

              <!-- Table Here -->
              <table v-if="query.length" class="table table-borderless">
                <thead>
                  <tr>
                    <th scope="col" v-if="tabIndex === 1">
                      <checkbox
                        @input="handleSelectAll"
                        :checked="selectedBenefactors.length === query.length"
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
                  <tr v-for="(benefactor, i) in query" :key="i">
                    <td v-if="tabIndex === 1">
                      <checkbox
                        @input="handleCheckbox(benefactor.UserId)"
                        :value="benefactor.UserId"
                        :checked="
                          selectedBenefactorsId.includes(benefactor.UserId)
                        "
                      />
                    </td>
                    <td>
                      {{
                        benefactor && benefactor.User
                          ? benefactor.User.first_name +
                            " " +
                            benefactor.User.last_name
                          : ""
                      }}
                    </td>
                    <td>
                      {{
                        benefactor && benefactor.User && benefactor.User.phone
                      }}
                    </td>
                    <td>
                      <span v-if="tabIndex == 0">{{
                        benefactor && benefactor.User && benefactor.User.email
                      }}</span>
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
                            $router.push(`/beneficiaries/${benefactor.UserId}`)
                          "
                        />
                      </div>

                      <!-- Add accept benefactor button here to accept a single benefactor -->
                      <div v-if="tabIndex == 1">
                        <el-dropdown>
                          <el-button type="primary"> Action </el-button>

                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                              <div
                                style="
                                  color: #17ce89 !important;
                                  font-weight: 500 !important;
                                "
                                class="text-primary"
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
                                style="
                                  color: #e42c66 !important;
                                  font-weight: 500 !important;
                                "
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
                    </td>
                  </tr>
                </tbody>
              </table>
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
            :count="details.Beneficiaries ? details.Beneficiaries.length : 0"
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
import banner from "~/components/generic/banner.vue";
import funding from "~/components/forms/funding.vue";
import addProduct from "~/components/forms/add-product.vue";
import approveBenefactors from "~/components/forms/approve-benefactors.vue";
import rejectBenefactors from "~/components/forms/reject-benefactors.vue";
import campaignVendors from "~/components/tables/campaigns/campaign-vendors.vue";
import campaignProducts from "~/components/tables/campaigns/campaign-products.vue";
import FundingPrompt from "./funding-prompt";
import ImportBeneficiaries from "./import-beneficiaries.vue";
let screenLoading;

export default {
  layout: "dashboard",
  data: () => ({
    tabIndex: 1,
    loading: false,
    orgId: "",
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
    direction: "rtl",
    statuses: ["pending", "completed", "ongoing"],
  }),

  components: {
    beneficiaryComplaints,
    campaignDetails,
    banner,
    funding,
    addProduct,
    approveBenefactors,
    rejectBenefactors,
    campaignVendors,
    campaignProducts,
    FundingPrompt,
    ImportBeneficiaries,
  },

  computed: {
    ...mapGetters("authentication", ["user"]),

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
    this.getDetails();
    this.getCampaignBeneficiaries();
  },

  methods: {
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
          `/organisations/${this.orgId}/campaigns/${this.$route.params.id}`
        );

        if (response.status == "success") {
          screenLoading.close();
          this.details = response.data;
          this.location = JSON.parse(response.data?.location?.country);
        }

        this.loading = false;
      } catch (err) {
        this.loading = false;
        screenLoading.close();
      }
    },

    async getCampaignBeneficiaries() {
      try {
        this.openScreen();
        const response = await this.$axios.get(
          `/organisation/${this.orgId}/campaigns/${this.$route.params.id}/beneficiaries`
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
          `organisation/${this.orgId}/campaigns/${this.$route.params.id}/beneficiaries/reject`,
          { ids: benefactorsId }
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
</style>
