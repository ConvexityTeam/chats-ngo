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
                  placeholder="Search tasks..."
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
                <div class="ml-auto"></div>
              </div>

              <table v-if="resultQuery.length" class="table table-borderless">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Created</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="task in resultQuery" :key="task.id">
                    <td>
                      {{ task.name }}
                    </td>
                    <td>{{ task.description }}</td>
                    <td>
                      {{ task.amount | formatCurrency }}
                    </td>
                    <td>
                      {{ task.createdAt | shortDate }}
                    </td>
                    <td>
                      <div>
                        <Button
                          text="View entries"
                          :has-icon="false"
                          :has-border="true"
                          custom-styles="border: 1px solid #17CE89 !important; border-radius: 5px !important; font-size: 0.875rem !important; height: 33px !important"
                          @click="
                            $router.push(`/cash-for-work/tasks/${task.id}`)
                          "
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-else-if="loading" class="text-center"></div>
              <h3 v-else class="text-center no-record">
                NO RECORD FOUND
              </h3>
            </div>
          </div>
        </div>

        <!-- Campaign details here -->
        <div class="col-lg-4">
          <task-details
            :details="details"
            :count="details.Beneficiaries ? details.Beneficiaries.length : 0"
            :location="location"
            :user="user"
            @reload="getDetails"
            :resumeCampaign="resumeCampaign"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import taskDetails from "~/components/tables/tasks/task-details.vue";
import newTask from "~/components/modals/new-task";
import banner from "~/components/generic/banner.vue";

let screenLoading;
export default {
  layout: "dashboard",
  components: {
    taskDetails,
    banner,
    newTask
  },

  data: () => ({
    loading: false,
    orgId: "",
    searchQuery: "",
    tasks: [],

    beneficiaries: [],
    details: {},
    location: "",
    resumeCampaign: false,

    title: "",
    drawer: false,
    direction: "rtl"
  }),

  async fetch() {
    const id = this.user?.AssociatedOrganisations[0]?.OrganisationId;
    const response = await this.$axios.get(
      `tasks/${id}/${this.$route.params.id}`
    );

    this.tasks = response.data;
    console.log("response:::", response);
  },

  computed: {
    ...mapGetters("authentication", ["user"]),
    resultQuery() {
      if (this.searchQuery) {
        return this.tasks.filter(task => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every(v => task.name.toLowerCase().includes(v));
        });
      } else {
        return this.tasks;
      }
    }
  },

  mounted() {
    this.orgId = this.user?.AssociatedOrganisations[0]?.OrganisationId;
    this.getDetails();
  },

  methods: {
    async getDetails() {
      try {
        this.openScreen();
        this.loading = true;

        const response = await this.$axios.get(
          `/organisations/${this.orgId}/campaigns/${this.$route.params.id}`
        );

        console.log("C4W details:::", response);

        if (response.status == "success") {
          screenLoading.close();
          this.details = response.data;
          this.beneficiaries = response.data.Beneficiaries;
          // this.location = JSON.parse(
          // 	response.data?.location?.country
          // );
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
