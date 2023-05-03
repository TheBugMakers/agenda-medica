import Vue from 'vue'
import Vuex from 'vuex'
import clientStore from "@/store/ClientStore"
import authStore from '@/store/AuthStore'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      data: null,
      loggedIn: false
    }
  },
  getters: {
    user(state) {
      return state.user
    }
  },
  mutations: {
    SET_USER(state, payload) {
      state.user.data = payload;
      state.user.loggedIn = true;
    },
    LOGGOUT_USER(state) {
      state.user.data = null
      state.user.loggedIn = false
    },
  },
  actions: {
    async logIn({commit}, data){
      commit('SET_USER', data)
      commit('SET_LOGGED_IN', true)
    },
    async logOut(){
      this.commit('LOGGOUT_USER', null)
    },
  },
  modules: {
    clientModule: clientStore,
    authModule: authStore
  }
})
