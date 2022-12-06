/* eslint-disable */
import SessionUtls from '../../../services/SessionUtls';
import AdminGroupServices from "../../../services/API/AdminGroup/AdminGroupServices"
import AdminUserDetailServices from '../../../services/API/AdminUserDetailAPI/AdminUserDetailServices';
import { getDateString, getAvatar, getDateStringWithFormat } from "../../../services/utilities";
import AdminCSVServices from "../../../services/API/CSVExportAPI/CSVExport.services"

import tabName from '../../../config/tabname';

import Table from "../../../components/Table/Table.vue"
import AddHoliday from '@/components/AddHoliday/AddHoliday.vue';

import AddGroupModal from "../../../components/AddGroupModal/AddGroupModal.vue"
import EditGroupModal from "../../../components/EditGroupModal/EditGroupModal.vue"

import AdminEmployeeManagement from "../AdminEmployeeManagement/AdminEmployeeManagement.vue"
import AddGroupSuccessModal from "../../../components/AddGroupSuccessModal/AddGroupSuccessModal.vue"
import EditGroupSuccessModal from "../../../components/EditGroupSuccessModal/EditGroupSuccessModal.vue"
import DeleteGroupSuccessModal from "../../../components/DeleteGroupSuccessModal/DeleteGroupSuccessModal.vue"
import ConfirmDeleteGroupModal from "../../../components/ConfirmDeleteGroupModal/ConfirmDeleteGroupModal.vue"

import CreateUserModal from "../../../components/CreateUserModal/CreateUserModal.vue"
import CreateUserSuccessModal from "../../../components/CreateUserSuccessModal/CreateUserSuccessModal.vue"

import ConfirmDeleteUserModal from "../../../components/ConfirmDeleteUserModal/ConfirmDeleteUserModal.vue"

import ChangeUserRoleModal from "../../../components/ChangeUserRoleModal/ChangeUserRoleModal.vue"
import ChangeUserGroupModal from "../../../components/ChangeUserGroupModal/ChangeUserGroupModal.vue"

import ExportEmployeeWorklogModal from "../../../components/ExportEmployeeWorklogModal/ExportEmployeeWorklogModal.vue"
import ImportEmployeeModal from "../../../components/ImportEmployeeModal/ImportEmployeeModal.vue"

export default {
    name: "AdminGroup",
    components: {
        Table,
        AddHoliday,
        AddGroupModal,
        EditGroupModal,
        AddGroupSuccessModal,
        DeleteGroupSuccessModal,
        ConfirmDeleteGroupModal,
        EditGroupSuccessModal,
        CreateUserModal,
        CreateUserSuccessModal,
        ConfirmDeleteUserModal,
        ChangeUserRoleModal,
        ChangeUserGroupModal,
        ExportEmployeeWorklogModal,
        ImportEmployeeModal,
        // views
        AdminEmployeeManagement,
    },
    props: {

    },

    data() {
        return {
            addGroupSuccessInfo: {},
            editGroupSuccessInfo: {},
            confirmDeleteInfo: {},

            singleSelect: false,
            selected: [],
            
            search: '',
            listGroup: [],

            //Modal of add, edit modal
            isAddGroupShowed: false,
            AddHolidayDialog: false,
            EditWorklogDialog: false,

            AddGroupDialogShowed: false,
            EditGroupDialogShowed: false,
            showDialog:false,

            editDialogProp: {},

            isAdminGroupManagementShowed: true,
            isAdminEmployeeManagementShowed: false,

            groupRowSelectedProp: {},

            AddGroupSuccessDialogShowed: false,
            DeleteGroupSuccessDialogShowed: false,
            EditGroupSuccessDialogShowed: false,

            ConfirmDeleteGroupDialogShowed: false,

            // Admin employee management
            searchAdminEmployeeManagement: '',
            listUsersOfSpecificGroup: [],
            singleSelectEmployeeManagement: false,
            AdminEmployeeManagementSelected: [],

            CreateUserDialogShowed: false,
            CreateUserDialogSuccessShowed: false,

            createUserSuccessInfo: {},
            confirmDeleteUserInfo: {},
            ConfirmDeleteUserDialogShowed: false,

            ChangeUserRoleDialogShowed: false,
            changeUserRoleInfo: {},

            ChangeUserGroupDialogShowed: false,
            changeUserGroupInfo: {},

            ExportWorklogDialogShowed: false,

            importEmployeeDialogShowed: false,
            groupPropInfo: {},
            messageImportFail: '',
        }
    },
    computed: {
        headers() {
            return [
                {
                    text: 'Group ID',
                    align: 'start',
                    value: 'group_id',
                    // width: 120,
                },
                {
                    text: 'Group Name',
                    value: 'group_name',
                    // width: 120,
                },
                {
                    text: 'Group Full Name',
                    value: 'group_full_name',
                    // width: 120,
                },
                {
                    text: 'Manager ID',
                    value: 'manager_id',
                    // width: 120,
                },
                {
                    text: 'Manager Name',
                    value: 'manager_name',
                    // width: 120,
                },
                {
                    text: 'Manager Start Date',
                    value: 'manager_start_date',
                    // width: 120,
                },
                {
                    text: 'Number of People',
                    value: 'number',
                    // width: 120,
                },
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
                    width: 300,
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
                    text: "Job Role",
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
    async mounted() {
        this.$eventBus.$emit('show-spinner', true);
        await this._getGroupCompany()
        this.$eventBus.$emit('show-spinner', false);
    },
    watch: {
        loader () {
          const l = this.loader
          this[l] = !this[l]
  
          setTimeout(() => (this[l] = false), 3000)
  
          this.loader = null
        },
    },
    methods: {
        getAvatar,
        testmethod(data){
            console.log(data);
            // call api here
        },
        setItemRowCLass(){
            return 'item-row'
        },
        onClickEditGroup(){
            this.editDialogProp = this.selected[0]

            this.EditGroupDialogShowed = true
        },
        async onClickDeleteGroup(){
            this.confirmDeleteInfo = this.selected[0]

            this.ConfirmDeleteGroupDialogShowed = true;
        },

        async onConfirmDeleteGroup(param){
            if(param == 'confirm'){
                this.ConfirmDeleteGroupDialogShowed = false;
                const params = {
                    groupId: this.selected[0].group_id
                }
                const response = await AdminGroupServices.deleteGroup(params);
                this.selected = []
                if(!response){
                    this.$router.push('/admin/login')
                } else if(response == -1){
                    this.$toast.open({
                        message: "Delete Group Fail",
                        type: "error",
                        duration: 2000,
                        dismissible: true,
                        position: "top-right",
                    })
                    return
                }
                else {
                    this.$toast.open({
                        message: "Delete Group Success",
                        type: "success",
                        duration: 2000,
                        dismissible: true,
                        position: "top-right",
                    })
                    await this._getGroupCompany()            
                    this.DeleteGroupSuccessDialogShowed = true;
                }
            }
        },

        async _getGroupCompany(){
            const response = await AdminGroupServices.getGroupAdmin();
            if(!response){
                this.$router.push('/admin/login')
            } else if(response == -1){
                this.$toast.open({
                    message: "Get Groups Fail",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })
                return
            }
            else {
                this.listGroup = response.data.map((item) => {
                    return {...item, manager_start_date: getDateString(item.manager_start_date)}
                })
                console.log(this.listGroup);
            }
        },

        filterOnlyCapsText(value, search, item) {
            item - 1;
            return value != null &&
                search != null &&
                typeof value === 'string' &&
                value.toString().toLocaleUpperCase().indexOf(search.toLocaleUpperCase()) !== -1
        },

        onClose(screen) {
            if(screen == 1){
                this.AddGroupDialogShowed = false;
            }
            else if(screen == 2){
                this.EditGroupDialogShowed = false;
            }else if(screen == 3){
                this.AddGroupSuccessDialogShowed = false;
            }else if(screen == 4){
                this.DeleteGroupSuccessDialogShowed = false;
            }else if(screen == 5){
                this.ConfirmDeleteGroupDialogShowed = false;
            }else if(screen == 6){
                this.EditGroupSuccessDialogShowed = false;
            }else if(screen == 7){
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
            }else if(screen == 13){
                this.importEmployeeDialogShowed = false;
                this.messageImportFail = '';
            }
            
        },

        openAddGroupModal(){
            this.AddGroupDialogShowed = true;
        },

        async onCreateGroup(params){
            const response = await AdminGroupServices.createGroup(params);
            if(!response){
                this.$router.push('/admin/login')
            } else if(response == -1){
                this.$toast.open({
                    message: "Create Group Fail",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })
                return
            }
            else {          
                this.$toast.open({
                    message: "Create Group Success",
                    type: "success",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })
                this.AddGroupDialogShowed = false;
                await this._getGroupCompany()
                this.addGroupSuccessInfo = params
                this.AddGroupSuccessDialogShowed = true;
            }
        },

        async onEditGroup(params){
            const response = await AdminGroupServices.editGroup(params);
            this.selected = []
            if(!response){
                this.$router.push('/admin/login')
            } else if(response == -1){
                this.$toast.open({
                    message: "Edit Group Fail",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })
                return
            }
            else {
                this.EditGroupDialogShowed = false;
                this.selected = []
                await this._getGroupCompany()
                this.$toast.open({
                    message: "Edit Group Success",
                    type: "success",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })
                this.editGroupSuccessInfo = params;
                this.EditGroupSuccessDialogShowed = true;
            }
        },

        
        onClickGroupRow(groupRowSelected){
            this.isAdminEmployeeManagementShowed = true;
            this.groupRowSelectedProp = groupRowSelected
            this._getEmployeeOfSpecificGroup()
            this.isAdminGroupManagementShowed = false;
        },
        goBackGroupManagementLayout(){
            this.isAdminEmployeeManagementShowed = false;
            this.isAdminGroupManagementShowed = true;
            this._getGroupCompany()
        },

        onClickTestNotiModal(){
            this.AddGroupSuccessDialogShowed = true;
        },

        async _getEmployeeOfSpecificGroup(){
            const params = {
                groupId: this.groupRowSelectedProp.group_id
            }
            const response = await AdminGroupServices.getAllUserOfSpecificGroup(params);
            if(!response){
                this.$router.push('/admin/login')
            } else if(response == -1){
                this.$toast.open({
                    message: "Get Employee of Group Fail",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })
                return
            }
            else {
                this.listUsersOfSpecificGroup = response.data.map((item) => {
                    return {...item, dob: getDateString(item.dob), gender: item.gender == 0 ? 'Male' : item.gender == 1 ? 'Female' : 'Other', join_date: getDateString(item.join_date)}
                })
            }
        },

        onClickCreateUser(){
            this.CreateUserDialogShowed = true
        },

        async onCreateUser(params){
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
            this._getEmployeeOfSpecificGroup()
            this.CreateUserDialogShowed = false

            // transfer props here
            const allProps = Object.assign({}, this.groupRowSelectedProp, params, response.data);
            this.createUserSuccessInfo = allProps
            this.CreateUserDialogSuccessShowed = true
        },

        onClickDeleteUser(){
            
            this.confirmDeleteUserInfo = this.AdminEmployeeManagementSelected[0]
            this.ConfirmDeleteUserDialogShowed = true;
        },

        async onConfirmDeleteUser(param){
            if(param == 'confirm'){
                this.ConfirmDeleteUserDialogShowed = false;
                const params = {
                    employeeId: this.AdminEmployeeManagementSelected[0].employee_id
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
                    this.AdminEmployeeManagementSelected = []
                    return
                }
                else {
                    this._getEmployeeOfSpecificGroup()
                    this.AdminEmployeeManagementSelected = []
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

        onClickUserRow(userRowSelected){
            console.log('userRowSelected', userRowSelected);
            this.$router.push('/admin/userdetail/'+userRowSelected.employee_id);
        },

        onClickChangeRoleUser(){
            this.changeUserRoleInfo = this.AdminEmployeeManagementSelected[0]
            this.ChangeUserRoleDialogShowed = true
        },

        async onChangeUserRole(params){
            const response = await AdminUserDetailServices.adminUpdatePersonalUserInfo(params)
            this.AdminEmployeeManagementSelected = []
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
            await this._getEmployeeOfSpecificGroup()
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
            this.changeUserGroupInfo = this.AdminEmployeeManagementSelected[0]
            this.ChangeUserGroupDialogShowed = true
        },

        async onChangeUserGroup(params){
            const response = await AdminUserDetailServices.adminUpdatePersonalUserInfo(params)
            this.AdminEmployeeManagementSelected = []
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
            await this._getEmployeeOfSpecificGroup()
            this.$toast.open({
                message: "Change User Group Success",
                type: "success",
                duration: 2000,
                dismissible: true,
                position: "top-right",
            })
            this.ChangeUserGroupDialogShowed = false
        },

        async onClickExportGroup(){
            let listGroupTemp = this.selected.map((item)=> item.group_id)
            const params = {
                listGroup: listGroupTemp
            }
            const response = await AdminCSVServices.exportGroupCSV(params)
            this.selected = []
            if(!response){
                this.$router.push('/admin/login')
            } else if(response == -1){
                this.$toast.open({
                    message: "Export Group Fail",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })             
                return
            }
            // success
            let name = `Group-Information.xlsx`;
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

        async onClickExportEmployee(){
            let listEmployeeTemp = this.AdminEmployeeManagementSelected.map((item)=> item.employee_id)
            const params = {
                listEmployee: listEmployeeTemp
            }
            const response = await AdminCSVServices.exportEmployeeCSV(params)
            this.AdminEmployeeManagementSelected = []
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
            let listEmployeeTemp = this.AdminEmployeeManagementSelected.map((item)=> item.employee_id)
            params.listEmployee = listEmployeeTemp

            const response = await AdminCSVServices.exportWorklogEmployeeCSV(params)
            this.AdminEmployeeManagementSelected = []
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
        },

        onClickImportEmployee(){
            this.groupPropInfo = this.selected[0]
            this.importEmployeeDialogShowed = true

        },

        async onImportEmployee(form){
            console.log('form', form);
            const response = await AdminGroupServices.adminImportEmployee(form)
            this.selected = []
            if(!response){
                this.$router.push('/admin/login')
            } else if(response == -1){
                this.$toast.open({
                    message: "Import Employee Fail",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })             
                return
            }
            if(response.failed){
                this.messageImportFail = response.message
                return
            }
            this.$toast.open({
                message: "Import Employee Success",
                type: "success",
                duration: 2000,
                dismissible: true,
                position: "top-right",
            })
            this.importEmployeeDialogShowed = false;
            this.$eventBus.$emit('show-spinner', true);
            await this._getGroupCompany()
            this.$eventBus.$emit('show-spinner', false);
        }
    },

    beforeCreate() {
        SessionUtls.setItem(SessionUtls.tabNameKey, tabName.groupAdmin);
    },

}