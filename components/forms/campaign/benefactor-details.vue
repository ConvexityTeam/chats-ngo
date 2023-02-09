<template>
  <section
    class="benefactor__detail-container d-flex gap-4 justify-content-center px-6 py-6 w-full p-3 mx-auto align-items-center"
  >
    <div class="benefactor__detail-img rounded-lg">
      <img
        :src="benefactor.User.profile_pic"
        alt="deposit"
        class="rounded-lg mx-auto"
      />
    </div>

    <div class="benefactor__detail-body">
      <div class="text d-flex mb-2">
        <span>Name: </span>
        <span class="font-weight-bold ml-2"
          >{{ benefactor.User.first_name }} {{ benefactor.User.last_name }}
        </span>
      </div>

      <div class="text d-flex mb-2">
        <span> Phone: </span>
        <span class="font-weight-bold ml-2">
          {{ benefactor.User.phone }}
        </span>
      </div>

      <div class="text d-flex mb-2">
        <span> Origination: </span>
        <span class="font-weight-bold ml-2">
          {{ benefactor.source ? benefactor.source : "nill" }}
        </span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "benefactor-details-prompt",
  props: {
    benefactor: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.benefactor__detail-container {
  padding: 2rem;
  width: 80%;
  margin: 2rem auto 1rem auto;
}
.benefactor__detail-body > .text {
  color: #7c8db5;
  margin: 0 auto;
}
.benefactor__detail-body {
  flex: 1 1 0%;
  padding-left: 1rem;
}
.benefactor__detail-body > .text {
  color: #7c8db5;
  margin: 0 auto;
}

.benefactor__detail-img {
  height: auto;
  width: auto;
}
.benefactor__detail-img > img {
  height: 120px;
  width: 120px;
}
</style>
