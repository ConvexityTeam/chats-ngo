<template>
  <div>
    <div
      v-for="(qandA, index) in questionsAndAnswers[0]?.questions"
      :key="`${qandA.question}_${index}`"
      class="mt-3 border-bottom text px-4 py-2"
    >
      <h6 class="font-weight-bold mb-2.5">Question {{ index + 1 }}</h6>
      <p class="font-weight-semibold mb-2 text ml-4">
        {{ qandA.question }}
      </p>

      <div class="text d-flex mb-2 ml-4">
        <span>Answer: </span>
        <span class="font-weight-bold ml-2">
          {{ qandA.answer }}
        </span>
      </div>
    </div>

    <!-- buttons here -->
    <div class="pb-3 d-flex button__section">
      <div>
        <Button
          text="Approve"
          type="submit"
          :has-icon="false"
          custom-styles="height: 41px; border: 1px solid #17CE89 !important; border-radius:5px !important;  font-size: 14px !important"
          @click="handleAction('approve')"
        />
      </div>

      <div class="ml-3">
        <Button
          text="Reject"
          :has-icon="false"
          :has-border="true"
          custom-styles=" height: 41px !important; border: 1px solid #E42C66 !important; border-radius: 5px !important; color:#E42C66 !important; font-size: 0.875rem !important;"
          @click="handleAction('reject')"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "benefactor-q-and-a-prompt",
  props: {
    questionsAndAnswers: {
      type: Array,
      required: true,
      default: () => [],
    },
  },

  data: () => ({
    qsAndAs: [
      {
        question: "How did you hear about this project",
        answer: "Newspaper",
      },
      {
        question: "What is your age bracket?",
        answer: "18 - 28",
      },
      {
        question: "What is your mother’s maiden name?",
        answer: "Chinazaekpere",
      },
    ],
  }),
  methods: {
    closeModal() {
      this.$bvModal.hide("benefactor-q-and-a");
    },

    handleAction(action) {
      this.$emit("handleAction", action);
      this.closeModal();
    },
  },
};
</script>

<style scoped>
.text {
  color: #7c8db5;
}

.button__section {
  margin-top: 2rem;
}
</style>
