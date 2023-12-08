<template>
  <div class="card-skeleton__holder p-4 mb-4" :style="{ minHeight }">
    <Skeleton variant="text" class="w-50" styles="height: 24px" />

    <div class="pt-4">
      <Skeleton variant="text" class="w-75 mb-2" />
      <Skeleton variant="text" class="w-25 mb-2" />
      <Skeleton variant="text" class="w-75 mb-2" />
    </div>

    <div class="mt-3">
      <div v-for="x in 2" :key="x" class="d-flex w-100">
        <Skeleton variant="text" class="w-25 mb-2" />

        <div class="ml-auto d-flex justify-content-end w-75">
          <Skeleton variant="text" class="w-25 mb-2" />
        </div>
      </div>
    </div>

    <div class="mt-3">
      <Skeleton :count="1" />
    </div>

    <div class="mt-4 d-flex justify-content-end">
      <Skeleton class="w-50 d-flex justify-content-end" styles="height: 44px" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    minHeight: {
      type: String,
      default: "451px",
    },
  },
};
</script>
