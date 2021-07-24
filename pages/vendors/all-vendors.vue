<template>
  <div class="main container transparent pb-5">
    <div class="pt-4 mt-2">
      <back text="Go Back" @click="$router.push('/vendors')" />
    </div>

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

      <div class=" ml-auto mx-3">
        <csv :data="computedData" name="beneficiaries" />
      </div>
    </div>

    <!-- Table here -->
    <div class="table-holder mt-4">
      <div v-if="vendors.length" class="flex align-items-center table-title">
        <h4>Vendor list</h4>
        <div class="ml-auto"></div>
      </div>
      <table class="table table-borderless" v-if="resultQuery.length">
        <thead>
          <tr>
            <th scope="col">Vendor</th>
            <th scope="col">Vendor ID</th>
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

            <td>
              {{ vendor.phone }}
            </td>

            <td>
              {{ vendor.email }}
            </td>

            <td>
              {{ vendor.createdAt | formatDate }}
            </td>

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
      <div v-else-if="loading" class=" text-center"></div>
      <h3 v-else class="text-center no-record">NO RECORD FOUND</h3>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
let screenLoading;
export default {
  layout: "dashboard",
  data() {
    return {
      isCheckAll: false,
      img: require("~/assets/img/user.png"),
      data: [],
      vendors: [],
      searchQuery: null,
      loading: false
    };
  },

  computed: {
    resultQuery() {
      if (this.searchQuery) {
        return this.vendors.filter(vendor => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every(v => vendor.first_name.toLowerCase().includes(v));
        });
      } else {
        return this.vendors;
      }
    }
  },

  created() {
    this.fetchAllVendors();
  },

  methods: {
    ...mapActions("beneficiaries", ["SAVE_TEMP_VENDOR"]),
    checkAll() {
      this.isCheckAll = !this.isCheckAll;
      this.data = [];
      if (this.isCheckAll) {
        // Check all
        for (var key in this.vendors) {
          this.data.push(this.vendors[key].id);
        }
      }
    },

    updateCheckall() {
      this.data.length === this.vendors.length
        ? (this.isCheckAll = true)
        : (this.isCheckAll = false);
    },

    handleTempVendor(vendor) {
      this.SAVE_TEMP_VENDOR(vendor);
      this.$router.push(`/vendors/${vendor.id}`);
    },

    async fetchAllVendors() {
      try {
        this.openScreen();
        this.loading = true;

        const response = await this.$axios.get("/vendors");

        if (response.status == "success") {
          screenLoading.close();
          this.loading = false;
          this.vendors = response.data;
        }

        console.log("vendors::::", response);

        this.loading = false;
      } catch (error) {
        screenLoading.close();
        this.loading = false;
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
</style>
