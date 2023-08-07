<template>
  <div class="pb-5">
    <disburseFunds :task="task" :campaignId="campaignId" />

    <checkEvidence
      :task="task"
      :details="rejectedDetails"
      :btnStatus="btnStatus"
      :campaignId="campaignId"
    />

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
                <h4></h4>
                <div class="ml-auto"></div>
              </div>

              <!-- v-if="resultQuery.length" -->
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
                          :src="task.profile_pic"
                          size="32px"
                          class="img-fluid p-1"
                          variant="light"
                        ></b-avatar>
                        <span class="pl-3">{{
                          task.first_name + " " + task.last_name
                        }}</span>
                      </div>
                    </td>
                    <td>
                      <div
                        class="status px-1"
                        :class="{
                          pending_approval: task.Assigned_Status == 'pending',
                          progress: task.Assigned_Status == 'in progress',
                          completed: task.Assigned_Status == 'completed',
                          disbursed: task.Assigned_Status == 'disbursed',
                          rejected: task.Assigned_Status == 'rejected',
                        }"
                      >
                        {{ task.Assigned_Status | capitalize }}
                      </div>
                    </td>
                    <td class="d-flex justify-content-center">
                      <span v-if="task.Assigned_UpdatedAt">
                        {{ task.Assigned_UpdatedAt | shortDate }}</span
                      >
                      <span v-else class="text-center">- </span>
                    </td>
                    <td>
                      <div>
                        <Button
                          :loading="loading"
                          :isGray="task.Assigned_Status == 'in progress'"
                          :text="handleText(task.Assigned_Status)"
                          :has-icon="false"
                          :has-border="true"
                          custom-styles="border-radius: 5px !important; font-size: 0.875rem !important; height: 33px !important; width: 136px !important; padding: 0px 15px !important"
                          @click="
                            task.Assigned_Status == 'disbursed'
                              ? view(task)
                              : reviewSubmission(task)
                          "
                          :disabled="task.Assigned_Status == 'in progress'"
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
        </div>

        <!-- Campaign details here -->
        <div class="col-lg-4">
          <TaskDetails
            :details="details"
            :count="
              details.AssignedWorkers ? details.AssignedWorkers.length : 0
            "
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
import TaskDetails from "~/components/tables/tasks/task-details";
import newTask from "~/components/modals/new-task";
import checkEvidence from "~/components/modals/check-evidence";
import disburseFunds from "~/components/modals/disburse-funds";

let screenLoading;

export default {
  layout: "dashboard",

  components: {
    TaskDetails,
    newTask,
    checkEvidence,
    disburseFunds,
  },

  data: () => ({
    loading: false,
    orgId: "",
    campaignId: 0,
    searchQuery: "",
    file: null,
    tasks: [],
    task: {},
    details: {},
    rejectedDetails: {},
    location: "",
    resumeCampaign: false,
    sent: {},
    btnStatus: true,

    entries: [
      {
        name: "",
        status: "",
      },
    ],
  }),

  computed: {
    ...mapGetters("authentication", ["user"]),
    resultQuery() {
      if (this.searchQuery) {
        return this.tasks.filter((task) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every(
              (v) =>
                task &&
                task.first_name &&
                task.first_name.toLowerCase().includes(v)
            );
        });
      } else {
        return this.tasks;
      }
    },
  },

  mounted() {
    this.orgId = this.user?.AssociatedOrganisations[0]?.OrganisationId;
    this.getDetails();
  },

  methods: {
    handleText(status) {
      switch (status) {
        case "pending":
          return "Submission";
        case "in progress":
          return "Review";
        case "completed":
          return "View";
        case "disbursed":
          return "View";
        case "rejected":
          return "Review";
        default:
          return "";
      }
    },

    async getDetails() {
      try {
        this.loading = true;
        this.openScreen();

        const response = await this.$axios.get(
          `/tasks/cash-for-work/task/${this.$route.params.id}`
        );

        if (response.status == "success") {
          this.loading = false;
          this.tasks = response.data.AssignedWorkers;
          this.details = response.data;
          this.campaignId = response.data.CampaignId;
          screenLoading.close();
        }
      } catch (error) {
        console.log("View TASK Error:::", error);
        screenLoading.close();
        this.loading = true;
      }
    },

    // View Submissions
    async reviewSubmission(task) {
      this.$bvModal.show("check-evidence");
      console.log("REVIEW", task);

      try {
        const response = await this.$axios.get(
          `cash-for-work/${task.TaskAssignment.TaskId}/evidence/${task.TaskAssignment.UserId}`
        );

        if (response.status == "success") {
          this.task = response.data?.Assignments[0].SubmittedEvidences[0];
          this.rejectedDetails =
            response.data?.Assignments[0].SubmittedEvidences[0];
        }
      } catch (error) {
        console.log("Approve Task Error:::", error);
      }
    },

    // View Task
    async view(task) {
      this.$bvModal.show("check-evidence");
      console.log("VIEW", task);
      try {
        const response = await this.$axios.get(
          `cash-for-work/${task.TaskAssignment.TaskId}/evidence/${task.TaskAssignment.UserId}`
        );

        if (response.status == "success") {
          this.btnStatus = !this.btnStatus;
          this.task = response.data?.Assignments[0].SubmittedEvidences[0];
          this.rejectedDetails =
            response.data?.Assignments[0].SubmittedEvidences[0];
        }
      } catch (error) {
        console.log("Approve Task Error:::", error);
      }
    },

    // Approve Tasks
    disburseFunds(task) {
      this.task = task;
      this.$bvModal.show("disburse-funds");
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
</style>
