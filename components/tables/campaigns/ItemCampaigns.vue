<template>
  <div>
    <!-- Table here -->
    <section class="table-holder mt-5">
      <div class="flex align-items-center table-title">
        <h4>Projects</h4>
        <div class="ml-auto"></div>
      </div>

      <div v-if="loading" class="px-4">
        <Skeleton
          :count="6"
          class="mb-5"
          styles="height: 52px; margin-bottom: 10px"
        />
      </div>

      <template v-else-if="resultQuery.length">
        <table class="table table-borderless">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col" class="text-right">Total items</th>
              <th scope="col" class="text-right">Items spent</th>
              <th scope="col">Date created</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(campaign, i) in resultQuery"
              :key="i"
              style="cursor: pointer"
              :class="{ selected: i % 2 == 0 }"
            >
              <td class="campaign-title notranslate">{{ campaign.title }}</td>
              <td class="text-right">{{ campaign.minting_limit }}</td>
              <td class="text-right">{{ campaign.amount_disbursed }}</td>
              <td>{{ campaign.createdAt | shortDate }}</td>

              <td>
                <div
                  class="status px-2"
                  :class="campaignStatus(campaign.status)"
                >
                  {{ campaign.status | capitalize }}
                </div>
              </td>

              <td>
                <div>
                  <Button
                    :hasBorder="true"
                    :hasIcon="false"
                    text="Activate"
                    custom-styles=" border-radius: 5px !important;
                  height:33px; border: 1px solid #17ce89 !important; font-size:
                  0.875rem !important; padding:0px 15px !important"
                    :disabled="statuses.includes(campaign.status)"
                    @click="$emit('activateCampaign', campaign)"
                  />
                </div>
              </td>

              <td>
                <div>
                  <Button
                    :hasBorder="true"
                    :hasEye="true"
                    text="View"
                    custom-styles=" border: none !important; font-size: 0.875rem !important"
                    @click="$router.push(`/projects/${campaign.id}`)"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div>
          <pagination
            :currentPageNum="itemCampaignPageNum"
            :totalNumOfItems="itemCampaignTotalItems"
            @updatePage="(event) => $emit('updatePage', event)"
          />
        </div>
      </template>

      <h3 v-else class="text-center no-record">NO RECORD FOUND</h3>
    </section>
  </div>
</template>

<script>
import { statuses, campaignStatus } from "@/utils/helpers";
export default {
  props: {
    resultQuery: {
      type: Array,
      default: () => [],
    },

    loading: {
      type: Boolean,
      default: false,
    },

    id: {
      type: [String, Number],
      default: "",
    },

    itemCampaignPageNum: {
      type: Number,
      default: 1,
    },

    itemCampaignTotalItems: {
      type: Number,
      default: 0,
    },
  },

  data: () => ({
    statuses,
    campaignStatus,
  }),
};
</script>
