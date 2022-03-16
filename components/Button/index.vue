<template>
  <button
    :type="type"
    class="d-flex align-items-center px-3"
    @click="$emit('click')"
    :class="{ border: hasBorder, isGray: isGray }"
    :style="customStyles"
    :disabled="disabled"
  >
    <i v-if="hasIcon">
      <img v-if="hasEye" src="~/assets/img/vectors/eye.svg" alt="eye" />
      <img v-else-if="csv" src="~/assets/img/vectors/csv.svg" alt="csv" />
      <img v-else-if="greenCsv" src="~/assets/img/vectors/csv2.svg" alt="csv" />
      <img v-else-if="isGreen" src="~/assets/img/vectors/add2.svg" alt="add" />
      <img v-else src="~/assets/img/vectors/add.svg" alt="add" />
    </i>

    <img
      v-if="loading"
      src="~/assets/img/vectors/spinner.svg"
      class="btn-spinner"
    />
    <span :class="{ 'ml-2': hasIcon }" :style="{ fontSize: fontSize }">{{
      loading ? "" : text
    }}</span>
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
    },
    hasEye: {
      type: Boolean,
      default: false
    },
    csv: {
      type: Boolean,
      default: false
    },
    greenCsv: {
      type: Boolean,
      default: false
    },
    isGreen: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isGray: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    fontSize: {
      type: String,
      default: "0.875rem"
    }
  }
};
</script>

<style scoped>
button {
  background: var(--primary-color);
  border-radius: 8px;
  color: white;
  font-weight: 600;
  font-family: "Poppins", sans-serif;
  border: none;
  font-size: 1rem;
  justify-content: center;
}

button.border {
  color: var(--primary-color);
  background: inherit;
  font-weight: 500;
  border: 1px solid var(--primary-color) !important;
}

button:disabled {
  /* background: initial; */
  opacity: 0.5;
  border: inherit;
  box-shadow: 0px 2px 4px rgba(23, 206, 137, 0.07);
  cursor: not-allowed;
}

button.isGray {
  border: 1px solid #7c8db5 !important;
  color: #7c8db5;
}

button span {
  font-size: 0.875rem;
}
</style>
