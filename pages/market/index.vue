<template>
  <div class="main py-4 transparent container">
    <div>
      <!-- Drawer Here -->
      <drawer @close="closeDrawer" :visibleSync="drawer">
        <FormsMarketCreateProposal @close="closeDrawer" @modalClosed="$fetch" />
      </drawer>
    </div>

    <FullScreenLoader
      v-if="$fetchState.pending"
      :loading="$fetchState.pending"
    />

    <template v-else-if="proposals.length">
      <FormsMarketProposals
        :proposals="resultQuery"
        @open="drawer = true"
        @searchInput="(value) => (searchQuery = value)"
      />
    </template>

    <template v-else>
      <section class="row">
        <!-- Welcome message here -->
        <div class="col-lg-9">
          <div class="card__holder h-260 p-4">
            <div class="d-flex">
              <div>
                <h4 class="welcome-header">Welcome to the market dashboard!</h4>

                <p class="description">
                  You can send a proposal request for a project from vendors
                  here. You can compare their proposals and select the best fit
                  for your projects.
                </p>

                <div class="pt-3">
                  <Button
                    text="Create New Request"
                    custom-styles="height:50px; padding: 0 2rem !important;"
                    fontSize="1rem"
                    @click="drawer = true"
                  />
                </div>
              </div>

              <!-- image here -->
              <div class="ml-auto pb-3">
                <img src="~/assets/img/lady.svg" alt />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="pt-5 mt-5 text-center">
        <IconsNoProduct />

        <div>
          <h5 class="pt-4 primary-blue font-bold text-md">
            Nothing in here yet.
          </h5>
          <p class="primary-gray font-medium proposals">
            Proposals from Vendors will show up here once they respond to your
            request.
          </p>
        </div>
      </section>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  layout: "dashboard",
  name: "MarketPlace",

  async fetch() {
    this.id = this.user?.AssociatedOrganisations[0]?.OrganisationId;
    const { data } = await this.$axios.get(
      `organisation/${this.id}/proposal-requests`
    );

    if (data) {
      this.proposals = data;
    }
  },

  data: () => ({
    drawer: false,
    proposals: [],
    searchQuery: "",
  }),

  computed: {
    ...mapGetters("authentication", ["user"]),

    resultQuery() {
      if (this.searchQuery) {
        return this.proposals.filter((data) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) =>
              data?.campaign_requests?.title?.toLowerCase().includes(v)
            );
        });
      } else {
        return this.proposals;
      }
    },
  },

  methods: {
    closeDrawer() {
      this.drawer = false;
    },
  },
};
</script>

<style scoped>
.welcome-header {
  color: var(--primary-blue);
  font-weight: 700;
  font-size: 1.5rem;
}

.card__holder {
  background: #ffffff;
  box-shadow: 0px 4px 25px rgba(174, 174, 192, 0.15);
  border-radius: 10px;
}

.description {
  color: var(--primary-blue);
  font-size: 1rem;
}

.main {
  height: calc(100vh - 72px);
  overflow-y: scroll;
}

.proposals {
  width: 33%;
  margin: auto;
}

.h-260 {
  height: 260px;
}

hr {
  border-top: 1px solid #f5f6f8;
}
</style>
