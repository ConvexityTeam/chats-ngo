<template>
  <div class="progress-bar_">
    <div class="progress_"></div>
  </div>
</template>

<style lang="scss">
.progress-bar_ {
  position: fixed;
  z-index: 10000;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #17ce89;
  border-radius: 4px;

  .progress_ {
    height: 100%;
    background-color: #fff;
    border-radius: 4px;
    animation: progressAnimation 3s linear infinite;
  }

  @keyframes progressAnimation {
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
  }
}
</style>
