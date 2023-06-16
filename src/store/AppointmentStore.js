import AppointmentController from "@/controllers/AppointmentController";
const appointmentController = new AppointmentController();

const appointmentStore = {
  namespaced: true,
  state: () => ({
    appointments: [],
    selectedAppointment: null
  }),
  mutations: {
    SET_APPOINTMENTS(state, payload) {
      state.appointments = payload;
    },
    SET_APPOINTMENT(state, payload) {
        state.selectedAppointment = payload
    }
  },
  actions: {
    async getAppointments({ commit }) {
        commit('SET_LOADING', true, { root: true })
      try {
        const appointments = await appointmentController.getAll();
        commit("SET_APPOINTMENTS", appointments);
      } catch (e) {
        throw new Error(e);
      } finally {
        commit('SET_LOADING', false, { root: true })
      }
    },

    async getAppointmentById({commit}, id) {
        commit('SET_LOADING', true, { root: true })
      try {
        const appointment = await appointmentController.getAppointmentById(id)
        commit("SET_APPOINTMENT", appointment);
      } catch (e) {
        throw new Error(e);
      } finally {
        commit('SET_LOADING', false, { root: true })
      }
    },

    async getAppointmentsByUserId({commit}, userId) {
        commit('SET_LOADING', true, { root: true })
      try {
        const appointments = await appointmentController.getByUserId(userId);
        commit("SET_APPOINTMENTS", appointments);
      } catch (e) {
        throw new Error(e);
      } finally {
        commit('SET_LOADING', false, { root: true })
      }
    }
  },
  getters: {},
};

export default appointmentStore;
