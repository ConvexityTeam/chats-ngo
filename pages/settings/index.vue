<template>
  <div class="container">
    <b-tabs content-class="mt-1" nav-class nav-wrapper-class>
      <!-- Profile tab here -->
      <b-tab title="Profile" active class="nav-links">
        <profileSettings />
      </b-tab>
      <!-- security tab here -->
      <b-tab title="Security">
        <securitySettings />
      </b-tab>
      <!-- Manager Account here -->
      <b-tab title="Manage Account">
        <manageAccount />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import profileSettings from "~/components/forms/profile-settings";
import securitySettings from "~/components/forms/security-settings";
import manageAccount from "~/components/forms/manage-account";

export default {
  layout: "dashboard",

  components: {
    profileSettings,
    securitySettings,
    manageAccount,
  },
};
</script>
