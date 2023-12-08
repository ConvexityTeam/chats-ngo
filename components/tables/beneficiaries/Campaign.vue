<template>
  <div>
    <!-- Table here -->
    <div class="table-holder mt-4">
      <div class="flex align-items-center table-title">
        <h4>Projects</h4>
      </div>

      <div v-if="loading" class="px-4">
        <Skeleton
          :count="6"
          class="mb-5"
          styles="height: 52px; margin-bottom: 10px"
        />
      </div>

      <template v-else-if="campaigns.length">
        <table class="table table-borderless">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Total</th>
              <th scope="col">Created</th>
              <th scope="col">Status</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(campaign, i) in campaigns"
              :key="i"
              class="pointer"
              :class="{ selected: i % 2 == 0 }"
              @click="$router.push(`/projects/${campaign.id}`)"
            >
              <td class="campaign-title">{{ campaign.title }}</td>
              <td>{{ campaign.budget | formatCurrency }}</td>
              <td>{{ campaign.createdAt | shortDate }}</td>

              <td class="status-td">
                <div class="status" :class="campaignStatus(campaign.status)">
                  {{ campaign.status | capitalize }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <pagination
          :currentPageNum="beneficiaryCampaignPageNum"
          :totalNumOfItems="beneficiaryCampaignTotalItems"
          @updatePage="(event) => $emit('updatePage', event)"
        />
      </template>

      <h3 v-else class="text-center no-record">NO RECORD FOUND</h3>
    </div>
  </div>
</template>

<script>
import { campaignStatus } from "~/utils/helpers";

export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },

    campaigns: {
      type: Array,
      default: () => [],
    },

    beneficiaryCampaignPageNum: {
      type: Number,
      default: 1,
    },
    beneficiaryCampaignTotalItems: {
      type: Number,
      default: 0,
    },
  },

  data: () => ({
    campaignStatus,
  }),
};
</script>

<style scoped>
.campaign-title {
  max-width: 15rem;
}

select {
  border-left: 0px;
  padding-left: 40px;
  box-shadow: none;
}

.create {
  background: var(--primary-color);
}

.status-td {
  width: 10%;
}
</style>
