/* eslint-disable */
import moment from 'moment';

import { getDateString, getTimeString, getAvatar } from "../../services/utilities";

export default {
    name: 'DeleteEmployeeOutProjectModal',
    components: {
    },
    props: {
        confirmDeleteInfo:{
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    data() {
        return {
            valid: true,
            checkbox: false,
        };
    },
    mounted(){
        console.log('confirmDeleteInfo', this.confirmDeleteInfo);
    },
    methods: {
        getAvatar,
        onClose() {
            this.$emit('on-close',2);
        },
        onConfirmDelete(){
            if(this.$refs.form.validate()){
                const params = {
                    employeeId: this.confirmDeleteInfo.employee_id
                }
                this.$emit('on-delete-employee-out-project', params)
            }
        },
        validate () {
            this.$refs.form.validate()
        },
    },
}