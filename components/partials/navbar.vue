<template>
  <div>
    <el-drawer :visible.sync="drawer" direction="rtl">
      <span>Hi, there!</span>
    </el-drawer>

    <nav class="navbar">
      <div class="mx-1 logo-holder">
        <span class="navbar-brand" href="">
          <img src="~/assets/img/logo-2.svg" alt="Chats" />
        </span>
      </div>

      <!-- Route location here -->
      <div class="d-flex w-25 ml-2">
        <h5 class="title">{{ title | capitalize }}</h5>
      </div>

      <div
        class="col-sm-auto d-flex ml-auto justify-content-between align-items-center"
      >
        <!-- Notification -->
        <span>
          <div class="d-flex align-items-center px-2">
            <!-- <el-badge
              :is-dot="isNotification"
              class="item mx-3"
              style="cursor: pointer"
            >
              <svg
                @click="drawer = false"
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
                />
              </svg>
            </el-badge> -->

            <!-- profile picture -->
            <div class="d-flex image-holder justify-content-center mx-auto">
              <b-avatar
                :src="logo"
                size="35px"
                class="img-fluid p-1"
                variant="light"
              ></b-avatar>
            </div>

            <!-- Language Switch -->
            <div class="ml-3">
              <GoogleTranslate />
            </div>
          </div>
        </span>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import GoogleTranslate from "../GoogleTranslate.vue";

export default {
  components: { GoogleTranslate },
  data: () => ({
    title: "",
    isNotification: false,
    drawer: false,
  }),

  computed: {
    ...mapGetters("authentication", ["user"]),
    logo() {
      return (
        this.user?.AssociatedOrganisations[0]?.Organisation?.logo_link ?? ""
      );
    },
  },

  watch: {
    $route() {
      this.updateTitle();
    },
  },

  mounted() {
    this.updateTitle();
  },

  methods: {
    updateTitle() {
      const routeName = this.$route.name;
      const params = this.$route.params;

      if (routeName.includes("vendors")) {
        this.title = "Vendors";
      } else if (routeName.includes("beneficiaries")) {
        this.title = "Beneficiaries";
      } else if (routeName.includes("projects")) {
        this.title = "Projects";
      } else if (routeName.includes("cash")) {
        if (params.id) {
          this.title = "Cash for work - Tasks";
        } else {
          this.title = "Cash for work";
        }
      } else if (routeName.includes("market")) {
        this.title = "Marketplace";
      } else {
        this.title = routeName;
      }
    },
  },
};
</script>

<style scoped>
.logo {
  height: 30px;
}

.logo-holder {
  width: 20%;
}
.navbar {
  padding: 1rem;
}
.title {
  font-size: 1.75rem;
  font-weight: bold;
  color: var(--primary-blue);
}

.image-holder {
  border-radius: 50%;
  width: 35px;
  height: 35px;
  background: #e7e7e7;
  border: none;
}

.badge-light {
  background: #e7e7e7 !important;
}

@media screen and (max-width: 991px) {
  .toggler {
    display: none;
  }
}
</style>
