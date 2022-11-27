/* eslint-disable */ 
import { getDateString } from "../../../services/utilities";

import AdminUserManagementService from "../../../services/API/AdminUserManagement/AdminUserManagement.service";
import AdminGroupServices from "../../../services/API/AdminGroup/AdminGroupServices"

//Test History
import moment from 'moment';

import { mapState } from 'vuex'

import SessionUtls from '../../../services/SessionUtls';
import tabName from '../../../config/tabname';
import { REAL_TIME_TRACKING_SCREEN } from "../../../config/screenName";

import {USER_GET_IMAGE} from '../../../config/constant'

export default {
    name: "AdminUserManagement",
    components: {

    },
    data() {
        return {
            full_name:'',
            valid: true,
            userSelected: undefined,
            search: '',
            listUsers: [],

            employeeSearchShowed: true,
            employeeManagementShowed: false,
            
            avtBaseUrl: USER_GET_IMAGE,

            listGroups: [],
            selectGroup: {},

            emailSearch: '',
            emailSearchRules: [
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],

            fullnameSearch: '',
            genderSearch: undefined,
            phoneSearch: '',
            mainSkillSearch: '',
            jobRoleSearch: '',
            genderItems: [
                {
                    gender_text: "Male",
                    gender_value: 0
                },
                {
                    gender_text: "Female",
                    gender_value: 1
                },
                {
                    gender_text: "Other",
                    gender_value: 2
                }
            ],

            expand: true,

            filters: {
                full_name: '',
                email: '',
                gender: '',
            },
        }
    },
    computed: {
        ...mapState(["startDataUser"]),
        headers() {
            return [
                {
                    text: 'Employee ID',
                    align: 'start',
                    value: 'employee_id',
                    width: 120,
                },
                {
                    text: 'Full Name',
                    value: 'full_name',
                    width: 200,
                },
                {
                    text: 'Email',
                    value: 'email',
                    width: 200,
                },
                {
                    text: "DOB",
                    value: 'dob',
                    width: 150,
                },
                {
                    text: "Gender",
                    value: 'gender',
                },
                {
                    text: "Phone",
                    value: 'phone',
                    width: 100,
                },
                {
                    text: "Main Skill",
                    value: 'main_skill',
                },
                {
                    text: "Job Role",
                    value: 'job_role',
                },
                {
                    text: "Join Date",
                    value: 'join_date',
                    width: 200,
                },
                // {
                //     text: "Working in Projects",
                //     value: 'projects'
                // }
            ]
        },
    },

    filters: {
        holidayDisplay(value) {
            return value ? value.toFixed(3) : 0 
        },
        dateFormatDisplay(value){
            return moment(value).format("YYYY-MM-DD")
        }
    },

    async mounted() {
        this.$eventBus.$emit('show-spinner', true);
        await this._getListUser();
        await this.getAllGroup()
        this.$eventBus.$emit('show-spinner', false);
    },
    methods: {
        reset () {
            this.$refs.form.reset()
        },

        setItemRowCLass(item) {
            return 'item-row';
        },

        filterOnlyCapsText(value, search, item) {
            item - 1;
            return value != null &&
                search != null &&
                typeof value === 'string' &&
                value.toString().toLocaleUpperCase().indexOf(search.toLocaleUpperCase()) !== -1
        },

        async _getListUser() {
            const response = await AdminUserManagementService.getAllUser()
            if (!response) {
                this.$router.push('/user/login');
                return;
            }
            this.listUsers = response.data.listEmployees.map(item => {
                return {...item,  dob: getDateString(item.dob), gender: item.gender == 0 ? 'Male' : 'Female', join_date: getDateString(item.join_date)}
            })
        },


        async clickOnUser(userSelected){
            this.$router.push('/admin/userdetail/'+ userSelected.employee_id);
        },

        goBackEmployeeSearch(){
            this.employeeSearchShowed = true
            this.employeeManagementShowed = false
        },

        async getAllGroup(){
            const response = await AdminGroupServices.getGroupAdmin()
            if(!response){
                this.$router.push('/admin/login')
                return
            } else if(response == -1){
                this.$toast.open({
                    message: "Get group Fail",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })
                return
            }
            this.listGroups = response.data
            return this.listGroups
        },

        onChangeGroup(value){
            console.log(value);
            this.selectGroup = value
        },
        onClickSearchEmployee(){
            console.log('search employee');
            const params = {
                groupId : this.selectGroup.group_id,
                email: this.emailSearch,
                fullName: this.fullnameSearch,
                gender: this.genderSearch,
                phone: this.phoneSearch,
                mainSkill: this.mainSkillSearch,
                jobRole: this.jobRoleSearch
            }
            console.log('params for search', params);
        },

    },

    beforeCreate() {
        SessionUtls.setItem(SessionUtls.tabNameKey, tabName.userAdmin);
    },
}