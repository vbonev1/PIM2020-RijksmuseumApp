import Vue from 'vue';
import App from './App.vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import axios from 'axios';
import VueAxios from 'vue-axios';
import store from './store';
import VueRouter from 'vue-router';
import Login from './components/Login.vue'
import Signup from './components/Signup.vue'
import Feed from './components/core/Feed.vue'
import UserProfile from './components/UserProfile.vue'
 

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'swiper/css/swiper.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueAwesomeSwiper);
Vue.use(VueAxios, axios);
Vue.use(VueRouter);

const routes = [
  {path: "/", component: Feed},
  {path: "/login", component: Login},
  {path: "/signup", component: Signup},
  {path: "/profile", component: UserProfile},
];

const router = new VueRouter({
  routes
})

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
