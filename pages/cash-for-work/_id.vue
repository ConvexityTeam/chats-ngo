<template>
  <div class="container">
    <el-button
      type="primary"
      icon="el-icon-arrow-left"
      @click="$router.go(-1)"
      class="my-5"
      >Previous Page</el-button
    >

    <div class="row">
      <div class="col-lg-8">
        <div v-if="loading" class="loader text-center"></div>
        <!-- Campaigns here -->
        <div class="" v-else-if="tasks.length">
          <h4 class="top-header">Tasks</h4>

          <div class="d-flex pt-3">
            <div class="d-flex">
              <!-- Search Box here -->
              <input
                type="text"
                class="form-controls"
                placeholder="Search Tasks"
                v-model="searchQuery"
              />
            </div>
          </div>

          <!-- Table here -->
          <div class="table">
            <table class=" table-borderless w-100">
              <thead>
                <tr class="border-bottom">
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Created</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(task, i) in resultQuery"
                  :key="i"
                  :class="{ 'border-bottom': i != tasks.length - 1 }"
                >
                  <td>{{ task.name }}</td>
                  <td>{{ task.description }}</td>
                  <td>
                    {{ task.amount | formatCurrency }}
                  </td>
                  <td>
                    {{ task.createdAt | formatDateOnly }}
                  </td>
                  <td>
                    <button
                      class="view-btn px-3 py-1 "
                      @click="$router.push(`/cash-for-work/tasks/${task.id}`)"
                    >
                      View
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <h3 v-else class="text-center no-record">NO RECORD FOUND</h3>
      </div>

      <div class="col-lg-4">
        <!-- Campaign details here -->
        <div v-if="loading" class="text-center"></div>

        <div class="div__holder p-1" v-else>
          <h4 class="top-header px-3 py-4">{{ campaign.title }}</h4>

          <b-progress
            :value="campaign.progress"
            :max="100"
            variant="success"
            class="mx-3 mb-2"
          ></b-progress>

          <!-- Task count here -->
          <div class="d-flex mx-3 mb-3">
            <div>
              <p class="tasks">
                {{ campaign.completedTasks }}/{{ campaign.totalTasks }}
                {{ campaign.totalTasks == 1 ? "Task" : "Tasks" }}
              </p>
            </div>
            <div class="ml-auto">
              <p class="tasks">{{ campaign.progress }}%</p>
            </div>
          </div>

          <div>
            <table class="w-100">
              <tr>
                <th><p class="detail-caption col">Description</p></th>
                <td>
                  <p class="detail-value col">{{ campaign.description }}</p>
                </td>
              </tr>

              <tr>
                <th><p class="detail-caption col">Start Date</p></th>
                <td>
                  <p class="detail-value col">
                    {{ campaign.start_date | formatDateText }}
                  </p>
                </td>
              </tr>

              <tr>
                <th><p class="detail-caption col">End Date</p></th>
                <td>
                  <p class="detail-value col">
                    {{ campaign.end_date | formatDateText }}
                  </p>
                </td>
              </tr>

              <tr>
                <th><p class="detail-caption col">Location</p></th>
                <td>
                  <p class="detail-value col">
                    {{ campaign.location }}
                  </p>
                </td>
              </tr>

              <tr>
                <th><p class="detail-caption col">Created</p></th>
                <td>
                  <p class="detail-value col">
                    {{ campaign.createdAt | formatDateText }}
                  </p>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "dashboard",

  data: () => ({
    loading: false,
    tasks: [],
    campaign: {},
    searchQuery: ""
  }),

  mounted() {
    this.fetchTasks();
    this.getCampaignDetails();
    this.taskDetail();
  },

  computed: {
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

  methods: {
    async taskDetail() {
      try {
        const response = await this.$axios.get("/cash-for-work/task/8");

        console.log("TAskDetail:::", response);
      } catch (err) {
        console.log("detailerr", err);
      }
    },
    async fetchTasks() {
      try {
        this.loading = true;
        const response = await this.$axios.get(
          `/cash-for-work/tasks/${this.$route.params.id}`
        );

        if (response.status == "success") {
          this.tasks = response.data.tasks;
        }

        console.log("TaskDetail::", response.data);
        this.loading = false;
      } catch (err) {
        console.log(err);
      }
    },

    async getCampaignDetails() {
      try {
        this.loading = true;
        const response = await this.$axios.get(
          `/cash-for-work/${this.$route.params.id}`
        );

        if (response.status == "success") {
          this.campaign = response.data.cashForWorkDetail;
        }

        console.log("CampaignDetails::", response.data);
        this.loading = false;
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
.view-btn {
  border: 1px solid #dcdfe6;
  background: inherit;
  border-radius: 3px;
  font-size: 13px;

  color: var(--secondary-black);
}
.view-btn:hover {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: #fff;
  font-weight: 500;
}

.table {
  background: #ffffff;
  box-shadow: 0px 4px 30px rgba(174, 174, 192, 0.2);
  border-radius: 10px;
  margin-top: 30px;
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
  padding: 1rem 2rem;
  color: var(--secondary-black);
  font-size: 0.875rem;
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
.progress {
  border-radius: 10px;
  height: 10px;
  background: #e5e5e5;
}

.tasks {
  color: var(--secondary-black);
  font-size: 0.875rem;
}
</style>
