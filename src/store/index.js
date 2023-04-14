import Vue from 'vue'
import Vuex from 'vuex'
import clientStore from "@/store/ClientStore"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      data: null
    }
  },
  getters: {
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    }
  },
  actions: {

  },
  modules: {
    clientModule: clientStore
  }
})
