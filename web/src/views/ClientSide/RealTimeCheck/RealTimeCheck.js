import DateTimePicker from '@/components/DateTimePicker/DateTimePicker.vue'

import RealtimeCheckService from "@/services/API/RealtimeCheck/RealtimeCheck"

import SessionUtls from '../../../services/SessionUtls';
import tabName from '../../../config/tabname';

import moment from "moment"
export default {
  name: 'RealTimeCheck',
  components: {DateTimePicker},
  data() {
    return {
      startDate: '',
      endDate: '',
      headers: [
        {
          text: 'Date',
          value: 'date',
          width: '10%',
        },
        {
          text: 'CheckIn',
          value: 'employeeClockIn',
          width: '22%',
        },
        {
          text: 'Total',
          value: 'totalClockIn',
          width: '8%',
        },
        {
          text: 'CheckOut',
          value: 'employeeClockOut',
          width: '22%',
        },
        {
          text: 'Total',
          value: 'totalClockOut',
          width: '8%',
        },
        {
          text: 'Not Working',
          value: 'employeeNotWorking',
          width: '22%',
        },
        {
          text: 'Total',
          value: 'totalNotWorking',
          width: '8%',
        },
      ],
      listEmployee: [],
    }
  },
  async created() {
    this.startDate = moment().startOf('month').format('YYYY-MM-DD')
    this.endDate = moment().format('YYYY-MM-DD')
    this.getGroupStatus()
  },
  methods: {
    onInputStartDate(date) {
      if(this.startDate == moment(date).format('YYYY-MM-DD')) return
      if (!date) {
        this.startDate = moment().startOf('month').format('YYYY-MM-DD')
      } else {
        this.startDate = moment(date).format('YYYY-MM-DD')
      }
      this.getGroupStatus()
    },

    onInputEndDate(date) {
      if(this.endDate == moment(date).format('YYYY-MM-DD')) return
      if (!date) {
        this.endDate = moment().format('YYYY-MM-DD')  
      } else {
        this.endDate = moment(date).format('YYYY-MM-DD')
      }
      this.getGroupStatus()
    },

    async getGroupStatus() {
      this.$eventBus.$emit('show-spinner', true);
      let response = await RealtimeCheckService.getRealTime(this.startDate,this.endDate)
      this.$eventBus.$emit('show-spinner', false);
      if (!response) {
        this.$router.push('/user/login');
        return
      }
      let list = []
      response.data.reverse().map((date) => {
        let temp = {
          date: '',
          employeeClockIn: '',
          totalClockIn: 0,
          employeeClockOut: '',
          totalClockOut: 0,
          employeeNotWorking: '',
          totalNotWorking: 0,
        }
        temp.date = date.date
        date.employee.map((employee) => { 
          if (employee.work_status == 0) {
            temp.employeeClockIn += employee.full_name + ', '
            temp.totalClockIn += 1
          }
          else if (employee.work_status == 1) {
            temp.employeeClockOut += employee.full_name + ', '
            temp.totalClockOut += 1
          }
          else if (employee.isOff != 1) {
            temp.employeeNotWorking += employee.full_name + ', '
            temp.totalNotWorking += 1
          }
        })
        temp.employeeClockIn = temp.employeeClockIn ? temp.employeeClockIn.slice(0, -2) : 'No One'
        temp.employeeClockOut = temp.employeeClockOut ? temp.employeeClockOut.slice(0, -2) : 'No One'
        temp.employeeNotWorking = temp.employeeNotWorking ? temp.employeeNotWorking.slice(0, -2) : 'No One'
        list.push(temp)
      })
      this.listEmployee = list
    },

    employeeStatus(status) {
      if (status == 1) {
        return 'Working'
      }
      else if (status == 2) {
        return 'Done'
      }
      else {
        return 'Not Working'
      }
    }
  },

  beforeCreate() {
    SessionUtls.setItem(SessionUtls.tabNameKey, tabName.realtimeCheck);
  },
}