<template>
  <el-drawer
    :visible.sync="isOpen"
    size="70%"
    :with-header="withHeader"
    :direction="direction"
  >
    <slot />
  </el-drawer>
</template>

<script>
export default {
  name: "create-button",
  props: {
    direction: {
      type: String,
      default: "rtl",
    },
    withHeader: {
      type: Boolean,
      default: false,
    },
    visibleSync: {
      type: Boolean,
      required: true,
    },
    size: {
      type: String,
      default: "75%",
    },
  },
  computed: {
    isOpen: {
      get: function () {
        return this.visibleSync;
      },
      set: function () {
        return this.$emit("close");
      },
    },
  },
};
</script>
