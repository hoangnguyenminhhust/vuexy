import Vue from 'vue'
import Vuex from 'vuex'
import campaign from './modules/campaign';
import auth from './modules/auth';
import user from './modules/user';
import screen from './modules/screen';
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    campaign,
    auth,
    user,
    screen
  }
})
