<template>
  <div class="mt-4 mb-12 p-4">
    <div
      class="d-flex justify-content-center align-items-center"
      style="gap: 1rem;"
    >
      <div
        v-for="campaignType in campaignTypes"
        :key="campaignType.id"
        class="d-flex flex-column justify-content-center align-items-center card text-center rounded-md p-3"
        style="cursor: pointer; border-radius: 10px; flex: 1 1 0%;"
        :style="
          activeCampaignId == campaignType.id
            ? ` border: 2px solid #17CE89;`
            : ``
        "
        @click="selectCampaignType(campaignType.id)"
      >
        <span class="d-block mb-4" style="height: 4rem; width: 4rem;">
          <img :src="campaignType.avatar" :alt="campaignType.title" />
        </span>

        <h4
          style="
            color: #25396f;
            font-weight: 700;
            font-size: 1rem;
            line-height: 1.125rem;
          "
          class="pb-1 mt-1"
        >
          {{ campaignType.title }}
        </h4>

        <p style="color: #7c8db5; font-weight: 500; width: 80%;">
          {{ campaignType.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import cubes from "~/assets/img/svg/campaigns/cubes.svg";
import moneyBag from "~/assets/img/svg/campaigns/money-bag.svg";

export default {
  emits: ["selectCampaignType"],

  data() {
    return {
      activeCampaignId: "",
      campaignTypes: [
        {
          avatar: cubes,
          title: "Cash campaign",
          description: "Create a campaign for monetary item, e.g Cash",
          id: "cash",
        },
        {
          avatar: moneyBag,
          title: "Items campaign",
          description: "Create a campaign for non-monetary item, e.g Vaccine",
          id: "items",
        },
      ],
    };
  },
  methods: {
    selectCampaignType(campaign_type) {
      this.activeCampaignId = campaign_type;

      this.$emit("selectCampaignType", campaign_type);
    },
  },
};
</script>

<style scoped></style>
