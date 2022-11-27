/* eslint-disable */
import DateTimePicker from '@/components/DateTimePicker/DateTimePicker.vue'
import Input from '@/components/Input/Input.vue';

import AdminGroupServices from "../../services/API/AdminGroup/AdminGroupServices"

import moment from 'moment';

import { getAvatar, getDateString, getTimeString, isPastDate} from "../../services/utilities";
import AdminUserManagementService from "../../services/API/AdminUserManagement/AdminUserManagement.service"

export default {
    name: 'AddProjectModal',
    components: {
        DateTimePicker,
        Input,
    },
    props: {
        
    },
    data() {
        return {
            valid: true,
            projectName: '',
            projectNameRules: [
                v => !!v || 'Project Name is required',
            ],
            clientName: '',
            clientNameRules: [
                v => !!v || 'Client Name is required',
            ],
            
            select: null,
            projectCreationDate: moment(new Date()).format("YYYY-MM-DD"),

            manager: [],
            managerRules: [
                v => !!v || 'Manager is required',
                v => v.length > 0 || 'Manager is required',
            ],
            isUpdating: false,

            employeeList: []


        };
    },
    watch: {
        isUpdating (val) {
          if (val) {
            setTimeout(() => (this.isUpdating = false), 3000)
          }
        },
    },
    mounted(){
        this.$eventBus.$emit('show-spinner', true);
        this.getListUser()
        this.$eventBus.$emit('show-spinner', false);
    },
    methods: {
        onClose() {
            this.$emit('on-close',1);
        },
        onClickCreateProject () {
            if(this.$refs.form.validate()){
                const params = {
                    projectName: this.projectName,
                    client: this.clientName,
                    projectManagerId: String(this.manager),
                    projectManagerStartDate: this.projectCreationDate
                }
                this.$emit('on-create-project', params);
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

        async getListUser() {
            const response = await AdminUserManagementService.getAllUser()
            if (!response) {
                this.$router.push('/admin/login');
                return;
            }else if(response == -1){
                this.$toast.open({
                    message: "Get Users Fail",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })
                return
            }
            this.employeeList = response.data.listEmployees.map(item => {
                return {...item,  dob: getDateString(item.dob), gender: item.gender == 0 ? 'Male' : 'Female', join_date: getDateString(item.join_date)}
            })
            return this.employeeList
        },
    },
}