<template>
  <div class="d-flex justify-content-end align-items-center px-4 pt-2 pb-4">
    <span class="text"> Showing </span>

    <span
      class="text"
      :class="
        currentPageNum === totalNumOfPages && remainder === 1 ? 'd-none' : ''
      "
    >
      {{ Math.floor((currentPageNum - 1) * numOfItemsPerPage) + 1 }}
    </span>

    <span
      class="text"
      :class="
        currentPageNum === totalNumOfPages && remainder === 1 ? 'd-none' : ''
      "
    >
      -
    </span>

    <span class="text">
      <span v-if="currentPageNum === totalNumOfPages">
        <!--  -->
        <span v-if="remainder === 0">
          {{
            Math.floor((currentPageNum + 1) * numOfItemsPerPage) -
            numOfItemsPerPage
          }}
        </span>

        <!--  -->
        <span v-if="remainder > 0">
          {{ Math.floor((currentPageNum - 1) * numOfItemsPerPage) + remainder }}
        </span>
      </span>

      <span v-if="currentPageNum !== totalNumOfPages">
        {{
          Math.floor((currentPageNum + 1) * numOfItemsPerPage) -
          numOfItemsPerPage
        }}
      </span>
    </span>

    <span class="text"> of </span>

    <span class="text"> {{ totalNumOfItems }} </span>

    <!-- action buttons  -->
    <!-- previous button -->
    <span
      class="mx-2 p-1 icon"
      :class="btnToDisable === 'prev' && 'disabled'"
      title="Previous Page"
      @click="btnToDisable !== 'prev' ? clickHandler('prev') : null"
    >
      <LeftArrowVue />
    </span>

    <!-- next button -->
    <span
      class="mx-2 p-1 icon"
      :class="btnToDisable === 'next' && 'disabled'"
      title="Next Page"
      @click="btnToDisable !== 'next' ? clickHandler('next') : null"
    >
      <RightArrowVue />
    </span>
  </div>
</template>

<script>
import RightArrowVue from "~/components/icons/right-arrow.vue";
import LeftArrowVue from "~/components/icons/left-arrow.vue";

export default {
  components: {
    RightArrowVue,
    LeftArrowVue,
  },
  props: {
    numOfItemsPerPage: {
      type: Number,
      required: true,
    },
    currentPageNum: {
      type: Number,
      required: true,
    },
    totalNumOfItems: {
      type: Number,
      required: true,
    },
  },
  data: () => ({}),
  computed: {
    remainder: function () {
      return this.totalNumOfItems % this.numOfItemsPerPage;
    },
    totalNumOfPages: function () {
      const numOfPages = Math.floor(
        (this.totalNumOfItems - this.remainder) / this.numOfItemsPerPage
      );

      //
      if (this.remainder < 1) return numOfPages;
      if (this.remainder >= 1) return numOfPages + 1;
    },
    btnToDisable: function () {
      if (this.currentPageNum <= 1) return "prev";
      if (this.currentPageNum === this.totalNumOfPages) return "next";
    },
  },
  methods: {
    clickHandler(action) {
      this.$emit("updatePage", action);
    },
  },
};
</script>

<style lang="css" scoped>
.text {
  font-weight: 500;
  padding: 1px;
  margin: auto 2px;
  font-size: 0.9rem;
  user-select: none;
}
.icon {
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  border-radius: 50%;
}
.disabled {
  cursor: not-allowed;
  opacity: 50%;
}
</style>
