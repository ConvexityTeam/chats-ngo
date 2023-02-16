<template>
  <div class="my-3">
    <!-- Modas Here -->
    <section>
      <Modal id="invite-donor" title="Invite donor to campaign">
        <InviteDonorVue @sendInvite="sendInvite" />
      </Modal>
    </section>

    <!-- Content Here -->
    <div class="privacy-holder d-grid d-flex align-items-center">
      <!-- Link Here -->
      <div class="d-flex align-items-center col-7 text-truncate px-3 h-100">
        <img
          src="~/assets/img/vectors/link.svg"
          alt="link"
          @click="$copy(copiapleLink)"
        />

        <span class="primary-blue text-truncate ml-2">
          Campaign link:

          <span>
            <a href="#" @click="$copy(copiapleLink)">
              {{ `${campaignLink}/${campaignId}` }}
            </a>
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
  },

  data: () => ({
    isCampaignPublic: false,
    campaignLink: "https://chats.cash/organisation",
  }),

  computed: {
    copiapleLink() {
      return `${this.campaignLink}/${this.campaignId}`;
    },
  },

  methods: {
    toggle(value) {
      this.isCampaignPublic = value;

      console.log(this.isCampaignPublic);
    },
    async sendInvite(payload) {
      const { inviteeEmail, message } = payload;
      const link = "https://www.chats.cash";
      const testPayload = { inviteeEmail, link, message };

      this.$bvModal.hide("invite-donor");
      if (inviteeEmail.length < 1)
        return this.$toast.error("Email field cannot be empty !!!");

      try {
        this.openScreen();

        const response = await this.$axios.post(
          `/auth/${this.organisationId}/invite/${this.campaignId}`,
          testPayload
        );

        this.$toast.success(response.message);
        return screenLoading.close();
      } catch (err) {
        this.$toast.error(err.message);
        screenLoading.close();
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
</style>
