<template>
  <div class="container">
    <b-tabs content-class="mt-1" id="profile-tab" nav-class nav-wrapper-class>
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
    manageAccount
  }
};
</script>

<style>
#profile-tab__BV_tab_controls_ > .nav-item > .nav-link {
  font-family: "Poppins", sans-serif;
  font-size: 1.125rem;
  font-weight: 500;
  color: #7c8db5;
  padding: 1rem 1.75rem;
}

#profile-tab__BV_tab_controls_ > .nav-item > .active {
  font-weight: 600;
  color: #17ce89;
}

#profile-tab__BV_tab_controls_ {
  padding: 0px 5px;
}
</style>
