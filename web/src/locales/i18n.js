import Vue from 'vue';
import VueI18n from 'vue-i18n';

import enGeneral from '@/locales/en/general.json';
import enAdminSite from '@/locales/en/admin-site.json';
import enEmployeeSite from '@/locales/en/employee-site.json';

Vue.use(VueI18n);

const messages = {
  'en': {
    general: enGeneral['general'],
    adminSite: enAdminSite['adminSite'],
    employeeSite: enEmployeeSite['employeeSite'],
  },
  // 'jp': {},
  // 'vi': {}
};

const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
})

export default i18n;