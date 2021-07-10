<template>
  <div class="main container">
    <div class="">
      <!-- Modal here -->
      <newCampaign @reload="fetchAllCampaigns()" />
      <div class="d-flex pt-lg-4">
        <div class="d-flex">
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

          <div class="ml-3 position-relative">
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

        <div class="ml-auto">
          <Button
            text="Create campaign"
            custom-styles="height:50px"
            @click="openModal"
          />
        </div>
      </div>

      <!-- Table here -->
      <div class="holder">
        <table class="table table-borderless" v-if="campaigns.length">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Budget</th>
              <!-- <th scope="col">Spent</th> -->
              <th scope="col">Created</th>
              <th scope="col">Status</th>
              <!-- <th scope="col"></th> -->
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="campaign in resultQuery"
              :key="campaign.id"
              style="cursor: pointer"
            >
              <td @click="handleTempCampaign(campaign)">
                {{ campaign.title }}
              </td>
              <td @click="handleTempCampaign(campaign)">
                $ {{ campaign.budget | formatCurrency }}
              </td>
              <!-- <td @click="handleTempCampaign(campaign)">
                {{ campaign.spent }}
              </td> -->
              <td @click="handleTempCampaign(campaign)">
                {{ campaign.createdAt | formatDateOnly }}
              </td>

              <td
                @click="handleTempCampaign(campaign)"
                v-if="campaign.status == 0"
                class="pending"
              >
                Pending
              </td>
              <td
                @click="handleTempCampaign(campaign)"
                v-if="campaign.status == 1"
                class="in_progress"
              >
                In Progress
              </td>
              <td
                @click="handleTempCampaign(campaign)"
                v-if="campaign.status == 2"
                class="completed"
              >
                Closed
              </td>
              <!-- <td>
                <b-dropdown
                  variant="link"
                  toggle-class="text-decoration-none"
                  no-caret
                >
                  <template #button-content>
                    <dot />
                  </template>
                  <b-dropdown-item @click="handleTempCampaign(campaign)"
                    >View</b-dropdown-item
                  >
                </b-dropdown>
              </td> -->
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
import dot from "~/components/icons/dot";
import newCampaign from "~/components/modals/new-campaign";
import { mapGetters } from "vuex";
let screenLoading;
export default {
  components: {
    dot,
    newCampaign
  },
  data() {
    return {
      loading: false,
      id: "",
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
.create {
  border-radius: 10px;
  color: white;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  height: 50px;
}
.holder {
  background: #ffffff;
  box-shadow: 0px 4px 30px rgba(174, 174, 192, 0.2);
  border-radius: 10px;
  margin-top: 30px;
}
.table thead th {
  color: #555555;
  letter-spacing: 0.01em;
  font-size: 1.125rem;
  font-weight: 700;
}
.table th,
.table td {
  color: red;
  padding: 0.75rem 2rem;
  color: var(--secondary-black);
  font-size: 1rem;
}
td.in_progress {
  color: #008cff;
}
td.completed {
  color: #24b29f;
}
td.pending {
  color: tomato;
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
