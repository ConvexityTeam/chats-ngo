<template>
  <div>
    <!-- Tabs Here -->
    <div>
      <b-tabs content-class="mt-3">
        <!-- Profile tab here -->
        <b-tab title="Profile" active>
          <profileSettings />
        </b-tab>

        <!-- Notifictions here -->
        <b-tab title="Notifications"> </b-tab>

        <!--Preferences Tab here -->
        <b-tab title="Preferences"> </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import profileSettings from "~/components/forms/profile-settings";
export default {
  layout: "dashboard",

  components: {
    profileSettings,
  },
};
</script>