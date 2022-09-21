import moment from 'moment';

export default {
  name: 'DateTimePicker',
  props: ['dateTimePickerTitle', 'endDate', 'startDate', 'dateDuration'],
  data() {
    return {
      selectedDate: '',
    };
  },
  methods: {
    onChange() {
      this.$emit('select-date', this.selectedDate);
    },
  },
  watch: {
    endDate: function () {
      if (
        moment(this.endDate).format('YYYY-MM-DD') <
        moment(this.startDate).format('YYYY-MM-DD')
      ) {
        this.selectedDate = this.startDate;
      }
    },
    startDate: function () {
      if (
        moment(this.endDate).format('YYYY-MM-DD') <
        moment(this.startDate).format('YYYY-MM-DD')
      ) {
        this.selectedDate = this.startDate;
      }
    },
  },
  mounted() {
    if (this.startDate != '') {
      let temp = new Date(this.startDate);
      temp = moment(temp).format('YYYY-MM-DD');
      let defaultDate = new Date(temp);
      this.selectedDate = defaultDate.setDate(
        defaultDate.getDate() + this.dateDuration
      );
      console.log('day la startDate:', this.startDate);
    }
  },
};
