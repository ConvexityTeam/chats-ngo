<template>
  <div>
    <GenericImportLoader v-if="isImporting" :importStatus="importStatus" />

    <div class="table-holder mt-2">
      <!-- Modals Here -->
      <section>
        <Modal id="approve-benefactors" title="Approve Benefactors">
          <FormsCampaignsApproveBenefactors
            :benefactors="
              isSingleRequest ? [selectedBenefactor] : selectedBenefactors
            "
            @approveBenefactors="approveBenefactors"
          />
        </Modal>

        <!-- Reject Benefactors -->
        <Modal id="reject-benefactors" title="Reject Benefactors">
          <FormsCampaignsRejectBenefactors
            :benefactors="
              isSingleRequest ? [selectedBenefactor] : selectedBenefactors
            "
            @rejectBenefactors="rejectBenefactors"
          />
        </Modal>

        <!--select-import-beneficiaries-destination -->
        <Modal
          id="select-import-beneficiaries-destination"
          title="Select Import Destination"
        >
          <FormsCampaignsBeneficiaryImport
            @selectImportOption="selectImportOption"
          />
        </Modal>

        <!-- Import Existing Beneficiaries-->
        <Modal id="import-existing-beneficiaries" title="Import Beneficiaries">
          <FormsBeneficiariesImportsExisting
            :orgId="orgId"
            @imported="updateList"
          />
        </Modal>

        <!-- Import CSV Beneficiaries  -->
        <Modal id="import-csv-beneficiaries" title="Import Beneficiaries">
          <FormsBeneficiariesImportsCSV :orgId="orgId" @imported="updateList" />
        </Modal>

        <!-- Import third party Beneficiaries  -->
        <Modal
          id="import-third-party-beneficiaries"
          title="Import Beneficiaries"
        >
          <FormsBeneficiariesImportsThirdParty
            :orgId="orgId"
            @imported="updateList"
          />
        </Modal>

        <!-- Benefactor Details -->
        <Modal id="benefactor-details" title="Beneficiary Preview">
          <FormsCampaignsBenefactorDetails :benefactor="selectedBenefactor" />
        </Modal>

        <!-- Benefactor Questions and Answers -->
        <Modal id="benefactor-q-and-a" :buttonModified="true">
          <FormsCampaignsBenefactorQAndA
            :questionsAndAnswers="selectedBenefactor?.User?.Answers"
            @handleAction="handleAction"
          />
        </Modal>

        <!-- Benefactor Questions and Answers  -->
        <Modal id="benefactor-q-and-a" :buttonModified="true">
          <FormsCampaignsBenefactorQAndAVue
            :questionsAndAnswers="selectedBenefactor?.User?.Answers"
            @handleAction="handleAction"
          />
        </Modal>
      </section>

      <!-- Import Loader Here -->
      <div class="d-flex align-items-center table-title">
        <h4>Project beneficiaries</h4>
        <div class="ml-auto"></div>
      </div>

      <!-- tabs here -->
      <div class="mb-3 d-flex">
        <b-tabs v-model="tabIndex" content-class="mt-1">
          <!-- Approved beneficiaries here -->
          <b-tab title="Approved" active title-link-class="beneficiary">
          </b-tab>

          <!-- Pending beneficiaries  here -->
          <b-tab title="Pending" title-link-class="beneficiary"> </b-tab>

          <!-- Rejected beneficiaries  here -->
          <b-tab title="Rejected" title-link-class="beneficiary"> </b-tab>
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
            v-if="
              selectedBenefactors.length < 1 ||
              (selectedBenefactors.length >= 1 && tabIndex !== 1)
            "
            class="ml-4"
          >
            <Button
              text="Import beneficiaries"
              :has-icon="true"
              :is-import="true"
              :has-border="true"
              custom-styles="border: 1px solid #17CE89 !important; border-radius: 5px !important; font-size: 0.875rem !important; height: 33px !important; padding: 0 10px !important"
              @click="$bvModal.show('select-import-beneficiaries-destination')"
            />
          </div>
        </div>
      </div>

      <div v-if="loading" class="px-4">
        <Skeleton
          :count="6"
          class="mb-5"
          styles="height: 52px; margin-bottom: 10px"
        />
      </div>

      <div v-else-if="query.length">
        <!-- Table Here -->
        <table class="table table-borderless">
          <thead>
            <tr>
              <th v-if="tabIndex === 1" scope="col">
                <checkbox
                  :checked="selectedBenefactors.length === query.length"
                  @input="handleSelectAll"
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
              class="table-row pointer"
            >
              <td v-if="tabIndex === 1">
                <checkbox
                  :value="benefactor.UserId"
                  :checked="selectedBenefactorsId.includes(benefactor.UserId)"
                  @input="handleCheckbox(benefactor.UserId)"
                />
              </td>
              <td
                @click="
                  tabIndex === 1 ? getBenefactorDetails(benefactor) : null
                "
              >
                {{
                  benefactor && benefactor.User
                    ? `${benefactor.User.first_name} ${benefactor.User.last_name}`
                    : ""
                }}
              </td>

              <td
                @click="
                  tabIndex === 1 ? getBenefactorDetails(benefactor) : null
                "
              >
                {{ benefactor && benefactor.User && benefactor.User.phone }}
              </td>
              <td
                @click="
                  tabIndex === 1 ? getBenefactorDetails(benefactor) : null
                "
              >
                <span v-if="tabIndex == 0">
                  {{ benefactor && benefactor.User && benefactor.User.email }}
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
                    @click="$router.push(`/beneficiaries/${benefactor.UserId}`)"
                  />
                </div>

                <!-- Add accept benefactor button here to accept a single benefactor -->
                <div v-if="tabIndex == 1 && selectedBenefactors.length < 1">
                  <div
                    v-if="benefactor.User?.Answers[0]?.questions?.length < 1"
                  >
                    <!-- action dropdown here -->
                    <el-dropdown>
                      <el-button type="primary"> Action </el-button>

                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                          <div
                            class="text-primary action"
                            @click="
                              handleSingleBenefactorModal('approve', benefactor)
                            "
                          >
                            Approve
                          </div>
                        </el-dropdown-item>

                        <el-dropdown-item>
                          <div
                            class="action"
                            @click="
                              handleSingleBenefactorModal('reject', benefactor)
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
                    v-if="benefactor.User?.Answers[0]?.questions?.length >= 1"
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

        <!-- pagination component  -->
        <pagination
          :currentPageNum="beneficiaryPageNum"
          :totalNumOfItems="beneficiaryTotalItems"
          @updatePage="(action) => $emit('updateBeneficiaries', action)"
        />
      </div>

      <h3 v-else class="text-center no-record">NO RECORD FOUND</h3>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
let screenLoading;

export default {
  name: "ProjectBeneficiaries",

  props: {
    loading: {
      type: Boolean,
      default: false,
    },

    query: {
      type: Array,
      default: () => [],
    },

    beneficiaryPageNum: {
      type: Number,
      default: 1,
    },

    beneficiaryTotalItems: {
      type: Number,
      default: 0,
    },
  },

  data: () => ({
    orgId: "",
    isImporting: false,
    tabIndex: 1,
    isSingleRequest: false,
    selectedBenefactor: {},
    selectedBenefactors: [],
    selectedBenefactorsId: [],
    importStatus: {},
  }),

  computed: {
    ...mapGetters("authentication", ["user"]),
  },

  watch: {
    tabIndex() {
      this.$emit("updateTabIndex", this.tabIndex);
    },
    immediate: true,
  },

  mounted() {
    this.orgId = this.user?.AssociatedOrganisations[0]?.OrganisationId;
    this.campaignId = this.$route.params.id;
  },

  methods: {
    async checkImportStatus() {
      try {
        this.isImporting = true;

        const response = await this.$axios.get(
          `organisations/${this.orgId}/beneficiaries/${this.campaignId}/import-status`
        );

        this.importStatus = response.data;
        const { total_beneficiaries, total_imported } = response.data;
        const isAllImported = total_beneficiaries === total_imported;

        if (isAllImported) {
          this.$emit("getCampaignBeneficiaries");

          const { title } = this.details;
          return this.$toast.success(
            `You have successfully imported ${total_imported} ${
              total_imported === 1 ? "beneficiary" : "beneficiaries"
            } from ${title}`,
            "Beneficiaries Imported Successfully"
          );
        } else {
          await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
          await this.checkImportStatus();
        }
      } catch (error) {
      } finally {
        this.isImporting = false;
      }
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

        if (response.status === "success") {
          this.$toast.success(response.message);
          this.$emit("updateBeneficiaryState");
        }
      } catch (err) {
      } finally {
        screenLoading.close();
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

        if (response.status === "success") {
          this.$toast.success(response.message);
          this.$emit("updateBeneficiaryState");
        }
      } catch (err) {
      } finally {
        screenLoading.close();
      }
    },

    selectImportOption(importType) {
      this.$bvModal.hide("select-import-beneficiaries-destination");
      this.$bvModal.show(`import-${importType}-beneficiaries`);
    },

    updateList(importType) {
      if (importType === "existing") {
        this.checkImportStatus();
      }

      this.$bvModal.hide(`import-${importType}-beneficiaries`);
      this.tabIndex = 1;
      this.$emit("getCampaignBeneficiaries");
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

    getBenefactorDetails(benefactor) {
      this.selectedBenefactor = benefactor;
      setTimeout(() => {
        this.$bvModal.show(`benefactor-details`);
      }, 300);
    },

    displayBenefactorsQandA(benefactor) {
      this.selectedBenefactor = benefactor;

      setTimeout(() => {
        this.$bvModal.show(`benefactor-q-and-a`);
      }, 300);
    },

    handleAction(action) {
      this.handleSingleBenefactorModal(action, this.selectedBenefactor);
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
tr.table-row:nth-child(even) {
  background: #fafafc;
}
tr.table-row:nth-child(even):hover {
  background: #fafafc70;
}
tr.table-row:nth-child(odd) {
  background: #ffffff70;
}

.action {
  color: #17ce89 !important;
  font-weight: 500 !important;
}
</style>
