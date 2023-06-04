<template>
  <div class="m-5 p-3">
    <div v-if="loading">
      <FullScreenLoader :loading="loading" />
    </div>

    <section v-else-if="history.length">
      <div class="position-relative mt-6 mb-4">
        <h3 class="header primary-blue">Campaigns - {{ campaign.title }}</h3>

        <button
          type="button"
          @click="$router.go(-1)"
          class="close-btn position-absolute"
          aria-label="Close"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.0002 1L1.42676 16.5531"
              stroke="#8C97A7"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              d="M0.999803 1L16.5732 16.5531"
              stroke="#8C97A7"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </button>
      </div>

      <section class="mt-4 pt-2 timeline">
        <div>
          <div class="block">
            <el-timeline>
              <!-- see more -->
              <el-timeline-item
                v-for="(event, index) in visibleEvents"
                :key="index"
                color="#2A2E33"
              >
                <div class="mb-4 d-flex align-items-center">
                  <span class="mr-3 date">
                    {{ event.updatedAt | shortDate }}
                  </span>
                  <span class="status" v-if="event.currentCampaign"
                    >Current version</span
                  >
                </div>

                <div class="mb-4">
                  <p class="mb-2 d-flex align-items-center">
                    <span class="box i1"></span>
                    <span class="title"> Campaign extended </span>
                  </p>

                  <p class="text-muted my-0">
                    Extension period:
                    {{ event.extension_period | formatNumber }} days, New End
                    Date: {{ event.new_end_date | shortDate }}
                  </p>
                </div>

                <div class="mb-4">
                  <p class="mb-2 d-flex align-items-center">
                    <span class="box i2"></span>
                    <span class="title"> Additional budget Added </span>
                  </p>

                  <p class="text-muted my-0">
                    Amount: {{ $currency
                    }}{{ event.beneficiaries | formatNumber }}
                  </p>
                </div>

                <div class="mb-4">
                  <p class="mb-2 d-flex align-items-center">
                    <span class="box i3"></span>
                    <span class="title">
                      ({{ event.beneficiaries }})
                      {{
                        event.beneficiaries > 1
                          ? "Beneficiaries"
                          : "Beneficiary"
                      }}
                      Added
                    </span>
                  </p>
                </div>
              </el-timeline-item>

              <el-timeline-item color="#fff" v-if="history.length > 3">
                <p
                  class="see-more d-flex align-items-center"
                  @click="showMore = !showMore"
                >
                  <img src="~/assets/img/vectors/eye.svg" alt="see" />

                  <span class="ml-2">
                    {{ showMore ? "Show less" : "Show more..." }}
                  </span>
                </p>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </section>
    </section>

    <section class="empty" v-else>
      <img src="~/assets/img/svg/megaphone.svg" alt="megaphonep" />
      <p class="pt-4">Oops... No campaign history yet.</p>

      <Button
        class="mt-3"
        :has-icon="false"
        text="Back to Campaign"
        @click="$router.go(-1)"
        custom-styles="height: 42px"
      />
    </section>
  </div>
</template>

<script>
import close from "~/components/icons/close";
import { mapGetters } from "vuex";

export default {
  components: { close },
  data: () => ({
    loading: false,
    showMore: false,
    maxVisibleItems: 3,
    history: [],
    campaign: {},
  }),

  computed: {
    ...mapGetters("authentication", ["user"]),

    visibleEvents() {
      const history = this.history;
      return this.showMore ? history : history.slice(0, this.maxVisibleItems);
    },
  },

  mounted() {
    this.fetchVersionHistory();
  },

  methods: {
    async fetchVersionHistory() {
      try {
        this.loading = true;
        const campaignId = this.$route.params.id;
        const { OrganisationId } = this.user?.AssociatedOrganisations[0];

        const response = await this.$axios.get(
          `organisations/${campaignId}/campaign-history/${OrganisationId}`
        );

        if (response.status == "success") {
          const { data } = response;
          this.campaign = data;
          this.history = data.history.reverse();
        }
      } catch (err) {
        this.$toast.error(err?.response?.data?.message);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.header {
  font-weight: bold;
  font-size: 1.75rem;
}

.close-btn {
  border: none;
  background: inherit;
  right: 16px;
}
.empty {
  height: 85vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.empty > p {
  color: #2a2e33;
  font-weight: bold;
}
.box {
  height: 0.875rem;
  width: 0.875rem;
  border-radius: 0.25rem;
  display: inline-block;
  margin-right: 0.75rem;
}
.box.i1 {
  background: #3da35d;
}
.box.i2 {
  background: #96e072;
}
.box.i3 {
  background: #e8fccf;
}
.date {
  color: #2a2e33;
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.5rem;
}
.status {
  font-size: 0.75rem;
  color: #337138;
  background: #d1f7c4;
  border-radius: 3rem;
  height: 24px;
  padding: 0 8px;
}
.title {
  padding-top: 1px;
  color: #2a2e33;
  font-size: 0.875rem;
  font-weight: 500;
}
.text-muted {
  color: #6d7786;
  font-size: 1rem;
}
.timeline {
  margin-left: -2.2rem;
  margin-top: 2rem;
}
.see-more {
  font-size: 0.875rem;
  color: #17ce89;
  cursor: pointer;
}
.see-more > span {
  font-weight: 500;
  padding-top: 1px;
}
</style>
