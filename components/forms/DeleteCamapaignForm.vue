<template>
  <div>
    <div class="mt-3 text-center">
      <p class="font-medium px-5 py-3">
        You are about to delete
        <span class="font-bold">{{ form.title }}.</span> Are you really sure
        about this? This action cannot be undone.
      </p>
    </div>

    <!-- buttons here -->
    <div class="mt-4 pb-3 d-flex justify-content-center">
      <div class="d-flex">
        <div>
          <Button
            text="Delete Form"
            :has-icon="false"
            custom-styles="height: 41px; border-radius:5px !important;  font-size: 14px !important"
            :loading="isLoading"
            @click="handleDelete"
          />
        </div>

        <div class="ml-3">
          <Button
            text="Cancel"
            :has-icon="false"
            :has-border="true"
            custom-styles=" height: 41px !important; border: 1px solid #17CE89 !important; border-radius: 5px !important; font-size: 0.875rem !important; width: 9rem; font-weight: 600 !important"
            @click="$bvModal.hide('delete-campaign-form')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      default: () => {},
    },

    id: {
      type: [String, Number],
      default: "",
    },

    isLoading: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    loading: false,
  }),

  methods: {
    handleDelete() {
      console.log("delete form");
      this.$emit("deleteForm");
    },
  },
};
</script>

<style scoped>
p {
  color: #7c8db5;
}
</style>
