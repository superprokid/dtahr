/* eslint-disable */ 
import TabNav from '@/components/TabNav/TabNav.vue';

import RegisterWorkFromHome from './RegisterWorkFromHome/RegisterWorkFromHome.vue';
import CalendarWorkFromHome from './CalendarWorkFromHome/CalendarWorkFromHome.vue';
import ApproveWorkFromHome from './ApproveWorkFromHome/ApproveWorkFromHome.vue'

import SessionUtls from '../../../services/SessionUtls';
import tabName from '../../../config/tabname';

import { mapState } from "vuex";
import CookieUtls from '../../../services/CookieUtls';

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
      },
      
    ]
    if(CookieUtls.getCookie(CookieUtls.role) == 1){
      this.tabItems.push({
        tabName: 'Approve Work From Home',
        tabContent: ApproveWorkFromHome,
      })
    }
  },

  methods: {

  },

  beforeCreate() {
    SessionUtls.setItem(SessionUtls.tabNameKey, tabName.workFromHome);
  },
};
