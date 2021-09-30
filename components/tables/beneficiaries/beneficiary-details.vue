<template>
  <div class="campaign-details-holder p-4">
    <h4 class="campaign-details-header  poppins pt-2">Personal Details</h4>

    <!-- details region here -->
    <div class="campaign-details-inner  mt-4 p-4">
      <div
        class=" d-flex justify-content-center mx-auto align-items-center logo-holder "
      >
        <img
          :src="
            userDetails.profile_pic == null || !userDetails.profile_pic
              ? img
              : userDetails.profile_pic
          "
          width="100"
          height="100"
          alt=""
          class="rounded-circle "
        />
      </div>

      <div class="text-center my-4">
        <h4 class="name">
          {{ userDetails.first_name + " " + userDetails.last_name }}
        </h4>
        <h4 class="id p">ID: {{ userDetails.id }}</h4>
      </div>

      <!-- Details -->
      <div class="mt-4">
        <div class="d-flex campaign-divider mb-3">
          <p class="campaign-captions">Phone number:</p>

          <div class="ml-auto">
            <p class="campaign-answers">{{ userDetails.phone }}</p>
          </div>
        </div>

        <div class="d-flex campaign-divider mb-3">
          <p class="campaign-captions">Email address:</p>

          <div class="ml-auto">
            <p class="campaign-answers">{{ userDetails.email }}</p>
          </div>
        </div>

        <div class="d-flex campaign-divider mb-3">
          <p class="campaign-captions">Created:</p>

          <div class="ml-auto">
            <p class="campaign-answers">
              {{ userDetails.createdAt | formatDateOnly }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userDetails: {
      type: Object,
      default: () => {}
    }
  },

  data: () => ({
    img: require("~/assets/img/lady.svg")
  })
};
</script>

<style scoped>
.name {
  color: #25396f;
  font-size: 1.125rem;
  font-weight: bold;
}
.id {
  color: #7c8db5;
  font-size: 1rem;
}
.logo-holder {
  background: #eef0f4;
  border-radius: 50%;
  width: 96px;
  height: 96px;
}
.logo-holder img {
  object-fit: contain;
}
</style>

<style>
.campaign-details-holder {
  background: #ffffff;
  box-shadow: 0px 4px 25px rgba(174, 174, 192, 0.15);
  border-radius: 10px;
}
.campaign-details-header {
  color: #25396f;
  font-weight: bold;
  font-size: 1.125rem;
}
.campaign-details-inner {
  border: 1px solid #17ce89;
  border-radius: 10px;
}
.campaign-beneficiary-count {
  color: #7c8db5;
  font-size: 1rem;
  font-weight: 500;
}

.campaign-captions {
  color: #25396f;
  font-family: "Poppins", sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
}

.campaign-answers {
  color: #25396f;
  font-size: 0.875rem;
  max-width: 7rem;
  word-break: break-all;
  width: 7rem;
}

.campaign-divider {
  border-bottom: 1px solid #f5f6f8;
}
</style>
