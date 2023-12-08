<template>
  <transition name="fade">
    <b-modal id="rejected" hide-header hide-footer>
      <div class="text-center position-relative pt-2">
        <h3 class="header font-bold primary-blue"></h3>
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
          <rejected />
        </div>
      </div>

      <section class="holder">
        <h3 class="header font-bold primary-blue text-center pt-3">
          Task approval
        </h3>

        <p class="text-center font-medium primary-gray pt-1 px-4">
          Task submission for
          {{ `${task.beneficiary_first_name} ${task.beneficiary_last_name}` }}
          has been rejected.
        </p>
      </section>

      <div class="d-flex justify-content-center mt-4 pb-3">
        <Button
          :has-icon="false"
          text="Go to task"
          custom-styles="height: 41px !important; border-radius: 5px!important; paddin: 0 24px !important"
          @click="closeModal"
        />
      </div>
    </b-modal>
  </transition>
</template>

<script>
import close from "~/components/icons/close";
import rejected from "~/components/icons/rejectedIcon";

export default {
  name: "Rejected",
  components: { close, rejected },

  props: {
    task: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },

  methods: {
    closeModal() {
      this.$bvModal.hide("rejected");
    },
  },
};
</script>

<style scoped>
.icon {
  margin: 22px 0 20px 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
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
