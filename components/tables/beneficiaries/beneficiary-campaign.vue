<template>
  <div>
    <div class="row pt-4 mt-2">
      <div class="col-lg-8">
        <div class="row">
          <div class="col-lg-8">
            <!-- Search Box here -->
            <div class="position-relative">
              <input
                type="text"
                class="form-controls search"
                placeholder="Search campaigns..."
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
        <csv :data="computedData" />
      </div>
    </div>

    <!-- Table here -->
    <div class="table-holder mt-4">
      <div class="flex align-items-center table-title">
        <h4>Campaigns</h4>
        <div class="ml-auto"></div>
      </div>
      <table class="table table-borderless" v-if="resultQuery.length">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Budget</th>
            <!-- <th scope="col">Amount spent</th> -->
            <th scope="col">Date created</th>
            <th scope="col">Status</th>

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
              {{ campaign.Campaign.title }}
            </td>

            <td>$ {{ campaign.Campaign.budget | formatCurrency }}</td>

            <td>
              {{ campaign.Campaign.createdAt | formatDateOnly }}
            </td>

            <td>
              <div
                class="status px-1"
                :class="{
                  pending: campaign.Campaign.status == 'pending',
                  progress: campaign.Campaign.status == 'in-progress',
                  completed: campaign.Campaign.status == 'completed'
                }"
              >
                {{
                  campaign.Campaign.status == "in-progress"
                    ? "in progress"
                    : campaign.Campaign.status | capitalize
                }}
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
</template>

<script>
import moment from "moment";
export default {
  props: {
    userDetails: {
      type: Object,
      default: () => {}
    }
  },

  mounted() {
    console.log("TESTuserDetails", this.userDetails);
  },

  data: () => ({
    selected: null,
    searchQuery: "",
    options: [
      { value: null, text: "Filter" },
      { value: "all", text: "All" },
      { value: "inprogress", text: "In Progress" },
      { value: "completed", text: "Completed" }
    ]
  }),

  computed: {
    resultQuery() {
      if (this.searchQuery) {
        const data = this.userDetails ? this.userDetails.Campaigns : [];
        return data.filter(campaign => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every(v => campaign.title.toLowerCase().includes(v));
        });
      } else {
        return this.userDetails?.Campaigns;
      }
    }
    // computedData() {
    //   return this.campaigns.map(campaign => {
    //     return {
    //       Name: campaign.Campaign.title,
    //       Budget: campaign.Campaign.budget,
    //       Start_Date: moment(campaign.Campaign.start_date).format(
    //         "dddd, MMMM DD, YYYY"
    //       ),
    //       End_Date: moment(campaign.Campaign.end_date).format(
    //         "dddd, MMMM DD, YYYY"
    //       ),
    //       Status: campaign.Campaign.status
    //     };
    //   });
    // }
  },

  methods: {
    handleTempCampaign(campaign) {
      this.$router.push(`/campaigns/${campaign.Campaign.id}`);
    }
  }
};
</script>

<style scoped>
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
