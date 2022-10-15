import TabNav from '@/components/TabNav/TabNav.vue';
import Notification from '@/components/Notification/Notification.vue';
import Button from '@/components/Button/Button.vue';

import OvertimeRegister from '@/views/ClientSide/MyOvertime/OvertimeRegister/OvertimeRegister.vue';
import OvertimeHistory from '@/views/ClientSide/MyOvertime/OvertimeHistory/OvertimeHistory.vue';
import OvertimeTicket from '@/views/ClientSide/MyOvertime/OvertimeTicket/OvertimeTicket.vue';

import SessionUtls from '../../../services/SessionUtls';
import tabName from '../../../config/tabname';


export default {
  name: 'EmployeeTab',
  data() {
    return {
      tabData: {},
      logOutNotiTitle: '',
      logOutNotiBody: '',
      notiType: '',
      tabItems: undefined,
      isLogOutModalShowed: false,
    };
  },

  components: {
    TabNav,
    Notification,
    Button,
  },

  async created() {
    this.tabItems = [
      {
        tabName:  'Overtime Register',
        tabContent: OvertimeRegister,
      },
      {
        tabName: 'Overtime History',
        tabContent: OvertimeHistory,
      },
      {
        tabName: 'Overtime Ticket',
        tabContent: OvertimeTicket,
      }
    ]
  },

  methods: {
    onClickLogOutButton() {
      this.isLogOutModalShowed = true;
      this.logOutNotiTitle = this.$t(
        'general.notifications.logOutConfirm.title'
      );
      this.logOutNotiBody = this.$t('general.notifications.logOutConfirm.body');
      this.notiType = 'primary';
    },
    onClickOkButton() {
      this.isLogOutModalShowed = false;
      this.$router.push('/');
    },
    onClickCancelButton() {
      this.isLogOutModalShowed = false;
    },
    async _getCurrentUserName() {
      // this.currentUserName =
      //   await GetCurrentUserNameService.getCurrentUserName().then((res) => {
      //     return res.username;
      //   });
    }
  },

  beforeCreate() {
    SessionUtls.setItem(SessionUtls.tabNameKey, tabName.overtimeUser);
  },
};
