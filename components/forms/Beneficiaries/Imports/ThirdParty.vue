<template>
  <div class="mx-3">
    <section class="mt-3 text-left">
      <p class="primary-gray py-2">
        Select a project you would like to import beneficiaries from
      </p>
    </section>

    <form @submit.prevent="importThirdParty">
      <!-- Name field  here -->
      <div class="form-group">
        <label for="authentication-link">Importation link</label>

        <div class="input-wrapper">
          <span class="input-icon">
            <LinkIcon />
          </span>

          <input
            id="authentication-link"
            v-model="payload.url"
            type="text"
            class="form-controls has-icon"
            placeholder="Paste importation link"
          />
        </div>
      </div>

      <!-- Name field  here -->
      <div class="form-group">
        <label for="authentication-digest">Authentication digest</label>
        <input
          id="authentication-digest"
          v-model="payload.digest"
          type="text"
          class="form-controls"
          placeholder="Enter authentication digest"
        />
      </div>

      <!-- button area here -->
      <div class="d-flex justify-content-end pb-2 my-4">
        <div>
          <Button
            text="Cancel"
            :has-icon="false"
            :isGray="true"
            :has-border="true"
            custom-styles="height: 44px; width: 6.75rem; border-radius:4px !important; color: #646A86; border: 1px solid #646A86 !important; font-size: 14px !important;"
            @click="closeModal"
          />
        </div>

        <div class="ml-3">
          <Button
            text="Import"
            type="submit"
            :has-icon="false"
            :loading="loading"
            :disabled="loading"
            custom-styles="height: 44px; width: 6.75rem; border-radius:4px !important; background: #A4B0CB; font-size: 14px !important;  border: 1px solid #A4B0CB !important; "
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import LinkIcon from "~/components/icons/Link";
let screenLoading;

export default {
  props: {
    orgId: {
      type: [Number, String],
      default: "",
    },
  },

  data: () => ({
    loading: false,
    payload: {
      url: "https://kobo.humanitarianresponse.info/api/v2/assets/1111111111/data.json?",
      digest: "",
      campaignId: "",
    },
  }),

  components: { LinkIcon },

  methods: {
    async importThirdParty() {
      try {
        this.payload.campaignId = this.$route.params.id;
        this.openScreen();
        this.loading = true;

        const response = await this.$axios.post(
          `/beneficiaries/kobotoolbox`,
          this.payload
        );
        console.log("Import Response:::", response);
      } catch (error) {
        console.log("test");
      } finally {
        screenLoading.close();
        this.loading = false;
      }
    },
    closeModal() {
      return this.$bvModal.hide(`import-third-party-beneficiaries`);
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
.primary-gray {
  font-size: 0.875rem;
}

label {
  color: #222222;
  font-size: 1rem;
  font-weight: 500;
}

.form-group {
  margin-bottom: 1rem !important;
}
.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding-left: 1rem;
}

.form-controls {
  border: none;
  background: #f5f6f8;
  height: 52px;
  padding: 0rem 1rem;
}
.form-controls.has-icon {
  height: 52px;
  padding-left: 2.6rem;
}

.form-controls::placeholder {
  color: #646a86;
  font-size: 0.875rem;
  letter-spacing: 0.01em;
}
</style>
