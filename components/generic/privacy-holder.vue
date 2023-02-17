<template>
  <div class="my-3">
    <!-- Modas Here -->
    <section>
      <Modal id="invite-donor" title="Invite donor to campaign">
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
          Campaign link:

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
            <toggle class="mb-n1" :value="isCampaignPublic" @toggle="toggle" />
          </span>
        </div>

        <span
          class="d-flex align-items-center justify-content-center action_2 flex-fill h-100 px-1"
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

let screenLoading;
export default {
  components: { InviteDonorVue },
  props: {
    organisationId: {
      type: String | Number,
      required: true,
    },
    campaignId: {
      type: String | Number,
      required: true,
    },
    is_public: {
      type: Boolean | null,
      required: true,
    },
  },

  data: () => ({
    isCampaignPublic: false,
    loading: false,
  }),

  computed: {
    campaignLink() {
      return this.isCampaignPublic
        ? "https://chats.cash/organisation/public"
        : "https://chats.cash/organisation/private";
    },
    copiableLink() {
      return `${this.campaignLink}/${this.campaignId}`;
    },
  },

  mounted() {
    this.isCampaignPublic = this.is_public;
  },

  methods: {
    async toggle(value) {
      try {
        this.openScreen();
        const response = await this.$axios.patch(
          `/organisation/${this.organisationId}/campaigns/${this.campaignId}`
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
      this.loading = true;
      const link = "https://www.chats.cash";

      try {
        const response = await this.$axios.post(
          `/auth/${this.organisationId}/invite/${this.campaignId}`,
          { ...payload, link }
        );

        this.loading = false;
        this.$toast.success(response.message);
        return this.$bvModal.hide("invite-donor");
      } catch (err) {
        this.$toast.error(err.message);
        this.loading = false;
        return this.$bvModal.hide("invite-donor");
      }
    },
    openModal(modalId) {
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
</style>
