// import moment from 'moment';

export default {
  name: 'DateTimePicker',
  props: ['dateTimePickerTitle', 'selectDate', 'dateDuration'],
  data() {
    return {
      selectedDate: '',
    };
  },
  watch: {
    selectedDate(newDate, oldDate) {
      if (newDate - oldDate == 0 || newDate == '' || oldDate == '') {
        return;
      }
      else {
        this.$emit('select-date', this.selectedDate);        
      }
    }
  },

  created() {
    this.selectedDate = this.selectDate;
  },
};
