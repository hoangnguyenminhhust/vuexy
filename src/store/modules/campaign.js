import axios from '../../axios';

const state = () => ({
	campaigns: []
})

const getters = {
	campaigns : state => state.campaigns
}

const actions = {
  async fetchAll({ commit }) {
    let res = await axios.get('/api/campaign');
    commit('RETURN_CAMPAIGNS', res.data)
  },

  async create({}, payload) {
    await axios.post('/api/campaign', payload);
  },

  async delete({}, {id}) {
    await axios.delete(`/api/campaign/${id}`);
  }
}

const mutations = {
  RETURN_CAMPAIGNS(state, payload) {
    state.campaigns = payload;
  }
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}