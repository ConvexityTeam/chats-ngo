<template>
  <div>
    <!-- Drawer Here -->
    <drawer :visibleSync="drawer" @close="closeDrawer">
      <FormsMarketViewProposal @close="closeDrawer" />
    </drawer>

    <div class="main container transparent">
      <!-- Search region Here -->
      <section class="row pt-4 mt-2">
        <div class="col-lg-8">
          <div class="row">
            <div class="col-lg-5">
              <!-- Search Box here -->
              <div class="position-relative">
                <input
                  v-model="searchQuery"
                  type="text"
                  class="form-controls search"
                  placeholder="Search requests..."
                  @input="$emit('searchInput', searchQuery)"
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
            text="Create New Request"
            custom-styles="height:50px"
            @click="$emit('open')"
          />
        </div>
      </section>

      <!-- Cards Here -->
      <template v-if="proposals.length">
        <section class="row mt-4 pt-2">
          <div
            v-for="proposal in proposals"
            :key="proposal.id"
            class="col-lg-4 mb-4"
          >
            <div class="card__holder p-4">
              <div class="pill">{{ proposal?.category_type | capitalize }}</div>

              <div>
                <h5 class="primary-blue pt-3 text-md font-bold">
                  {{ proposal?.campaign_requests?.title }}
                </h5>
                <h6 class="pt-1 primary-blue">
                  {{ proposal?.campaign_requests?.description }}
                </h6>

                <!-- Proposals received Here -->
                <section class="d-flex py-2 border-b">
                  <svg
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M3.33333 1.33203C2.32081 1.33203 1.5 2.15284 1.5 3.16536L1.5 13.832C1.5 14.8446 2.32081 15.6654 3.33333 15.6654L12.6667 15.6654C13.6792 15.6654 14.5 14.8446 14.5 13.832L14.5 5.9701C14.5 5.74909 14.4122 5.53713 14.2559 5.38085L10.4512 1.57611C10.2949 1.41983 10.0829 1.33203 9.86193 1.33203L3.33333 1.33203ZM5.33333 7.9987C5.05719 7.9987 4.83333 8.22256 4.83333 8.4987C4.83333 8.77484 5.05719 8.9987 5.33333 8.9987L10.6667 8.9987C10.9428 8.9987 11.1667 8.77484 11.1667 8.4987C11.1667 8.22256 10.9428 7.9987 10.6667 7.9987L5.33333 7.9987ZM4.83333 11.1654C4.83333 10.8892 5.05719 10.6654 5.33333 10.6654L10.6667 10.6654C10.9428 10.6654 11.1667 10.8892 11.1667 11.1654C11.1667 11.4415 10.9428 11.6654 10.6667 11.6654L5.33333 11.6654C5.05719 11.6654 4.83333 11.4415 4.83333 11.1654ZM10.5 3.03914V5.33204H12.7929L10.5 3.03914Z"
                      fill="#7C8DB5"
                    />
                  </svg>

                  <h6 class="ml-2 font-medium primary-gray">
                    Proposals received:
                    <span class="primary-blue">{{
                      proposal?.proposal_received | formatNumber
                    }}</span>
                  </h6>
                </section>

                <!-- Budget Region -->
                <section class="pt-3">
                  <div class="d-flex justify-content-between">
                    <div>
                      <h6 class="primary-gray text-xs">BUDGET</h6>
                      <h6 class="font-medium primary-blue">
                        {{
                          proposal?.campaign_requests?.budget | formatCurrency
                        }}
                      </h6>
                    </div>

                    <div>
                      <h6 class="primary-gray text-xs">LOCATION</h6>
                      <h6 class="font-medium primary-blue">
                        {{ proposal?.campaign_requests?.location?.country }}
                      </h6>
                    </div>
                  </div>
                </section>

                <!-- Products Pill -->
                <section class="pt-2">
                  <h6 class="primary-gray text-xs pb-2">PRODUCTS</h6>

                  <section class="pill-holder">
                    <div
                      v-for="(product, i) in proposal?.product"
                      :key="i"
                      :class="getPillClass(i)"
                    >
                      {{ product?.tag | capitalize }}
                    </div>
                  </section>
                </section>

                <!-- Button Here -->
                <section
                  class="d-flex button-holder justify-content-end pt-4 mt-2"
                >
                  <button
                    class="view_proposals"
                    @click="$router.push(`/market/${proposal.id}`)"
                  >
                    <svg
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.83329 8C6.83329 7.17157 7.50487 6.5 8.33329 6.5C9.16172 6.5 9.83329 7.17157 9.83329 8C9.83329 8.82843 9.16172 9.5 8.33329 9.5C7.50487 9.5 6.83329 8.82843 6.83329 8Z"
                        fill="#17CE89"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.33329 3.5C6.49207 3.5 4.80667 4.46866 3.57709 5.43124C2.33627 6.40262 1.48716 7.42521 1.30853 7.64703C1.14195 7.85387 1.14195 8.14614 1.30853 8.35298C1.48716 8.57479 2.33627 9.59738 3.57709 10.5688C4.80667 11.5313 6.49207 12.5 8.33329 12.5C10.1745 12.5 11.8599 11.5313 13.0895 10.5688C14.3303 9.59738 15.1794 8.57479 15.358 8.35297C15.5246 8.14614 15.5246 7.85386 15.358 7.64702C15.1794 7.42521 14.3303 6.40262 13.0895 5.43124C11.8599 4.46866 10.1745 3.5 8.33329 3.5ZM8.33329 5.5C6.95258 5.5 5.83329 6.61929 5.83329 8C5.83329 9.38071 6.95258 10.5 8.33329 10.5C9.714 10.5 10.8333 9.38071 10.8333 8C10.8333 6.61929 9.714 5.5 8.33329 5.5Z"
                        fill="#17CE89"
                      />
                    </svg>

                    <span class="ml-2"> View Proposals</span>
                  </button>
                </section>
              </div>
            </div>
          </div>
        </section>

        <!-- pagination component  -->
        <div class="pagination-wrapper">
          <pagination
            :currentPageNum="proposalsPageNum"
            :totalNumOfItems="proposalsTotalItems"
            @updatePage="(event) => $emit('updatePage', event)"
          />
        </div>
      </template>

      <section v-else class="pt-5 mt-5 text-center">
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
    </div>
  </div>
</template>

<script>
export default {
  props: {
    proposals: {
      type: Array,
      default: () => [],
    },
    proposalsPageNum: {
      type: Number,
      default: 1,
    },
    proposalsTotalItems: {
      type: Number,
      default: 0,
    },
  },

  data: () => ({
    searchQuery: "",
    drawer: false,
  }),

  methods: {
    getPillClass(index) {
      const colors = ["green", "yellow", "purple", "blue", "red"];
      return "pill " + colors[index % colors.length];
    },

    closeDrawer() {
      this.drawer = false;
    },
  },
};
</script>

<style scoped>
.card__holder {
  border-radius: 10px;
  border: 1px solid #f3f3f6;
  background: #fff;
  box-shadow: 0px 4px 30px 0px rgba(174, 174, 192, 0.2);
  height: auto;
  min-height: 451px;
}

.pill {
  width: fit-content;
  font-size: 0.875rem;
  text-align: center;
  padding: 2px 12px;
  border-radius: 32px;
  background-color: #f5f6f8;
}

.pill.green {
  background-color: #eefcf6;
  color: #35c78a;
  font-weight: 500;
}
.pill.yellow {
  background-color: #fffded;
  color: #f2994a;
  font-weight: 500;
}

.pill.purple {
  background-color: #ece5fa;
  color: #9b75ed;
  font-weight: 500;
}

.pill.blue {
  background-color: #e2f1fd;
  color: #53a6eb;
  font-weight: 500;
}
.pill.red {
  background-color: #fcefee;
  color: #f7796e;
  font-weight: 500;
}
.pill-holder {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.border-b {
  border-bottom: 1px solid #e1e7ec;
}

.button-holder {
  flex-direction: column;
  align-items: end;
  height: 16vh;
}

.view_proposals {
  height: 45px;
  background-color: inherit;
  color: #17ce89;
  border-radius: 8px;
  border: 1px solid #17ce89;
  font-size: 0.875rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
}

.proposals {
  width: 33%;
  margin: auto;
}

.pagination-wrapper {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1rem;
  width: 100%;
}
</style>
