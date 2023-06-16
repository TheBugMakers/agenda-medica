import ClientController from "@/controllers/ClientController";
import Controller from "@/controllers/BaseController";
const clientController = new ClientController();
const controller = new Controller();

const clientStore = {
  namespaced: true,
  state: () => ({
    clients: [],
    selectedClient: null,
  }),
  mutations: {
    SET_CLIENTS(state, payload) {
      state.clients = payload;
    },
    SET_CLIENT(state, payload) {
      state.selectedClient = payload;
    },
  },
  actions: {
    async getClients({ commit }) {
      console.log("getClients");
      commit("SET_LOADING", true, { root: true });
      try {
        const clients = await clientController.getAll();
        commit("SET_CLIENTS", clients);
      } catch (e) {
        throw new Error(e);
      } finally {
        commit("SET_LOADING", false, { root: true });
      }
    },

    async getClientById({ commit }, id) {
      commit("SET_LOADING", true, { root: true });
      try {
        const client = await clientController.getClientById(id);
        commit("SET_CLIENT", client);
        console.log("CLIENT ==>>", client);
      } catch (e) {
        throw new Error(e);
      } finally {
        commit("SET_LOADING", false, { root: true });
      }
    },

    async upload({ commit }, payload) {
      commit("SET_LOADING", true, { root: true });
      try {
        console.log('ENTROU NO UPLOAD STOREdata')
        await controller.upload(
          payload.path,
          payload.file,
          payload.clientId,
          payload.type,
          payload.data
        );
        console.log("UPLOAD ==>>", payload);
      } catch (e) {
        throw new Error(e);
      } finally {
        commit("SET_DIALOG", false, { root: true });
        commit("SET_LOADING", false, { root: true });
      }
    },
  },
  getters: {},
};

export default clientStore;
