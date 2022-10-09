import TabNav from '@/components/TabNav/TabNav.vue';
import Notification from '@/components/Notification/Notification.vue';
import Button from '@/components/Button/Button.vue';

import AbsentRegister from '@/views/ClientSide/MyAbsentTicket/AbsentRegister/AbsentRegister.vue';
import AbsentHistory from '@/views/ClientSide/MyAbsentTicket/AbsentHistory/AbsentHistory.vue';
import AbsentTicket from '@/views/ClientSide/MyAbsentTicket/AbsentTicket/AbsentTicket.vue';


export default {
  name: 'AbsentTicketTab',
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
        tabName:  'Leave Register',
        tabContent: AbsentRegister,
      },
      {
        tabName: 'Leave History',
        tabContent: AbsentHistory,
      },
      {
        tabName: 'Leave Ticket',
        tabContent: AbsentTicket,
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
  },
};
