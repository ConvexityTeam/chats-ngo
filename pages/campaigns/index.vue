<template>
  <div>
    <campaignTable />
  </div>
</template>
<script>
import campaignTable from '~/components/tables/campaigns'
export default {
  layout: 'dashboard',
  components: {
    campaignTable,
  },
}
</script>
