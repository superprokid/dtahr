import Vue from 'vue';
import App from './App.vue';

//Register BootstrapVue
import vuetify from '@/plugins/vuetify'

import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

import { BootstrapVue } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import i18n from './locales/i18n';
import { storeVuex } from './services/store';

const EventBus = new Vue();
Vue.prototype.$eventBus = EventBus;

Vue.use(BootstrapVue);
Vue.use(VueMaterial);

import router from './routes/routes';


Vue.config.productionTip = false;

new Vue({
	router,
	i18n,
	vuetify,
	store: storeVuex,
	render: (h) => h(App),
}).$mount('#app');
