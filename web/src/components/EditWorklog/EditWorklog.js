import DateTimePicker from '@/components/DateTimePicker/DateTimePicker.vue'
import Input from '@/components/Input/Input.vue';

import moment from 'moment';

import WorklogEditService from '@/services/API/UserManagementAPI/WorklogEditService';

export default {
    name: 'EditWorklog',
    components: {
        DateTimePicker,
        Input,
    },
    props: {
        id: {
            type: String,
            default: '',
        },
        username: {
            type: String,
            default: '',
        }
    },
    data() {
        return {
            date : moment().subtract(1, "days").format("YYYY-MM-DD"),
            reason: '',
            time: 0,
            isSave: false,
        };
    },
    
    methods: {
        onClose() {
            this.isSave = false;
            this.$emit('on-close',1);
        },
        async onSave() {
            this.isSave = true;
            if (this.reason == '' || this.time == 0) {
                return
            }
            let params = {
                employeeId: this.id,
                workDate: this.date,
                workTotal: parseInt(this.time),
                description: this.reason,
            }
            this.$eventBus.$emit('show-spinner', true);
            let response = await WorklogEditService.updateWorklog(params);
            this.$eventBus.$emit('show-spinner', false);
            if (!response) {
                this.$router.push('/user/login')
                return;
            }
            this.resetData()
            this.$emit('on-save');
        },
        allowedDates(date) {
            if(date >= moment().format('YYYY-MM-DD') || moment(date).day() == 0 || moment(date).day() == 6) {
                return false;
            }
            return true
        },
        increment () {
            this.time = parseInt(this.time,10) + 1
        },
        decrement () {
            this.time = parseInt(this.time,10) - 1
        },
        onInputDate(date) {
            if(this.startDate == moment(date).format('YYYY-MM-DD')) return
            if (!date) {
                this.startDate = moment().startOf('month').format('YYYY-MM-DD')
            } else {
                this.startDate = moment(date).format('YYYY-MM-DD')
            }
            this.getGroupStatus()
        },
        resetData() {
            this.isSave = false;
            this.date = moment().subtract(1, "days").format("YYYY-MM-DD");
            this.reason = '';
            this.time = 0;
        }
    },
}