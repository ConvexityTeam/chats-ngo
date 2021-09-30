

export default {

    state: () => ({
        allVendors: []
    }),

    getters: {
        allVendors: state => state.allVendors
    },

    mutations: {
        SAVE_ALL_VENDORS(state, payload) {
            state.allVendors = payload
        },
    },

    actions: {
        async getallVendors({ commit }, id) {
            try {
            
                const response = await this.$axios.get(`/organisations/${id}/vendors`)
                if (response.status == "success") {
                    commit('SAVE_ALL_VENDORS', response.data.reverse())
                }
            }
            catch (_err) {}
        },

    }
};