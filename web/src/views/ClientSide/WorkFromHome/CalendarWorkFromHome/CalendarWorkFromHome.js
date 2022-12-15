/* eslint-disable */
import { getDateString } from "../../../../services/utilities";
import WorkFromHomeServices from "../../../../services/API/WorkFromHomeAPI/WorkFromHomeServices";
import CookieUtls from '../../../../services/CookieUtls';

import { MANAGER_WORK_FROM_HOME_TICKET_SCREEN } from "../../../../config/screenName";
import moment from 'moment';
import { WFH_CHANNEL } from "../../../../config/channel";


export default {
    name: "CalendarWorkFromHome",
    components: {

    },
    props: {

    },

    data() {
        return {
            focus: '',
            type: 'month',
            typeToLabel: {
                month: 'Month',
                week: 'Week',
                day: 'Day',
                '4day': '4 Days',
            },
            selectedEvent: {},
            selectedElement: null,
            selectedOpen: false,
            events: [],
            // colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
            colors: {
                0: "orange",
                1: "green",
                2: 'grey darken-1'
            },
            names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],

            listEmployee: [],
            employeeSelected: '',

            yourSelfWfhTicket: [],

            isManager: false,

            isEdit: false,
        }
    },
    computed: {
        
    },
    created(){
        
    },
    mounted () {
        if(CookieUtls.getCookie(CookieUtls.role) == 0){
            this.isEdit = true
        }else if(this.employeeSelected === CookieUtls.getCookie(CookieUtls.employeeId) || this.employeeSelected === ''){
            this.isEdit = true
        }else{
            this.isEdit = false
        }

        this.$eventBus.$emit('show-spinner', true);
        if(CookieUtls.getCookie(CookieUtls.role) == 1){
            this._getAllUserAssigned()
            this.isManager = true
        }
        this._getYourSelfWfhTicket()
        this.$refs.calendar.checkChange()
        this.$eventBus.$emit('show-spinner', false);

        this.$root.$on(MANAGER_WORK_FROM_HOME_TICKET_SCREEN, () => {
            if(CookieUtls.getCookie(CookieUtls.role) == 0){
                this._getYourSelfWfhTicket()
            }else{
                this.onChangeEmployeeToSeeSchedule()
            }
        })
        
    },
    watch:{
        employeeSelected(val){
            if(val === CookieUtls.getCookie(CookieUtls.employeeId) || val === ''){
                this.isEdit = true
            }else{
                this.isEdit = false
            }
        }
    },

    methods: {
        viewDay ({ date }) {
          this.focus = date
          this.type = 'day'
        },
        getEventColor (event) {
          return event.color
        },
        setToday () {
          this.focus = ''
        },
        prev () {
          this.$refs.calendar.prev()
        },
        next () {
          this.$refs.calendar.next()
        },
        showEvent ({ nativeEvent, event }) {
          const open = () => {
            this.selectedEvent = event
            this.selectedElement = nativeEvent.target
            requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
          }
  
          if (this.selectedOpen) {
            this.selectedOpen = false
            requestAnimationFrame(() => requestAnimationFrame(() => open()))
          } else {
            open()
          }
  
          nativeEvent.stopPropagation()
        },
        updateRange ({ start, end }) {
            console.log('start and end', start,end);
          const events = []

          for (let i = 0; i < this.yourSelfWfhTicket.length; i++) {
            const allDay = this.rnd(0, 3) === 0
  
            events.push({
              name: this.yourSelfWfhTicket[i].wfh_title,
              start: this.yourSelfWfhTicket[i].start_date,
              end: this.yourSelfWfhTicket[i].end_date,
              color: this.colors[this.yourSelfWfhTicket[i].status],
              description: this.yourSelfWfhTicket[i].wfh_description,
              status: this.yourSelfWfhTicket[i].status,
                date: this.yourSelfWfhTicket[i].wfh_date
            //   timed: !allDay,
            })
          }
  
          this.events = events
        },
        // Random function
        rnd (a, b) {
          return Math.floor((b - a + 1) * Math.random()) + a
        },

        async _getAllUserAssigned(){
            const response = await WorkFromHomeServices.managerGetAllUserAssigned()
            if (!response) {
                this.$router.push('/user/login');
                return;
            }
            this.listEmployee = response.data.map(item => {
                return {...item, employeeNameGive: item.full_name,  employeeIdResponse: item.employee_id}
            })
        },

        async _getYourSelfWfhTicket(){
            // this.events = []
            const response = await WorkFromHomeServices.userGetTheirWfhTickets()
            if (!response) {
                this.$router.push('/user/login');
                return;
            }
            this.yourSelfWfhTicket = response.data
            const events = []
            for (let index = 0; index < this.yourSelfWfhTicket.length; index++) {
                const element = this.yourSelfWfhTicket[index];
                events.push({       
                    name: element.wfh_title,
                    start: element.start_date,
                    end: element.end_date,
                    color: this.colors[element.status], 
                    description: element.wfh_description,
                    status: element.status,
                    date: element.wfh_date
                })
            }
            this.events = events
        },

        onChangeEmployeeToSeeSchedule(){
            this.$eventBus.$emit('show-spinner', true);
            this._getSpecificUserSchedule(this.employeeSelected)
            this.$eventBus.$emit('show-spinner', false);

        },

        async _getSpecificUserSchedule(employeeIdSelected){
            const params = {
                employeeId: employeeIdSelected
            }
            const response = await WorkFromHomeServices.managerGetWfhTicketOfSelectedSpecificUser(params)
            if (!response) {
                this.$router.push('/user/login');
                return;
            }
            const events = []
            this.yourSelfWfhTicket = response.data
            for (let index = 0; index < this.yourSelfWfhTicket.length; index++) {
                const element = this.yourSelfWfhTicket[index];
                events.push({       
                    name: element.wfh_title,
                    start: element.start_date,
                    end: element.end_date,
                    color: this.colors[element.status], 
                    description: element.wfh_description,
                    status: element.status,
                    date: element.wfh_date
                })
            }
            this.events = events
        },

        async onClickDeleteWfhTicket(date){
            console.log('date', date);
            const params = {
                date
            }
            const response = await WorkFromHomeServices.userDeleteTheirWfhTicket(params)
            if (!response) {
                this.$router.push('/user/login');
                return;
            }else{
                if(response == -1){
                    this.$toast.open({
                        message: "Something went wrong, please try later",
                        type: "error",
                        duration: 2000,
                        dismissible: true,
                        position: "top-right",
                    })
                    return
                }else{
                    this.$toast.open({
                        message: "Delete success",
                        type: "success",
                        duration: 2000,
                        dismissible: true,
                        position: "top-right",
                    })  
                    this.selectedOpen = false
                    this._getYourSelfWfhTicket()
                    
                }
            }

        }
    },

}