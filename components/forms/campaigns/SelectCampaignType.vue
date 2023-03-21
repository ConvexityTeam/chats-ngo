<template>
  <div class="mt-4 mb-12 p-4">
    <div
      class="d-flex justify-content-center align-items-center"
      style="gap: 1rem"
    >
      <div
        v-for="campaignType in campaignTypes"
        :key="campaignType.id"
        class="d-flex flex-column justify-content-center align-items-center card text-center p-3 type-holder"
        :style="
          activeCampaignId == campaignType.id
            ? ` border: 2px solid #17CE89;`
            : ``
        "
        @click="selectCampaignType(campaignType.id)"
      >
        <span class="d-block mb-4 avatar">
          <img :src="campaignType.avatar" :alt="campaignType.title" />
        </span>

        <h4 class="pb-1 mt-1 title">
          {{ campaignType.title }}
        </h4>

        <p class="description">
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
  name: "SelectCampaignType",
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

<style scoped>
.type-holder {
  cursor: pointer;
  border-radius: 10px;
  flex: 1 1 0%;
}

.avatar {
  height: 4rem;
  width: 4rem;
}

.title {
  color: #25396f;
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.125rem;
}

.description {
  color: #7c8db5;
  font-weight: 500;
  width: 80%;
}
</style>
