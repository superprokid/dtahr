/* eslint-disable no-unused-vars */
import TimeDuration from '@/components/TimeDuration/TimeDuration.vue';
import Button from '@/components/Button/Button.vue';
import moment from 'moment';
import Notification from '@/components/Notification/Notification.vue';

import { v4 as uuidv4 } from 'uuid';

import { mapState } from 'vuex'

import TimeTrackingServices from '@/services/API/MyPageAPI/TimeTrackingService';
import { REAL_TIME_TRACKING_CHANNEL } from '../../../../config/channel';
import { TIME_TRACKING_SCREEN } from '../../../../config/screenName';

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
      isClockInDisable: false,
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
    };
  },
  computed:{
    ...mapState(["startDataUser"])
  },
  watch: {
    startDataUser(newVal) {
      if (newVal.workLog?.work_status == 0) {
        this.isClockInDisable = true;
        this.isClockOutDisable = false;
      } else {
        this.isClockInDisable = false;
        this.isClockOutDisable = true;
      }
      
      const today = new Date();
      if (newVal.workTime?.isHoliday || today.getDay() === 0 || today.getDay() === 6) {
        this.isClockInDisable = true;
        this.isClockOutDisable = true;
      }
    }
  },
  methods: {
    checkClockIn() {
      if (!this.startDataUser.workLog) return
      if (this.startDataUser.workLog?.work_status == 0) {
          this.isClockInDisable = true;
          this.isClockOutDisable = false;
      }

      const today = new Date();
      if (this.startDataUser.workTime?.isHoliday || today.getDay() === 0 || today.getDay() === 6) {
        this.isClockInDisable = true;
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
      if(this.mode == CLOCKIN){
        this.$eventBus.$emit("show-spinner", true);
        let curr = new Date()
        if (`${this.startDataUser.workTime.hour_end}:${this.startDataUser.workTime.min_end}:00` <
          `${curr.getHours()}:${curr.getMinutes()}:${curr.getSeconds()}` || this.startDataUser.workTime.isHoliday == true) {
          this.$eventBus.$emit("show-spinner", false);
          this.notiTitle = `Cannot Clock In `;
          this.notiBody = `Not in working time!`;
          this.notiType = 'danger';
          this.isErrorModalShowed = true;
          this.$eventBus.$emit("show-spinner", false);
          return;
        }
        await TimeTrackingServices.checkIn()
        this.$eventBus.$emit("show-spinner", false);
        this.isClockInDisable = true;
        this.isClockOutDisable = false;
      }
      else{
        this.$eventBus.$emit("show-spinner", true);
        try {
          let response = await TimeTrackingServices.checkOut()
          if (!response) {
            this.notiTitle = `Cannot Clock Out`;
            this.notiBody = `It's not working time!`;
            this.notiType = 'danger';
            this.isErrorModalShowed = true;
            this.$eventBus.$emit("show-spinner", false);
            return;
          }
        } 
        catch (e) {
          console.log(e)
        }
        this.$eventBus.$emit("show-spinner", false);
        this.isClockInDisable = false;
        this.isClockOutDisable = true;
      }
      this.$root.$emit(TIME_TRACKING_SCREEN,this.startDataUser.employee_id);
      this.$mySocket.emit(REAL_TIME_TRACKING_CHANNEL, this.startDataUser.employee_id)
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
    /********************************
     * @todo Get Current Worklog Info
     ********************************/
    async _getCurrentWorklog() {
    },
    /********************************
     * @todo Check Clock Buton status
     * @param {object} employeeWorklog : {id, userName, startTime, endTime, recordType} all properties are string
     *******************************/
    _checkClockButtonStatus(employeeWorklog) {
      // Disable both ClockIn and ClockOut button
      if (employeeWorklog.clock_out != '') {
        this.isClockInDisable = true;
        this.isClockOutDisable = true;
      }
      // Enable ClockOut button
      else {
        this.isClockInDisable = true;
        this.isClockOutDisable = false;
      }
    },
    /********************************
     * @todo Get UTC Time
     * @param {string} registerDate registerTime
     * @return timeUTC: string
     ********************************/
    _getTimeUTC(registerDate, registerTime) {
      let time = moment(registerDate + 'T' + registerTime);
      let timeUTC = time.utc().format(DATE_TIME_FORMAT) + 'Z';
      return timeUTC;
    },
    /**
     * Get Date string in Zulu Time UTC format
     * @param {object} date: Date object
     * @returns {string} zuluTimeUTC: format 'YYYY-MM-DDTHH:mm:ssZ'
     */
    _getConvertTimeString(date) {
      let zuluTimeUTC = moment(date).utc().format(DATE_TIME_FORMAT) + 'Z';
      return zuluTimeUTC;
    },
    /**
     * Get End time of day
     * @param date : All date format
     * @returns {number}
     */
    _getEndTimeOfDay(date) {
      let endTime = new Date(date).setHours(23, 59, 59, 0);
      return endTime;
    },

    /**
     * Get Begin time of day
     * @param date : All date format
     * @returns {number}
     */
    _getBeginTimeOfDay(date) {
      let beginTime = new Date(date).setHours(0, 0, 0, 0);
      return beginTime;
    },
    /**
     * Get existed working schedule in date range
     * @param {string} startDate register start date
     * @param {string} endDate register end date
     * @returns {array} array of existed working schedule objects
     */
    async _getExistedSchedule(startDate, endDate) {

    },
  },
  created() {
    this._getCurrentWorklog();
    this.checkClockIn()
  },
};
