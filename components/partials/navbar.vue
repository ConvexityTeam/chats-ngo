<template>
  <div>
    <el-drawer :visible.sync="drawer" :direction="direction">
      <span>Hi, there!</span>
    </el-drawer>
    <nav class="navbar  ">
      <div class="col-lg-2 col-sm-4 mx-1">
        <a class="navbar-brand" href="#">
          <img src="~/assets/img/logo-2.svg" alt="Chats" />
        </a>
      </div>

      <!-- Route location here -->
      <div class="col-lg-4 mx-4">
        <h5 class="title">{{ title | capitalize }}</h5>
      </div>

      <div
        class="col-sm-auto d-flex ml-auto justify-content-between align-items-center"
      >
        <span>
          <div class="d-flex align-items-center px-2">
            <el-badge
              :is-dot="isNotification"
              class="item mx-3"
              style="cursor:pointer"
            >
              <svg
                @click="drawer = true"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.65 20V19.65H20H20.65V19V18V17.7308L20.4596 17.5404L18.65 15.7308V11C18.65 7.87749 17.0532 5.12045 14.15 4.18696V4C14.15 2.81101 13.189 1.85 12 1.85C10.811 1.85 9.85 2.81101 9.85 4V4.18642C6.93788 5.11866 5.35 7.86819 5.35 11V15.7308L3.54038 17.5404L3.35 17.7308V18V19V19.65H4H9.35V20C9.35 20.7028 9.6292 21.3769 10.1262 21.8738C10.6231 22.3708 11.2972 22.65 12 22.65C13.459 22.65 14.65 21.459 14.65 20Z"
                  stroke="black"
                  stroke-width="1.3"
                /></svg
            ></el-badge>

            <div class="d-flex image-holder justify-content-center mx-auto">
              <img
                v-if="
                  user.AssociatedOrganisations[0].Organisation.logo_link != null
                "
                :src="
                  user.AssociatedOrganisations[0]
                    ? user.AssociatedOrganisations[0].Organisation.logo_link
                    : ''
                "
                width="50"
                height="50"
                class="p-1"
                style="object-fit: contain"
              />
            </div>
          </div>
        </span>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    title: "",
    isNotification: false,
    drawer: false,
    direction: "rtl"
  }),

  computed: {
    ...mapGetters("authentication", ["user"])
  },

  watch: {
    $route() {
      if (this.$router.history.current.name.includes("vendors")) {
        this.title = "Vendors";
      } else if (this.$router.history.current.name.includes("beneficiaries")) {
        this.title = "Beneficiaries";
      } else if (this.$router.history.current.name.includes("campaigns")) {
        this.title = "campaigns";
      } else if (
        this.$router.history.current.name.includes("cash") &&
        !this.$router.history.current.params.id
      ) {
        this.title = "Cash for work";
      } else if (
        this.$router.history.current.params.id &&
        this.$router.history.current.name.includes("cash")
      ) {
        this.title = "Cash for work - Tasks";
      } else {
        this.title = this.$router.history.current.name;
      }
    }
  },
  mounted() {
    if (this.$router.history.current.name.includes("vendors")) {
      this.title = "Vendors";
    } else if (this.$router.history.current.name.includes("beneficiaries")) {
      this.title = "Beneficiaries";
    } else if (this.$router.history.current.name.includes("campaigns")) {
      this.title = "campaigns";
    } else if (
      this.$router.history.current.name.includes("cash") &&
      !this.$router.history.current.params.id
    ) {
      this.title = "Cash for work";
    } else if (
      this.$router.history.current.params.id &&
      this.$router.history.current.name.includes("cash")
    ) {
      this.title = "Cash for work - Tasks";
    } else {
      this.title = this.$router.history.current.name;
    }
    console.log(
      "use::",
      this.user.AssociatedOrganisations[0].Organisation.logo_link
    );
  }
};
</script>

<style scoped>
.logo {
  height: 30px;
}
.navbar {
  padding: 1rem;
}
.title {
  font-size: 1.75rem;
  font-weight: bold;
  color: var(--tertiary-black);
}

.image-holder {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  background: #e7e7e7;
  border: none;
}

@media screen and (max-width: 991px) {
  .toggler {
    display: none;
  }
}
</style>
