/* eslint-disable */
import DateTimePicker from '@/components/DateTimePicker/DateTimePicker.vue'
import Input from '@/components/Input/Input.vue';

import AdminGroupServices from "../../services/API/AdminGroup/AdminGroupServices"

import moment from 'moment';

import { getAvatar, getDateString, getTimeString, isPastDate} from "../../services/utilities";
import AdminUserManagementService from "../../services/API/AdminUserManagement/AdminUserManagement.service"

export default {
    name: 'EditProjectModal',
    components: {
        DateTimePicker,
        Input,
    },
    props: {
        editProjectInfo:{
            type: Object,
            default: {},
        },
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
                // v => v.length > 0 || 'Manager is required',
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
    async mounted(){
        this.$eventBus.$emit('show-spinner', true);
        this.projectName = this.editProjectInfo.project_name
        this.clientName = this.editProjectInfo.client_id
        this.projectCreationDate = this.editProjectInfo.project_manager_assigned_date
        // Initial Manager for autocomplete manager
        const tempUsers = await this.getListUser()
        for (let index = 0; index < tempUsers.length; index++) {
            const element = tempUsers[index];
            if(element.employee_id == this.editProjectInfo.project_manager_id){
                this.manager = element.employee_id
                break
            }
        }

        this.$eventBus.$emit('show-spinner', false);
    },
    methods: {
        onClose() {
            this.$emit('on-close',2);
        },
        onClickEditProject () {
            if(this.$refs.form.validate()){
                const params = {
                    projectId: this.editProjectInfo.project_id
                }
                if(this.projectName != this.editProjectInfo.project_name) params.projectName = this.projectName
                if(this.clientName != this.editProjectInfo.client_id) params.client = this.clientName
                if(this.projectCreationDate != this.editProjectInfo.project_manager_assigned_date) params.projectManagerStartDate = this.projectCreationDate
                if(this.manager != this.editProjectInfo.project_manager_id) params.projectManagerId = this.manager

                this.$emit('on-edit-project', params);
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