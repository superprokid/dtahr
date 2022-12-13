/* eslint-disable */ 
import { getDateString, getAvatar, getDateStringWithFormat } from "../../../services/utilities";

import AdminUserManagementService from "../../../services/API/AdminUserManagement/AdminUserManagement.service";
import AdminGroupServices from "../../../services/API/AdminGroup/AdminGroupServices"
import AdminUserDetailServices from "../../../services/API/AdminUserDetailAPI/AdminUserDetailServices"
import AdminCSVServices from "../../../services/API/CSVExportAPI/CSVExport.services"

//Test History
import moment from 'moment';

import { mapState } from 'vuex'

import SessionUtls from '../../../services/SessionUtls';
import tabName from '../../../config/tabname';
import { REAL_TIME_TRACKING_SCREEN } from "../../../config/screenName";

import {USER_GET_IMAGE} from '../../../config/constant'

import CreateUserModal from "../../../components/CreateUserModal/CreateUserModal.vue"
import CreateUserSuccessModal from "../../../components/CreateUserSuccessModal/CreateUserSuccessModal.vue"

import ConfirmDeleteUserModal from "../../../components/ConfirmDeleteUserModal/ConfirmDeleteUserModal.vue"
import AddNewUserModal from "../../../components/AddNewUserModal/AddNewUserModal.vue"


import ChangeUserRoleModal from "../../../components/ChangeUserRoleModal/ChangeUserRoleModal.vue"
import ChangeUserGroupModal from "../../../components/ChangeUserGroupModal/ChangeUserGroupModal.vue"

import ExportEmployeeWorklogModal from "../../../components/ExportEmployeeWorklogModal/ExportEmployeeWorklogModal.vue"


export default {
    name: "AdminUserManagement",
    components: {
        CreateUserModal,
        CreateUserSuccessModal,
        ConfirmDeleteUserModal,
        AddNewUserModal,
        ChangeUserRoleModal,
        ChangeUserGroupModal,
        ExportEmployeeWorklogModal,
    },
    data() {
        return {
            full_name:'',
            valid: true,
            userSelected: [],
            search: '',
            listUsers: [],
            listFiltered: [],

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

            genderArray:[
                'Male', 'Female', 'Other'
            ],

            singleSelectEmployeeManagement: false,

            CreateUserDialogShowed: false,
            groupRowSelectedProp: {},

            CreateUserDialogSuccessShowed: false,
            createUserSuccessInfo: {},

            ConfirmDeleteUserDialogShowed: false,
            confirmDeleteUserInfo: {},

            changeUserRoleInfo: {},
            ChangeUserRoleDialogShowed: false,

            changeUserGroupInfo: {},
            ChangeUserGroupDialogShowed: false,

            ExportWorklogDialogShowed: false,
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
        AdminEmployeeManagementHeaders(){
            return [
                {
                    text: 'Employee ID',
                    align: 'start',
                    value: 'employee_id',
                    width: 120,
                },
                {
                    text: 'Status',
                    value: 'is_deleted',
                    width: 120,
                },
                {
                    text: 'Full Name',
                    value: 'full_name',
                    width: 250,
                },
                {
                    text: 'Group',
                    value: 'group_name',
                    width: 120,
                },
                {
                    text: "Gender",
                    value: 'gender',
                    width: 100,
                },
                {
                    text: 'Employer ID',
                    value: 'employer_id',
                    width: 120,
                },
                {
                    text: 'Employer Full Name',
                    value: 'employer_full_name',
                    width: 200,
                },
                {
                    text: "Main Skill",
                    value: 'main_skill',
                    width: 120,
                },
                {
                    text: "Sub Skill",
                    value: 'sub_skill',
                    width: 120,
                },
                {
                    text: "Position",
                    value: 'job_role',
                    width: 120,
                },
                {
                    text: "DOB",
                    value: 'dob',
                    width: 150,
                },
                {
                    text: "Phone",
                    value: 'phone',
                    width: 120,
                },
                {
                    text: 'Email',
                    value: 'email',
                    width: 200,
                },
                {
                    text: 'Address',
                    value: 'address',
                    width: 200,
                },
                {
                    text: "Join Date",
                    value: 'join_date',
                    width: 150,
                },
                {
                    text: "Bank Name",
                    value: 'bank_name',
                    width: 150,
                },
                {
                    text: "Bank Account",
                    value: 'bank_account',
                    width: 200,
                },

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
        onClose(screen) {
            if(screen == 7){
                this.CreateUserDialogShowed = false;
            }else if(screen == 8){
                this.CreateUserDialogSuccessShowed = false;
            }else if(screen == 9){
                this.ConfirmDeleteUserDialogShowed = false;
            }else if(screen == 10){
                this.ChangeUserRoleDialogShowed = false;
            }else if(screen == 11){
                this.ChangeUserGroupDialogShowed = false;
            }else if(screen == 12){
                this.ExportWorklogDialogShowed = false;
            }
        },
        getAvatar,
        reset () {
            this.$refs.form.reset();
            this.onClickSearchEmployee();
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
            const listResposne = response.data.listEmployees.map(item => {
                return {...item,  dob: getDateString(item.dob), gender: this.genderArray[item.gender], join_date: getDateString(item.join_date)}
            })
            this.listUsers = [...listResposne];
            this.listFiltered = [...listResposne];
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
            this.listFiltered = this.listUsers.filter(item => {
                if (this.selectGroup?.group_id && this.selectGroup?.group_id != item.group_id) {
                    return false;
                }
                if (this.emailSearch) {
                    if (!String(item.email).toLowerCase().includes(String(this.emailSearch).toLowerCase())) {
                        return false;
                    }
                }
                if (this.fullnameSearch) {
                    if (!String(item.full_name).toLowerCase().includes(String(this.fullnameSearch).toLowerCase())) {
                        return false;
                    }
                }
                if (this.genderSearch && this.genderSearch != item.gender) {
                    return false;
                }
                if (this.phoneSearch) {
                    if (!String(item.phone).toLowerCase().includes(String(this.phoneSearch).toLowerCase())) {
                        return false;
                    }
                }
                if (this.mainSkillSearch) {
                    if (!String(item.main_skill).toLowerCase().includes(String(this.mainSkillSearch).toLowerCase())) {
                        return false;
                    }
                }
                if (this.jobRoleSearch) {
                    if (!String(item.job_role).toLowerCase().includes(String(this.jobRoleSearch).toLowerCase())) {
                        return false;
                    }
                }
                return true;
            })
        },

        onClickCreateUser(){
            this.CreateUserDialogShowed = true
        },

        async onCreateUser(params, group_info){
            const response = await AdminGroupServices.adminCreateUser(params)
            if(!response){
                this.$router.push('/admin/login')
            } else if(response == -1){
                this.$toast.open({
                    message: "Create User Fail",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })
                return
            }
            this.$toast.open({
                message: "Create User Success",
                type: "success",
                duration: 2000,
                dismissible: true,
                position: "top-right",
            })
            await this._getListUser();
            await this.getAllGroup()
            this.CreateUserDialogShowed = false

            // transfer props here
            const allProps = Object.assign({}, group_info, params, response.data);
            this.createUserSuccessInfo = allProps
            this.CreateUserDialogSuccessShowed = true
        },
        onClickDeleteUser(){
            
            this.confirmDeleteUserInfo = this.userSelected[0]
            this.ConfirmDeleteUserDialogShowed = true;
        },
        async onConfirmDeleteUser(param){
            if(param == 'confirm'){
                this.ConfirmDeleteUserDialogShowed = false;
                const params = {
                    employeeId: this.userSelected[0].employee_id
                }
                const response = await AdminGroupServices.adminDeleteUser(params);
                if(!response){
                    this.$router.push('/admin/login')
                } else if(response == -1){
                    this.$toast.open({
                        message: "Delete User Fail",
                        type: "error",
                        duration: 2000,
                        dismissible: true,
                        position: "top-right",
                    })
                    this.userSelected = []
                    return
                }
                else {
                    await this._getListUser();
                    await this.getAllGroup()
                    this.userSelected = []
                    this.$toast.open({
                        message: "Delete User Success",
                        type: "success",
                        duration: 2000,
                        dismissible: true,
                        position: "top-right",
                    })
                }
            }
        },

        onClickChangeRoleUser(){
            this.changeUserRoleInfo = this.userSelected[0]
            this.ChangeUserRoleDialogShowed = true
        },

        async onChangeUserRole(params){
            const response = await AdminUserDetailServices.adminUpdatePersonalUserInfo(params)
            this.userSelected = []
            if(!response){
                this.$router.push('/admin/login')
            } else if(response == -1){
                this.$toast.open({
                    message: "Change User Role Fail",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })             
                return
            }
            await this._getListUser();
            await this.getAllGroup()
            this.$toast.open({
                message: "Change User Role Success",
                type: "success",
                duration: 2000,
                dismissible: true,
                position: "top-right",
            })
            this.ChangeUserRoleDialogShowed = false
        },
        onClickChangeGroupUser(){
            this.changeUserGroupInfo = this.userSelected[0]
            this.ChangeUserGroupDialogShowed = true
        },

        async onChangeUserGroup(params){
            const response = await AdminUserDetailServices.adminUpdatePersonalUserInfo(params)
            this.userSelected = []
            if(!response){
                this.$router.push('/admin/login')
            } else if(response == -1){
                this.$toast.open({
                    message: "Change User Group Fail",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })             
                return
            }
            await this._getListUser();
            await this.getAllGroup()
            this.$toast.open({
                message: "Change User Group Success",
                type: "success",
                duration: 2000,
                dismissible: true,
                position: "top-right",
            })
            this.ChangeUserGroupDialogShowed = false
        },

        async onClickExportEmployee(){
            let listEmployeeTemp = this.userSelected.map((item)=> item.employee_id)
            const params = {
                listEmployee: listEmployeeTemp
            }
            const response = await AdminCSVServices.exportEmployeeCSV(params)
            this.userSelected = []
            if(!response){
                this.$router.push('/admin/login')
            } else if(response == -1){
                this.$toast.open({
                    message: "Export Employee Fail",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })             
                return
            }
            // success
            let name = `Employee-Information.xlsx`;
            if (window.navigator.msSaveBlob) {
                window.navigator.msSaveBlob(response.data, name);
            } else {
                let url = window.URL.createObjectURL(response.data);
                let a = document.createElement('a');
                a.href = url;
                a.download = name;
                a.target = '_blank';
                a.click();
            }
        },

        onClickExportWorklog(){

            this.ExportWorklogDialogShowed = true
        },

        async onExportWorklogEmployee(params){
            let listEmployeeTemp = this.userSelected.map((item)=> item.employee_id)
            params.listEmployee = listEmployeeTemp

            const response = await AdminCSVServices.exportWorklogEmployeeCSV(params)
            this.userSelected = []
            if(!response){
                this.$router.push('/admin/login')
            } else if(response == -1){
                this.$toast.open({
                    message: "Export Worklog Fail",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })             
                return
            }
            // success
            let name = `Worklog ${getDateStringWithFormat(params.startDate, "YYYYMMDD")}-${getDateStringWithFormat(params.endDate, "YYYYMMDD")}.xlsx`;
            if (window.navigator.msSaveBlob) {
                window.navigator.msSaveBlob(response.data, name);
            } else {
                let url = window.URL.createObjectURL(response.data);
                let a = document.createElement('a');
                a.href = url;
                a.download = name;
                a.target = '_blank';
                a.click();
            }
        }
    },

    beforeCreate() {
        SessionUtls.setItem(SessionUtls.tabNameKey, tabName.userAdmin);
    },
}