<template>
  <div>
    <div class="mt-3 text-center">
      <p>
        You are about to delete this {{ product.type }} "{{
          product.tag | capitalize
        }}". Are you really sure about this?
      </p>
    </div>

    <!-- buttons here -->
    <div class="mt-4 pb-3 d-flex justify-content-center">
      <div class="d-flex">
        <div>
          <Button
            :text="`Delete ${product.type}`"
            type="submit"
            :has-icon="false"
            custom-styles="height: 41px; border-radius:5px !important;  font-size: 14px !important"
            @click="handleDelete"
          />
        </div>

        <div class="ml-3">
          <Button
            text="Cancel"
            :has-icon="false"
            :has-border="true"
            custom-styles=" height: 41px !important; border: 1px solid #17CE89 !important; border-radius: 5px !important; font-size: 0.875rem !important; width: 9rem; font-weight: 600 !important"
            @click="closeModal"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import close from "~/components/icons/close";

export default {
  name: "campaign-prompts",
  props: {
    product: {
      type: Object,
      default: () => {}
    }
  },

  components: { close },

  methods: {
    closeModal() {
      this.$bvModal.hide("delete-product");
    },

    handleDelete() {
      this.$emit("handleDelete");
      this.closeModal();
    }
  }
};
</script>

<style scoped>
p {
  color: #7c8db5;
  font-weight: 500;
  margin: 0 auto;
  width: 70%;
}

.create-campaign {
  background: var(--primary-color);
  border-radius: 10px;
  font-size: 1rem;
  border: 1px solid var(--primary-color);
  color: white;
  border: none;
}
</style>
