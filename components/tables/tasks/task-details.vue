<template>
  <div class="campaign-details-holder p-4">
    <Modal id="campaign-prompt" :title="`${status} project`">
      <FormsCampaignPrompt
        :status="status"
        :title="details.title"
        @handleCampaign="handleCampaign"
      />
    </Modal>

    <h4 class="campaign-details-header poppins pt-2">Task Summary</h4>

    <!-- details region here -->
    <div class="campaign-details-inner mt-4 p-4">
      <h4 class="campaign-details-header pt-2">{{ details.name }}</h4>

      <div class="d-flex mt-3">
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

        <div class="ml-2">
          <p class="campaign-beneficiary-count">
            {{ details.assignment_count }}
            {{ details.assignment_count == 1 ? "Entry" : "Entries" }}
          </p>
        </div>
      </div>

      <!-- Task Region -->
      <div>
        <!-- Progress bar here -->
        <b-progress
          :value="(details.campleted_task / details.assignment_count) * 100"
          :max="100"
          variant="success"
          class="mb-3 mt-1"
        ></b-progress>

        <!-- Task count here -->
        <div class="d-flex">
          <!-- Progress here -->
          <div class="ml-auto">
            <div class="task-badge d-flex align-items-center px-3">
              {{
                (details.campleted_task / details.assignment_count) * 100 || 0
              }}%
            </div>
          </div>
        </div>
      </div>

      <!-- Details -->
      <div class="mt-4">
        <div class="d-flex campaign-divider mb-3">
          <p class="campaign-captions">Description:</p>

          <div class="ml-auto">
            <p class="campaign-answers">
              {{ details.description }}
            </p>
          </div>
        </div>

        <div class="d-flex campaign-divider mb-3">
          <p class="campaign-captions">Amount:</p>

          <div class="ml-auto">
            <p class="campaign-answers">
              {{ details.amount | formatCurrency }}
            </p>
          </div>
        </div>

        <div class="d-flex campaign-divider mb-3">
          <p class="campaign-captions">Created:</p>

          <div class="ml-auto">
            <p class="campaign-answers">
              {{ details.createdAt | shortDate }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let screenLoading;

export default {
  props: {
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
    campaignStatus: "",
    status: "",
    orgId: 0,
    statuses: ["paused", "active"],
  }),

  watch: {
    resumeCampaign(value) {
      if (value) {
        this.handleCampaign("active");
      }
    },
  },

  mounted() {
    this.orgId = this.user?.AssociatedOrganisations[0]?.OrganisationId;
  },

  methods: {
    handleModal(value) {
      const stats = ["Pause", "Delete"];
      if (stats.includes(value)) {
        this.status = value;
        this.toggleModal(true);
        return;
      }
      return this.handleCampaign("active");
    },
    toggleModal(value) {
      if (value) {
        return this.$bvModal.show("campaign-prompt");
      }
      return this.$bvModal.hide("campaign-prompt");
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

        console.log("status::", this.campaignStatus);

        const response = await this.$axios.put(
          `organisations/${this.orgId}/campaigns/${this.$route.params.id}`,
          { status: this.campaignStatus }
        );

        if (response.status === "success") {
          this.$toast.success(response.message);
          this.$emit("reload");
        }

        console.log("pauseResponse::", response);
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
}

.campaign-divider {
  border-bottom: 1px solid #f5f6f8;
}
</style>
