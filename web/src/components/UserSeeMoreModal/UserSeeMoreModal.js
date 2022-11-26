/* eslint-disable */
import DateTimePicker from '@/components/DateTimePicker/DateTimePicker.vue'
import Input from '@/components/Input/Input.vue';

import AdminGroupServices from "../../services/API/AdminGroup/AdminGroupServices"

import moment from 'moment';

export default {
    name: 'UserSeeMoreModal',
    components: {
        DateTimePicker,
        Input,
    },
    props: {
        addHolidayInfo:{
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
            ]
        };
    },
    mounted(){
        
    },
    methods: {
        onClose() {
            this.$emit('on-close', 3);
        },
        async onSave() {
            // this.$emit('on-save');
        },
        onAddHoliday(){
            if(this.$refs.form.validate()){
                const params = {
                    holidayTime: Number(this.time * 480),
                    description: this.reason,
                }

                this.$emit('on-add-holiday', params);
            }
        },
        increment () {
            this.time = parseInt(this.time,10) + 1
        },
        decrement () {
            this.time = parseInt(this.time,10) - 1
        },
    },
}