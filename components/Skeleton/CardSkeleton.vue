<template>
  <div class="row container">
    <div v-for="i in itemCount" :key="i" class="col-lg-4 mb-4">
      <div class="card-skeleton__holder p-4" :style="{ minHeight }">
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
          <Skeleton :count="count" />
        </div>

        <div class="mt-4 d-flex justify-content-end">
          <Skeleton
            class="w-50 d-flex justify-content-end"
            styles="height: 44px"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itemCount: {
      type: Number,
      default: 6,
    },

    count: {
      type: Number,
      default: 3,
    },

    minHeight: {
      type: String,
      default: "451px",
    },
  },
};
</script>

<style>
.card-skeleton__holder {
  border-radius: 10px;
  border: 1px solid #f3f3f6;
  background: #fff;
  box-shadow: 0px 4px 30px 0px rgba(174, 174, 192, 0.2);
  height: auto;
}
</style>
