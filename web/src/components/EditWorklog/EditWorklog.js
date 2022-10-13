import DateTimePicker from '@/components/DateTimePicker/DateTimePicker.vue'
import Input from '@/components/Input/Input.vue';

import moment from 'moment';
export default {
    name: 'EditWorklog',
    components: {
        DateTimePicker,
        Input,
    },
    props: {
        username: {
            type: String,
            default: '',
        }
    },
    data() {
        return {
            date : moment().subtract(1, "days").format("YYYY-MM-DD"),
            reason: '',
            total: 0,
            type: 0,
        };
    },
    
    methods: {
        onClose() {
            this.$emit('on-close',2);
        },
        onSave() {
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