export default {
    state: () => ({
        token: "",
        userLocation: {}
    }),

    getters: {
        token: state => state.token,
        userLocation: state => state.userLocation,
    },

    mutations: {
        setUserToken(state, payload) {
            state.token = payload;
            localStorage.setItem('userToken', payload)
        },
        setUserLocation(state, payload) {
            state.userLocation = payload
        },

        removeToken(state) {
            window.localStorage.removeItem("userToken");
            state.token = "";
        },
    },

    actions: {
        /**
         * User Authentication Actions
         */
        commitToken({ commit }, payload) {
            commit('setUserToken', payload)
        },
        locateUser({ commit }, payload) {
            commit('setUserLocation', payload)
        },

        async logout({ commit }) {
            await commit("removeToken");
            return true;
        }
    }
};