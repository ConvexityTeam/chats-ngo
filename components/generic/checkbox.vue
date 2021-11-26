<template>
  <label>
    <input
      :id="id"
      type="checkbox"
      class="focus:outline-none"
      @change="$emit('input', $event.target.checked)"
    />
    <span></span>
  </label>
</template>
<script>
export default {
  name: "c-checkbox",

  props: {
    id: {
      type: String,
      default: "",
      required: true
    }
  }
};
</script>
<style scoped>
label {
  position: relative;
}
span {
  width: 24px;
  height: 24px;
  border: 1px solid #17ce89;
  display: inline-block;
  border-radius: 5px;
  transition: all linear 0.3s;
}
span:after {
  content: "";
  position: absolute;
  top: 5px;
  left: 9px;
  border-bottom: 2px solid white;
  border-right: 2px solid white;
  height: 11px;
  width: 6px;
  transform: rotate(45deg);
  visibility: hidden;
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
