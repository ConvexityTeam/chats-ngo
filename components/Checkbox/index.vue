<template>
  <label :style="{ height: height }">
    <input
      type="checkbox"
      ref="checkbox"
      :id="id"
      class="focus:outline-none"
      :checked="checked"
      :value="value"
      :disabled="disabled"
      @change="$emit('input', $event.target.checked)"
    />

    <span :class="{ disabled: disabled }"></span>
  </label>
</template>
<script>
export default {
  name: "c-checkbox",
  props: {
    id: {
      type: String,
      default: ""
    },
    value: {
      type: Number
    },
    checked: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: "16px"
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
label {
  position: relative;
  display: flex !important;
}
span {
  width: 20px;
  height: 20px;
  border: 1px solid #17ce89;
  display: inline-block;
  border-radius: 5px;
  transition: all linear 0.3s;
  cursor: pointer;
}
span:after {
  content: "";
  position: absolute;
  top: 3px;
  left: 7px;
  border-bottom: 2px solid white;
  border-right: 2px solid white;
  height: 11px;
  width: 6px;
  transform: rotate(45deg);
  visibility: hidden;
}
span.disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
input {
  display: none;
}
input:checked ~ span {
  background: #17ce89;
}
input:checked ~ span:after {
  visibility: visible;
}
</style>
