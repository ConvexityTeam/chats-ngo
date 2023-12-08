<template>
  <div class="holder mb-3 p-3">
    <img
      src="~/assets/img/svg/chats-loader.svg"
      height="40px"
      width="40px"
      alt="loader"
    />

    <div class="ml-2 w-100">
      <span class="primary-blue font-medium">Importing Beneficiaries...</span>
      <div class="d-flex align-items-center">
        <span class="text-xs primary-blue count">
          {{ importStatus.total_beneficiaries }} of
          {{ importStatus.total_imported }}
        </span>
        <div class="ml-2 w-100">
          <b-progress
            :value="importStatus.total_beneficiaries"
            :max="importStatus.total_imported"
            variant="success"
          ></b-progress>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    importStatus: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style scoped lang="scss">
.holder {
  border-radius: 10px;
  background: #f5f6f8;
  display: flex;
  align-items: center;
  height: 66px;
}

.count {
  width: 7%;
}
</style>
