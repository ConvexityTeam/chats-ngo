<template>
  <button
    type="button"
    class="d-flex align-items-center"
    @click="$emit('click')"
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 0C5.3838 0 0 5.3838 0 12C0 18.6162 5.3838 24 12 24C18.6162 24 24 18.6162 24 12C24 5.3838 18.6162 0 12 0ZM16.2354 13.3686H10.7232L12.0084 14.8812C12.4974 15.4572 12.4272 16.3206 11.8506 16.8108C11.5932 17.0286 11.2788 17.1366 10.965 17.1366C10.5774 17.1366 10.1922 16.9734 9.9216 16.653L6.7212 12.8862C6.2874 12.3744 6.2874 11.6244 6.7212 11.1144L9.9216 7.347C10.41 6.7704 11.274 6.7002 11.8506 7.1886C12.4272 7.6776 12.4974 8.5422 12.0084 9.1188L10.7232 10.6314H16.2354C16.9914 10.6314 17.6034 11.244 17.6034 12C17.6034 12.756 16.9908 13.3686 16.2354 13.3686Z"
        fill="#7C8DB5"
      />
    </svg>

    <span class="pt-1">{{ text }}</span>
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "",
    },
  },
};
</script>
<style scoped>
button {
  color: #7c8db5;
  font-size: 1rem;
  font-weight: bold;
  justify-content: center;
  background: inherit;
  border: none;
}
span {
  margin-left: 10px;
}
</style>
