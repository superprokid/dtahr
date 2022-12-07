/* eslint-disable */

import moment from 'moment';
import AdminUserManagementService from "../../services/API/AdminUserManagement/AdminUserManagement.service"
import AdminProjectDetailServices from "../../services/API/AdminProjectDetailAPI/AdmnProjectDetailServices"

import { getAvatar, getDateString, getTimeString, isPastDate} from "../../services/utilities";

export default {
    name: 'AddEmployeeToProjectModal',
    components: {
    },
    props: {
        projectIdProp:{
            type: String,
            default: ''
            // default: () => {
            //     return {}
            // }
        }
    },
    data() {
        return {
            // date : moment().subtract(1, "days").format("YYYY-MM-DD"),
            description: '',
            total: 0,

            valid: true,

            groupName: '',
            groupNameRules: [
                v => !!v || 'Group Name is required',
                v => (v && v.length <= 10) || 'Group Name must be less than 10 characters',
            ],

            groupFullName: '',
            groupFullNameRules: [
                v => !!v || 'Group Name is required',
                v => (v && v.length <= 100) || 'Group Full Name must be less than 100 characters',
            ],
            
            select: null,

            managerSelect: [],
            comboboxRules: [
                v => !!v || 'Manager is required',
            ],

            listFreeManager: [],


            employeeJoinedDate: moment(new Date()).format("YYYY-MM-DD"),
            employee: [],
            employeeRules: [
                v => !!v || 'Employee is required',
            ],
            isUpdating: false,
            genderArray:[
                'Male', 'Female', 'Other'
            ],
            employeeList: [],

            employeeSelectEventInfo: {},
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
        await this.getListUser()
        this.$eventBus.$emit('show-spinner', false);
    },
    methods: {
        getAvatar,
        onClose() {
            this.$emit('on-close',1);
        },
        reset () {
            this.$refs.form.reset()
        },
        resetValidation () {
            this.$refs.form.resetValidation()
        },
        async getListUser() {
            const params = {
                projectId: this.projectIdProp
            }
            const response = await AdminProjectDetailServices.adminGetAllUserInProjectExceptAssignees(params)
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
            this.employeeList = response.data.map(item => {
                return {...item,  dob: getDateString(item.dob), gender: this.genderArray[item.gender], join_date: getDateString(item.join_date)}
            })
            return this.employeeList
        },

        onClickAddEmployeeToProject(){
            if(this.$refs.form.validate()){
                const params = {
                    employeeId: this.employeeSelectEventInfo.employee_id,
                    projectId: this.projectIdProp
                }

                this.$emit('on-add-employee-to-project', params);
            }
        },

        onSelectEmployee(value){
            console.log('value', value);
            this.employeeSelectEventInfo = value
        }

    },
}