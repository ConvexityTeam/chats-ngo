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
        :class="activeType == campaignType.id ? `card-box` : ``"
        @click="selectCampaignType(campaignType.id)"
        @mouseover="activeType = campaignType.id"
        @mouseleave="activeType = ''"
      >
        <span class="d-block mb-4 avatar">
          <span v-if="campaignType.id == 'cash'">
            <MoneyBagVue
              :state="activeType == campaignType.id ? 'active' : 'inactive'"
            />
          </span>
          <span v-if="campaignType.id == 'items'">
            <CubesVue
              :state="activeType == campaignType.id ? 'active' : 'inactive'"
            />
          </span>
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
import MoneyBagVue from "~/components/icons/campaigns/MoneyBag.vue";
import CubesVue from "~/components/icons/campaigns/Cubes.vue";

export default {
  name: "SelectCampaignType",
  components: { MoneyBagVue, CubesVue },
  data() {
    return {
      activeCampaignId: "",
      campaignTypes: [
        {
          title: "Cash project",
          description: "Create a project for monetary item, e.g Cash",
          id: "cash",
        },
        {
          title: "Items project",
          description: "Create a project for non-monetary item, e.g Vaccine",
          id: "items",
        },
      ],
      activeType: "",
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
.card-box {
  border: 1px solid #17ce89;
}
</style>
