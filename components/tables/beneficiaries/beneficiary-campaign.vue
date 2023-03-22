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
          <!-- 
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
          </div> -->
        </div>
      </div>

      <div class="ml-auto mx-3">
        <csv :data="computedData" :name="`${name} campaigns`" />
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
            <th scope="col">Total</th>
            <th scope="col">created</th>
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
            <td class="campaign-title">
              {{ campaign.title }}
            </td>

            <td>{{ $currency }}{{ campaign.budget | formatCurrency }}</td>

            <td>
              {{ campaign.createdAt | formatDateOnly }}
            </td>

            <td>
              <div
                class="status px-1"
                :class="{
                  pending: campaign.status === 'pending',
                  progress: campaign.status === 'active',
                  ongoing: campaign.status === 'ongoing',
                  completed: campaign.status === 'completed',
                  ended: campaign.status == 'ended',
                }"
              >
                {{ campaign.status | capitalize }}
              </div>
            </td>

            <td>
              <div>
                <Button
                  :hasBorder="true"
                  text="View"
                  :has-icon="false"
                  custom-styles=" border-radius: 5px!important; font-size: 0.875rem !important; height:33px !important"
                  @click="handleTempCampaign(campaign)"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <h3 v-else class="text-center no-record">NO RECORD FOUND</h3>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: {
    campaigns: {
      type: Array,
      default: () => [],
    },

    name: {
      type: String,
      default: "",
    },
  },

  data: () => ({
    selected: null,
    searchQuery: "",
    options: [
      { value: null, text: "Filter" },
      { value: "all", text: "All" },
      { value: "inprogress", text: "In Progress" },
      { value: "completed", text: "Completed" },
    ],
  }),

  computed: {
    resultQuery() {
      if (this.searchQuery) {
        const data = this.campaigns ? this.campaigns : [];
        return data.filter((campaign) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => campaign.title.toLowerCase().includes(v));
        });
      } else {
        return this.campaigns;
      }
    },
    computedData() {
      return this.campaigns.map((campaign) => {
        return {
          Name: campaign.title,
          Budget: campaign.budget,
          Start_Date: moment(campaign.start_date).format(" MMMM DD, YYYY"),
          End_Date: moment(campaign.end_date).format(" MMMM DD, YYYY"),
          Status: campaign.status,
        };
      });
    },
  },

  methods: {
    handleTempCampaign(campaign) {
      this.$router.push(`/campaigns/${campaign.id}`);
    },
  },
};
</script>

<style scoped>
.campaign-title {
  max-width: 10rem;
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

select.form-control {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  height: 50px;
  border-radius: 10px;
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
