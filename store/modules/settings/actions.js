export default {
  modal_is_open_action: ({ commit }, payload) => {
    commit("MODAL_IS_OPEN_MUTATION", payload);
    console.log("modal_is_open_action");
  },
};
