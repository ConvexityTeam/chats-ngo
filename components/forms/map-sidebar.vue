<template>
  <div>
    <!-- <b-button @click="drawer = true">Toggle Sidebar</b-button> -->
    <b-sidebar
      @hidden="$emit('hidden')"
      v-model="isVisible"
      aria-controls="sidebar-right"
      :aria-expanded="isVisible"
      id="sidebar-right"
      title="Sidebar"
      right
      width="80%"
    >
      <div class="px-3 py-2">
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
        <b-img
          src="https://picsum.photos/500/500/?image=54"
          fluid
          thumbnail
        ></b-img>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  props: {
    drawer: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    isVisible: false,
  }),

  //   watch: {
  //     drawer: {
  //       handler() {
  //         this.isVisible = this.drawer;
  //       },
  //       immediate: true,
  //     },
  //   },
};
</script>
