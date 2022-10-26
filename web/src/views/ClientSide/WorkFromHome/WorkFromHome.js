/* eslint-disable */ 
import TabNav from '@/components/TabNav/TabNav.vue';

import RegisterWorkFromHome from './RegisterWorkFromHome/RegisterWorkFromHome.vue';
import CalendarWorkFromHome from './CalendarWorkFromHome/CalendarWorkFromHome.vue';

import SessionUtls from '../../../services/SessionUtls';
import tabName from '../../../config/tabname';

export default {
  name: 'WorkFromHome',
  data() {
    return {
      tabData: {},
      logOutNotiTitle: '',
      logOutNotiBody: '',
      notiType: '',
      tabItems: undefined,
    };
  },

  components: {
    TabNav,
  },

  async created() {
    this.tabItems = [
      {
        tabName:  'Register Work From Home',
        tabContent: RegisterWorkFromHome,
      },
      {
        tabName: 'Calendar Work From Home',
        tabContent: CalendarWorkFromHome,
      }
    ]
  },

  methods: {

  },

  beforeCreate() {
    SessionUtls.setItem(SessionUtls.tabNameKey, tabName.workFromHome);
  },
};
