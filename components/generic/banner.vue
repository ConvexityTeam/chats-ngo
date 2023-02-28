<template>
  <div class="banner-holder d-flex px-4">
    <div class="d-flex align-items-center">
      <div>
        <img src="~/assets/img/vectors/info-button.svg" alt="icon" />
      </div>

      <div class="ml-3">
        <slot> </slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.banner-holder {
  background: #ddeafc;
  box-sizing: border-box;
  border-radius: 10px;
  align-items: center;
  height: 72px;
  width: 63%;
}
</style>
