import axios from "axios"


export default {
    state: () => ({
        tempBenefactor: null,
        tempVendor: null,
        allVendors: []
    }),

    getters: {
        BENEFACTOR: state => state.tempBenefactor,
        VENDOR: state => state.tempVendor,
        ALLVENDORS: state => state.allVendors
    },

    mutations: {

        SAVE_TEMP_BENEFACTOR_MUTATION(state, payload) {
            state.tempBenefactor = payload
        },

        SAVE_TEMP_VENDOR_MUTATION(state, payload) {
            state.tempVendor = payload
        },

        SAVE_ALL_VENDORS(state, payload) {
            state.allVendors = payload
        },

    },
    actions: {
        async getallVendors({ commit }, id) {
            try {
                console.log("ID::", id)
                // debugger
                const response = await axios.get(`/organisations/2/vendors`)
                console.log("VENDOR RESPONSE::", response)
                // if (response.status == "success") {
                //     commit('SAVE_ALL_VENDORS', response.data)
                // }

            }
            catch (err) {
                console.log("ALL VENDORS::", err)
            }
        }

    }
};