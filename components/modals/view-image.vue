<template>
  <div>
    <b-modal id="view-image" hide-header hide-footer>
      <div class="text-center position-relative pt-2">
        <h3 class="header font-bold primary-blue">Image Viewer</h3>
        <!--Close button here -->
        <button type="button" class="close-btn position-absolute pb-3 top-50" @click="closeModal">
          <close />
        </button>
      </div>

      <div class="d-flex justify-content-center align-items-center mt-3">
        <b-img v-if="img" :src="img" fluid class="w-100 h-100"></b-img>
      </div>
    </b-modal>
  </div>
</template>

<script>
import close from "~/components/icons/close";
export default {
    name: "ViewImage",

    components: {
      close
    },

    props: {
        img: {
            type: String,
            required: true,
        },
    },

    methods: {
        closeModal() {
            this.$bvModal.hide("view-image");
        },
    },
};
</script>

<style scoped>
</style>
