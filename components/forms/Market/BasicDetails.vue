<template>
  <div>
    <div class="mb-4">
      <label for="product">Project</label>
      <div id="product" class="w-100">
        <el-select
          id="product"
          v-model="setCampaign"
          filterable
          :loading="$fetchState.pending"
          loading-text="Loading..."
          placeholder="—Select — "
          @change="$emit('campaignSelected', setCampaign)"
        >
          <el-option
            v-for="camapign in campaigns"
            :key="camapign.id"
            :label="camapign.title | capitalize"
            :value="camapign.id"
          >
          </el-option>
        </el-select>
      </div>
    </div>

    <!-- divider -->
    <template v-if="setCampaign">
      <div class="divider mb-4">
        <span class="divider-line"></span>
        <span class="divider-text"> project details </span>
        <span class="divider-line"></span>
      </div>

      <!-- campaign details -->
      <div class="campaign_detals">
        <div class="details_row_desscription">
          <span class="title">Description</span>
          <p class="description">
            {{ activeCampaign?.description }}
          </p>
        </div>

        <div class="details_row">
          <span class="key">Country:</span>
          <span class="value">{{ activeCampaign?.location?.country }}</span>
        </div>

        <div class="details_row">
          <span class="key">State(s):</span>
          <span class="value"
            >{{ formatStates(activeCampaign?.location?.state) }}
          </span>
        </div>

        <div class="details_row">
          <span class="key">Start date:</span>
          <span class="value">{{
            activeCampaign?.start_date | shortDate
          }}</span>
        </div>

        <div class="details_row">
          <span class="key">End date:</span>
          <span class="value">{{ activeCampaign?.end_date | shortDate }}</span>
        </div>

        <div class="details_row">
          <span class="key">Budget:</span>
          <span class="value">{{
            activeCampaign?.budget | formatCurrency
          }}</span>
        </div>
      </div>

      <div class="btn_container">
        <Button
          text="Continue"
          custom-styles="height:52px; border-radius: 8px; padding: 16px 44px !important"
          fontSize="1rem"
          :has-border="false"
          :has-icon="false"
          :disabled="!setCampaign"
          @click="$emit('changeStep', 2)"
        />
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { formatStates } from "~/utils/helpers";

export default {
  name: "SelectProject",

  data: () => ({
    formatStates,
    campaigns: [],
    setCampaign: "",
  }),

  async fetch() {
    const id = this.user?.AssociatedOrganisations[0]?.OrganisationId;
    const { data } = await this.$axios.get(
      `/organisations/${id}/campaigns/all?type=campaign&page=${1}&size=10`
    );

    this.campaigns = data;
  },

  computed: {
    ...mapGetters("authentication", ["user"]),

    activeCampaign() {
      return this.campaigns.find(
        (campaign) => parseInt(campaign.id) === parseInt(this.setCampaign)
      );
    },
  },
};
</script>

<style scoped>
.divider {
  display: flex;
  align-items: center;
}
.divider .divider-line {
  height: 0.5px;
  width: 100%;
  flex: 1 1 0%;
  background: #f5f6f8;
}
.divider .divider-text {
  text-transform: uppercase;
  padding: 8px 12px;
  border-radius: 100px;
  background: #eefcf6;
  color: #35c78a;
  margin: auto 6px;
  font-size: 12px;
  font-weight: 700;
}

.campaign_detals {
  width: 100%;
  display: flex;
  padding: 1.5rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  align-self: stretch;
  border-radius: 8px;
  border: 1px dashed var(--secondary-text, #7c8db5);
  background: var(--bg-color, #fafafa);
  margin-bottom: 32px;
}
.details_row_desscription .title {
  color: #25396f;
  font-weight: 500;
  font-size: 14px;
  text-transform: capitalize;
}
.details_row_desscription .description {
  color: #25396f;
  font-size: 14px;
  letter-spacing: 0.14px;
}
.details_row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  column-gap: 1rem;
  padding-bottom: 0.5rem;
}
.details_row .key,
.details_row .value {
  color: #25396f;
  font-size: 14px;
}
.details_row .value {
  font-weight: 700;
  text-align: end;
}

.btn_container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 20px;
  width: 100%;
}

label {
  font-size: 1rem;
  color: var(--primary-blue);
  font-weight: 500;
  letter-spacing: 0.01em;
  margin-bottom: 0.25rem;
}
</style>
