import TabNav from '@/components/TabNav/TabNav.vue';
import Notification from '@/components/Notification/Notification.vue';
import Button from '@/components/Button/Button.vue';

import TimeTracking from '@/views/ClientSide/MyPage/TimeTracking/TimeTracking.vue';
import HistoryTracking from '@/views/ClientSide/MyPage/HistoryTracking/HistoryTracking.vue';

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
        tabName:  'Time Tracking',
        tabContent: TimeTracking,
      },
      {
        tabName: 'History Tracking',
        tabContent: HistoryTracking,
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
