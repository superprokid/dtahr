import Vue from 'vue';
import App from './App.vue';

//Register BootstrapVue
import vuetify from '@/plugins/vuetify'
import MultiFiltersPlugin from "./plugins/MultiFilters" // <-- THIS

import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

import { BootstrapVue } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import i18n from './locales/i18n';
import { storeVuex } from './services/store';


// import VueQuillEditor from 'vue-quill-editor'
import VueFormulate from '@braid/vue-formulate'
import './assets/formulate.css'

import VueToast from 'vue-toast-notification';
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css';


const EventBus = new Vue();
Vue.prototype.$eventBus = EventBus;

Vue.use(VueToast);
Vue.use(VueFormulate)
Vue.use(BootstrapVue);
Vue.use(VueMaterial);
Vue.use(MultiFiltersPlugin);
// Vue.use(VueQuillEditor, /* { default global options } */)

import router from './routes/routes';

// SOCKET CONFIGURATION
import io from "socket.io-client";
import { BASE_URL } from '@/config/constant';

const socket = io(BASE_URL);

Vue.prototype.$mySocket = socket;

Vue.config.productionTip = false;

new Vue({
	router,
	i18n,
	vuetify,
	store: storeVuex,
	render: (h) => h(App),
}).$mount('#app');
