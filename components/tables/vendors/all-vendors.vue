<template>
  <div class="main  transparent pb-5">
    <!-- <div class="pt-4 mt-2">
      <back text="Go Back" @click="$router.push('/vendors')" />
    </div> -->

    <Modal id="add-vendor" size="lg" title="Add Vendor">
      <add-vendor @reload="handleReload" />
    </Modal>

    <div class="row pt-4">
      <div class="col-lg-8">
        <div class="row">
          <div class="col-lg-5">
            <!-- Search Box here -->
            <div class="position-relative">
              <input
                type="text"
                class="form-controls search"
                placeholder=" Search vendors..."
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

      <div class=" ml-auto d-flex mx-3">
        <csv
          :has-border="true"
          :data="computedData"
          :green-csv="true"
          name="vendors"
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
      <table class="table table-borderless" v-if="resultQuery.length">
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
              <img
                :src="
                  vendor.profile_pic == null || !vendor.profile_pic
                    ? img
                    : vendor.profile_pic
                "
                width="30"
                height="30"
                class="rounded-circle"
                :alt="vendor.first_name"
                loading="lazy"
              />

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
                  @click="handleTempVendor(vendor)"
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
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import addVendor from "~/components/forms/add-vendor.vue";
import moment from "moment";

export default {
  layout: "dashboard",
  data() {
    return {
      isCheckAll: false,
      img: require("~/assets/img/user.png"),
      data: [],
      searchQuery: "",
      loading: false
    };
  },

  components: {
    addVendor
  },

  computed: {
    ...mapGetters("authentication", ["user"]),
    ...mapGetters("vendors", ["allVendors"]),
    resultQuery() {
      if (this.searchQuery) {
        return this.allVendors.filter(vendor => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every(v => vendor.first_name.toLowerCase().includes(v));
        });
      } else {
        return this.allVendors;
      }
    },

    computedData() {
      const data = this.allVendors || [];
      return data.map(vendor => {
        return {
          Name: vendor.first_name + " " + vendor.last_name,
          Phone_Number: vendor.phone,
          Store: vendor.Store ? vendor.Store.store_name : "",
          Email_Address: vendor.email,
          //   location: vendor.Store
          //     ? JSON.parse(
          //         vendor?.Store?.location?.country +
          //           "," +
          //           vendor?.Store?.location?.state
          //       )
          //     : "",
          Address: vendor.Store ? vendor.Store.address : "",
          Created: moment(vendor.createdAt).format("DD MMMM, YYYY")
        };
      });
    }
  },

  mounted() {
    console.log("ALL VENDOE:::", this.allVendors);
    this.getallVendors(this.user?.AssociatedOrganisations[0]?.OrganisationId);
  },

  methods: {
    ...mapActions("beneficiaries", ["SAVE_TEMP_VENDOR"]),
    ...mapActions("vendors", ["getallVendors"]),

    handleReload() {
      this.getallVendors(this.user?.AssociatedOrganisations[0]?.OrganisationId);
    },

    handleTempVendor(vendor) {
      this.SAVE_TEMP_VENDOR(vendor);
      this.$router.push(`/vendors/${vendor.id}`);
    }
  }
};
</script>

<style scoped>
.main {
  height: calc(100vh - 72px);
  overflow-y: scroll;
}
</style>
