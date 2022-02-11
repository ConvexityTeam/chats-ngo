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

export default {
  middleware: "authenticated",
  components: {
    topNav,
    sideMenu
  },

  mounted() {
    const timeout = {
      dev: 600000, // 10 minutes
      staging: 300000, // 5 minutes
      prd: 180000 // 3 minutes
    };

    console.log("check::", window.location.host);
    const host = window.location.host;

    var idle = new IdleJs({
      idle:
        process.env.NODE_ENV === "development"
          ? timeout.dev
          : host.includes("chats.vercel.app")
          ? timeout.staging
          : timeout.prd, // idle time in ms
      events: ["mousemove", "keydown", "mousedown", "touchstart"], // events that will trigger the idle resetter

      onIdle: () => {
        this.$store.dispatch("authentication/logout");
        this.$router.push("/");
      },

      keepTracking: true, // set it to false if you want to be notified only on the first idleness change
      startAtIdle: false // set it to true if you want to start in the idle state
    });

    idle.start();
  }
};
</script>
