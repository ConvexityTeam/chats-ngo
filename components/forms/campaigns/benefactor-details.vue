<template>
  <div class="py-3 px-2">
    <section class="benefactor__detail-container d-flex align-items-center">
      <div
        class="benefactor__detail-img"
        :class="{ borderless: !benefactor.User?.profile_pic }"
      >
        <img
          v-if="!benefactor.User?.profile_pic || benefactor.User?.members"
          src="~/assets/img/svg/default-user.svg"
          :alt="benefactor.User?.first_name"
          class="p-3"
        />

        <img
          v-else
          :src="benefactor.User?.profile_pic"
          :alt="benefactor.User?.first_name"
        />
      </div>

      <div class="benefactor__detail-body ml-4">
        <!-- Name Here -->
        <div class="primary-blue mb-2">
          <span>Name:</span>
          <span v-if="benefactor.User?.members">
            {{ benefactor.User?.members?.group_name }}
          </span>
          <span class="font-medium" v-else
            >{{ benefactor.User?.first_name }} {{ benefactor.User?.last_name }}
          </span>
        </div>

        <!-- Phone Here -->
        <div class="primary-blue mb-2">
          <span> Phone: </span>
          <span class="font-medium">
            {{ benefactor.User?.phone }}
          </span>
        </div>

        <!-- Extra details for SubWallet User -->
        <template v-if="benefactor.User?.members">
          <!-- Category -->
          <div class="primary-blue mb-2">
            <span> Category: </span>
            <span class="font-medium">
              {{ benefactor.User?.members.group_category }}
            </span>
          </div>

          <!-- Members -->
          <div class="primary-blue mb-2">
            <span> Members: </span>
            <span class="font-medium">
              {{ benefactor.User?.members?.group_members.length }}
            </span>
          </div>
        </template>

        <!-- Origination Here -->
        <div class="primary-blue mb-2">
          <span> Origination: </span>
          <span class="font-medium">
            {{ benefactor?.source ?? "-" }}
          </span>
        </div>
      </div>
    </section>

    <!-- View More Button -->
    <div class="mt-5 d-flex justify-content-end mx-3">
      <span
        class="pointer"
        @click="$router.push(`/beneficiaries/${benefactor.UserId}`)"
      >
        <span class="primary font-medium mr-2 underline">View More</span>
        <Arrow title="right" />
      </span>
    </div>
  </div>
</template>

<script>
import Arrow from "~/components/icons/arrow";

export default {
  name: "benefactor-details-prompt",
  components: { Arrow },

  props: {
    benefactor: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style scoped>
.benefactor__detail-container {
  margin-top: 0.75rem;
}
.benefactor__detail-body > .text {
  color: #7c8db5;
  margin: 0 auto;
}
.benefactor__detail-body > .text {
  color: #7c8db5;
  margin: 0 auto;
}

.benefactor__detail-img {
  align-items: center;
  justify-content: center;
  display: flex;
  border: 1.64356px solid #17ce89;
  border-radius: 24px;
  background: #f5f6f8;
  height: 96px;
  width: 96px;
}
.benefactor__detail-img > img {
  padding: 1px;
  border-radius: 24px;
  width: inherit;
  height: inherit;
  object-fit: cover;
}

.benefactor__detail-img.borderless {
  border: none !important;
}
</style>
