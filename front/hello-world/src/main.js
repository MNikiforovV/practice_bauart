import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuelidate from "vuelidate";
import VueCookies from 'vue-cookies';
import store from './store'


Vue.config.productionTip = false

Vue.use(Vuelidate);
Vue.use(VueCookies);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')


