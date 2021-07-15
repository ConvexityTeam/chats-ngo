<template>
  <div class="pb-5">
    <div v-if="loading"></div>

    <div class="main container transparent pt-4 mt-2 pb-5" v-else>
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

        <div class=" ml-auto mx-3">
          <Button
            text="Public Funding"
            :has-icon="false"
            custom-styles="height:50px"
          />
        </div>
      </div>

      <div class="">
        <banner />
      </div>

      <div class="row pt-lg-4">
        <div class="col-lg-8">
          <!-- Campaign beneficiaries here -->
          <div>
            <div class="table-holder mt-2">
              <div
                v-if="beneficiaries.length"
                class="d-flex align-items-center table-title"
              >
                <h4>Campaign beneficiaries</h4>
                <div class="ml-auto"></div>
              </div>

              <table v-if="resultQuery.length" class="table table-borderless">
                <thead>
                  <tr>
                    <th scope="col">Beneficiary</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Email Address</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="benefactor in resultQuery" :key="benefactor.id">
                    <td>
                      {{
                        benefactor.User
                          ? benefactor.User.first_name +
                            " " +
                            benefactor.User.last_name
                          : ""
                      }}
                    </td>
                    <td>{{ benefactor.User ? benefactor.User.phone : "" }}</td>
                    <td>{{ benefactor.User ? benefactor.User.email : "" }}</td>
                    <td>
                      <div>
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
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-else-if="loading" class=" text-center"></div>
              <h3 v-else class="text-center no-record">NO RECORD FOUND</h3>
            </div>
          </div>

          <!-- complaints here -->
          <div class="mt-4 pt-2">
            <beneficiary-complaints :campaignId="id" />
          </div>
        </div>

        <!-- Campaign details here -->
        <div class="col-lg-4">
          <campaign-details
            :details="details"
            :count="details.Beneficiaries ? details.Beneficiaries.length : 0"
            :location="location"
            :user="user"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import beneficiaryComplaints from "~/components/tables/campaigns/beneficiary-complaints";
import campaignDetails from "~/components/tables/campaigns/campaign-details";
import back from "~/components/generic/go-back.vue";
import banner from "~/components/generic/banner.vue";

let screenLoading;
export default {
  layout: "dashboard",
  data: () => ({
    loading: false,
    searchQuery: "",
    id: "",
    complaints: [],
    beneficiaries: [],
    details: {},
    location: ""
  }),

  components: {
    beneficiaryComplaints,
    campaignDetails,
    back,
    banner
  },

  computed: {
    ...mapGetters("authentication", ["user"]),
    resultQuery() {
      if (this.searchQuery) {
        return this.beneficiaries.filter(benefactor => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every(v => benefactor.User.first_name.toLowerCase().includes(v));
        });
      } else {
        return this.beneficiaries;
      }
    }
  },

  mounted() {
    this.id = this.$router.history.current.params.id;
    this.getDetails();
  },

  methods: {
    async getDetails() {
      try {
        this.openScreen();
        this.loading = true;

        const response = await this.$axios.get(`/campaigns/${this.id}`);

        console.log("details:::", response);

        if (response.status == "success") {
          screenLoading.close();
          this.details = response.data;
          this.beneficiaries = response.data.Beneficiaries;
          this.location = JSON.parse(response.data.location.country);
          console.log("loc::", this.location);
          console.log("here", response.data);
        }

        this.loading = false;
      } catch (err) {
        this.loading = false;
        screenLoading.close();
        console.log("campaignDeetserr:::", err);
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
.logo-holder {
  background: #eef0f4;
  border-radius: 50%;
  width: 96px;
  height: 96px;
}

.detail-caption {
  color: #4f4f4f;
  font-size: 0.845rem;
  opacity: 0.9;
  display: table-cell;
  padding: 10px 0px;
}
.detail-value {
  color: var(--secondary-black);
  font-size: 0.9rem;
  display: table-cell;
}
.div__holder {
  background: #ffffff;
  border-radius: 10px;
}
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
