export default {
    state: () => ({
        token: "",
    }),

    getters: {
        token: state => state.token,
    },

    mutations: {
        setUserToken(state, payload) {
            state.token = payload;
            localStorage.setItem('userToken', payload)
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

        async logout({ commit }) {
            await commit("removeToken");
            return true;
        }
    }
};