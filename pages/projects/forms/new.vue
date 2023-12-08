<template>
  <div class="container main transparent mt-2 pt-4 pb-5">
    <back text="Go Back" @click="handleRoute" />

    <section class="w-90">
      <!-- Form Builder -->
      <template v-if="isPreview || isSuccess">
        <PreviewForm @submit="createForm" />
      </template>

      <template v-else>
        <FormBuilder :isPreview="isPreview" @submit="createForm" />
      </template>

      <!-- Modal Here -->

      <Modal
        id="campaign-form"
        title=""
        buttonModified
        @closeModal="
          $router.push({ path: '/projects', query: { section: 'forms' } })
        "
      >
        <CampaignFormSuccess :formName="title" />
      </Modal>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FormBuilder from "@/components/forms/FormBuilder";
import PreviewForm from "@/components/forms/PreviewForm";
import CampaignFormSuccess from "@/components/forms/CampaignFormSuccess";

let screenLoading;

export default {
  name: "NewForm",
  components: { FormBuilder, PreviewForm, CampaignFormSuccess },
  layout: "dashboard",

  data: () => ({
    payload: {},
    title: "",
  }),

  computed: {
    ...mapGetters("authentication", ["user"]),
    isPreview() {
      return !!this.$route.query.preview;
    },

    isSuccess() {
      return !!this.$route.query.success;
    },
  },

  methods: {
    handleRoute() {
      if (this.isSuccess) {
        this.$router.push({ path: "/projects", query: { section: "forms" } });
        localStorage.removeItem("campaignForm");
      } else {
        this.$router.go(-1);
      }
    },
    async createForm(payload) {
      console.log("GOTE HERE", payload);
      try {
        const id = this.user?.AssociatedOrganisations[0]?.OrganisationId;
        this.openScreen();

        const response = await this.$axios.post(
          `organisations/${id}/campaign_form`,
          { ...payload }
        );

        if (response.status === "success") {
          this.$bvModal.show("campaign-form");
          this.title = response.data?.title;

          if (this.isPreview) {
            this.$router.push({
              path: "/projects/forms/new",
              query: { success: true },
            });
          }
        }
        console.log("response:::", response);
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

<style scoped>
.main {
  height: calc(100vh - 72px);
  overflow-y: scroll;
}

.w-90 {
  width: 90%;
}
</style>
