export default {
  namespaced: true,
  state: () => ({
    user: {},
  }),

  getters: {
    user: (state) => state.user,
  },

  mutations: {
    setUserObject(state, payload) {
      state.user = payload;
    },

    setUserUpdate(state, payload) {
      state.user.AssociatedOrganisations[0].Organisation = payload;
    },
  },

  actions: {
    commitToken({ _commit }, payload) {
      sessionStorage.setItem("userToken", payload);
    },

    commitUser({ commit }, payload) {
      commit("setUserObject", payload);
    },

    commitUserUpdate({ commit }, payload) {
      commit("setUserUpdate", payload);
    },

    logout() {
      sessionStorage.removeItem("userToken");
      localStorage.getItem("userEmail");
    },
  },
};
