<template>
  <div>
    <!-- Top Nav here -->
    <PartialsNavbar />

    <div>
      <div class="d-flex no-gutters h-100">
        <div class="ml-4">
          <PartialsSidemenu />
        </div>

        <div style="flex-grow: 1">
          <div v-if="!user.is_verified_all" class="container py-4">
            <GenericBanner isKyc>
              <div class="d-flex holder">
                <template v-if="!user.is_verified">
                  <span class="primary-blue font-medium">
                    To access all chats service, please complete your KYC
                    verification process
                  </span>

                  <span class="route" @click="$router.push('/settings')"
                    >Update Profile</span
                  >
                </template>

                <template v-else>
                  <span class="primary-blue font-medium">
                    Our compliance team is currently reviewing your request. You
                    will receive a notification email once your account has been
                    verified.
                  </span>
                </template>
              </div>
            </GenericBanner>
          </div>

          <nuxt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import IdleJs from "idle-js";
import appConfig from "~/appConfig";
let protectedLastRoute;

export default {
  name: "DashboardLayout",
  middleware: "authenticated",

  computed: {
    ...mapGetters("authentication", ["user"]),
  },

  watch: {
    $route(to, from) {
      protectedLastRoute = this.$route.fullPath;
    },
  },

  mounted() {
    this.handleIdleness();
  },

  methods: {
    handleIdleness() {
      if (appConfig.APP_ENVIRONMENT === "staging") return;

      const idle = new IdleJs({
        idle: 180000, // idle time in ms,
        events: ["mousemove", "keydown", "mousedown", "touchstart"], // events that will trigger the idle resetter

        onIdle: () => {
          localStorage.setItem("protectedLastRoute", protectedLastRoute);
          this.$store.dispatch("authentication/logout");
          this.$router.push("/");
        },

        keepTracking: true, // set it to false if you want to be notified only on the first idleness change
        startAtIdle: false, // set it to true if you want to start in the idle state
      });

      idle.start();
    },
  },
};
</script>

<style scoped>
.route {
  color: #f2994a;
  font-weight: 700;
  text-decoration: underline;
  font-size: 0.875rem;
  padding-top: 4px;
  cursor: pointer;
}

.holder {
  flex-direction: column;
}
</style>
