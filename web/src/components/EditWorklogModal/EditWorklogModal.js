/* eslint-disable */
import DateTimePicker from '@/components/DateTimePicker/DateTimePicker.vue'
import Input from '@/components/Input/Input.vue';

import AdminGroupServices from "../../services/API/AdminGroup/AdminGroupServices"

import moment from 'moment';

export default {
    name: 'EditWorklogModal',
    components: {
        DateTimePicker,
        Input,
    },
    props: {
        editWorklogInfo:{
            type: Object,
            default: {},
        },
    },
    data() {
        return {
            valid: true,

            time: 0,
            timeRules: [
                v => !!v || 'Time is required',
            ],
            reason: '',
            reasonRules:[
                v => !!v || 'Reason is required',
            ],

            date : moment().subtract(1, "days").format("YYYY-MM-DD"),
        };
    },
    mounted(){
        
    },
    methods: {
        onClose() {
            this.$emit('on-close', 2);
        },
        onEditWorklog(){
            if(this.$refs.form.validate()){
                const params = {
                    workDate: this.date,
                    workTotal: this.time,
                    description: this.reason,
                }

                this.$emit('on-edit-worklog', params);
            }
        },
        increment () {
            this.time = parseInt(this.time,10) + 1
        },
        decrement () {
            this.time = parseInt(this.time,10) - 1
        },
        allowedDates(date) {
            if(date >= moment().format('YYYY-MM-DD') || moment(date).day() == 0 || moment(date).day() == 6) {
                return false;
            }
            return true
        },
    },
}