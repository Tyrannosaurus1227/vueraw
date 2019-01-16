import Vuex from 'vuex'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    token: null,
    refreshToken: null,
    username: '',
    themeColor:null
  },
  mutations: {
    login: (state, data) => {
    state.token = data.token
    state.refreshToken = data.refreshToken
    state.username = data.username
    },
    logout: (state) => {
      state.token = null
      state.username = ''
    },
    getThemeColor:(state,data) => {
      state.themeColor =data
    }
},
plugins: [createPersistedState()]
})
