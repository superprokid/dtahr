import DateTimePicker from '@/components/DateTimePicker/DateTimePicker.vue'
import Input from '@/components/Input/Input.vue';

import moment from 'moment';

import WorklogEditService from '@/services/API/UserManagementAPI/WorklogEditService';
export default {
    name: 'AddWorklog',
    components: {
        DateTimePicker,
        Input,
    },
    props: {
        username: {
            type: String,
            default: '',
        },
        id: {
            type: String,
            default: '',
        }
    },
    data() {
        return {
            date : moment().subtract(1, "days").format("YYYY-MM-DD"),
            description: '',
            total: 0,
        };
    },
    methods: {
        onClose() {
            this.$emit('on-close',1);
        },
        async onSave() {
            let params = {
                employeeId: this.id,
                workDate: this.date,
                workTotal: this.total,
                description: this.description,
            }
            this.$eventBus.$emit('show-spinner', true);
            let response = await WorklogEditService.addWorklog(params);
            this.$eventBus.$emit('show-spinner', false);
            if (!response) {
                this.$router.push('/user/login')
                return;
            }
            this.$emit('on-save');
        },
        allowedDates(date) {
            if(date >= moment().format('YYYY-MM-DD')) {
                return false;
            }
            return true
        },
        increment () {
            this.total = parseInt(this.total,10) + 1
        },
        decrement () {
            this.total = parseInt(this.total,10) - 1
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
    },
}