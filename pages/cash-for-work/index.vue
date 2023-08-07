<template>
  <div class="main container transparent">
    <!-- Modals here -->
    <Modal id="new-cash" title="new project">
      <new-cash @reload="fetchAllCampaigns" />
    </Modal>

    <Modal id="new-task" title="new task">
      <new-task :campaign="campaign" @reload="fetchAllCampaigns" />
    </Modal>

    <Modal id="fund-cash-for-work" title="fund cash for work">
      <fund-cash-for-work
        :c4w="SelectedC4w"
        @fundCashForWork="fundCashForWork"
      />
    </Modal>

    <!-- New C4W Here -->
    <div class="row pt-4 mt-2">
      <div class="col-lg-8">
        <div class="row">
          <div class="col-lg-5">
            <!-- Search Box here -->
            <div class="position-relative">
              <input
                type="text"
                class="form-controls search"
                placeholder="Search projects..."
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

      <div class="ml-auto mx-3">
        <Button
          text="Create new"
          custom-styles="height:50px"
          @click="$bvModal.show('new-cash')"
        />
      </div>
    </div>

    <!-- cards here -->
    <div class="row mt-4 pt-2">
      <div v-if="loading" class="text-center"></div>

      <template v-else-if="resultQuery.length">
        <div
          class="col-lg-4 mb-4"
          v-for="campaign in resultQuery"
          :key="campaign.id"
        >
          <div class="card__holder">
            <div class="p-4">
              <!-- title here -->
              <h4 class="caption pb-2 d-flex justify-content-between">
                {{ campaign.title }}
              </h4>

              <!-- Beneficiaries count here -->
              <div class="d-flex">
                <svg
                  class="mt-1"
                  width="26"
                  height="16"
                  viewBox="0 0 26 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25.2308 10.6C25.2308 11.2 24 11.6 22.5641 11.8C21.641 10.1 19.7949 8.8 17.641 7.9C17.8462 7.6 18.0513 7.4 18.2564 7.1H19.0769C22.2564 7 25.2308 8.9 25.2308 10.6ZM7.58975 7H6.76923C3.58975 7 0.615387 8.9 0.615387 10.6C0.615387 11.2 1.84616 11.6 3.28205 11.8C4.20513 10.1 6.05128 8.8 8.20513 7.9L7.58975 7ZM12.9231 8C15.1795 8 17.0256 6.2 17.0256 4C17.0256 1.8 15.1795 0 12.9231 0C10.6667 0 8.82052 1.8 8.82052 4C8.82052 6.2 10.6667 8 12.9231 8ZM12.9231 9C8.71795 9 4.71795 11.6 4.71795 14C4.71795 16 12.9231 16 12.9231 16C12.9231 16 21.1282 16 21.1282 14C21.1282 11.6 17.1282 9 12.9231 9ZM18.7692 6H19.0769C20.8205 6 22.1539 4.7 22.1539 3C22.1539 1.3 20.8205 0 19.0769 0C18.5641 0 18.1539 0.1 17.7436 0.3C18.5641 1.3 19.0769 2.6 19.0769 4C19.0769 4.7 18.9744 5.4 18.7692 6ZM6.76923 6H7.07693C6.8718 5.4 6.76923 4.7 6.76923 4C6.76923 2.6 7.28205 1.3 8.10257 0.3C7.69231 0.1 7.28205 0 6.76923 0C5.02564 0 3.69231 1.3 3.69231 3C3.69231 4.7 5.02564 6 6.76923 6Z"
                    fill="#7C8DB5"
                  />
                </svg>

                <div class="ml-2 d-flex">
                  <p class="campaign-beneficiary-count">
                    {{ campaign.beneficiaries_count }}
                    {{
                      campaign.beneficiaries_count == 1
                        ? "Beneficiary"
                        : "Beneficiaries"
                    }}
                  </p>
                </div>
              </div>

              <!-- Progress bar here -->
              <b-progress
                :value="(campaign.completed_task / campaign.task_count) * 100"
                :max="100"
                variant="success"
                class="mb-3 mt-1"
              ></b-progress>

              <!-- Task count here -->
              <div class="d-flex">
                <div>
                  <p class="tasks">
                    <span>{{ campaign.completed_task }}</span>
                    / {{ campaign.task_count }}
                    {{ campaign.task_count === 1 ? "Task" : "Tasks" }}
                  </p>
                </div>

                <!-- Progress here -->
                <div class="ml-auto">
                  <div class="task-badge d-flex align-items-center px-3">
                    {{ handlePercentage(campaign) }}%
                  </div>
                </div>
              </div>

              <!-- Buttons here -->
              <div class="d-flex justify-content-between mt-2">
                <Button
                  text="Create task"
                  :has-border="true"
                  :has-icon="false"
                  custom-styles="height:41px; font-weight: 600; border-radius: 5px; font-size: 0.875rem"
                  @click="handleNewTask(campaign)"
                />

                <button
                  type="button"
                  :disabled="campaign.is_funded"
                  class="border-0 bg-transparent fund-btn poppins"
                  @click="handleModal(campaign)"
                >
                  Fund project
                </button>

                <button
                  type="button"
                  class="border-0 bg-transparent"
                  @click="$router.push(`/cash-for-work/${campaign.id}`)"
                >
                  <svg
                    width="27"
                    height="24"
                    viewBox="0 0 27 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.32861 12C2.38611 6.88 7.43399 3 13.5 3C19.566 3 24.6127 6.88 25.6714 12C24.6139 17.12 19.566 21 13.5 21C7.43399 21 2.38724 17.12 1.32861 12ZM13.5 17C14.9918 17 16.4226 16.4732 17.4775 15.5355C18.5324 14.5979 19.125 13.3261 19.125 12C19.125 10.6739 18.5324 9.40215 17.4775 8.46447C16.4226 7.52678 14.9918 7 13.5 7C12.0081 7 10.5774 7.52678 9.52251 8.46447C8.46762 9.40215 7.87499 10.6739 7.87499 12C7.87499 13.3261 8.46762 14.5979 9.52251 15.5355C10.5774 16.4732 12.0081 17 13.5 17ZM13.5 15C12.6049 15 11.7464 14.6839 11.1135 14.1213C10.4806 13.5587 10.125 12.7956 10.125 12C10.125 11.2044 10.4806 10.4413 11.1135 9.87868C11.7464 9.31607 12.6049 9 13.5 9C14.3951 9 15.2535 9.31607 15.8865 9.87868C16.5194 10.4413 16.875 11.2044 16.875 12C16.875 12.7956 16.5194 13.5587 15.8865 14.1213C15.2535 14.6839 14.3951 15 13.5 15Z"
                      fill="#17CE89"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>

      <h3 v-else class="text-center no-record m-auto">NO RECORD FOUND</h3>
    </div>
  </div>
</template>

<script>
import fundCashForWork from "~/components/forms/fund-cash-for-work.vue";
import newCash from "~/components/forms/new-cash-for-work.vue";
import newTask from "~/components/forms/new-task";
import { mapGetters, mapActions } from "vuex";
let screenLoading;

export default {
  layout: "dashboard",
  components: { newCash, fundCashForWork, newTask },
  data() {
    return {
      count: 0,
      loading: false,
      id: "",
      campaign: {},
      campaigns: [],
      SelectedC4w: {},
      searchQuery: "",
      statuses: ["active", "completed"],
      selected: null,
    };
  },

  computed: {
    ...mapGetters("authentication", ["user"]),

    resultQuery() {
      if (this.searchQuery) {
        return this.campaigns.filter((campaign) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => campaign.title.toLowerCase().includes(v));
        });
      } else {
        return this.campaigns;
      }
    },
  },

  mounted() {
    this.id = this.user?.AssociatedOrganisations[0]?.OrganisationId;
    this.fetchAllCampaigns();
  },

  methods: {
    ...mapActions("authentication", ["commitUserCampaignUpdate"]),

    handlePercentage(campaign) {
      return Number(
        (campaign?.completed_task ?? 0 / campaign?.task_count ?? 0) * 100
      ).toFixed(0);
    },

    async activateCampaign(source) {
      try {
        this.openScreen();

        const response = await this.$axios.put(
          `organisations/${this.id}/campaigns/${this.SelectedC4w.id}`,
          {
            status: "active",
          }
        );

        if (response.status == "success") {
          if (source != "funding") {
            this.$toast.success(response.message);
          }
          this.fetchAllCampaigns();
        }
      } catch (err) {
        console.log(err);
      } finally {
        screenLoading.close();
      }
    },

    async fetchAllCampaigns() {
      try {
        this.openScreen();
        const response = await this.$axios.get(
          `/organisations/${+this.id}/campaigns/all?type=cash-for-work`
        );

        if (response.status == "success") {
          this.campaigns = response.data.reverse();
          console.log("ALL CAMPAIGNS", response.data);
        }
      } catch (err) {
        console.log({ error: err });
      } finally {
        screenLoading.close();
      }
    },

    async fundCashForWork() {
      try {
        this.openScreen();

        const response = await this.$axios.post(
          `organisations/${this.id}/campaigns/${this.SelectedC4w.id}/fund-campaign`
        );

        if (response.status == "success") {
          this.$toast.success(response.message);

          if (this.SelectedC4w.status == "pending") {
            await this.activateCampaign("funding");
          }
          this.fetchAllCampaigns();
        }
      } catch (err) {
        this.$toast.error(err.message);
        console.log({ error: err });
      } finally {
        screenLoading.close();
      }
    },

    handleNewTask(campaign) {
      this.campaign = campaign;
      this.$bvModal.show("new-task");
    },

    handleModal(campaign) {
      this.$bvModal.show("fund-cash-for-work");
      this.amount = campaign.budget;
      this.SelectedC4w = campaign;
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

.progress {
  border-radius: 10px;
  height: 10px;
  background: #e5e5e5;
}

.fund-btn {
  color: var(--primary-color);
  font-size: 0.875rem;
  font-weight: 600;
}

.fund-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.caption {
  color: var(--primary-blue);
  font-weight: bold;
  font-size: 1.125rem;
  letter-spacing: 0.01em;
}

.card__holder {
  background: #ffffff;
  box-shadow: 0px 4px 30px rgba(174, 174, 192, 0.2);
  border-radius: 10px;
}
</style>
