export default ($axios) => ({
  async loginDonor(payload) {
    return await $axios.$post("/auth/donor-login/", payload);
  },
});
