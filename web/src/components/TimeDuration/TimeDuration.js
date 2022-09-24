const ONESECOND = 1000;
const LANGUAGE = 'en-GB';
export default {
  name: 'TimeDuration',
  props: ['timeIn', 'timeOut'],
  data() {
    return {
      interval: null,
      time: null,
      date: null,
    };
  },
  beforeDestroy() {
    // prevent memory leak
    clearInterval(this.interval);
  },
  created() {
    // update the time every second
    this.interval = setInterval(() => {
      // Concise way to format time according to system locale.
      // In my case this returns "3:48:00 am"
      this.time = Intl.DateTimeFormat(LANGUAGE, {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      }).format();
      this.date = Intl.DateTimeFormat(LANGUAGE, {
        dateStyle: 'long',
      }).format();
    }, ONESECOND);
  },
};
