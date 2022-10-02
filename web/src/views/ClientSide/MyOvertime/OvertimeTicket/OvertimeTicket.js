/* eslint-disable */ 
import OvertimeTicketServices from '@/services/API/MyOvertimeAPI/OvertimeTicketServices';
import { getDateString, getTimeString } from "@/services/utilities";
import SessionUtls from "@/services/SessionUtls"
import Button from '@/components/Button/Button.vue';

export default {
    name: 'OVertimeTicket',
    components:{
        Button
    },
    data() {
        return {
            search: '',
            listOvertimeTicket: [],
            headers:
                 [
                    {
                        text: 'Name',
                        align: 'start',
                        value: 'name',
                        width: 250,
                    },
                    {
                        text: 'Payment',
                        value: 'payment',
                    },
                    {
                        text: 'Project',
                        value: 'project_name',
                    },
                    {
                        text: 'OT Time',
                        value: 'ottime',
                    },
                    {
                        text: 'Created At',
                        value: 'createdat',
                    },
                    {
                        text: 'Status',
                        value: 'status',
                    },
                 ]
        }
    },
    computed: {
        
    },
    mounted() {
        this._getListOvertimeTicket();
        if(SessionUtls.getItem(SessionUtls.role) == 1){
            this.headers.push({ text: 'Actions', value: 'actions', sortable: false })
        }
    },
    methods: {
        filterOnlyCapsText(value, search, item) {
            item - 1;
            return value != null &&
                search != null &&
                typeof value === 'string' &&
                value.toString().toLocaleUpperCase().indexOf(search.toLocaleUpperCase()) !== -1
        },

        async _getListOvertimeTicket(){
            this.$eventBus.$emit("show-spinner", true);
            const response = await OvertimeTicketServices.getOvertimeTickets()
            this.$eventBus.$emit("show-spinner", false);
            if (!response) {
                this.$router.push('/user/login');
                return;
            }
            this.listOvertimeTicket = response.data.map(item => {
                return {...item, ottime: this._formatDateTime(item.start_date) + ' --> ' + this._formatDateTime(item.end_date), createdat: this._formatDateTime(item.create_at), 
                                status:  item.status === 0 ? 'PENDING' : item.status === 1 ?  'APPROVED' : 'REJECTED' }
            })
        },
        _formatDateTime(date){
            return getDateString(new Date(date)) + ' ' + new Date(date).toLocaleTimeString()
        },

        async updateStatusOTTicket (overtime_id, status) {
            const params = {
                overtimeId: overtime_id,
                status: status
            }
            this.$eventBus.$emit("show-spinner", true);
            const response = await OvertimeTicketServices.updateOvertimeTickets(params)
            this.$eventBus.$emit("show-spinner", false);
            if (!response) {
                this.$router.push('/user/login');
                return;
            }
            await this._getListOvertimeTicket();
        },
   
    },
}