import Vue from 'vue'
import Vuex from 'vuex'
import clientStore from "@/store/ClientStore"
import authStore from '@/store/AuthStore'
<<<<<<< HEAD
import appointmentStore from './AppointmentStore'
import Controller from '@/controllers/BaseController'

const controller = new Controller();
=======
import appointmentStore from '@/store//AppointmentStore'
>>>>>>> main

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
<<<<<<< HEAD
    dialog: false,
    dates: []
=======
    dialog: false
>>>>>>> main
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
<<<<<<< HEAD
    },
     SET_ALERT(state, payload) {
      state.error = payload;
     },
     SET_DATES(state, payload) {
      state.dates = payload;
     }
=======
    }
>>>>>>> main
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
<<<<<<< HEAD
        color: payload.color,
=======
        variant: payload.variant,
>>>>>>> main
      });
      setTimeout(() => {
        commit("SET_ALERT", {
          visible: false,
          text: "",
          icon: "",
<<<<<<< HEAD
          color: "",
=======
          variant: "",
>>>>>>> main
        });
      }, 4000);
    },
    setDialog({commit}, payload) {
      commit('SET_DIALOG', payload)
<<<<<<< HEAD
    },
    async updatePhone({commit}, payload) {
      commit('SET_LOADING', true)
      try {
        await controller.update(payload.col, payload.id, payload.data)
      } catch (e) {
        throw new Error(e)
      } finally {
        commit('SET_LOADING', false)
        commit('SET_DIALOG', false)
      }
    },
    async getDates({commit}) {
      commit('SET_LOADING', true)
      try {
        const dates = await controller.getDates();
        commit('SET_DATES', dates)
      } catch (e) {
        throw new Error(e)
      } finally {
        commit('SET_LOADING', false)
      }
=======
>>>>>>> main
    }
  },
  modules: {
    clientModule: clientStore,
    authModule: authStore,
    appointmentModule: appointmentStore
  }
})
