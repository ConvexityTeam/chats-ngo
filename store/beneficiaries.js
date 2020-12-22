export default {
    state: () => ({
        tempBenefactor: null,
        tempVendor: null,
    }),

    getters: {
        BENEFACTOR: state => state.tempBenefactor,
        VENDOR: state => state.tempVendor,
    },

    mutations: {

        SAVE_TEMP_BENEFACTOR_MUTATION(state, payload) {
            state.tempBenefactor = payload
        },

        SAVE_TEMP_VENDOR_MUTATION(state, payload) {
            state.tempVendor = payload
        },
    },
    actions: {

        SAVE_TEMP_BENEFACTOR({ commit }, payload) {
            commit('SAVE_TEMP_BENEFACTOR_MUTATION', payload)
        },

        SAVE_TEMP_VENDOR({ commit }, payload) {
            commit('SAVE_TEMP_VENDOR_MUTATION', payload)
        },
    }
};