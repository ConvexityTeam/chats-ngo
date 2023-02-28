<template>
  <div>
    <div class="mt-3 text-center">
      <p class="primary-gray py-3 font-medium">
        You are about to
        {{ details.type == "item" ? "create items for" : "fund" }} this campaign
        confirm to continue, cancel to discard it.
      </p>
    </div>

    <!-- buttons here -->
    <div class="mt-4 pb-3 d-flex justify-content-center">
      <div class="d-flex">
        <div>
          <Button
            text="Confirm"
            type="submit"
            :has-icon="false"
            custom-styles="height: 41px; border-radius:5px !important;  font-size: 14px !important;  width: 9rem;"
            @click="$emit('handleFunding')"
          />
        </div>

        <div class="ml-3">
          <Button
            text="Cancel"
            :has-icon="false"
            :has-border="true"
            custom-styles=" height: 41px !important; border: 1px solid #17CE89
          !important; border-radius: 5px !important; font-size: 0.875rem
          !important; width: 9rem; font-weight: 600 !important"
            @click="$bvModal.hide('funding-prompt')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    details: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    text() {},
  },
};
</script>
