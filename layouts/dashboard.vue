<template>
  <div>
    <!-- Top Nav here -->
    <topNav />

    <div>
      <div class="d-flex no-gutters h-100">
        <div class="ml-4">
          <sideMenu />
        </div>
        <div style="flex-grow: 1">
          <div class="container">
            <GenericBanner isKyc>
              <div class="d-flex holder">
                <span class="primary-blue font-medium">
                  To access all Chats service, please complete your KYC
                  verification process
                </span>

                <span class="route" @click="$router.push('/settings')"
                  >Update Profile</span
                >
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
import topNav from "~/components/partials/navbar";
import sideMenu from "~/components/partials/sidemenu";
import IdleJs from "idle-js";
let protectedLastRoute;

export default {
  middleware: "authenticated",
  components: {
    topNav,
    sideMenu,
  },

  watch: {
    $route(to, from) {
      protectedLastRoute = this.$route.fullPath;
    },
  },

  mounted() {
    const timeout = {
      dev: 600000, // 10 minutes
      // dev: 10000, // 30 seconds
      staging: 300000, // 5 minutes
      prd: 180000, // 3 minutes
    };
    const host = window.location.host;

    let idle = new IdleJs({
      idle:
        process.env.NODE_ENV === "development"
          ? timeout.dev
          : host.includes("https://staging.chats.cash/")
          ? timeout.staging
          : timeout.prd, // idle time in ms
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
