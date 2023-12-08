<template>
  <div class="pb-5">
    <!-- create new task modal  -->
    <Modal id="new-task" title="new task">
      <newTask @reload="fetchTasks" />
    </Modal>

    <div class="main container transparent pt-4 mt-2 pb-5">
      <back text="Go Back" @click="$router.go(-1)" />

      <!-- search region here -->
      <div class="row py-4">
        <div class="col-lg-8">
          <div class="row">
            <div class="col-lg-5">
              <!-- Search Box here -->
              <div class="position-relative">
                <input
                  v-model="searchQuery"
                  type="text"
                  class="form-controls search"
                  placeholder="Search tasks..."
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
          <Button
            v-b-modal.new-task
            text="Create new"
            custom-styles="height:50px"
          />
        </div>
      </div>

      <div v-if="details.status == 'paused'" class="">
        <banner
          :date="details.updatedAt"
          @resumeCampaign="resumeCampaign = true"
        />
      </div>

      <div class="row mt-3" :class="{ 'mt-3': details.status == 'paused' }">
        <div class="col-lg-8">
          <!-- Campaign beneficiaries here -->
          <div>
            <div class="table-holder mt-2">
              <div class="d-flex align-items-center table-title">
                <h4>Tasks</h4>
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
                      <th scope="col">Name</th>
                      <th scope="col">Max Entries</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Created</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr
                      v-for="(task, i) in resultQuery"
                      :key="task.id"
                      :class="{ selected: i % 2 == 0 }"
                    >
                      <td>
                        {{ task.name }}
                      </td>
                      <td class="entries">
                        {{ task.assignment_count }}
                      </td>
                      <td>
                        {{ task.amount | formatCurrency }}
                      </td>
                      <td class="max-width">
                        {{ task.createdAt | formatDateOnly }}
                      </td>
                      <td>
                        <div>
                          <Button
                            text=" View"
                            :has-icon="false"
                            :has-border="true"
                            custom-styles="border: 1px solid #17CE89 !important; border-radius: 5px !important; font-size: 0.875rem !important; height: 33px !important;"
                            @click="
                              $router.push(`/cash-for-work/tasks/${task.id}`)
                            "
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <pagination
                  :currentPageNum="tasksPageNum"
                  :totalNumOfItems="tasksTotalItems"
                  @updatePage="updateTasksTable"
                />
              </template>

              <h3 v-else class="text-center no-record">NO RECORD FOUND</h3>
            </div>
          </div>
        </div>

        <!-- Campaign details here -->
        <div class="col-lg-4">
          <SkeletonSingleCard v-if="loading" />
          <TablesCampaignsDetails
            v-else
            :details="details"
            :location="location"
            :user="user"
            :resumeCampaign="resumeCampaign"
            @reload="getDetails"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import banner from "~/components/generic/banner.vue";
import newTask from "~/components/forms/new-task";

export default {
  components: {
    banner,
    newTask,
  },
  layout: "dashboard",

  data: () => ({
    loading: false,
    orgId: "",
    searchQuery: "",
    activeTask: {},
    tasks: [],

    beneficiaries: [],
    details: {},
    location: "",
    resumeCampaign: false,
    tasksPageNum: 1,
    tasksTotalItems: 0,

    title: "",
    drawer: false,
    direction: "rtl",
  }),

  computed: {
    ...mapGetters("authentication", ["user"]),
    resultQuery() {
      if (this.searchQuery) {
        return this.tasks.filter((task) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => task.name.toLowerCase().includes(v));
        });
      } else {
        return this.tasks;
      }
    },
  },

  mounted() {
    this.orgId = this.user?.AssociatedOrganisations[0]?.OrganisationId;

    this.getDetails();
    this.fetchTasks();
  },

  methods: {
    updateTasksTable(action) {
      this.tasksPageNum =
        action === "prev" ? this.tasksPageNum - 1 : this.tasksPageNum + 1;

      this.fetchTasks();
    },

    async fetchTasks() {
      try {
        this.loading = true;

        const id = this.user?.AssociatedOrganisations[0]?.OrganisationId;
        const response = await this.$axios.get(
          `tasks/${id}/${this.$route.params.id}?page=${this.tasksPageNum}&size=10`
        );

        if (response.status === "success") {
          this.tasks = response.data;

          this.tasksPageNum = response?.currentPage;
          this.tasksTotalItems = response?.totalItems;
        }
      } catch (error) {
      } finally {
        this.loading = false;
      }
    },

    async getDetails() {
      try {
        this.loading = true;

        const response = await this.$axios.get(
          `/organisations/${this.orgId}/campaigns/${this.$route.params.id}`
        );

        if (response.status === "success") {
          this.details = response.data;
          this.beneficiaries = response.data.Beneficiaries;
        }
      } catch (err) {
        console.log("campaignDeetserr:::", err);
      } finally {
        this.loading = false;
      }
    },

    handleNewTask(task) {
      this.activeTask = task;
      this.$bvModal.show("new-task");
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

.max-width {
  width: 9rem;
  max-width: 9rem;
}

.entries {
  width: 2rem;
  max-width: 2rem;
}

.selected {
  background: #fcfcfe;
}

.selected {
  background: #fcfcfe;
}

.selected {
  background: #fcfcfe;
}
</style>
