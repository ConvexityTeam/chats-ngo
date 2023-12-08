<template>
  <SkeletonSingleCard v-if="$fetchState.pending" min-height="200px" />
  <div v-else class="campaign-details-holder p-4">
    <h4 class="campaign-details-header poppins pt-2">
      Project Vendors ({{ vendors.length || 0 }})
    </h4>

    <!-- details region here -->
    <div class="campaign-details-inner mt-4 p-4">
      <div v-if="$fetchState.pending" class="loader"></div>

      <!-- Vendors -->
      <div v-else-if="vendors.length">
        <p
          v-for="vendor in vendors.slice(0, 5)"
          :key="vendor.id"
          class="primary-gray"
        >
          {{
            vendor && vendor.Vendor
              ? vendor.Vendor.first_name + " " + vendor.Vendor.last_name
              : ""
          }}
        </p>

        <!-- See all here -->
        <div>
          <button
            type="button"
            class="d-flex viewall align-items-center p-0"
            @click="$router.push(`/projects/${$route.params.id}/vendors`)"
          >
            <img src="~/assets/img/vectors/eye.svg" alt="see" />
            <span class="ml-2 pt-1">See All </span>
          </button>
        </div>
      </div>

      <div v-else>
        <h3 class="text-center no-record">NO RECORD FOUND</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {},
    },
    remount: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    vendors: [],
  }),

  async fetch() {
    const id = this.user?.AssociatedOrganisations[0]?.OrganisationId;
    const response = await this.$axios.get(
      `/organisations/${id}/campaigns/${this.$route.params.id}/vendors`
    );

    console.log("CAMPAIGN VENDORS", response);

    this.vendors = response.data;
  },

  watch: {
    remount(value) {
      if (value) {
        this.$fetch();
      }
    },
  },
};
</script>

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

.campaign-captions {
  color: #25396f;
  font-family: "Poppins", sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
}

.campaign-answers {
  color: #25396f;
  font-size: 0.875rem;
}

.campaign-divider {
  border-bottom: 1px solid #f5f6f8;
}
</style>
