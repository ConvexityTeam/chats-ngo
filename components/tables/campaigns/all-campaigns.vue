<template>
  <div class="main container transparent pb-5">
    <div class="">
      <!-- Modals here -->
      <!-- <fund-amount :fundAmount="amount" @fundWallet="fundWallet" /> -->

      <Modal id="new-campaign" title="new campaign">
        <new-campaign @reload="fetchAllCampaigns" />
      </Modal>

      <Modal id="fund-amount" title="fund wallet">
        <fund-amount :fundAmount="amount" @fundWallet="fundWallet" />
      </Modal>

      <div class="row pt-4 mt-2">
        <div class="col-lg-8">
          <div class="row">
            <div class="col-lg-5">
              <!-- Search Box here -->
              <div class="position-relative">
                <input
                  type="text"
                  class="form-controls search"
                  placeholder="Search campaigns"
                  v-model="searchQuery"
                />
                <img
                  src="~/assets/img/vectors/search.svg"
                  class="search-icon position-absolute"
                  alt="search"
                />
              </div>
            </div>

            <div class=" position-relative">
              <span class="filter position-absolute">
                <img src="~/assets/img/vectors/filter.svg" alt="filter" />
              </span>
              <b-form-select
                v-model="selected"
                :options="options"
                class="filter"
                plain
              ></b-form-select>
            </div>
          </div>
        </div>

        <div class=" ml-auto mx-3">
          <Button
            text="Create campaign"
            custom-styles="height:50px"
            @click="openModal"
          />
        </div>
      </div>

      <!-- Table here -->
      <div class="table-holder mt-5">
        <div
          v-if="campaigns.length"
          class="flex align-items-center table-title"
        >
          <h4>Campaigns</h4>
          <div class="ml-auto"></div>
        </div>
        <table class="table table-borderless" v-if="resultQuery.length">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Total amount</th>
              <th scope="col">Amount spent</th>
              <th scope="col">Date created</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="campaign in resultQuery"
              :key="campaign.id"
              style="cursor: pointer"
            >
              <td>
                {{ campaign.title }}
              </td>

              <td>$ {{ campaign.budget | formatCurrency }}</td>

              <td>$ {{ 0 | formatCurrency }}</td>

              <td>
                {{ campaign.createdAt | formatDate }}
              </td>

              <td>
                <div
                  class="status px-1"
                  :class="{
                    pending: campaign.status == 'pending',
                    progress: campaign.status == 'in_progress',
                    completed: campaign.status == 'completed'
                  }"
                >
                  {{
                    campaign.status == "in_progress"
                      ? "in progress"
                      : campaign.status | capitalize
                  }}
                </div>
              </td>

              <td>
                <div>
                  <Button
                    :hasBorder="true"
                    :hasIcon="false"
                    text="Fund
                  campaign"
                    custom-styles=" border-radius: 5px !important;
                  height:33px; border: 1px solid #17ce89 !important; font-size:
                  0.875rem !important; padding:0px 15px !important"
                    @click="handleModal(campaign)"
                  />
                </div>
              </td>

              <td>
                <div>
                  <Button
                    :hasBorder="true"
                    :hasEye="true"
                    text="View"
                    custom-styles=" border: none !important; font-size: 0.875rem !important"
                    @click="handleTempCampaign(campaign)"
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
  </div>
</template>

<script>
import fundAmount from "~/components/forms/fund-amount.vue";
import newCampaign from "~/components/forms/new-campaign.vue";
import { mapGetters } from "vuex";
let screenLoading;

export default {
  components: {
    newCampaign,
    fundAmount
  },

  // pending, paused, in_progress (campaign statuses)
  data() {
    return {
      loading: false,
      id: "",
      amount: 0,
      campaignId: "",
      campaigns: [],
      selected: null,
      searchQuery: "",
      options: [
        { value: null, text: "Filter" },
        { value: "all", text: "All" },
        { value: "inprogress", text: "In Progress" },
        { value: "completed", text: "Completed" }
      ]
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
    console.log("or:::", this.user.AssociatedOrganisations[0].OrganisationId);
  },

  methods: {
    handleModal(campaign) {
      console.log("campaign::", campaign);
      this.$bvModal.show("fund-amount");
      this.amount = campaign.budget;
      this.campaignId = campaign.id;
    },

    async fundWallet(data) {
      try {
        this.openScreen();
        const response = await this.$axios.post("organisation/transfer/token", {
          campaign: this.campaignId,
          amount: data.amount,
          organisation_id: this.id
        });
        screenLoading.close();

        console.log("FundResponse", response);
      } catch (err) {
        screenLoading.close();
        this.$toast.error(err.response.data.message.errors.amount[0]);
        console.log(err.response.data.message);
      }
    },

    openModal() {
      this.$bvModal.show("new-campaign");
    },
    async fetchAllCampaigns() {
      try {
        this.openScreen();
        this.loading = true;

        const response = await this.$axios.get(
          `/campaigns/organisation/${+this.id}?type=campaign`
        );

        if (response.status == "success") {
          screenLoading.close();
          this.campaigns = response.data.reverse();
        }
        this.loading = false;

        console.log("All campaigns:::", response);
      } catch (err) {
        screenLoading.close();
        this.loading = false;
      }
    },

    handleTempCampaign(campaign) {
      this.$router.push(`/campaigns/${campaign.id}`);
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
.input-group-addon {
  background: none;
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

.main {
  height: calc(100vh - 72px);
  overflow-y: scroll;
}

.create {
  background: var(--primary-color);
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

select.form-control {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  height: 50px;
  border-radius: 10px;
}

.status {
  height: 24px;
  border-radius: 30px;
  background: #ffcdc7;
  color: #5e0e03;
  font-size: 0.75rem;
  letter-spacing: 0.01em;
  display: flex;
  align-items: center;
  justify-content: center;
}

.status.pending {
  background: #ffcdc7;
  color: #5e0e03;
}

.status.progress {
  background: #d0f0fd;
  color: #335f71;
}

.status.completed {
  background: #d1f7c4;
  color: #337138;
}

.create {
  border-radius: 10px;
  color: white;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  height: 50px;
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
  color: var(--tertiary-black);
}

.table thead th {
  color: var(--tertiary-black);
  background: #f7f7f7;
  letter-spacing: 0.01em;
  font-size: 1rem;
  font-weight: 500;
  padding: 1rem 1.5rem;
}

.table td {
  color: var(--tertiary-black);
  padding: 1rem 1.5rem;
  font-size: 1rem;
  vertical-align: middle;
}
</style>
