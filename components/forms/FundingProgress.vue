<template>
  <div>
    <!-- Icon -->
    <div class="mt-4 pt-3 d-flex justify-content-center">
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0.833984 29.9977C0.833984 13.9006 13.9007 0.831055 30.0007 0.831055C46.1298 0.831055 59.1673 13.9006 59.1673 29.9977C59.1673 46.1006 46.1298 59.1644 30.0007 59.1644C13.9007 59.1644 0.833984 46.1006 0.833984 29.9977ZM27.434 18.9436C27.434 17.5465 28.6007 16.3769 30.0007 16.3769C31.4007 16.3769 32.5382 17.5465 32.5382 18.9436V31.8352C32.5382 33.2381 31.4007 34.3727 30.0007 34.3727C28.6007 34.3727 27.434 33.2381 27.434 31.8352V18.9436ZM30.0298 43.6506C28.6007 43.6506 27.4632 42.484 27.4632 41.084C27.4632 39.684 28.6007 38.5465 30.0007 38.5465C31.4298 38.5465 32.5673 39.684 32.5673 41.084C32.5673 42.484 31.4298 43.6506 30.0298 43.6506Z"
          fill="#F2994A"
        />
      </svg>
    </div>

    <!-- text here -->
    <div class="text-center mt-4 pt-1">
      <h6 class="primary-blue text-xl font-bold">Funding in progress...</h6>
      <p class="primary-gray font-medium w-75 m-auto">
        you will receive a notification confirming your funding status.
      </p>
    </div>

    <!-- Button Here -->
    <div class="m-4 py-2">
      <Button
        type="button"
        text="Alright, Thank you!"
        :has-icon="false"
        :has-border="true"
        custom-styles="height:52px; border-radius: 4px; width: 100%; font-weight: 600 !important"
        font-size="1rem"
        @click="closeModal"
      />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeModal() {
      this.$emit("done");
      this.$bvModal.hide("funding-progress");
    },
  },
};
</script>
