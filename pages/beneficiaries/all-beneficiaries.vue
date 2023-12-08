<template>
  <div class="main container transparent pb-5">
    <div class="pt-4 mt-2">
      <back text="Go Back" @click="$router.push('/beneficiaries')" />
    </div>
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
                placeholder=" Search beneficiaries..."
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

      <div class="ml-auto mx-3">
        <csv :data="computedData" name="beneficiaries" />
      </div>
    </div>

    <!-- Table here -->
    <div class="table-holder mt-4">
      <div class="flex align-items-center table-title">
        <h4>All beneficiaries</h4>
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
              <th scope="col">Beneficiary</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Email Address</th>
              <th scope="col">Date Of Birth</th>
              <th scope="col"></th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(benefactor, index) in resultQuery" :key="index">
              <td class="d-flex align-items-center">
                <img
                  :src="
                    benefactor.profile_pic == null || !benefactor.profile_pic
                      ? img
                      : benefactor.profile_pic
                  "
                  width="30"
                  height="30"
                  class="rounded-circle"
                  :alt="benefactor.first_name"
                  loading="lazy"
                />

                <span class="mx-3 pt-1">
                  {{ benefactor.first_name + " " + benefactor.last_name }}
                </span>
              </td>

              <td>{{ benefactor.phone }}</td>
              <td>{{ benefactor.email }}</td>
              <td>
                <span v-if="benefactor.dob">
                  {{ benefactor.dob || "-" | shortDate }}
                </span>
                <span v-else>-</span>
              </td>

              <td>
                <div>
                  <Button
                    :hasBorder="true"
                    :hasIcon="false"
                    text="
                    View beneficiary"
                    custom-styles=" border-radius: 5px !important;
                    height:33px; border: 1px solid #17ce89 !important; font-size:
                    0.875rem !important; padding:0px 10px !important"
                    @click="handleTempBenefactor(benefactor)"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- pagination component  -->
        <pagination
          :currentPageNum="beneficiariesPageNum"
          :totalNumOfItems="beneficiariesTotalItems"
          @updatePage="updateBeneficiaries"
        />
      </template>

      <h3 v-else class="text-center no-record">NO RECORD FOUND</h3>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";

export default {
  name: "AllBeneficiaries",
  layout: "dashboard",

  data() {
    return {
      id: "",
      loading: false,
      img: require("~/assets/img/user.png"),
      searchQuery: "",
      beneficiaries: [],
      beneficiariesPageNum: 1,
      beneficiariesTotalItems: 0,
    };
  },

  computed: {
    ...mapGetters("authentication", ["user"]),

    resultQuery() {
      if (this.searchQuery) {
        return this.beneficiaries.filter((benefactor) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => benefactor?.first_name.toLowerCase().includes(v));
        });
      } else {
        return this.beneficiaries;
      }
    },

    computedData() {
      const data = this.beneficiaries || [];
      return data.map((benefactor) => {
        return {
          Name: `${benefactor.first_name} ${benefactor.last_name}`,
          Phone_Number: benefactor.phone,
          Email_Address: benefactor.email,
          location: benefactor.location,
          Gender: benefactor.gender,
          Marital_Status: benefactor.marital_status,
          Created: moment(benefactor.createdAt).format("dddd, MMMM DD, YYYY"),
        };
      });
    },
  },

  mounted() {
    this.id = this.user?.AssociatedOrganisations[0]?.OrganisationId;
    this.getAllBeneficiaries();
  },

  methods: {
    updateBeneficiaries(action) {
      this.beneficiariesPageNum =
        action === "prev"
          ? this.beneficiariesPageNum - 1
          : this.beneficiariesPageNum + 1;

      this.getAllBeneficiaries();
    },

    async getAllBeneficiaries() {
      try {
        this.loading = true;
        const response = await this.$axios.get(
          `/organisation/${this.id}/beneficiaries?page=${this.beneficiariesPageNum}&size=10`
        );

        if (response.status === "success") {
          this.beneficiaries = response.data;
        }

        this.beneficiariesPageNum = response?.currentPage;
        this.beneficiariesTotalItems = response?.totalItems;
      } catch (err) {
      } finally {
        this.loading = false;
      }
    },

    handleTempBenefactor(benefactor) {
      this.$router.push(`/beneficiaries/${benefactor.id}`);
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
