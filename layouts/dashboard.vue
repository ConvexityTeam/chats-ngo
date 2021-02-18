<template>
  <div>
    <!-- Top Nav here -->
    <topNav />

    <div>
      <div class="d-flex no-gutters h-100">
        <div class="ml-4">
          <sideMenu />
        </div>
        <div style="flex-grow: 1;">
          <nuxt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import topNav from '~/components/partials/navbar'
import sideMenu from '~/components/partials/sidemenu'
export default {
  middleware: 'authenticated',
  components: {
    topNav,
    sideMenu,
  },
}
</script>
