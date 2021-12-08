export default {
  state: () => ({
    tempBenefactor: null,
    tempVendor: null,
    allBeneficiaries: []
  }),

  getters: {
    BENEFACTOR: state => state.tempBenefactor,
    beneficiaries: state => state.allBeneficiaries
  },

  mutations: {
    SAVE_TEMP_BENEFACTOR_MUTATION(state, payload) {
      state.tempBenefactor = payload;
    },

    SAVE_ALL_BENEFICIARIES(state, payload) {
      state.allBeneficiaries = payload;
    }
  },

  actions: {
    SAVE_TEMP_BENEFACTOR({ commit }, payload) {
      commit("SAVE_TEMP_BENEFACTOR_MUTATION", payload);
    },
    async getallBeneficiaries({ commit }, id) {
      try {
        const response = await this.$axios.get(
          `/organisation/${id}/beneficiaries`
        );
        console.log("ALL BENEFICIARIES", response);

        if (response.status == "success") {
          commit("SAVE_ALL_BENEFICIARIES", response.data);
        }
      } catch (_err) {}
    }
  }
};
