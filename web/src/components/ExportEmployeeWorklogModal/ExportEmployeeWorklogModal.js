/* eslint-disable */
import DateTimePicker from '@/components/DateTimePicker/DateTimePicker.vue'
import Input from '@/components/Input/Input.vue';

import AdminGroupServices from "../../services/API/AdminGroup/AdminGroupServices"

import moment from 'moment';

import { getAvatar, getDateString, getTimeString, isPastDate} from "../../services/utilities";
import AdminUserManagementService from "../../services/API/AdminUserManagement/AdminUserManagement.service"


export default {
    name: 'ExportEmployeeWorklogModal',
    components: {
        DateTimePicker,
        Input,
    },
    props: {

    },
    data() {
        return {
            valid: true,
            checkbox: false,

            startDateWorklog: moment(new Date(new Date().getFullYear(), new Date().getMonth(), 1)).format("YYYY-MM-DD"),
            startDateWorklogPicker: false,
            
            endDateWorklog: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            endDateWorklogPicker: false,
        };
    },
    watch: {
        isUpdating (val) {
          if (val) {
            setTimeout(() => (this.isUpdating = false), 3000)
          }
        },
    },
    async mounted(){
        this.$eventBus.$emit('show-spinner', true);
        

        this.$eventBus.$emit('show-spinner', false);
    },
    methods: {
        onClose() {
            this.$emit('on-close',12);
        },
        onConfirmExport () {
            if(this.$refs.form.validate()){
                const params = {
                    startDate: this.startDateWorklog,
                    endDate: this.endDateWorklog
                }

                this.$emit('on-export-worklog-employee', params);
            }
        },
        reset () {
            this.$refs.form.reset()
        },
        resetValidation () {
            this.$refs.form.resetValidation()
        },

        getAvatar,

        async onSelectStartDateWorklog(date){
            console.log('startDAte', date);
            this.startDateWorklog = date
            const params = {
                startDate: this.startDateWorklog,
                endDate: this.endDateWorklog,
            }
        },
        async onSelectEndDateWorklog(date){
            console.log('endDAte', date);
            this.endDateWorklog = date
            const params = {
                startDate: this.startDateWorklog,
                endDate: this.endDateWorklog,
            }
        },
    },
}