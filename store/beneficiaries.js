export default {
    state: () => ({
        tempBenefactor: null,
    }),

    getters: {
        BENEFACTOR: state => state.tempBenefactor,
    },

    mutations: {

        SAVE_TEMP_BENEFACTOR_MUTATION(state, payload) {
            state.tempBenefactor = payload
        },
    },
    actions: {
        SAVE_TEMP_BENEFACTOR({ commit }, payload) {
            commit('SAVE_TEMP_BENEFACTOR_MUTATION', payload)
        },
    }
};