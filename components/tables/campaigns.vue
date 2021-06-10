<template>
  <div class="main">
    <div class="container">
      <!-- Modal here -->
      <newCampaign @reload="fetchAllCampaigns()" />
      <div class="d-flex pt-lg-4">
        <div class="d-flex">
          <!-- Search Box here -->
          <input
            type="text"
            class="form-controls"
            placeholder="Search campaigns"
            v-model="searchQuery"
          />

          <div class="ml-3 position-relative">
            <div>
              <label for="">
                <span class="filter position-absolute">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.18 4.20009H8.32018L8.368 4.06832C8.56419 3.52778 8.92205 3.06075 9.39295 2.73071C9.86385 2.40066 10.425 2.22361 11 2.22361C11.575 2.22361 12.1361 2.40066 12.607 2.73071C13.0779 3.06075 13.4358 3.52778 13.632 4.06832L13.6798 4.20009H13.82H21C21.2122 4.20009 21.4157 4.28437 21.5657 4.4344C21.7157 4.58443 21.8 4.78791 21.8 5.00009C21.8 5.21226 21.7157 5.41574 21.5657 5.56577C21.4157 5.7158 21.2122 5.80009 21 5.80009H13.82H13.6798L13.632 5.93185C13.4358 6.47239 13.0779 6.93942 12.607 7.26947C12.1361 7.59951 11.575 7.77656 11 7.77656C10.425 7.77656 9.86385 7.59951 9.39295 7.26947C8.92205 6.93942 8.56419 6.47239 8.368 5.93185L8.32018 5.80009H8.18H3C2.78783 5.80009 2.58434 5.7158 2.43431 5.56577C2.28429 5.41574 2.2 5.21226 2.2 5.00009C2.2 4.78791 2.28429 4.58443 2.43431 4.4344C2.58434 4.28437 2.78783 4.20009 3 4.20009H8.18ZM14.18 11.2001H14.3202L14.368 11.0683C14.5642 10.5278 14.9221 10.0608 15.393 9.73071C15.8639 9.40066 16.425 9.22361 17 9.22361C17.575 9.22361 18.1361 9.40066 18.607 9.73071C19.0779 10.0608 19.4358 10.5278 19.632 11.0683L19.6798 11.2001H19.82H21C21.2122 11.2001 21.4157 11.2844 21.5657 11.4344C21.7157 11.5844 21.8 11.7879 21.8 12.0001C21.8 12.2123 21.7157 12.4157 21.5657 12.5658C21.4157 12.7158 21.2122 12.8001 21 12.8001H19.82H19.6798L19.632 12.9319C19.4358 13.4724 19.0779 13.9394 18.607 14.2695C18.1361 14.5995 17.575 14.7766 17 14.7766C16.425 14.7766 15.8639 14.5995 15.393 14.2695C14.9221 13.9394 14.5642 13.4724 14.368 12.9319L14.3202 12.8001H14.18H3C2.78783 12.8001 2.58434 12.7158 2.43431 12.5658C2.28429 12.4157 2.2 12.2123 2.2 12.0001C2.2 11.7879 2.28429 11.5844 2.43431 11.4344C2.58434 11.2844 2.78783 11.2001 3 11.2001H14.18ZM6.18 18.2001H6.32018L6.368 18.0683C6.56419 17.5278 6.92205 17.0608 7.39295 16.7307C7.86386 16.4007 8.42496 16.2236 9 16.2236C9.57504 16.2236 10.1361 16.4007 10.607 16.7307C11.0779 17.0608 11.4358 17.5278 11.632 18.0683L11.6798 18.2001H11.82H21C21.2122 18.2001 21.4157 18.2844 21.5657 18.4344C21.7157 18.5844 21.8 18.7879 21.8 19.0001C21.8 19.2123 21.7157 19.4157 21.5657 19.5658C21.4157 19.7158 21.2122 19.8001 21 19.8001H11.82H11.6798L11.632 19.9319C11.4358 20.4724 11.0779 20.9394 10.607 21.2695C10.1361 21.5995 9.57504 21.7766 9 21.7766C8.42496 21.7766 7.86386 21.5995 7.39295 21.2695C6.92205 20.9394 6.56419 20.4724 6.368 19.9319L6.32018 19.8001H6.18H3C2.78783 19.8001 2.58434 19.7158 2.43431 19.5658C2.28429 19.4157 2.2 19.2123 2.2 19.0001C2.2 18.7879 2.28429 18.5844 2.43431 18.4344C2.58434 18.2844 2.78783 18.2001 3 18.2001H6.18ZM11.9978 5.66677C12.1296 5.46943 12.2 5.23742 12.2 5.00009C12.2 4.68183 12.0736 4.3766 11.8485 4.15156C11.6235 3.92651 11.3183 3.80009 11 3.80009C10.7627 3.80009 10.5307 3.87046 10.3333 4.00232C10.136 4.13418 9.98217 4.3216 9.89134 4.54087C9.80052 4.76014 9.77676 5.00142 9.82306 5.2342C9.86936 5.46697 9.98365 5.68079 10.1515 5.84862C10.3193 6.01644 10.5331 6.13073 10.7659 6.17703C10.9987 6.22333 11.2399 6.19957 11.4592 6.10874C11.6785 6.01792 11.8659 5.86411 11.9978 5.66677ZM17.9978 12.6668C18.1296 12.4694 18.2 12.2374 18.2 12.0001C18.2 11.6818 18.0736 11.3766 17.8485 11.1516C17.6235 10.9265 17.3183 10.8001 17 10.8001C16.7627 10.8001 16.5307 10.8705 16.3333 11.0023C16.136 11.1342 15.9822 11.3216 15.8913 11.5409C15.8005 11.7601 15.7768 12.0014 15.8231 12.2342C15.8694 12.467 15.9836 12.6808 16.1515 12.8486C16.3193 13.0164 16.5331 13.1307 16.7659 13.177C16.9987 13.2233 17.2399 13.1996 17.4592 13.1087C17.6785 13.0179 17.8659 12.8641 17.9978 12.6668ZM9.99776 19.6668C10.1296 19.4694 10.2 19.2374 10.2 19.0001C10.2 18.6818 10.0736 18.3766 9.84853 18.1516C9.62348 17.9265 9.31826 17.8001 9 17.8001C8.76266 17.8001 8.53065 17.8705 8.33332 18.0023C8.13598 18.1342 7.98217 18.3216 7.89134 18.5409C7.80052 18.7601 7.77676 19.0014 7.82306 19.2342C7.86936 19.467 7.98365 19.6808 8.15147 19.8486C8.31929 20.0164 8.53311 20.1307 8.76589 20.177C8.99867 20.2233 9.23995 20.1996 9.45922 20.1087C9.67849 20.0179 9.86591 19.8641 9.99776 19.6668Z"
                      fill="#333333"
                      stroke="white"
                      stroke-width="0.4"
                    />
                  </svg>
                </span>
                <b-form-select
                  v-model="selected"
                  :options="options"
                  class="py"
                  plain
                ></b-form-select>
              </label>
            </div>
          </div>
        </div>

        <div class="ml-auto">
          <button type="button" v-b-modal.new-campaign class="create px-3">
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
            <span class="mx-2">Create new campaign</span>
          </button>
        </div>
      </div>

      <!-- Table here -->
      <div class="holder">
        <table class="table table-borderless" v-if="campaigns.length">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col"> Budget</th>
              <th scope="col">Spent</th>
              <th scope="col">Created</th>
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
              <td @click="handleTempCampaign(campaign)">
                {{ campaign.title }}
              </td>
              <td @click="handleTempCampaign(campaign)">
                $ {{ campaign.budget | formatCurrency }}
              </td>
              <td @click="handleTempCampaign(campaign)">
                {{ campaign.spent }}
              </td>
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
              <td>
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
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else-if="loading" class="loader text-center"></div>
        <h3 v-else class="text-center no-record">NO RECORD FOUND</h3>
      </div>
    </div>
  </div>
</template>

<script>
import dot from "~/components/icons/dot";
import newCampaign from "~/components/modals/new-campaign";
import { mapGetters } from "vuex";
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
        { value: null, text: "filter" },
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
    async fetchAllCampaigns() {
      try {
        this.loading = true;

        const response = await this.$axios.get(
          `/campaigns/organisation/${+this.id}?type=campaign`
        );

        if (response.status == "success") {
          this.campaigns = response.data.reverse();
        }
        this.loading = false;

        console.log("All campaigns:::", response);
      } catch (err) {
        this.loading = false;
      }
    },

    handleTempCampaign(campaign) {
      this.$router.push(`/campaigns/${campaign.id}`);
    },

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
