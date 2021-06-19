<template>
  <div>
    <div v-if="loading">
      <div class=""></div>
    </div>

    <div class="main" v-else>
      <div class="row no-gutters pt-lg-4">
        <div class="col-lg-8">
          <!-- Campaigns here -->
          <div>
            <h4 class="top-header">Beneficiaries</h4>
            <div class="d-flex pt-lg-4">
              <div class="d-flex">
                <!-- Search Box here -->
                <input
                  type="text"
                  class="form-controls"
                  placeholder="Search Beneficiaries"
                  v-model="searchQuery"
                />
              </div>
            </div>

            <!-- Table here -->
            <div class="table">
              <table class="table-borderless" v-if="beneficiaries.length != 0">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Email Address</th>
                    <th scope="col">Created</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="benefactor in beneficiaries" :key="benefactor.id">
                    <td>
                      {{
                        benefactor.first_name + " " + benefactor.last_name
                      }}cjjc
                    </td>
                    <td>{{ benefactor.phone }}</td>
                    <td>{{ benefactor.email }}</td>
                    <td>{{ benefactor.createdAt | formatDateText }}</td>
                  </tr>
                </tbody>
              </table>

              <h3 v-else class="text-center no-record">NO RECORD FOUND</h3>
            </div>
          </div>

          <!-- complaints here -->
          <div class="mt-4 mr-3">
            <beneficiaryComplaints :campaignId="id" />
          </div>
        </div>

        <!-- Campaign details here -->
        <div class="col-lg-4">
          <div class="div__holder p-3">
            <h4 class="top-header">Campaign details</h4>

            <div
              class="text-center d-flex justify-content-center mx-auto align-items-center logo-holder my-5"
            >
              <img
                v-if="
                  user.AssociatedOrganisations[0].Organisation.logo_link != null
                "
                :src="
                  user.AssociatedOrganisations
                    ? user.AssociatedOrganisations[0].Organisation.logo_link
                    : ''
                "
                width="100"
                height="100"
                alt=""
                class="rounded-circle"
                style="object-fit: contain"
              />
            </div>

            <!-- Campaign Details here -->
            <div>
              <table class="w-100">
                <!-- Title here -->
                <tr>
                  <th><p class="detail-caption col">Title</p></th>
                  <td>
                    <p class="detail-value col">{{ details.title }}</p>
                  </td>
                </tr>

                <!-- Description here -->
                <tr>
                  <th><p class="detail-caption col">Description</p></th>
                  <td>
                    <p class="detail-value col">{{ details.description }}</p>
                  </td>
                </tr>

                <!-- Budget here -->
                <tr>
                  <th><p class="detail-caption col">Budget</p></th>
                  <td>
                    <p class="detail-value col">
                      $ {{ details.budget | formatCurrency }}
                    </p>
                  </td>
                </tr>

                <!-- Location here -->
                <!-- <tr>
                  <th><p class="detail-caption col">Location</p></th>
                  <td>
                    <p class="detail-value col">
                      {{ location ? location.country : "" }}
                    </p>
                  </td>
                </tr> -->

                <!-- Date created here  -->
                <tr>
                  <th><p class="detail-caption col">Start Date</p></th>
                  <td>
                    <p class="detail-value col">
                      {{ details.start_date | formatDateText }}
                    </p>
                  </td>
                </tr>

                <!-- End Date here  -->
                <tr>
                  <th><p class="detail-caption col">End Date</p></th>
                  <td>
                    <p class="detail-value col">
                      {{ details.end_date | formatDateText }}
                    </p>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import beneficiaryComplaints from "~/components/tables/beneficiary-complaints";
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
    location: {}
  }),

  components: {
    beneficiaryComplaints
  },

  computed: {
    ...mapGetters("authentication", ["user"]),
    resultQuery() {
      if (this.searchQuery) {
        return this.beneficiaries.filter(benefactor => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every(v => benefactor.first_name.toLowerCase().includes(v));
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
        this.openScreen()
        this.loading = true;

        const response = await this.$axios.get(`/campaigns/${this.id}`);

        console.log("details:::", response);

        if (response.status == "success") {
            screenLoading.close();
          this.details = response.data;
          // this.beneficiaries = response.data[0].Beneficiaries;
          // this.location = JSON.parse(response.data[0].location);
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
    },
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
.top-header {
  color: var(--secondary-black);
  font-weight: 700;
  font-size: 1.125rem;
}
.card__holder {
  background: #ffffff;
  box-shadow: 0px 4px 30px rgba(174, 174, 192, 0.2);
  border-radius: 10px;
  width: 200px;
}
.text {
  color: var(--secondary-black);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.188rem;
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

.funds {
  color: var(--secondary-black);
  font-size: 1.5rem;
  font-weight: 500;
}
::placeholder {
  color: #999999;
  font-size: 1rem;
}
.form-controls {
  height: 50px;
}
.form-control {
  border: 1px solid #999999;
  color: black;
}
.form-control:focus {
  box-shadow: none;
}
.table {
  background: #ffffff;
  box-shadow: 0px 4px 30px rgba(174, 174, 192, 0.2);
  border-radius: 10px;
  margin-top: 30px;
  width: 98%;
}
.table thead th {
  color: #555555;
  letter-spacing: 0.01em;
  font-size: 1rem;
  font-weight: 700;
}
.table th,
.table td {
  color: red;
  padding: 0.75rem 2rem;
  color: var(--secondary-black);
  font-size: 0.7rem;
}
td.in-progress {
  color: #008cff;
}
td.completed {
  color: #24b29f;
}
/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
