<template>
  <div class="pb-5">
    <Modal id="add-vendor" size="lg" title="Add Vendor">
      <FormsAddVendor @reload="getAllVendors" />
    </Modal>

    <div class="row pt-4">
      <div class="col-lg-8">
        <div class="row">
          <div class="col-lg-5">
            <!-- Search Box here -->
            <div class="position-relative">
              <input
                v-model="searchQuery"
                type="text"
                class="form-controls search"
                placeholder=" Search vendors..."
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

      <div class="ml-auto d-flex mx-3">
        <csv
          :has-border="true"
          :data="computedData"
          :green-csv="true"
          :name="`${organisationName} vendors`"
        />

        <div class="ml-3">
          <Button
            text="Add Vendor"
            custom-styles="height:50px; border: 1px solid #17ce89 !important;"
            :has-border="false"
            :is-green="false"
            @click="$bvModal.show('add-vendor')"
          />
        </div>
      </div>
    </div>

    <!-- Table here -->
    <div class="table-holder mt-4">
      <div class="flex align-items-center table-title">
        <h4>Vendor list</h4>
        <div class="ml-auto"></div>
      </div>

      <div v-if="loading" class="px-4">
        <Skeleton
          :count="6"
          class="mb-5"
          styles="height: 52px; margin-bottom: 10px"
        />
      </div>

      <template v-else-if="resultQuery.length">
        <table class="table table-borderless">
          <thead>
            <tr>
              <th scope="col">
                {{ resultQuery.length == 1 ? "Vendor" : "Vendors" }}
              </th>
              <th scope="col">Phone Number</th>
              <th scope="col">Email Address</th>
              <th scope="col">Account Created</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="vendor in resultQuery" :key="vendor.id">
              <td class="d-flex align-items-center">
                <b-avatar
                  :src="vendor.profile_pic"
                  size="30px"
                  class="img-fluid p-1"
                  variant="light"
                ></b-avatar>

                <span class="mx-3 pt-1">
                  {{ vendor.first_name + " " + vendor.last_name }}
                </span>
              </td>
              <td>{{ vendor.phone }}</td>
              <td class="truncate">{{ vendor.email }}</td>
              <td>{{ vendor.createdAt | shortDate }}</td>

              <td>
                <div>
                  <Button
                    :hasBorder="true"
                    :hasIcon="false"
                    text="
                    View vendor"
                    custom-styles=" border-radius: 5px !important;
                    height:33px; border: 1px solid #17ce89 !important; font-size:
                    0.875rem !important; padding:0px 10px !important"
                    @click="$router.push(`/vendors/${vendor.id}`)"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <pagination
          :currentPageNum="vendorPageNum"
          :totalNumOfItems="vendorTotalItems"
          @updatePage="updateAllVendors"
        />
      </template>

      <h3 v-else class="text-center no-record">NO RECORD FOUND</h3>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";

export default {
  name: "AllVendors",
  layout: "dashboard",

  data() {
    return {
      loading: false,
      isCheckAll: false,
      orgId: "",
      data: [],
      allVendors: [],
      searchQuery: "",
      vendorPageNum: 1,
      vendorTotalItems: 0,
    };
  },

  computed: {
    ...mapGetters("authentication", ["user"]),

    organisationName() {
      return this.user?.AssociatedOrganisations[0]?.Organisation?.name;
    },
    resultQuery() {
      if (this.searchQuery) {
        return this.allVendors.filter((vendor) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => vendor.first_name.toLowerCase().includes(v));
        });
      } else {
        return this.allVendors;
      }
    },

    computedData() {
      const data = this.allVendors || [];
      return data.map((vendor) => {
        return {
          Name: vendor.first_name + " " + vendor.last_name,
          Phone_Number: vendor.phone,
          Store: vendor.Store ? vendor.Store.store_name : "",
          Email_Address: vendor.email,
          // location: vendor.Store
          //   ? JSON.parse(vendor?.Store?.location).country
          //   : "",
          Address: vendor.Store ? vendor.Store.address : "",
          Created: moment(vendor.createdAt).format("DD MMMM, YYYY"),
        };
      });
    },
  },

  mounted() {
    this.orgId = this.user?.AssociatedOrganisations[0]?.OrganisationId;
    this.getAllVendors();
  },

  methods: {
    updateAllVendors(action) {
      this.vendorPageNum =
        action === "prev" ? this.vendorPageNum - 1 : this.vendorPageNum + 1;

      this.getAllVendors();
    },

    async getAllVendors() {
      try {
        this.loading = true;

        const response = await this.$axios.get(
          `/organisations/${this.orgId}/vendors?page=${this.vendorPageNum}&size=10`
        );
        if (response.status === "success") this.allVendors = response.data;

        this.vendorPageNum = response?.currentPage || 1;
        this.vendorTotalItems = response?.totalItems || response.data.length;

        this.$emit("updateVendors", this.vendorTotalItems);
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
</style>
