/* eslint-disable no-unused-vars */
import TimeDuration from '@/components/TimeDuration/TimeDuration.vue';
import Button from '@/components/Button/Button.vue';
import moment from 'moment';
import Notification from '@/components/Notification/Notification.vue';
import ClockOutNotification from '@/components/ClockOutNotification/ClockOutNotification.vue';

import { v4 as uuidv4 } from 'uuid';

const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss';
const DATE_FORMAT = 'YYYY-MM-DD';
const TIME_FORMAT = 'HH:mm:ss';
const CLOCKIN = 'isCheckIn';
const BREAK = 'isBreak';
const RESUME = 'isResume';
const CLOCKOUT = 'isCheckOut';
export default {
  name: 'TimeTracking',
  components: { TimeDuration, Button, Notification, ClockOutNotification },
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
  methods: {
    onInputBreakTime(params) {
      if (params === '' || params === undefined || params === null) {
        this.isBreakTimeTotalEmpty = true;
        this.totalBreakTime = '';
      } else {
        this.totalBreakTime = params;
        console.log(this.totalBreakTime);
        this.isBreakTimeTotalEmpty = false;
      }

      // //!!!!!!
      // function strToMins(t) {
      //   var s = t.split(':');
      //   return Number(s[0]) * 60 + Number(s[1]);
      // }
      // function minsToStr(t) {
      //   return Math.trunc(t / 60) + ':' + ('00' + (t % 60)).slice(-2);
      // }

      // let breakTime = parseFloat(this.totalBreakTime);
      // if (breakTime < 0 || breakTime >= 24) {
      //   console.log('breakTime < 0 hoac breakTime >= 24');
      // } else {
      //   let timeIn = this.timeIn;
      //   let timeOut = this.registerTime.format(TIME_FORMAT);
      //   console.log('timeIn', timeIn.slice(0, 5));
      //   console.log('timeOut', timeOut.slice(0, 5));
      //   //! endTIme - startTime
      //   var result = minsToStr(
      //     strToMins(timeOut.slice(0, 5)) - strToMins(timeIn.slice(0, 5))
      //   );
      //   console.log('diffrent between', result);
      //   //! convert To Seconds
      //   const [hours, minutes] = result.split(':');
      //   const totalSeconds = +hours * 60 * 60 + +minutes * 60;
      //   const totalHours = totalSeconds / 3600;
      //   console.log('diffrent between convert to second: ', totalSeconds);
      //   console.log('diffrent between convert to hour: ', totalHours);

      //   const total = totalHours - breakTime;
      //   if (total < 0) {
      //     console.log('ko duoc vi total thoi gian lam < 0');
      //   } else {
      //     console.log('total', total);
      //   }
      // }
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
      this.isClockInDisable = true;
      this.isClockOutDisable = false;
    },
    async onClickClockOutBtn() {
      this.mode = CLOCKOUT;
      this.clockOut = moment(new Date());
      this.registerTime = this.clockOut;
      // this.isTimeConfirmModalShowed = true;
      this.isClockOutModalShowed = true;
      this.notiTitle = this.$t('general.notifications.clockOutConfirm.title');
      this.notiBody =
        this.$t('general.notifications.clockOutConfirm.body') +
        this.clockOut.format(TIME_FORMAT);
      this.notiType = 'primary';
      this.isClockOutDisable = true;
    },
    /********************************
     * @todo Update Working time
     ********************************/
    async onClickOkButton() {

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
  mounted() {
    this._getCurrentWorklog();
  },
};
