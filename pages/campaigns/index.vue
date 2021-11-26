<template>
  <div>
    <campaignTable />
  </div>
</template>
<script>
import campaignTable from "~/components/tables/campaigns/all-campaigns.vue";
export default {
  layout: "dashboard",
  components: {
    campaignTable
  }
};
</script>
