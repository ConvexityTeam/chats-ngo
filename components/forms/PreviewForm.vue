<template>
  <div>
    <!-- Title Region Here -->
    <div class="mt-4 pt-3">
      <label for="title" class="primary-blue font-medium">Form Title</label>
      <div>
        <input
          id="title"
          type="text"
          class="form-controls px-3 primary-blue"
          placeholder="Enter form title"
          :value="payload.title"
          disabled
        />
      </div>
    </div>

    <!-- Form Preview Here -->
    <section class="mt-4">
      <div
        v-for="(question, i) in payload.questions"
        :key="i"
        class="card-holder p-4 mb-1"
      >
        <label for="question_1" class="primary-blue font-medium"
          >Question {{ i + 1 }}
        </label>

        <p class="primary-blue font-bold px-3 my-3">
          {{ question.question ? question.question.title : "" }}
        </p>

        <div class="mt-4 pt-2">
          <!-- Checkbox -->
          <div v-if="question.type == 'multiple'">
            <div
              v-for="(option, index) in question.question.options"
              :key="index"
              class="mb-4 d-flex"
            >
              <Checkbox
                v-if="question.question.options[index].option"
                readonly
                :value="false"
              />
              <span class="primary-blue ml-3">
                {{ question.question.options[index].option }}
              </span>
            </div>
          </div>

          <!-- Radio -->
          <div v-if="question.type == 'optional'">
            <div
              v-for="(option, index) in question.question.options"
              :key="index"
              class="mb-3 d-flex"
            >
              <Radio
                v-if="question.question.options[index].option"
                readonly
                :value="false"
              />
              <span class="primary-blue ml-3">
                {{ question.question.options[index].option }}
              </span>
            </div>
          </div>

          <!-- Text -->
          <div v-if="question.type == 'short'" class="mb-3">
            <label class="primary-blue font-medium">Answer </label>
            <input
              id="question_1"
              type="text"
              class="form-controls px-3"
              disabled
            />
          </div>
        </div>
      </div>
    </section>

    <div class="d-flex justify-content-end mt-5 pt-4">
      <div v-if="!isSuccess">
        <Button
          :has-icon="false"
          :text="buttonText"
          fontSize="1rem"
          custom-styles="height: 50px; border-radius: 8px; font-weight: 600; padding: 0 1.25rem !important"
          @click="$emit('submit', payload)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    payload: {},
  }),

  computed: {
    isSuccess() {
      return !!this.$route.query.success;
    },

    isEdit() {
      return !!this.$route.params.id || !!this.$route.query.id;
    },

    buttonText() {
      return this.isEdit ? "Update form" : "Create form";
    },
  },

  mounted() {
    const campaignForm = localStorage.getItem("campaignForm");
    if (campaignForm) {
      this.payload = JSON.parse(campaignForm);
    }
    window.scrollTo(0, 0);
  },
};
</script>

<style scoped>
.card-holder {
  background: #ffffff;
  box-shadow: 0px 4px 25px rgba(174, 174, 192, 0.15);
  border-radius: 8px;
}
</style>
