import TabNav from "@/components/TabNav/TabNav.vue";
import Notification from '@/components/Notification/Notification.vue';
import Button from '@/components/Button/Button.vue';

export default {
  name: "EmployeeTab",
  data() {
    return {
      tabItems: [
        {
          tabName: "Time Tracking",
          tabContent: "TimeTracking",
        },
        {
          tabName: "Work Log",
          tabContent: "EmployeeWorkLogScreen",
        },
      ],
      logOutNotiTitle: '',
      logOutNotiBody: '',
      notiType: '',
      isLogOutModalShowed: false,
    };
  },

  components: {
    TabNav,
    Notification,
    Button,
  },

  mounted() {
    this._getCurrentUserName();
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
    },
  },
};