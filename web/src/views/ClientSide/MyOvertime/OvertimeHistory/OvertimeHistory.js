/*eslint-disable*/
import DateTimePicker from '@/components/DateTimePicker/DateTimePicker.vue';
import Input from '@/components/Input/Input.vue';
import Button from '@/components/Button/Button.vue';

import OvertimeHistoryServices from '@/services/API/MyOvertimeAPI/OvertimeHistoryServices';
import moment from 'moment';

const DATE_TIME_FORMAT = 'YYYY-MM-DD hh:mm:ss'
const DATE_FORMAT = 'YYYY-MM-DD'
const TIME_FORMAT = 'hh:mm:ss'

export default {
  name: 'OvertimeHistory',
  components: {
    DateTimePicker,
    Input,
    Button,
  },
  data() {
    return {
        
    };
  },
  
  watch: {
    startTime(newstartTime, oldstartTime){
        console.log('newstartTime ',newstartTime);
        console.log('oldstartTime ',oldstartTime);
    },
  },
  mounted() {
    
  },
  methods: {
    
  },
};
