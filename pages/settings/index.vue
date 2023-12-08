<template>
  <div class="main container transparent">
    <b-tabs id="profile-tab" content-class="mt-1" nav-class nav-wrapper-class>
      <!-- Profile tab here -->
      <b-tab title="Profile" active class="nav-links">
        <FormsSettingsProfileSettings class="mt-3 mb-5" />
      </b-tab>

      <!-- security tab here -->
      <b-tab title="Security">
        <FormsSettingsSecuritySettings class="mt-3 mb-5" />
      </b-tab>

      <!-- Manager Account here -->
      <b-tab title="Manage Account">
        <FormsSettingsManageAccount class="mt-3 mb-5" />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
export default {
  name: "Settings",
  layout: "dashboard",
  transition: "fade-up",
};
</script>

<style>
#profile-tab__BV_tab_controls_ > .nav-item > .nav-link {
  font-size: 1.125rem;
  font-weight: 500;
  color: #7c8db5;
  padding: 0.5rem 1.75rem;
}

#profile-tab__BV_tab_controls_ > .nav-item > .active {
  font-weight: 700;
  color: #17ce89;
}

#profile-tab__BV_tab_controls_ {
  padding: 0px 5px;
}

.main {
  height: calc(100vh - 72px);
  overflow-y: scroll;
}
</style>
