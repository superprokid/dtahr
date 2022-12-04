/* eslint-disable no-unused-vars */
import TimeDuration from '@/components/TimeDuration/TimeDuration.vue';
import Button from '@/components/Button/Button.vue';
import moment from 'moment';
import Notification from '@/components/Notification/Notification.vue';

import { v4 as uuidv4 } from 'uuid';

import { mapState } from 'vuex';

import TimeTrackingServices from '@/services/API/MyPageAPI/TimeTrackingService';
import IPService from '../../../../services/API/ip.service';
import { REAL_TIME_TRACKING_CHANNEL } from '../../../../config/channel';
import { TIME_TRACKING_SCREEN } from '../../../../config/screenName';
import MyPageServices from '@/services/API/MyPageAPI/MyPageServices';

const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss';
const TIME_FORMAT = 'HH:mm:ss';
const CLOCKIN = 'isCheckIn';
const CLOCKOUT = 'isCheckOut';

export default {
  name: 'TimeTracking',
  components: { TimeDuration, Button, Notification },
  data() {
    return {
      clockIn: '',
      clockOut: '',
      timeIn: '',
      timeOut: '',
      registeredDateInfo: '',
      notiTitle: '',
      notiBody: '',
      notiType: '',
      registerTime: '',
      isClockInDisable: true,
      isClockOutDisable: true,
      mode: '',
      isErrorModalShowed: false,
      isTimeConfirmModalShowed: false,
      recordId: '',
      isClockOutModalShowed: false,
      totalBreakTime: '',
      isBreakTimeTotalEmpty: true,
      isClockInShow: true,
      labelInputBreakTime: 'Total BreakTime:',
      errorLabelInputBreakTime: 'Total Break Time required!',
      startDataUser: {},
    };
  },

  mounted() {
    this._getStartUser();
  },

  methods: {
    async _getStartUser() {
      const response = await MyPageServices.getStartUser();
      if (!response) {
        this.$router.push('/user/login');
      } else {
        this.startDataUser = response.data;
        this.checkClockIn();
      }
    },
    checkClockIn() {
      const today = new Date();
      if (
        this.startDataUser.workTime?.isHoliday ||
        today.getDay() === 0 ||
        today.getDay() === 6
      ) {
        this.isClockInDisable = true;
        this.isClockOutDisable = true;
      } else if (!this.startDataUser.workLog) {
        this.isClockOutDisable = true;
        this.isClockInDisable = false;
      } else if (this.startDataUser.workLog?.work_status == 0) {
        this.isClockInDisable = true;
        this.isClockOutDisable = false;
      } else {
        this.isClockInDisable = false;
        this.isClockOutDisable = true;
      }
    },
    onInputBreakTime(params) {
      if (params === '' || params === undefined || params === null) {
        this.isBreakTimeTotalEmpty = true;
        this.totalBreakTime = '';
      } else {
        this.totalBreakTime = params;
        console.log(this.totalBreakTime);
        this.isBreakTimeTotalEmpty = false;
      }
    },

    strToMins(t) {
      var s = t.split(':');
      return Number(s[0]) * 60 + Number(s[1]);
    },
    minsToStr(t) {
      return Math.trunc(t / 60) + ':' + ('00' + (t % 60)).slice(-2);
    },

    async onClickClockInBtn() {
      this.mode = CLOCKIN;
      this.clockIn = moment(new Date());
      this.registerTime = this.clockIn;
      this.isTimeConfirmModalShowed = true;
      this.notiTitle = this.$t('general.notifications.clockInConfirm.title');
      this.notiBody =
        this.$t('general.notifications.clockInConfirm.body') +
        this.clockIn.format(TIME_FORMAT);
      this.notiType = 'primary';
    },
    async onClickClockOutBtn() {
      this.mode = CLOCKOUT;
      this.clockOut = moment(new Date());
      this.registerTime = this.clockOut;
      this.isTimeConfirmModalShowed = true;
      this.isClockOutModalShowed = true;
      this.notiTitle = this.$t('general.notifications.clockOutConfirm.title');
      this.notiBody =
        this.$t('general.notifications.clockOutConfirm.body') +
        this.clockOut.format(TIME_FORMAT);
      this.notiType = 'primary';
    },
    /********************************
     * @todo Update Working time
     ********************************/
    async onClickOkButton() {
      this.isTimeConfirmModalShowed = false;
      if (this.mode == CLOCKIN) {
        this.$eventBus.$emit('show-spinner', true);
        let curr = new Date();
        if (
          `${this.startDataUser.workTime.hour_end}:${this.startDataUser.workTime.min_end}:00` <
            `${curr.getHours()}:${curr.getMinutes()}:${curr.getSeconds()}` ||
          this.startDataUser.workTime.isHoliday == true
        ) {
          this.$eventBus.$emit('show-spinner', false);
          this.notiTitle = `Cannot Clock In `;
          this.notiBody = `Not in working time!`;
          this.notiType = 'danger';
          this.isErrorModalShowed = true;
          this.$eventBus.$emit('show-spinner', false);
          return;
        }
        let ip = await IPService.getIP();
        let response = await TimeTrackingServices.checkIn({
          ip: ip,
        });
        if (response.failed) {
          this.notiTitle = `Cannot Clock In`;
          this.notiBody = response.message;
          this.notiType = 'danger';
          this.isErrorModalShowed = true;
          this.$eventBus.$emit('show-spinner', false);
          return
        }
        this.$eventBus.$emit('show-spinner', false);
        this.isClockInDisable = true;
        this.isClockOutDisable = false;
      } else {
        this.$eventBus.$emit('show-spinner', true);
        try {
          let response = await TimeTrackingServices.checkOut();
          if (!response) {
            this.notiTitle = `Cannot Clock Out`;
            this.notiBody = `It's not working time!`;
            this.notiType = 'danger';
            this.isErrorModalShowed = true;
            this.$eventBus.$emit('show-spinner', false);
            return;
          }
        } catch (e) {
          console.log(e);
        }
        this.$eventBus.$emit('show-spinner', false);
        this.isClockInDisable = false;
        this.isClockOutDisable = true;
      }
      this.$root.$emit(TIME_TRACKING_SCREEN, this.startDataUser.employee_id);
      this.$mySocket.emit(
        REAL_TIME_TRACKING_CHANNEL,
        this.startDataUser.employee_id
      );
    },
    onClickCancelButton() {
      this.isTimeConfirmModalShowed = false;
      this.isClockOutModalShowed = false;
      if (this.mode === CLOCKIN) {
        this.isClockInDisable = false;
        this.isClockOutDisable = true;
        this.timeIn = '';
      }
      if (this.mode === CLOCKOUT) {
        this.isClockOutDisable = false;
        this.timeOut = '';
      }
    },
    onClickErrorOkButton() {
      this.isErrorModalShowed = false;
    },
  },
};
