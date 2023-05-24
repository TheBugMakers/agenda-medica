import Vue from 'vue'
import Vuex from 'vuex'
import clientStore from "@/store/ClientStore"
import authStore from '@/store/AuthStore'
import appointmentStore from '@/store//AppointmentStore'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      data: null,
      loggedIn: false
    },
    loading: false,
    error: {
      visible: false,
      text: "",
      icon: "",
      color: "",
    },
    dialog: false
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
    SET_LOADING(state, payload) {
      state.loading = payload
    },
    SET_ERROR(state, payload) {
      state.error = payload
    },
    SET_DIALOG(state, payload) {
      state.dialog = payload
    }
  },
  actions: {
    async logIn({commit}, data){
      commit('SET_USER', data)
      commit('SET_LOGGED_IN', true)
    },
    async logOut(){
      this.commit('LOGGOUT_USER', null)
    },
    setAlert({ commit }, payload) {
      commit("SET_ALERT", {
        text: payload.text,
        icon: payload.icon,
        visible: true,
        variant: payload.variant,
      });
      setTimeout(() => {
        commit("SET_ALERT", {
          visible: false,
          text: "",
          icon: "",
          variant: "",
        });
      }, 4000);
    },
    setDialog({commit}, payload) {
      commit('SET_DIALOG', payload)
    }
  },
  modules: {
    clientModule: clientStore,
    authModule: authStore,
    appointmentModule: appointmentStore
  }
})
