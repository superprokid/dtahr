/* eslint-disable */
import { getDateString } from "../../../../services/utilities";
import WorkFromHomeServices from "../../../../services/API/WorkFromHomeAPI/WorkFromHomeServices";
import CookieUtls from '../../../../services/CookieUtls';

import { MANAGER_WORK_FROM_HOME_TICKET_SCREEN } from "../../../../config/screenName";
import moment from 'moment';
import { WFH_CHANNEL } from "../../../../config/channel";

export default {
    name: "ApproveWorkFromHome",
    components: {

    },
    props: {

    },

    data() {
        return {
            singleSelect: false,
            selected: [],
            
            search: '',
            listWfhTicket: [],
            valid: true,
        }
    },
    computed: {
        headers() {
            return [
                {
                    text: 'Employee Name',
                    align: 'start',
                    value: 'name',
                    width: 150,
                },
                {
                    text: 'Date WFH',
                    value: 'wfh_date',
                    width: 150,
                },
                {
                    text: 'Start Time',
                    value: 'wfh_start_time',
                    width: 120,
                },
                {
                    text: 'End Time',
                    value: 'wfh_end_time',
                    width: 120,
                },
                {
                    text: 'Title',
                    value: 'wfh_title',
                    width: 200,
                },
                {
                    text: 'Description',
                    value: 'wfh_description',
                    width: 200,
                },
                {
                    text: 'Status',
                    value: 'status'
                }
            ]   
        },
    },
    created(){
        this.$eventBus.$emit('show-spinner', true);
        this._managerGetWfhTicket()
        
        this.$eventBus.$emit('show-spinner', false);
        if(CookieUtls.getCookie(CookieUtls.role) == 1){
            this.headers.push({ text: 'Actions', value: 'actions', sortable: false })
        }
    },
    mounted() {
        this.$root.$on(MANAGER_WORK_FROM_HOME_TICKET_SCREEN, () => {
            this._managerGetWfhTicket();
        })
        
    },

    methods: {

        async _managerGetWfhTicket(){
            const response = await WorkFromHomeServices.managerGetAllWfhTicket();
            if(!response){
                this.$router.push('/user/login')
            } else if(response == -1){
                this.$toast.open({
                    message: "Something went wrong, please try later",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                  })
            }
            else {
                console.log('response',response.data);
                this.listWfhTicket = response.data.map((item, index) => {
                    return {...item, id: index , wfh_date: moment(item.wfh_date).local().format("YYYY-MM-DD"), 
                                        status:  item.status === 0 ? 'PENDING' : item.status === 1 ?  'APPROVED' : 'REJECTED' }
                })
                
            }

        },

        filterOnlyCapsText(value, search, item) {
            item - 1;
            return value != null &&
                search != null &&
                typeof value === 'string' &&
                value.toString().toLocaleUpperCase().indexOf(search.toLocaleUpperCase()) !== -1
        },

        async updateStatusWfhTicket(employee_id, wfh_date, status) {
            const objWfkTicket = {
                employee_id: employee_id,
                wfh_date: wfh_date,
            }
            let listTickets = []
            listTickets.push(objWfkTicket)
            const params = {
                listWFHTickets: listTickets,
                status: status
            }

            this.$eventBus.$emit("show-spinner", true);
            const response = await WorkFromHomeServices.managerUpdateWfhTicket(params)
            this.$eventBus.$emit("show-spinner", false);
            if (!response) {
                this.$router.push('/user/login');
                return;
            }
            this.$mySocket.emit(WFH_CHANNEL, 0);
            
        },
        
        async onClickApproveAllWfhTicket(){
            console.log('approve click');
            
            let listTickets = []
            this.selected.map((item) =>{
                const objWfkTicket = {
                    employee_id: item.employee_id,
                    wfh_date: item.wfh_date,
                }
                listTickets.push(objWfkTicket)
            })
            const params = {
                listWFHTickets: listTickets,
                status: 1
            }
            this.$eventBus.$emit("show-spinner", true);
            const response = await WorkFromHomeServices.managerUpdateWfhTicket(params)
            this.$eventBus.$emit("show-spinner", false);
            if (!response) {
                this.$router.push('/user/login');
                return;
            }
            this.$toast.open({
                message: "Approve success",
                type: "success",
                duration: 2000,
                dismissible: true,
                position: "top-right",
            })
            this.$mySocket.emit(WFH_CHANNEL, 0);
        },

        async onClickRejectAllWfhTicket(){
            let listTickets = []
            this.selected.map((item) =>{
                const objWfkTicket = {
                    employee_id: item.employee_id,
                    wfh_date: item.wfh_date,
                }
                listTickets.push(objWfkTicket)
            })
            const params = {
                listWFHTickets: listTickets,
                status: 2
            }
            this.$eventBus.$emit("show-spinner", true);
            const response = await WorkFromHomeServices.managerUpdateWfhTicket(params)
            this.$eventBus.$emit("show-spinner", false);
            if (!response) {
                this.$router.push('/user/login');
                return;
            }
            this.$toast.open({
                message: "Reject success",
                type: "success",
                duration: 2000,
                dismissible: true,
                position: "top-right",
            })
            this.$mySocket.emit(WFH_CHANNEL, 0);
        },
    },

}