import { auth } from "@/firebase";
import router from "@/router";
import store from "@/store/index";
import AuthController from "@/controllers/AuthController";
import Controller from "@/controllers/BaseController";

const authController = new AuthController();
const baseController = new Controller();

const authStore = {
  namespaced: true,
  state: () => ({
    userID: null,
    currentUser: null,
    loadingUser: false,
  }),
  mutations: {
    SET_CURRENT_USER(state, payload) {
      state.currentUser = payload;
    },
    LOGGOUT_USER(state) {
      state.user = null;
    },
    SET_LOADING_USER(state, data) {
      state.loadingUser = data;
    },
  },
  actions: {
    async autoLogin({ commit }) {
      try {
        commit("SET_LOADING_USER", true);
        const user = await authController.autoLogin();
        if (user != null) {
          if (userCollection == "admin") {
            commit("SET_CURRENT_USER", instanceUser);
          } else {
            const currentUser = commit("SET_CURRENT_USER", currentUser);
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        commit("SET_LOADING_USER", false);
      }
    },
    async logIn({ commit }, payload) {
      try {
        commit("SET_LOADING_USER", true);
        await authController
          .login(payload.email, payload.password)
          .then(async (authUser) => {
            if (payload.email == "super@admin.com") {
              commit("SET_CURRENT_USER", { nome: "usuário do médico" });
            } else {
              const currentUser = await baseController.readOne('clients', authUser.user.uid)
              commit("SET_CURRENT_USER", currentUser);
            }
          });
        router.push("/calendar");
      } catch (e) {
        console.error(e);
      } finally {
        commit("SET_LOADING_USER", false);
      }
    },
    async logOut({ commit }) {
      try {
        await authController.logout();
        commit("LOGGOUT_USER");
        console.log("deslogou")
      } catch (e) {
        console.error(e);
      }
    },
    async createUser({ commit, dispatch }, payload) {
      commit("SET_LOADING", true, { root: true });
      try {
        const userEmail = payload.email;
        const user = await usersController.getUserByEmail(userEmail);
        if (user.length > 0) throw new Error("Email already in use");

        const res = await usersController.createAuthUser(payload);
        await usersController.sendSignInLink(userEmail, res);

        store.dispatch("loadSuccess", { root: true });
      } catch (err) {
        //dispatch("loadError", err, { root: true });
        console.error(err);
      } finally {
        commit("SET_DIALOG", false, { root: true });
        commit("SET_LOADING", false, { root: true });
      }
    },

    async createUserFromSigninLink({ commit }, payload) {
      try {
        commit("SET_LOADING_USER", true);
        const user = await usersController.createUserFromSigninLink(payload);
        commit("SET_CURRENT_USER", user);
      } catch (e) {
        console.error(e);
      } finally {
        commit("SET_LOADING_USER", false);
      }
    },
  },
  getters: {},
};

export default authStore;
