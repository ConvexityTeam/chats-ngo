<template>
  <div class="main" v-if="isVerified">
    <div class="text-center">
      <!-- Logo here -->
      <div class="logo-div pt-5">
        <img src="~/assets/img/logo.svg" class="img-fluid" alt="Chats" />
      </div>
      <h3 class="text-white welcome pt-4">
        <span>Email address verified</span>
      </h3>
    </div>

    <div class="d-flex justify-content-center align-items-center pt-4">
      <div class="card__holder">
        <section class="d-flex justify-content-center">
          <img src="~/assets/img/svg/email-verified.svg" alt="email-verified" />
        </section>

        <!-- Text here -->
        <section class="mt-4">
          <p class="primary-black font-medium sans text-center">
            Email verified successfully
          </p>
          <p class="text-center text-sm input-text poppins p-2">
            Your email has been verified successfully, you’ll now be redirected
            to login shortly.
          </p>
        </section>
      </div>
    </div>
  </div>

  <div v-else>
    <FullScreenLoader :loading="loading" />
  </div>
</template>

<script>
export default {
  name: "verifyEmail",

  data: () => ({
    isVerified: false,
    loading: false,
  }),

  mounted() {
    const { confirmationCode } = this.$route.query;
    this.handleVerification(confirmationCode);
  },

  methods: {
    async handleVerification(confirmationCode) {
      try {
        this.loading = true;
        await this.$axios.$post(`/auth/verify-email/${confirmationCode}`);

        this.isVerified = true;
        setTimeout(() => {
          // nu ==> new user
          this.$router.push({ path: "/", query: { nu: true } });
        }, 2000);
      } catch (err) {
        this.$toast.error(err.response?.data?.message);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.welcome {
  font-size: 2.25rem;
  font-weight: 500;
}
.main {
  background-image: url("~/assets/img/DSC_1227-min 2 jpeg-min.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100vh;
  overflow: auto;
}

.card__holder {
  background: #ffffff;
  border-radius: 10px;
  padding: 2rem 1.75rem 0.75rem 1.75rem;
  width: 28.125rem;
}
</style>
