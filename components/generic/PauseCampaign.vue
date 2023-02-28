<template>
  <div>
    <p class="pt-2">
      This campaign was paused on {{ date | formatDate }}. You may want to
      <br />
    </p>

    <span class="resume-btn" @click="$emit('resumeCampaign')">
      Resume Campaign
    </span>
  </div>
</template>

<script>
export default {
  name: "PauseCampaign",
  props: {
    date: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
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
