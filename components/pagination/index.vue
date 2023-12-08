<template>
  <div v-if="totalNumOfItems > numOfItemsPerPage">
    <div class="d-flex justify-content-end align-items-center p-3">
      <span class="text"> Showing </span>

      <span class="text" :class="{ 'd-none': isOneRemainder }">
        {{ Math.floor((currentPageNum - 1) * numOfItemsPerPage) + 1 }}
      </span>

      <span class="text" :class="{ 'd-none': isOneRemainder }"> - </span>

      <span class="text">
        <span v-if="currentPageNum === totalNumOfPages">
          <span v-if="!remainder">
            {{
              Math.floor((currentPageNum + 1) * numOfItemsPerPage) -
              numOfItemsPerPage
            }}
          </span>

          <span v-else>
            {{
              Math.floor((currentPageNum - 1) * numOfItemsPerPage) + remainder
            }}
          </span>
        </span>

        <span v-else>
          {{
            Math.floor((currentPageNum + 1) * numOfItemsPerPage) -
            numOfItemsPerPage
          }}
        </span>
      </span>

      <span class="text"> of {{ totalNumOfItems }} </span>
      <span
        class="mx-2 p-1 icon"
        :class="{ disabled: isPrevButtonDisabled }"
        title="Previous Page"
        @click="clickHandler('prev')"
      >
        <!-- <LeftArrowVue /> -->
        <IconsLeftArrow />
      </span>

      <span
        class="mx-2 p-1 icon"
        :class="{ disabled: isNextButtonDisabled }"
        title="Next Page"
        @click="clickHandler('next')"
      >
        <!-- <RightArrowVue /> -->
        <IconsRightArrow />
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    numOfItemsPerPage: {
      type: Number,
      default: 10,
    },

    currentPageNum: {
      type: Number,
      default: 1,
      required: true,
    },

    totalNumOfItems: {
      type: Number,
      default: 0,
      required: true,
    },
  },

  computed: {
    remainder() {
      return this.totalNumOfItems % this.numOfItemsPerPage;
    },

    isOneRemainder() {
      return (
        this.currentPageNum === this.totalNumOfPages && this.remainder === 1
      );
    },

    totalNumOfPages() {
      return Math.ceil(this.totalNumOfItems / this.numOfItemsPerPage);
    },

    isPrevButtonDisabled() {
      return this.currentPageNum <= 1;
    },

    isNextButtonDisabled() {
      return (
        this.currentPageNum >= this.totalNumOfPages ||
        this.totalNumOfItems <= this.numOfItemsPerPage
      );
    },
  },

  methods: {
    clickHandler(action) {
      if (action === "prev" && !this.isPrevButtonDisabled) {
        this.$emit("updatePage", action);
      } else if (action === "next" && !this.isNextButtonDisabled) {
        this.$emit("updatePage", action);
      }
    },
  },
};
</script>

<style scoped>
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
