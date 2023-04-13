import ClientController from "@/controllers/ClientController";

const clientStore = {
    namespaced: true,
    state: () => ({
        loggedUser: null
    }),
    mutations: {
        SET_LOGGED_IN(state, payload) {
            state.loggedUser = payload;
        }
    },
    actions: {
        async login({commit}, payload) {
            console.log(payload)
            try {
                const user = await new ClientController().login(payload.email, payload.password)
                console.log(user)
                commit('SET_LOGGED_IN', "logado")
            } catch(err) {
                console.log("store error: ", err)
            }
        }
    }
}

export default clientStore