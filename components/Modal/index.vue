<template>
  <div>
    <b-modal :size="size" :id="id" hide-header hide-footer :centered="centered">
      <div class="text-center position-relative pt-3">
        <h3 class="header font-bold primary-blue">{{ title | capitalize }}</h3>
        <!--Close button here -->
        <button
          type="button"
          class="close-btn position-absolute"
          :class="{ buttonModified }"
          @click="closeModal"
        >
          <close />
        </button>
      </div>

      <!-- Content Here -->
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
      required: true,
    },

    title: {
      type: String,
      default: "",
      required: true,
    },

    size: {
      type: String,
      default: "md",
    },

    centered: {
      type: Boolean,
      default: false,
    },

    buttonModified: {
      type: Boolean,
      default: false,
    },
  },

  components: { close },

  methods: {
    closeModal() {
      this.$emit("closeModal");
      this.$bvModal.hide(`${this.id}`);
    },
    showModal() {
      this.$bvModal.show(`${this.id}`);
    },
  },
};
</script>

<style scoped>
.header {
  color: var(--primary-blue);
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
  bottom: 25px;
  right: -5px;
}

.close-btn.buttonModified {
  bottom: -5px;
}
</style>
