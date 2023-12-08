<template>
  <div>
    <b-modal id="disburse-funds" hide-header hide-footer>
      <div class="text-center position-relative pt-2">
        <!-- <h3 class="header font-bold primary-blue">Task approved</h3> -->
        <!--Close button here -->
        <button
          type="button"
          class="close-btn position-absolute pb-3"
          @click="closeModal"
        >
          <close />
        </button>
      </div>

      <div class="d-flex justify-content-center flex-column">
        <div class="d-flex justify-content-center icon">
          <approved />
        </div>
      </div>

      <section class="holder">
        <h3 class="header font-bold primary-blue text-center pt-3">
          Task approval
        </h3>

        <p class="text-center font-medium primary-gray pt-1 px-4">
          Task submission for
          {{ `${task.beneficiary_first_name} ${task.beneficiary_last_name}` }}
          has been successfully approved.
        </p>
      </section>

      <div class="d-flex justify-content-center mt-4 pb-3">
        <Button
          :has-icon="false"
          text="Disburse funds"
          custom-styles="height: 41px !important; border-radius: 5px!important; paddin: 0 24px !important"
          @click="disburseFunds"
        />
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import close from "~/components/icons/close";
import approved from "~/components/icons/approvedIcon";

let screenLoading;

export default {
  name: "DisburseFund",
  components: { close, approved },

  props: {
    task: {
      type: Object,
      required: true,
    },

    campaignId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      loading: false,
      orgId: null,
    };
  },

  computed: {
    ...mapGetters("authentication", ["user"]),
  },

  mounted() {
    this.orgId = this.user?.AssociatedOrganisations[0]?.OrganisationId;
  },

  methods: {
    // Funds Disbursed
    async disburseFunds() {
      console.log("DISBURSE TASK RECEived and CampaignId", this.task);
      try {
        this.openScreen();
        const response = await this.$axios.post(
          `organisations/${this.orgId}/task/${this.campaignId}/fund_beneficiary`,
          {
            beneficiaryId: this.task.beneficiaryId,
            taskAssignmentId: this.task.TaskAssignmentId,
          }
        );

        if (response.status === "success") {
          this.$toast.success(response.message);
          setTimeout(() => {
            this.closeModal();
          }, 500);
        }
        this.loading = false;
      } catch (error) {
        console.log("Disburse Funds Error:::", error);
        this.$bvModal.hide("disburse-funds");
      } finally {
        screenLoading.close();
      }
    },

    closeModal() {
      this.$bvModal.hide("disburse-funds");
    },

    openScreen() {
      screenLoading = this.$loading({
        lock: true,
        spinner: "el-icon-loading",
        background: "#0000009b",
      });
    },
  },

  openScreen() {
    screenLoading = this.$loading({
      lock: true,
      spinner: "el-icon-loading",
      background: "#0000009b",
    });
  },
};
</script>

<style scoped>
.icon {
  margin: 22px 0 20px 0;
}

.close-btn {
  bottom: -26px;
  right: -5px;
}

.holder {
  width: 75%;
  margin: auto;
}
</style>
