import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import { sync } from 'vuex-router-sync';
import App from './App';
import Home from './components/Home';
import Hello from './components/Hello';

Vue.use(Vuex);
Vue.use(VueRouter);

const store = new Vuex.Store();
const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/home',
      component: Home,
    },
    {
      path: '/hello',
      component: Hello,
    },
  ],
});

sync(store, router);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
});
