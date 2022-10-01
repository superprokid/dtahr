/*eslint-disable*/
import DateTimePicker from '@/components/DateTimePicker/DateTimePicker.vue';
import Input from '@/components/Input/Input.vue';
import Button from '@/components/Button/Button.vue';

import OvertimeRegisterServices from '@/services/API/MyOvertimeAPI/OvertimeRegisterServices';
import moment from 'moment';

export default {
  name: 'OvertimeRegister',
  components: {
    DateTimePicker,
    Input,
    Button,
  },
  data() {
    return {
        projectSelected: '',
        listProjects: [],
        
        startDate: undefined,
        endDate: undefined,

        startTime: '',
        endTime: '',

        reasonInputValue: '',

        isStartDateEmpty: true,
        isEndDateEmpty: true,
        isStartTimeEmpty: true,
        isEndTimeEmpty: true,

        rules: [
            value => value.length > 0  || 'Required.',
        ],
    };
  },
  
  watch: {
    startTime(newstartTime, oldstartTime){
        console.log('newstartTime ',newstartTime);
        console.log('oldstartTime ',oldstartTime);
    }
  },
  mounted() {
    this.$eventBus.$emit('show-spinner', true);
    this._getProjects();
    this.$eventBus.$emit('show-spinner', false);
  },
  methods: {
    onSelectProject(params){
        console.log('params',params);
        if(params != ''){
            this.projectSelected = params.project_id
        }
    },
    onInputStartDate(params) {
        if(params === '' || params === null || params === undefined){
            this.isStartDateEmpty = true;
        }else{
            this.isStartDateEmpty = false
            this.startDate = new Date(params)
        }
    },
    onInputEndDate(params){
        if(params === '' || params === null || params === undefined){
            this.isEndDateEmpty = true;
        }else{
            this.isEndDateEmpty = false
            this.endDate = new Date(params)
        }
    },
    onInputStartTime(params){
        if(params === '' || params === null || params === undefined){
            this.isStartTimeEmpty = true;
        }else{
            this.isStartTimeEmpty = false
            this.startTime = new Date(params)
        }
    },
    onInputEndTime(params){
        if(params === '' || params === null || params === undefined){
            this.isEndTimeEmpty = true;
        }else{
            this.isEndTimeEmpty = false
            this.endTime = new Date(params)
        }
    },
    onInputReason(params){
        this.reasonInputValue = params
        console.log(' this.reasonInputValue', this.reasonInputValue);
    },
    onClickRegisterButton(){
        const params = {
            projectId: this.projectSelected,
            startDate: this.startDate,
            endDate: this.endDate,
            reason: this.reasonInputValue
        }
        if(!params.projectId || this.isStartDateEmpty || this.isEndDateEmpty || this.isStartTimeEmpty || this.isEndTimeEmpty || !params.reason){
            console.log('1 trong cac field bi thieu');
        }
    },

    async _getProjects() {
      const response = await OvertimeRegisterServices.getProjects();
      if (!response) {
        this.$router.push('/user/login');
      } else {
            console.log('response',response.data);
            this.listProjects.push(...response.data)
      }
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split('-');
      return `${month}/${day}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    },
  },
};
