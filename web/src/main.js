import Vue from 'vue';
import App from './App.vue';

//Register BootstrapVue
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

import { BootstrapVue } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import i18n from './locales/i18n';

const EventBus = new Vue();
Vue.prototype.$eventBus = EventBus;

Vue.use(BootstrapVue);
Vue.use(VueMaterial);
Vue.use(Vuetify)

import router from './routes/routes';

Vue.component('TimeTracking', () =>
  import('./views/ClientSide/MyPage/TimeTracking/TimeTracking.vue')
);

Vue.config.productionTip = false;

new Vue({
	router,
	i18n,
	render: (h) => h(App),
}).$mount('#app');
