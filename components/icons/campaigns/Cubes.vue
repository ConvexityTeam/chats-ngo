<template>
  <span>
    <span v-if="state == 'active'">
      <img :src="cubesActive" />
    </span>

    <span v-if="state == 'inactive'">
      <img :src="cubes" />
    </span>
  </span>
</template>

<script>
import cubes from "~/assets/img/svg/cubes.svg";
import cubesActive from "~/assets/img/svg/cubes-active.svg";

export default {
  props: {
    state: {
      type: String,
      default: "inactive",
    },
  },
  data() {
    return {
      cubes,
      cubesActive,
    };
  },
};
</script>
