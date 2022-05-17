<template>
  <div class="pb-5">
    <c4w-evidence-promp :rejected="true" :rejectedMessage="true" />
    <checkEvidence :details="details" />
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
                    <th scope="col">Status</th>
                    <th scope="col">Submitted</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(task, i) in resultQuery"
                    :key="task.id"
                    :class="{ selected: i % 2 == 0 }"
                  >
                    <td>
                      <div class="d-flex align-items-center">
                        <b-avatar
                          :src="file"
                          size="32px"
                          class="img-fluid p-1"
                          variant="light"
                        ></b-avatar>
                        <span class="pl-3">{{ task.name }}</span>
                      </div>
                    </td>
                    <td>
                      <div
                        class="status px-1"
                        :class="{
                          pending_approval: task.status == 'pending',
                          progress: task.status == 'in progress',
                          completed: task.status == 'completed',
                          disbursed: task.status == 'disbursed',
                          rejected: task.status == 'rejected'
                        }"
                      >
                        {{ task.status | capitalize }}
                      </div>
                    </td>
                    <td class="d-flex justify-content-center">
                      <span v-if="!task.createdAt">
                        {{ task.createdAt | shortDate }}</span
                      >
                      <span v-else class="text-center">- </span>
                    </td>
                    <td>
                      <div>
                        <Button
                          :isGray="task.status == 'in progress'"
                          :text="handleText(task.status)"
                          :has-icon="false"
                          :has-border="true"
                          custom-styles="border-radius: 5px !important; font-size: 0.875rem !important; height: 33px !important; width: 136px !important; padding: 0px 15px !important"
                          @click="
                            task.status == 'completed'
                              ? disburseFunds(task)
                              : handleClick(task)
                          "
                          :disabled="task.status == 'in progress'"
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
import checkEvidence from "~/components/modals/check-evidence";
import c4wEvidencePromp from "~/components/modals/c4w-evidence-prompt";

let screenLoading;
export default {
  layout: "dashboard",
  components: {
    taskDetails,
    newTask,
    checkEvidence,
    c4wEvidencePromp
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
    handleClick(task) {
      this.details = task;
      this.$bvModal.show("check-evidence");
    },

    handleText(status) {
      switch (status) {
        case "pending":
          return "Submission";
        case "in progress":
          return "Submission";
        case "completed":
          return "Disburse";
        case "disbursed":
          return "View";
        case "rejected":
          return "Review";
        default:
          return " ";
      }
    },

    disburseFunds(task) {
      console.dir("task:::", task);
    },

    getDetails() {
      this.loading = true;
      this.$axios
        .get(`cash-for-work/task/details/${this.orgId}`)
        .then(response => {
          if (response.status == "success") {
            this.details = response.data;
            this.location = response.data.location;
            this.resumeCampaign = response.data.status == "completed";
          }
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
        });
    },

    async approveTask(task) {
      this.loading = true;
      const response = await this.$axios.post(
        `cash-for-work/task/approve/${task.id}`
      );
      if (response.status == "success") {
        this.getDetails();
      }
      this.loading = false;
    },

    async disburseTask(task) {
      this.loading = true;
      const response = await this.$axios.post(
        `cash-for-work/task/disburse/${task.id}`
      );
      if (response.status == "success") {
        this.getDetails();
      }
      this.loading = false;
    },

    async rejectTask(task) {},

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
  color: var(--primary-blue);
}

.table thead th {
  color: var(--primary-blue);
  background: #f7f7f7;
  letter-spacing: 0.01em;
  font-size: 1rem;
  font-weight: 500;
  padding: 1rem 1.5rem;
}

.table td {
  color: var(--primary-blue);
  padding: 1rem 1.5rem;
  font-size: 1rem;
  vertical-align: middle;
}
.selected {
  background: #fcfcfe;
}
</style>
