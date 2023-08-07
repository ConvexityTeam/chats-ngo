<template>
  <div class="my-3">
    <!-- Modas Here -->
    <section>
      <Modal id="invite-donor" title="Invite donor to project">
        <InviteDonorVue @sendInvite="sendInvite" :loading="loading" />
      </Modal>
    </section>

    <!-- Content Here -->
    <div class="privacy-holder d-grid d-flex align-items-center">
      <!-- Link Here -->
      <div class="d-flex align-items-center col-7 text-truncate px-3 h-100">
        <img
          src="~/assets/img/vectors/link.svg"
          alt="link"
          @click="$copy(copiableLink)"
        />

        <span class="primary-blue text-truncate ml-2">
          Project link:

          <span>
            <span @click="$copy(copiableLink)" class="copy-link">
              {{ copiableLink }}
            </span>
          </span>
        </span>
      </div>

      <!-- Action Buttons -->
      <div
        class="ml-auto d-flex align-items-center flex-fill h-100 action__container"
      >
        <div
          class="d-flex align-items-center justify-content-center flex-fill action_1 h-100 px-1"
        >
          <span class="mr-2"> Make public </span>

          <span class="d-flex align-items-center h-100">
            <toggle
              class="mb-n1"
              v-model="isCampaignPublic"
              @input="toggle"
              :disabled="details?.status == 'completed'"
              :title="details?.status == 'completed' && 'Project completed'"
            />
          </span>
        </div>

        <span
          class="d-flex align-items-center justify-content-center action_2 flex-fill h-100 px-1"
          :class="details?.status == 'completed' && 'disabled-invite-btn'"
          :title="details?.status == 'completed' && 'Project completed'"
          @click="openModal('invite-donor')"
        >
          Invite Donor
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import InviteDonorVue from "../forms/campaigns/invite-donor.vue";
import appConfig from "~/appConfig";

let screenLoading;
export default {
  components: { InviteDonorVue },
  props: {
    details: {
      type: Object,
      default: () => {},
    },
  },

  data: () => ({
    isCampaignPublic: false,
    loading: false,
  }),

  computed: {
    campaignLink() {
      return this.isCampaignPublic
        ? `${appConfig.DONOR_APP_URL}/projects/public`
        : `${appConfig.DONOR_APP_URL}/projects`;
    },
    copiableLink() {
      return `${this.campaignLink}/${this.details?.id}`;
    },
  },

  mounted() {
    this.isCampaignPublic = this.details?.is_public;
  },

  methods: {
    async toggle(value) {
      try {
        this.openScreen();
        const { OrganisationId, id } = this.details;

        const response = await this.$axios.patch(
          `/organisation/${OrganisationId}/campaigns/${id}`
        );

        this.$toast.success(response.message);
        this.isCampaignPublic = value;
        return screenLoading.close();
      } catch (err) {
        this.$toast.error(err.message);
        screenLoading.close();
      }
    },

    async sendInvite(payload) {
      try {
        this.loading = true;
        const link = `${appConfig.DONOR_APP_URL}/verify-user`;
        const { OrganisationId, id } = this.details;

        const response = await this.$axios.post(
          `/auth/${OrganisationId}/invite/${id}`,
          { ...payload, link }
        );

        this.$toast.success(response.message);
        return this.$bvModal.hide("invite-donor");
      } catch (err) {
        this.$toast.error(err?.message);
      } finally {
        this.loading = false;
      }
    },
    openModal(modalId) {
      if (this.details?.status == "completed") return;
      this.$bvModal.show(modalId);
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

<style scoped>
.privacy-holder {
  border: 0.5px solid #17ce89;
  border-radius: 10px;
  height: 51px;
  width: 63%;
}

img {
  cursor: pointer;
}

.primary-blue {
  font-weight: 500;
}

a {
  text-decoration: none;
}

.action__container .action_1,
.action__container .action_2 {
  border-left: 0.5px solid #17ce89;
  font-weight: bold;
  font-size: 0.875rem;
}

.action__container .action_1 {
  color: #7c8db5;
}
.action__container .action_2 {
  color: #17ce89;
  cursor: pointer;
}
.copy-link {
  color: #2f80ed !important;
  cursor: copy;
}

.disabled-invite-btn {
  cursor: not-allowed !important ;
  color: #7c8db5 !important;
}

.disabled-cursor {
  cursor: not-allowed !important ;
}
</style>
