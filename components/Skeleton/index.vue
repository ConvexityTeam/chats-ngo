<template>
  <el-skeleton animated :rows="rows" :count="count" :loading="loading">
    <template #template>
      <el-skeleton-item :variant="variant" :style="styles" />
    </template>
  </el-skeleton>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: true,
    },

    count: {
      type: Number,
      default: 1,
    },

    rows: {
      type: Number,
      default: 1,
    },

    /**
     * @param {string} accepted values =>
     * caption, text, button, image, circle, rect
     */
    variant: {
      type: String,
      default: "rect",
    },

    styles: {
      type: String,
      default: "",
    },
  },
};
</script>
