<template>
  <div>
    <SkeletonSingleCard v-if="loading" />
    <div v-else class="campaign-details-holder p-4">
      <!-- Modals here -->
      <section>
        <Modal id="campaign-prompt" :title="`${status} project`">
          <FormsCampaignPrompt
            :status="status"
            :title="campaignDetails.title"
            @handleCampaign="handleCampaign"
          />
        </Modal>

        <!-- Withdraw Success -->
        <Modal id="withdraw-funds-success" :buttonModified="true" title=" ">
          <WithdrawFundsSuccess @close="reload" />
        </Modal>

        <Modal id="extend-campaign" title="Extend project">
          <ExtendCampaign :campaignDetails="campaignDetails" @reload="reload" />
        </Modal>
      </section>

      <h4 class="campaign-details-header poppins pt-2">Project Summary</h4>

      <!-- details region here -->
      <div>
        <div class="campaign-details-inner mt-4 p-4">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <h4 class="campaign-details-header pt-2 notranslate">
              {{ campaignDetails.title }}
            </h4>

            <el-dropdown
              trigger="click"
              placement="bottom-end"
              class="el-dropdown"
            >
              <span class="el-dropdown-link"> <ellipsis /> </span>

              <el-dropdown-menu slot="dropdown" class="el-dropdown-menu">
                <el-dropdown-item class="el-dropdown-item">
                  <span @click="openModal('extend-campaign')">
                    Extend project
                  </span>
                </el-dropdown-item>

                <el-dropdown-item
                  v-if="
                    statuses.includes(campaignDetails.status) &&
                    !campaignDetails.is_processing
                  "
                  class="el-dropdown-item"
                >
                  <span
                    @click="
                      handleModal(
                        campaignDetails.status == 'paused' ? 'resume' : 'Pause'
                      )
                    "
                  >
                    {{
                      campaignDetails.status == "paused"
                        ? "Resume project"
                        : "Pause project"
                    }}
                  </span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>

          <div class="d-flex mt-3">
            <BeneficiaryIcon />

            <div class="ml-2">
              <p class="campaign-beneficiary-count">
                {{ count }}
                {{ count === 1 ? "Beneficiary" : "Beneficiaries" }}
              </p>
            </div>
          </div>

          <!-- Task Region -->
          <div v-if="campaignDetails.type == 'cash-for-work'">
            <!-- Progress bar here -->
            <b-progress
              :value="
                getPercentage(
                  campaignDetails.completed_task,
                  campaignDetails.task_count
                )
              "
              :max="max"
              variant="success"
              class="mb-3 mt-1"
            ></b-progress>

            <!-- Task count here -->
            <div class="d-flex">
              <div>
                <p class="tasks">
                  <span> {{ campaignDetails.completed_task }} </span>
                  / {{ campaignDetails.task_count }}
                  {{ campaignDetails.task_count === 1 ? "Task" : "Tasks" }}
                </p>
              </div>

              <!-- Progress here -->
              <div class="ml-auto">
                <div class="task-badge d-flex align-items-center px-3">
                  {{
                    getPercentage(
                      campaignDetails.completed_task,
                      campaignDetails.task_count
                    )
                  }}%
                </div>
              </div>
            </div>
          </div>

          <!-- Details -->
          <div class="mt-4">
            <div
              v-if="campaignDetails.type !== 'item'"
              class="d-flex campaign-divider mb-3"
            >
              <p class="campaign-captions">Budget:</p>

              <div class="ml-auto">
                <p class="campaign-answers">
                  {{ campaignDetails.budget | formatCurrency }}
                </p>
              </div>
            </div>

            <div class="d-flex campaign-divider mb-3">
              <p class="campaign-captions">Description:</p>

              <div class="ml-auto">
                <p class="campaign-answers">
                  {{ campaignDetails.description }}
                </p>
              </div>
            </div>

            <div class="d-flex campaign-divider mb-3">
              <p class="campaign-captions">Start date:</p>

              <div class="ml-auto">
                <p class="campaign-answers">
                  {{ campaignDetails.start_date | shortDate }}
                </p>
              </div>
            </div>

            <div class="d-flex campaign-divider mb-3">
              <p class="campaign-captions">End date:</p>

              <div class="ml-auto">
                <p class="campaign-answers">
                  {{ campaignDetails.end_date | shortDate }}
                </p>
              </div>
            </div>

            <div class="d-flex campaign-divider mb-3">
              <p class="campaign-captions">Country:</p>

              <!-- Might have to geocode to get location -->
              <div class="ml-auto">
                <p class="campaign-answers">
                  {{ campaignDetails?.location?.country }}
                </p>
              </div>
            </div>

            <div class="d-flex campaign-divider mb-3">
              <p class="campaign-captions">State(s):</p>

              <!-- Might have to geocode to get location -->
              <div class="ml-auto">
                <p class="campaign-answers">
                  {{ formatStates(campaignDetails?.location?.state) }}
                </p>
              </div>
            </div>

            <div class="d-flex campaign-divider mb-3">
              <p class="campaign-captions">Created:</p>

              <div class="ml-auto">
                <p class="campaign-answers">
                  {{ campaignDetails.createdAt | shortDate }}
                </p>
              </div>
            </div>

            <div class="d-flex campaign-divider mb-3">
              <p class="campaign-captions">Beneficiary Share:</p>

              <div class="ml-auto">
                <p
                  v-if="campaignDetails.type == 'item'"
                  class="campaign-answers"
                >
                  {{ campaignDetails.minting_limit | formatNumber }}
                </p>

                <p v-else class="campaign-answers">
                  {{ campaignDetails.beneficiary_share | formatCurrency }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="campaign-details-inner mt-4 p-4">
          <div class="d-flex mb-2">
            <p class="campaign-captions">Amount Unspent:</p>

            <p class="campaign-answers ml-auto">
              {{ campaignDetails.balance | formatCurrency }}
            </p>
          </div>

          <div>
            <Button
              text="Withdraw Funds"
              custom-styles="height:41px; width: 100%; border-radius: 5px !important;"
              :has-border="true"
              :is-green="true"
              :hasIcon="false"
              :disabled="
                campaignDetails.status !== 'ended' ||
                !campaignDetails?.is_funded
              "
              @click="withdrawFunds"
            />
          </div>
        </div>

        <!-- campaign version history -->
        <span
          class="campaign-version-history"
          @click="$router.push(`/projects/${campaignId}/version-history`)"
        >
          <span class="mr-2 p-1"> Project version history </span>

          <Arrow title="right" />
        </span>
      </div>

      <!-- button region here -->
      <!-- <div
      v-if="statuses.includes(details.status) && !details.is_processing"
      class="mt-3"
    >
      <div class="d-flex">
        <Button
          :text="
            details.status == 'paused' ? 'Resume campaign' : 'Pause campaign'
          "
          :has-icon="false"
          :has-border="true"
          custom-styles=" height: 41px !important; border: 1px solid #17CE89 !important; border-radius: 5px !important; font-size: 0.875rem !important; padding: 0px 8px !important; font-weight: 600 !important"
          @click="handleModal(details.status == 'paused' ? 'resume' : 'Pause')"
        />
      </div>
    </div> -->
    </div>
  </div>
</template>

<script>
import { getPercentage, formatStates } from "~/utils/helpers";
import WithdrawFundsSuccess from "~/components/forms/WithdrawFundsSuccess";
import ellipsis from "~/components/icons/ellipsis";
import Arrow from "~/components/icons/arrow";
import ExtendCampaign from "~/components/forms/ExtendCampaign";
import BeneficiaryIcon from "~/components/icons/BeneficiaryIcon";

let screenLoading;

export default {
  components: {
    ellipsis,
    ExtendCampaign,
    Arrow,
    BeneficiaryIcon,
    WithdrawFundsSuccess,
  },

  props: {
    loading: {
      type: Boolean,
      default: false,
    },

    details: {
      type: Object,
      default: () => {},
    },

    count: {
      type: Number,
      default: null,
    },

    location: {
      type: String,
      default: "",
    },

    user: {
      type: Object,
      default: () => {},
    },

    resumeCampaign: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    getPercentage,
    formatStates,
    campaignStatus: "",
    status: "",
    orgId: "",
    statuses: ["paused", "active"],
    max: 100,
    beneficiaries: [],
    campaignId: "",
    campaignDetails: {},
  }),

  async fetch() {
    this.campaignId = this.$route.params.id;
    this.orgId = this.user?.AssociatedOrganisations[0]?.OrganisationId;

    this.beneficiaries = await this.$axios.$get(
      `organisation/${this.orgId}/campaigns/${this.campaignId}/beneficiaries`
    );
    const response = await this.$axios.get(
      `/organisations/${this.orgId}/campaigns/${this.campaignId}`
    );

    this.campaignDetails = response.data;
  },

  watch: {
    resumeCampaign(value) {
      if (value) {
        this.handleCampaign("active");
      }
    },
  },

  mounted() {
    this.campaignDetails = this.details;
  },

  methods: {
    async withdrawFunds() {
      try {
        this.openScreen();
        const response = await this.$axios.post(
          `organisations/${this.orgId}/campaign-funds-withdrawal/${this.$route.params?.id}`
        );

        if (response.status === "success") {
          this.$bvModal.show("withdraw-funds-success");
        }
      } catch (_err) {
      } finally {
        screenLoading.close();
      }
    },

    handleModal(value) {
      const stats = ["Pause", "Delete"];
      if (stats.includes(value)) {
        this.status = value;
        return this.toggleModal(true);
      }
      return this.handleCampaign("active");
    },

    toggleModal(value) {
      if (value) return this.$bvModal.show("campaign-prompt");
      return this.$bvModal.hide("campaign-prompt");
    },

    openModal(modalId) {
      this.$bvModal.show(modalId);
    },

    async handleCampaign(status) {
      try {
        this.toggleModal(false);
        this.openScreen();

        if (status === "Pause" || status === "paused") {
          this.campaignStatus = "paused";
        }

        if (status === "Delete") {
          this.campaignStatus = "deleted";
        }

        if (status === "active") {
          this.campaignStatus = "active";
        }

        const response = await this.$axios.put(
          `organisations/${this.orgId}/campaigns/${this.$route.params.id}`,
          { status: this.campaignStatus }
        );

        if (response.status === "success") {
          this.$toast.success(response.message);
          this.$emit("reload");
        }

        console.log("PUT Response:", response);
      } catch (_err) {
      } finally {
        screenLoading.close();
      }
    },

    openScreen() {
      screenLoading = this.$loading({
        lock: true,
        spinner: "el-icon-loading",
        background: "#0000009b",
      });
    },

    reload() {
      this.$fetch();
    },
  },
};
</script>

<style>
.campaign-details-holder {
  background: #ffffff;
  box-shadow: 0px 4px 25px rgba(174, 174, 192, 0.15);
  border-radius: 10px;
}

.campaign-details-header {
  color: #25396f;
  font-weight: bold;
  font-size: 1.125rem;
}

.campaign-details-inner {
  border: 1px solid #17ce89;
  border-radius: 10px;
  position: relative;
}

.campaign-captions {
  color: #25396f;
  font-family: "Poppins", sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
}

.campaign-answers {
  color: #25396f;
  font-size: 0.875rem;
  text-align: right;
}

.campaign-divider {
  border-bottom: 1px solid #f5f6f8;
}
.el-dropdown-menu {
  padding: 1rem 0rem;
  border-radius: 0.5rem;
  width: 18rem;
}
.el-dropdown-menu > .el-dropdown-item > span {
  font-family: "DM Sans";
  width: 100%;
  display: block;
  font-size: 1rem;
  padding: 0.2rem;
  border-bottom: 0.2px solid #f5f6f8;
  color: #25396f;
  text-align: left;
  cursor: pointer;
}
.campaign-version-history {
  display: flex;
  align-items: center;
  margin-top: 2rem;
  font-weight: 700;
  font-size: 0.875rem;
  cursor: pointer;
}

.campaign-version-history > * {
  color: #17ce89 !important;
}
</style>
