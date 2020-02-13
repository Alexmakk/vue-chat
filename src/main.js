import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueSocketIO from 'vue-socket.io';
import './App.css';

Vue.use(
  new VueSocketIO({
    debug: false,
    connection: 'ws://vue-chat-simple.herokuapp.com/socket.io/?EIO=4&transport=websocket',
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
    }
  })
);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
