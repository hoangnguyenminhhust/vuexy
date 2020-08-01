import axios from '../../axios';

const state = () => ({
  user: []
})

const getters = {
  user: state => state.user
}

const actions = {
  async fetchAll({
    commit
  }) {
    let res = await axios.get('/api/user');
    commit('RETURN_USERS', res.data)
  },

  async create({}, payload) {
    await axios.post('/api/user/register', payload);
    commit('DELETED_USER')

  },
  async report({
    commit
  }) {
    let res = await axios.get('/api/campaign/data/report')
    commit('DATA_REPORT', res.data)
  },
  async delete({}, {
    id
  }) {
    await axios.delete(`/api/user/${id}`);
    commit('DELETED_USER')
  }
}

const mutations = {
  RETURN_USERS() {},
  DELETED_USER() {},
  DATA_REPORT() {},
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}