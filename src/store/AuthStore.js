import router from "@/router";
import AuthController from "@/controllers/AuthController";
import Controller from "@/controllers/BaseController";
import UserController from "@/controllers/UserController";
import ClientController from "@/controllers/ClientController";
import { auth } from "@/firebase";

const authController = new AuthController();
const baseController = new Controller();
const usersController = new UserController();
const clientController = new ClientController();

const authStore = {
  namespaced: true,
  state: () => ({
    userID: null,
    currentUser: null,
    loadingUser: false,
    menu: []
  }),
  mutations: {
    SET_CURRENT_USER(state, payload) {
      state.currentUser = payload;
    },
    LOGGOUT_USER(state) {
      state.currentUser = null;
    },
    SET_LOADING_USER(state, data) {
      state.loadingUser = data;
    },
    SET_MENU(state, payload) {
      state.menu = payload
    }
  },
  actions: {
    async autoLogin({ commit }) {
      try {
        commit("SET_LOADING_USER", true);
        const user = await authController.autoLogin();
        if (user != null) {
          if (user.email == "super@admin.com") {
            const currentUser = await baseController.readOne(
              "doctor",
              'PeB7IIqa6WMKXD8DlBEdFDk3FUi1'
            );
            commit("SET_CURRENT_USER", currentUser);
            commit('SET_MENU', [
              { title: "Clients", icon: "fa-users", path: "/clients" },
              { title: "Profile", icon: "fa-user-doctor", path: "/profile" },
              { title: "Calendar", icon: "fa-calendar", path: "/calendar" },
            ])
          } else {
            const currentUser = await clientController.getClientById(auth.currentUser.uid)
            commit("SET_CURRENT_USER", currentUser);
            commit('SET_MENU', [
              { title: "Profile", icon: "fa-user-doctor", path: "/profile" },
              { title: "Calendar", icon: "fa-calendar", path: "/calendar" },
            ])
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
              const currentUser = await baseController.readOne(
                "doctor",
                authUser.user.uid
              );
              commit("SET_CURRENT_USER", currentUser);
              commit('SET_MENU', [
                { title: "Clients", icon: "fa-users", path: "/clients" },
                { title: "Profile", icon: "fa-user-doctor", path: "/profile" },
                { title: "Calendar", icon: "fa-calendar", path: "/calendar" },
              ])
            } else {
              const currentUser = await baseController.readOne(
                "client",
                authUser.user.uid
              );
              commit("SET_CURRENT_USER", currentUser);
              commit('SET_MENU', [
                { title: "Profile", icon: "fa-user-doctor", path: "/profile" },
                { title: "Calendar", icon: "fa-calendar", path: "/calendar" },
              ])
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
      } catch (e) {
        console.error(e);
      }
    },

    async createUser({ commit }, payload) {
      commit("SET_LOADING", true, { root: true });
      try {
        const userEmail = payload.email;
        const user = await usersController.getUserByEmail(userEmail);
        if (user.length > 0) {
          throw new Error("Email already in use");
        } else {
          const res = await usersController.createAuthUser(payload);
          await usersController.sendSignInLink(userEmail, res);
        }
      } catch (err) {
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
