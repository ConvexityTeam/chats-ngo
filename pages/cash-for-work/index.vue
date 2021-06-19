<template>
  <div class="main">
    <div class="container">
      <!-- Modals here -->
      <newCash @reload="fetchAllCampaigns" />
      <newTask @reload="fetchAllCampaigns" :id="campaignId" />

      <div class="d-flex pt-lg-4">
        <div class="d-flex">
          <!-- Search Box here -->
          <input
            type="text"
            class="form-controls"
            placeholder="Search campaigns"
            v-model="searchQuery"
          />
        </div>

        <div class="ml-auto">
          <button type="button" v-b-modal.new-cash class="create px-3">
            <i>
              <svg
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M13 6V7H7V13H6V7H0V6H6V0H7V6H13Z" fill="white" />
              </svg>
            </i>
            <span class="mx-2">Create New</span>
          </button>
        </div>
      </div>

      <!-- cards here -->
      <div class="row mt-5">
        <div v-if="loading" class=" text-center"></div>

        <div
          v-else-if="campaigns.length"
          class="col-lg-4 mb-4"
          v-for="campaign in resultQuery"
          :key="campaign.id"
        >
          <div class="card__holder">
            <div class="p-3">
              <h4 class="caption pb-3">{{ campaign.title }}</h4>

              <!-- Progress bar here -->
              <b-progress
                :value="campaign.progress"
                :max="100"
                variant="success"
                class="mb-3"
              ></b-progress>

              <!-- Task count here -->
              <div class="d-flex">
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

              <div class="d-flex">
                <button
                  v-b-modal.new-task
                  class="create-task text-white border-0 rounded py-2 px-3"
                  @click="campaignId = campaign.id"
                >
                  Create Task
                </button>

                <button
                  class="ml-3 border-0 bg-transparent primary"
                  style="font-weight: 500"
                  @click="$router.push(`/cash-for-work/${campaign.id}`)"
                >
                  View Campaign
                </button>
              </div>
            </div>
          </div>
        </div>

        <h3 v-else class="text-center no-record m-auto">NO RECORD FOUND</h3>
      </div>
    </div>
  </div>
</template>

<script>
import newCash from "~/components/modals/new-cash-for-work";
import newTask from "~/components/modals/new-task";
import { mapGetters } from "vuex";
let screenLoading;
export default {
  layout: "dashboard",
  components: { newCash, newTask },
  data() {
    return {
      loading: false,
      loading: false,
      id: "",
      campaigns: [],
      searchQuery: "",
      campaignId: 0
    };
  },

  computed: {
    ...mapGetters("authentication", ["user"]),
    resultQuery() {
      if (this.searchQuery) {
        return this.campaigns.filter(campaign => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every(v => campaign.title.toLowerCase().includes(v));
        });
      } else {
        return this.campaigns;
      }
    }
  },

  mounted() {
    this.id = this.user.AssociatedOrganisations[0].OrganisationId;
    this.fetchAllCampaigns();
  },

  methods: {
    async fetchAllCampaigns() {
      try {
        this.loading = true;
        this.openScreen();

        const response = await this.$axios.get(`/cash-for-work`);

        if (response.status == "success") {
          this.campaigns = response.data.reverse();
          screenLoading.close();
        }
        this.loading = false;

        console.log("All campaigns:::", response);
      } catch (err) {
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
.create-task {
  background: var(--primary-color);
  font-weight: 500;
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

.beneficiary-count {
  letter-spacing: 0.01em;
  font-size: 1rem;
  font-weight: 500;
  color: #4f4f4f;
}
.caption {
  color: var(--secondary-black);
  font-weight: 700;
  font-size: 1.125rem;
}

.card__holder {
  background: #ffffff;
  box-shadow: 0px 4px 30px rgba(174, 174, 192, 0.2);
  border-radius: 10px;
}

.main {
  height: calc(100vh - 72px);
  overflow-y: scroll;
}

::placeholder {
  color: #999999;
  font-size: 1rem;
}

.form-controls {
  height: 50px;
  width: 300px;
}

.form-control:focus {
  box-shadow: none;
}

.create {
  border-radius: 10px;
  color: white;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  height: 50px;
  background: var(--primary-color);
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
