<template>
  <div class="banner-holder d-flex px-4" :class="{ isKyc }">
    <div class="d-flex align-items-center">
      <div>
        <svg
          v-if="isKyc"
          width="32"
          height="33"
          viewBox="0 0 32 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2.66681 16.4989C2.66681 9.14019 8.64014 3.16553 16.0001 3.16553C23.3735 3.16553 29.3335 9.14019 29.3335 16.4989C29.3335 23.8602 23.3735 29.8322 16.0001 29.8322C8.64014 29.8322 2.66681 23.8602 2.66681 16.4989ZM14.8268 11.4455C14.8268 10.8069 15.3601 10.2722 16.0001 10.2722C16.6401 10.2722 17.1601 10.8069 17.1601 11.4455V17.3389C17.1601 17.9802 16.6401 18.4989 16.0001 18.4989C15.3601 18.4989 14.8268 17.9802 14.8268 17.3389V11.4455ZM16.0135 22.7402C15.3601 22.7402 14.8401 22.2069 14.8401 21.5669C14.8401 20.9269 15.3601 20.4069 16.0001 20.4069C16.6535 20.4069 17.1735 20.9269 17.1735 21.5669C17.1735 22.2069 16.6535 22.7402 16.0135 22.7402Z"
            fill="#25396F"
          />
        </svg>

        <img v-else src="~/assets/img/vectors/info-button.svg" alt="icon" />
      </div>

      <div class="ml-3">
        <slot> </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Banner",

  props: {
    isKyc: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.banner-holder {
  background: #ddeafc;
  box-sizing: border-box;
  border-radius: 10px;
  align-items: center;
  height: 72px;
  width: 65%;

  &.isKyc {
    background: #f9f4c8;
  }
}
</style>
