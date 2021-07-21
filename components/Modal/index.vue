<template>
  <div>
    <b-modal :id="id" hide-header hide-footer>
      <div class="text-center position-relative pt-2">
        <h3 class="header">{{ title | capitalize }}</h3>
        <!--Close button here -->
        <button
          type="button"
          class="close-btn position-absolute"
          @click="closeModal"
        >
          <close />
        </button>
      </div>

      <div>
        <slot></slot>
      </div>
    </b-modal>
  </div>
</template>

<script>
import close from "~/components/icons/close";

export default {
  props: {
    id: {
      type: String,
      default: "",
      required: true
    },

    title: {
      type: String,
      defaault: "",
      required: true
    }
  },

  components: { close },

  methods: {
    closeModal() {
      this.$bvModal.hide(`${this.id}`);
    }
  }
};
</script>

<style scoped>
.header {
  color: var(--tertiary-black);
  font-weight: bold;
  font-size: 1.5rem;
}

.modal-body {
  border-radius: 10px;
  background: white;
}

.close-btn {
  border: none;
  background: inherit;
  bottom: 15px;
  right: 0px;
}
</style>
