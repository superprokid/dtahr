/* eslint-disable */
import DateTimePicker from '@/components/DateTimePicker/DateTimePicker.vue'
import Input from '@/components/Input/Input.vue';

import AdminGroupServices from "../../services/API/AdminGroup/AdminGroupServices"

import moment from 'moment';

import { getAvatar, getDateString, getTimeString, isPastDate} from "../../services/utilities";
import AdminUserManagementService from "../../services/API/AdminUserManagement/AdminUserManagement.service"

export default {
    name: 'ChangeUserRoleModal',
    components: {
        DateTimePicker,
        Input,
    },
    props: {
        changeUserRoleInfo:{
            type: Object,
            default: {},
        },
    },
    data() {
        return {
            valid: true,
            
            roleChange: '',
            roles: [
                {
                    text: 'Employee',
                    value: 0,
                },
                {
                    text: 'Manager',
                    value: 1,
                },
            ]

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
        this.roleChange = this.roles[this.changeUserRoleInfo.role].value
        this.$eventBus.$emit('show-spinner', false);
    },
    methods: {
        onClose() {
            this.$emit('on-close', 10);
        },
        onChangeUserRole () {
            if(this.$refs.form.validate()){
                const params = {
                    employeeId: this.changeUserRoleInfo.employee_id,
                    role: this.roleChange
                }

                this.$emit('on-change-user-role', params);
            }
        },
        reset () {
            this.$refs.form.reset()
        },
        resetValidation () {
            this.$refs.form.resetValidation()
        },

        remove (item) {
            this.managerSelect.splice(this.managerSelect.indexOf(item), 1)
        },
        getAvatar,

    },
}