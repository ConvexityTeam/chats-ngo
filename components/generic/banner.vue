<template>
  <div class="banner-holder d-flex px-4 ">
    <div class="d-flex align-items-center">
      <div>
        <img src="~/assets/img/vectors/info-button.svg" alt="icon" />
      </div>

      <div class="ml-3">
        <p class="pt-2">
          This campaign was paused on {{ date | formatDate }}. You may want to
          <br />
        </p>

        <span class="resume-btn" @click="$emit('resumeCampaign')">
          Resume Campaign
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    date: {
      type: String
    }
  }
};
</script>

<style scoped>
.banner-holder {
  background: #ddeafc;
  box-sizing: border-box;
  border-radius: 10px;
  align-items: center;
  height: 72px;
  width: 63%;
}

p {
  color: #25396f;
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 0;
}

.resume-btn {
  color: #2f80ed;
  border: none;
  font-weight: bold;
  background: inherit;
}

span {
  cursor: pointer;
}
</style>
