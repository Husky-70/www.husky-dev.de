import Vue from 'vue';
import './plugins/axios';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify.js';
import VueI18n from 'vue-i18n';
require('./plugins/connector');

Vue.use(VueI18n);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
