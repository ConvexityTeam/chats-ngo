<template>
  <div class="pb-5">
    <!-- Modals/drawers Here -->
    <section>
      <drawer :visibleSync="drawer" @close="closeDrawer">
        <FormsMarketViewProposal
          :activeProposal="activeProposal"
          :campaign="campaign"
          @close="closeDrawer"
          @vendorApproved="handleApproval"
        />
      </drawer>
    </section>

    <div class="main container transparent pt-4 mt-2 pb-5">
      <div class="link-holder-container mb-4">
        <!-- Back Button -->
        <back text="Go Back" @click="$router.go(-1)" />

        <!-- Link Here -->
        <!-- <div
          class="d-flex align-items-center link-holder text-truncate px-3 h-100"
        >
          <img
            src="~/assets/img/vectors/link.svg"
            alt="link"
            class="pointer"
            @click="$copy(copiableLink)"
          />

          <span class="primary-blue text-truncate ml-2">
            <strong> <i>Proposal request link:</i> </strong>

            <span>
              <span class="copy-link">
                {{ `${copiableLink.substring(0, 20)} ...` }}
              </span>
            </span>
          </span>
        </div> -->
      </div>

      <div class="row mt-3">
        <div class="col-lg-8">
          <div class="table-holder mt-2">
            <div class="d-flex align-items-center table-title">
              <h4>Proposals</h4>
              <div class="ml-auto"></div>
            </div>

            <!-- tabs here -->
            <div class="mb-3 d-flex justify-content-between align-items-center">
              <b-tabs v-model="tabIndex" content-class="mt-1">
                <!-- All Proposals here -->
                <b-tab title="All" active title-link-class="beneficiary">
                </b-tab>

                <!-- Approved Proposals  here -->
                <b-tab title="Approved" title-link-class="beneficiary"> </b-tab>
              </b-tabs>

              <div class="position-relative mr-3">
                <input
                  v-model="searchQuery"
                  type="text"
                  class="form-controls search"
                  placeholder="Search vendor..."
                />
                <img
                  src="~/assets/img/vectors/search.svg"
                  class="search-icon position-absolute"
                  alt="search"
                />
              </div>
            </div>

            <section>
              <div v-if="loading" class="px-4">
                <Skeleton
                  :count="6"
                  class="mb-5"
                  styles="height: 52px; margin-bottom: 10px"
                />
              </div>

              <!-- Table Here -->
              <div v-else-if="activeVendorsList.length">
                <table class="table table-borderless">
                  <thead>
                    <tr>
                      <th scope="col">Vendors</th>
                      <th scope="col">Email</th>
                      <th scope="col">Status</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr
                      v-for="(vendor, i) in activeVendorsList"
                      :key="i"
                      class="table-row pointer"
                    >
                      <td>
                        {{ `${vendor.first_name} ${vendor.last_name}` }}
                      </td>
                      <td>{{ vendor.email }}</td>
                      <td>
                        <div
                          class="status px-2"
                          :class="{
                            accepted: vendor.status == 'accepted',
                            'rejected-2': vendor.status == 'rejected',
                            warning: vendor.status == 'pending',
                          }"
                        >
                          {{ vendor.status | capitalize }}
                        </div>
                      </td>

                      <td>
                        <Button
                          text="View proposal"
                          :has-icon="false"
                          :has-border="true"
                          custom-styles="border: 1px solid #17CE89 !important; border-radius: 8px !important; font-size: 0.875rem !important; height: 32px !important"
                          @click="viewProposal(vendor.id)"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>

                <pagination
                  :currentPageNum="activeVendorsPageNum"
                  :totalNumOfItems="activeVendorsTotalItems"
                  @updatePage="updateVendorsList"
                />
              </div>

              <h3 v-else class="text-center no-record">NO RECORD FOUND</h3>
            </section>
          </div>
        </div>

        <!-- Campaign details here -->
        <div class="col-lg-4">
          <SkeletonSingleCard v-if="loading" />
          <TablesMarketRequestSummary
            v-else
            :details="campaign"
            :totalRequests="totalRequests"
          />

          <!-- Campaign Vendors here -->
          <div class="mt-4">
            <SkeletonSingleCard v-if="loading" />
            <TablesMarketProducts
              v-else
              :products="activeVendorsList[0]?.proposal_products"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

let screenLoading;

export default {
  name: "CampaignDetails",
  layout: "dashboard",
  data: () => ({
    tabIndex: 1,
    loading: false,
    searchQuery: "",
    drawer: false,

    allVendorsPageNum: 1,
    allVendorsTotalItems: 0,
    allVendors: [],

    approvedVendorsPageNum: 1,
    approvedVendorsTotalItems: 0,
    approvedVendors: [],

    campaign: {},
    totalRequests: "",
    activeProposal: {},
  }),

  computed: {
    ...mapGetters("authentication", ["user"]),

    copiableLink() {
      return `https://chats.cash/organisation/test/tests/teste/gghdskldsgdshds`;
    },

    activeVendorsList() {
      return this.tabIndex === 1 ? this.approvedVendors : this.allVendors;
    },

    activeVendorsPageNum() {
      return this.tabIndex === 1
        ? this.approvedVendorsPageNum
        : this.allVendorsPageNum;
    },

    activeVendorsTotalItems() {
      return this.tabIndex === 1
        ? this.approvedVendorsTotalItems
        : this.allVendorsTotalItems;
    },

    resultQuery() {
      if (this.searchQuery) {
        return this.activeVendorsList.filter((data) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => data.first_name.toLowerCase().includes(v));
        });
      } else {
        return this.activeVendorsList;
      }
    },
  },

  mounted() {
    this.getVendors();
  },

  methods: {
    updateVendorsList(action) {
      if (this.tabIndex === 1) {
        this.approvedVendorsPageNum =
          action === "prev"
            ? this.approvedVendorsPageNum - 1
            : this.approvedVendorsPageNum + 1;
      } else {
        this.allVendorsPageNum =
          action === "prev"
            ? this.allVendorsPageNum - 1
            : this.allVendorsPageNum + 1;
      }

      this.getVendors();
    },

    async getVendors() {
      try {
        const orgId = this.user?.AssociatedOrganisations[0]?.OrganisationId;

        this.loading = true;

        const all = await this.$axios.get(
          `/organisation/${orgId}/requests/${this.$route.params.id}?page=${this.allVendorsPageNum}&size=10`
        );
        const approved = await this.$axios.get(
          `/organisation/${orgId}/requests/${this.$route.params.id}?page=${this.approvedVendorsPageNum}&size=10&status=approved`
        );

        const { campaign, total_request } = all.data;
        this.campaign = campaign;
        this.totalRequests = total_request;

        this.allVendorsPageNum = all.data.vendors?.currentPage;
        this.allVendorsTotalItems = all.data.vendors?.totalItems;
        this.allVendors = all.data.vendors.data;

        this.approvedVendorsPageNum = approved.data.vendors?.currentPage;
        this.approvedVendorsTotalItems = approved.data.vendors?.totalItems;
        this.approvedVendors = approved.data.vendors.data;
      } catch (err) {
        console.log("err", err);
      } finally {
        this.loading = false;
      }
    },

    async viewProposal(id) {
      try {
        this.openScreen();
        const response = await this.$axios.get(
          `organisation/${this.$route.params.id}/submitted-proposals/${id}`
        );

        if (response.status === "success") {
          this.activeProposal = response.data;
          this.drawer = true;
        }
      } catch (err) {
        console.log("err", err);
      } finally {
        screenLoading.close();
      }
    },

    closeDrawer() {
      this.drawer = false;
    },

    handleApproval() {
      this.closeDrawer();
      this.getVendors();
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
.link-holder-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
}
.link-holder {
  border: 0.5px solid #17ce89;
  height: 51px;
  display: flex;
  padding: 12px 16px;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  border-radius: 10px;
  background: #fff;
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

.status {
  font-size: 0.875rem;
  font-weight: 500;
  height: 30px !important;
}

.action {
  color: #17ce89 !important;
  font-weight: 500 !important;
}

.copy-link {
  color: #2f80ed;
  font-weight: 500;
}
</style>
