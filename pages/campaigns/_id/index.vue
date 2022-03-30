<template>
  <div class="pb-5">
    <div v-if="loading"></div>

    <div class="main container transparent pt-4 mt-2 pb-5" v-else>
      <!-- Modas Here -->
      <section>
        <Modal id="funding" title="Fund through Crypto">
          <funding />
        </Modal>

        <Modal id="fund-campaign" title="Fund Campaign">
          <fund-campaign :campaign="details" @fundCampaign="fundCampaign" />
        </Modal>

        <Modal id="reject-benefactor" title="Reject Benefactor">
          <reject-benefactor
            :benefactor="activeBenefactor"
            @rejectBenefactor="rejectBenefactor"
          />
        </Modal>
      </section>

      <!-- Drawer Here -->
      <el-drawer
        :visible.sync="drawer"
        size="75%"
        :with-header="false"
        :direction="direction"
      >
        <add-product @close="drawer = false" />
      </el-drawer>

      <back text="Go Back" @click="$router.go(-1)" />

      <!-- search region here -->
      <div class="row py-4">
        <div class="col-lg-8">
          <div class="row">
            <div class="col-lg-5">
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

        <div class="d-flex ml-auto mx-3">
          <div v-if="!details.is_funded" class="mr-3">
            <Button
              text="Fund Campaign"
              :has-icon="false"
              custom-styles="height:50px"
              @click="$bvModal.show('fund-campaign')"
              :disabled="details.status == 'pending'"
            />
          </div>

          <div>
            <Button
              text="Add Products"
              custom-styles="height:50px; border: 1px solid #17ce89 !important;"
              :has-border="true"
              :is-green="true"
              @click="drawer = true"
            />
          </div>

          <div class="ml-3">
            <Button
              text="Public Funding"
              :has-icon="false"
              custom-styles="height:50px"
              @click="showModal"
              :disabled="true"
            />
          </div>
        </div>
      </div>

      <!-- Banner Here -->
      <div v-if="details.status == 'paused'" class="">
        <banner
          :date="details.updatedAt"
          @resumeCampaign="resumeCampaign = true"
        />
      </div>

      <div class="row" :class="{ 'mt-3': details.status == 'paused' }">
        <div class="col-lg-8">
          <!-- Campaign beneficiaries here -->
          <div>
            <div class="table-holder mt-2">
              <div class="d-flex align-items-center table-title">
                <h4>Campaign beneficiaries</h4>
                <div class="ml-auto"></div>
              </div>

              <!-- tabs here -->
              <div class="mx-2 mb-3 d-flex">
                <b-tabs content-class="mt-1" v-model="tabIndex">
                  <!-- All  beneficiaries here -->
                  <b-tab title="All" active title-link-class="beneficiary">
                  </b-tab>

                  <!-- Pending beneficiaries  here -->
                  <b-tab title="Pending" title-link-class="beneficiary">
                  </b-tab>

                  <!-- Rejected beneficiaries  here -->
                  <b-tab title="Rejected" title-link-class="beneficiary">
                  </b-tab>
                </b-tabs>

                <!-- Approve Button here -->
                <div
                  class="ml-auto mr-5"
                  v-if="unapprovedBeneficiaries.length && tabIndex == 1"
                >
                  <Button
                    text="Approve"
                    :has-icon="false"
                    :has-border="true"
                    custom-styles="border: 1px solid #17CE89 !important; border-radius: 5px !important; font-size: 0.875rem !important; height: 33px !important"
                    @click="approveBeneficiaries"
                  />
                </div>
              </div>

              <!-- Table Here -->
              <table v-if="query.length" class="table table-borderless">
                <thead>
                  <tr>
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

                      <div v-if="tabIndex == 1">
                        <Button
                          text="Reject"
                          :has-icon="false"
                          :has-border="true"
                          custom-styles="border: 1px solid #E42C66 !important; color: #E42C66 !important; border-radius: 5px !important; font-size: 0.875rem !important; height: 33px !important"
                          @click="handleRejectBenefactor(benefactor)"
                        />
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
            <campaign-vendors :user="user" />
          </div>

          <!-- Campaign Products here -->
          <div class="mt-4">
            <campaign-products :user="user" />
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
import fundCampaign from "~/components/forms/fund-campaign.vue";
import rejectBenefactor from "~/components/forms/reject-benefactor.vue";
import campaignVendors from "~/components/tables/campaigns/campaign-vendors.vue";
import campaignProducts from "~/components/tables/campaigns/campaign-products.vue";

let screenLoading;
export default {
  layout: "dashboard",
  data: () => ({
    tabIndex: 0,
    loading: false,
    orgId: "",
    searchQuery: "",
    SelectedCampaign: {},
    complaints: [],
    beneficiaries: [],
    details: {},
    location: "",
    resumeCampaign: false,
    activeBenefactor: {},
    title: "",
    drawer: false,
    direction: "rtl"
  }),

  components: {
    beneficiaryComplaints,
    campaignDetails,
    banner,
    funding,
    addProduct,
    fundCampaign,
    rejectBenefactor,
    campaignVendors,
    campaignProducts
  },

  computed: {
    ...mapGetters("authentication", ["user"]),
    unapprovedBeneficiaries() {
      return this.beneficiaries.filter(benefactor => !benefactor.approved);
    },
    query() {
      const valid =
        this.tabIndex == 0 ? this.beneficiaries : this.unapprovedBeneficiaries;

      if (this.searchQuery) {
        return valid.filter(benefactor => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every(
              v =>
                benefactor &&
                benefactor.User &&
                benefactor.User.first_name.toLowerCase().includes(v)
            );
        });
      } else {
        return valid;
      }
    }
  },

  mounted() {
    this.orgId = this.user?.AssociatedOrganisations[0]?.OrganisationId;
    this.getDetails();
    this.getCampaignBeneficiaries();
  },

  methods: {
    showModal() {
      this.$bvModal.show("funding");
    },
    async fundCampaign() {
      try {
        this.openScreen();

        const response = await this.$axios.post(
          `organisations/${this.orgId}/campaigns/${this.details.id}/fund`
        );

        screenLoading.close();
        console.log("FundResponse", response);

        if (response.status == "success") {
          this.$toast.success(response.message);
          this.getDetails();
        }
      } catch (err) {
        screenLoading.close();
        this.$toast.error(err?.response?.data?.message);
        console.log({ err: err });
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
          // this.beneficiaries = response.data[0].Beneficiaries;
          // this.location = JSON.parse(response.data[0].location);
          console.log("here", response.data);
        }

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

        console.log("BENEFIFICARIES", response);
      } catch (err) {
        screenLoading.close();
      }
    },

    handleRejectBenefactor(benefactor) {
      this.activeBenefactor = benefactor;

      setTimeout(() => {
        this.$bvModal.show("reject-benefactor");
      }, 300);
    },
    async approveBeneficiaries() {
      try {
        this.openScreen();
        const response = await this.$axios.put(
          `organisation/${this.orgId}/campaigns/${this.$route.params.id}/beneficiaries/approve`
        );

        if (response.status == "success") {
          this.getCampaignBeneficiaries();
          screenLoading.close();
        }
      } catch (err) {
        screenLoading.close();
      }
    },
    async rejectBenefactor() {
      try {
        this.openScreen();
        const response = await this.$axios.put(
          `/organisation/${this.orgId}/campaigns/${this.$route.params.id}/beneficiaries`,
          {
            beneficiary_id: this.activeBenefactor?.UserId,
            approved: false
          }
        );
      } catch (err) {
        screenLoading.close();
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

.col-lg-8 {
  flex: 0 0 63.666667%;
  max-width: 63.666667%;
}

.col-lg-4 {
  flex: 0 0 36.333333%;
  max-width: 36.333333%;
}
</style>
