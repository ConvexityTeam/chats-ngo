export default {
  state: () => ({
    modalisOpen: false,
  }),

  mutations: {
    MODAL_IS_OPEN_MUTATION(state, payload) {
      state.modalisOpen = payload;
    },
  },

  actions: {
    modal_is_open_action({ commit }, payload) {
      commit("MODAL_IS_OPEN_MUTATION", payload);
    },
  },
};
