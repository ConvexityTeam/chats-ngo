export default {
	state: () => ({
		token: '',
		userLocation: {},
		user: null,
	}),

	getters: {
		token: (state) => state.token,
		userLocation: (state) => state.userLocation,
		user: (state) => state.user,
	},

	mutations: {
		setUserToken(state, payload) {
			state.token = payload;
			localStorage.setItem('userToken', payload);
		},
		setUserLocation(state, payload) {
			state.userLocation = payload;
		},

		setUserObject(state, payload) {
			state.user = payload;
		},

		setUserUpdate(state, payload) {
			state.user.AssociatedOrganisations[0].Organisation = payload;
		},

		removeToken(state) {
			window.localStorage.removeItem('userToken');
			state.token = '';
		},
	},

	actions: {
		/**
		 * User Authentication Actions
		 */
		commitToken({ commit }, payload) {
			commit('setUserToken', payload);
		},

		locateUser({ commit }, payload) {
			commit('setUserLocation', payload);
		},

		commitUser({ commit }, payload) {
			commit('setUserObject', payload);
		},

		commitUserUpdate({ commit }, payload) {
			commit('setUserUpdate', payload);
		},

		async logout({ commit }) {
			await commit('removeToken');
			return true;
		},
	},
};
