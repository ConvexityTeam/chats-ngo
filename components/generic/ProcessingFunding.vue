<template>
  <div>
    <p class="pt-2">
      Processing Transaction. You may want to
      <span class="resume-btn" @click="$emit('reload')"> Check Status </span>
    </p>
  </div>
</template>

<script>
export default {
  name: "PauseCampaign",
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
