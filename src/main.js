import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import axios from 'axios'
import VueAxios from 'vue-axios'
 

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'swiper/css/swiper.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueAwesomeSwiper);
Vue.use(VueAxios, axios)

new Vue({
  render: h => h(App),
}).$mount('#app')
