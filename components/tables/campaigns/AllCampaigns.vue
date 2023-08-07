<template>
  <div>
    <!-- Table here -->
    <section class="table-holder mt-5">
      <template v-if="resultQuery.length">
        <div class="flex align-items-center table-title">
          <h4>Projects</h4>
          <div class="ml-auto"></div>
        </div>

        <table class="table table-borderless">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Total amount</th>
              <th scope="col">Amount spent</th>
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
              class="pointer"
              :class="{ selected: i % 2 == 0 }"
            >
              <td class="campaign-title">{{ campaign.title }}</td>
              <td>{{ campaign.budget | formatCurrency }}</td>
              <td>
                {{ campaign.amount_disbursed | formatCurrency }}
              </td>
              <td>{{ campaign.createdAt | shortDate }}</td>
              <td>
                <div
                  class="status px-1"
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
                    custom-styles="border-radius: 5px !important;
                  height:33px; border: 1px solid #17ce89 !important; font-size:
                  0.875rem !important; padding:0px 15px !important"
                    @click="$emit('activateCampaign', campaign)"
                    :disabled="statuses.includes(campaign.status)"
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
            :currentPageNum="campaignPageNum"
            :totalNumOfItems="campaignTotalItems"
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

    campaignPageNum: {
      type: Number,
      default: 1,
    },

    campaignTotalItems: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      statuses,
      campaignStatus,
      amount: 0,
      SelectedCampaign: {},
      selected: null,
      searchQuery: "",
      options: [
        { value: null, text: "Filter" },
        { value: "all", text: "All" },
        { value: "inprogress", text: "In Progress" },
        { value: "completed", text: "Completed" },
      ],
    };
  },
};
</script>
