import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    messages: [],
    users:[]
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    SOCKET_clearStore(state) {
      state.user = {}
      state.messages = []
      state.users = []
    },
    SOCKET_newMessage(state, message) {
      state.messages.push(message)
    },
    SOCKET_updateUsers(state, users) {
      state.users = users
    },
    SOCKET_chatHistory(state, chatHistory) {
      state.messages = chatHistory
    },
  },
  actions: {
   
  },
  modules: {
  }
})
