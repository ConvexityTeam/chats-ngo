<template>
  <div class="container main transparent mt-2 pt-4 pb-5">
    <back text="Go Back" @click="$router.go(-1)" />

    <FormBuilder @submit="updateForm" />

    <!-- Modal Here -->
    <Modal id="campaign-form" title="" buttonModified>
      <CampaignFormSuccess :formName="title" :isEdit="isEdit" />
    </Modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FormBuilder from "@/components/forms/FormBuilder";
import CampaignFormSuccess from "@/components/forms/CampaignFormSuccess";
let screenLoading;

export default {
  layout: "dashboard",
  components: { FormBuilder, CampaignFormSuccess },

  data: () => ({
    payload: {},
    id: "",
    title: "",
  }),

  computed: {
    ...mapGetters("authentication", ["user"]),

    isPreview() {
      return !!this.$route.query.preview;
    },

    isEdit() {
      return !!this.$route.params.id;
    },
  },

  mounted() {
    if (this.isEdit) {
      this.$fetch();
    }
  },

  async fetch() {
    this.id = this.user?.AssociatedOrganisations[0]?.OrganisationId;
    const response = await this.$axios.get(
      `/organisations/${this.id}/campaign_form/${this.$route.params.id}`
    );

    if (response.status === "success") {
      const { title, questions } = response.data;

      this.payload = { title, questions };
      localStorage.setItem(
        "campaignForm",
        JSON.stringify({ title, questions })
      );
    }
  },

  methods: {
    async updateForm(payload) {
      try {
        this.openScreen();

        //  Format  the value field and remove symbol
        payload.questions.forEach((question) => {
          if (question.value) {
            question.value = question.value.replace(/[^0-9.]/g, "");
          }
        });

        const response = await this.$axios.put(
          `organisations/${this.id}/campaign_form`,
          { ...payload, id: this.$route.params.id }
        );

        console.log("response:::", response);

        if (response.status == "success") {
          //   this.$toast.success(response.message);
          this.$bvModal.show("campaign-form");
          this.title = response.data?.title;

          if (this.isPreview) {
            this.$router.push({
              path: this.$route.path,
              query: { success: true },
            });
          }
        }
        console.log("response:::", response);
      } catch (err) {
        this.$toast.error(err?.response?.data?.message);
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
</style>
