<template>
  <button
    :type="type"
    class="d-flex align-items-center px-3"
    @click="$emit('click')"
    :class="{ border: hasBorder }"
    :style="customStyles"
  >
    <i v-if="hasIcon">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14 7V8H8V14H7V8H1V7H7V1H8V7H14Z"
          :fill="fill"
          :stroke="fill"
        />
      </svg>
    </i>
    <span class="ml-2">{{ text }}</span>
  </button>
</template>

<script>
export default {
  name: "create-button",
  props: {
    text: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "button"
    },
    hasIcon: {
      type: Boolean,
      default: true
    },
    fill: {
      type: String,
      default: "white"
    },
    hasBorder: {
      type: Boolean,
      default: false
    },
    customStyles: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped>
button {
  background: #17ce89;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  font-family: "Poppins", sans-serif;
  border: none;
}
button.border {
  border: 1px solid #17ce89;
  color: #17ce89;
}
</style>
