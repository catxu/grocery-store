import { createStore } from "vuex";
import { getUserInfo } from '~/api/user'
import { login } from '~/api/user'
import { setToken, removeToken } from "~/composables/auth";

const store = createStore({
    state() {
        return {
            user: {},
            asideWidth: "250px"
        }
    },
    mutations: {
        setUserInfo(state, user) {
            state.user = user
        },
        handleAsideWidth(state) {
            state.asideWidth = state.asideWidth === '250px' ? '64px' : '250px'
        }
    },
    actions: {
        login(commit, { username, password }) {
            return new Promise((resolve, reject) => {
                login(username, password).then(res => {
                    setToken(res.token)
                    resolve(res)
                }).catch(err => reject(err))
            })
        },
        getUserInfo({ commit }) {
            return new Promise((resolve, reject) => {
                getUserInfo().then(res => {
                    commit("setUserInfo", res)
                    resolve(res)
                }).catch(err => reject(err))
            })
        },
        logout({ commit }) {
            removeToken()
            commit("setUserInfo", {})
        }
    }
})


export default store