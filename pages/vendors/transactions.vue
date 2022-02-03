<template>
  <div class="main container transparent pb-5">
    <div class="pt-4 mt-2">
      <back text="Go Back" @click="$router.push('/vendors')" />
    </div>

    <vendor-transaction />
  </div>
</template>

<script>
import vendorTransaction from "~/components/tables/vendors/vendor-transaction.vue";

export default {
  layout: "dashboard",

  components: {
    vendorTransaction
  }
};
</script>

<style scoped>
.main {
  height: calc(100vh - 72px);
  overflow-y: scroll;
}
</style>
