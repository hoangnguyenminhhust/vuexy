import axios from '../../axios';


const state = () => ({
	token: null,
	user: null,
	permissions: [],
	headerConfigs: null,
})

const getters = {
	token: state => state.token
}

const actions = {
	async login({commit}, payload) {
		await axios.post('/login', payload).then(res => {
			commit('SET_TOKEN', res.data.token)
		})
		
	},


	checkToken({
		commit
	}) {
		const token = localStorage.getItem('token');
		if (token) {
			commit('SET_TOKEN', token)
		}
	},

	async register({commit}, payload) {
		await axios.post('/register', payload)
		.then(res => {
			commit("REGISTER", res.body)
		  })
	},
	logout({
		commit
	}) {
		commit('LOGOUT')
	}
}

const mutations = {
	REGISTER() {
	
	},

	SET_TOKEN(state, payload) {
		state.token = payload;
		localStorage.setItem('token', payload);
	},

	LOGOUT(state) {
		state.token = null;
		localStorage.removeItem('token');
		localStorage.removeItem('role');

	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}