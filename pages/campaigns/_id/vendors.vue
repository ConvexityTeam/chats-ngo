<template>
  <div class="main container transparent pb-5">
    <div class="pt-4 pb-2">
      <back text="Go Back" @click="$router.go(-1)" />
    </div>
    <div class="row pt-4 mt-2">
      <div class="col-lg-8">
        <div class="row">
          <div class="col-lg-5">
            <!-- Search Box here -->
            <div class="position-relative">
              <input
                type="text"
                class="form-controls search"
                placeholder="Search vendors..."
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
    </div>

    <!-- Table here -->
    <!-- Table here -->
    <div class="table-holder mt-4">
      <div class="flex align-items-center table-title">
        <h4>Vendor list</h4>
        <div class="ml-auto"></div>
      </div>
      <table class="table table-borderless" v-if="resultQuery.length">
        <thead>
          <tr>
            <th scope="col">Vendor</th>
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
                  vendor && vendor.Vendor && vendor.Vendor.profile_pic
                    ? vendor.Vendor.profile_pic
                    : img
                "
                width="30"
                height="30"
                class="rounded-circle"
                :alt="vendor && vendor.Vendor.first_name"
                loading="lazy"
              />

              <span class="mx-3 pt-1">
                {{
                  vendor && vendor.Vendor
                    ? vendor.Vendor.first_name + " " + vendor.Vendor.last_name
                    : ""
                }}
              </span>
            </td>

            <td>{{ vendor && vendor.Vendor ? vendor.Vendor.phone : "" }}</td>
            <td class="truncate">
              {{ vendor && vendor.Vendor ? vendor.Vendor.email : "" }}
            </td>
            <td>{{ vendor.createdAt | formatDate }}</td>

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
                  @click="
                    $router.push(`/vendors/${vendor && vendor.Vendor.id}`)
                  "
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
import { mapGetters } from "vuex";
let screenLoading;

export default {
  layout: "dashboard",

  data() {
    return {
      loading: false,
      orgId: "",
      vendors: [],
      searchQuery: "",
      img: require("~/assets/img/user.png"),
    };
  },

  computed: {
    ...mapGetters("authentication", ["user"]),
    resultQuery() {
      if (this.searchQuery) {
        return this.vendors.filter((vendor) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every(
              (v) =>
                vendor &&
                vendor.Vendor &&
                vendor.Vendor.first_name.toLowerCase().includes(v)
            );
        });
      } else {
        return this.vendors;
      }
    },
  },

  mounted() {
    this.orgId = this.user?.AssociatedOrganisations[0]?.OrganisationId;
    this.getVendors();
    console.log("or::", this.user);
  },

  methods: {
    async getVendors() {
      try {
        this.openScreen();

        const response = await this.$axios.get(
          `/organisations/${this.orgId}/campaigns/${this.$route.params.id}/vendors`
        );

        console.log("Vendors::", response);

        if (response.status == "success") {
          this.vendors = response.data;
          screenLoading.close();
        }
      } catch (err) {
        screenLoading.close();
        console.log(err);
      }
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
.campaign-title {
  max-width: 12rem;
}

.filter {
  top: 12px;
  left: 11px;
}
select {
  border-left: 0px;
  padding-left: 40px;
  box-shadow: none;
}

select.form-control {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  height: 50px;
  border-radius: 10px;
}

.main {
  height: calc(100vh - 72px);
  overflow-y: scroll;
}

.form-controls {
  height: 50px;
}
</style>

<style>
.table-holder {
  background: #ffffff;
  box-shadow: 0px 4px 30px rgba(174, 174, 192, 0.2);
  border-radius: 10px;
}

.table-title {
  padding: 1rem 1.5rem;
}

.table-title h4 {
  font-weight: bold;
  letter-spacing: 0.01em;
  font-size: 1.125rem;
  color: var(--tertiary-black);
}

.table thead th {
  color: var(--tertiary-black);
  background: #f7f7f7;
  letter-spacing: 0.01em;
  font-size: 1rem;
  font-weight: 500;
  padding: 1rem 1.5rem;
}

.table td {
  color: var(--tertiary-black);
  padding: 1rem 1.5rem;
  font-size: 1rem;
  vertical-align: middle;
}
.selected {
  background: #fcfcfe;
}
</style>
