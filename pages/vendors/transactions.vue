<template>
  <div class="main container transparent pb-5">
    <div class="pt-4 mt-2">
      <back text="Go Back" @click="$router.push('/vendors')" />
    </div>
    <TablesVendorsVendorTransaction />
  </div>
</template>

<script>
export default {
  layout: "dashboard",
  name: "VendorTransaction",
};
</script>

<style scoped>
.main {
  height: calc(100vh - 72px);
  overflow-y: scroll;
}
</style>
