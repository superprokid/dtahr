/* eslint-disable */
import SessionUtls from '../../../services/SessionUtls';
import AdminGroupServices from "../../../services/API/AdminGroup/AdminGroupServices"
import { getDateString } from "../../../services/utilities";

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
                    width: 150,
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
     mounted() {
        this.$eventBus.$emit('show-spinner', true);
        this._getGroupCompany()
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
            // const params = {
            //     groupId: this.selected[0].group_id
            // }
            // const response = await AdminGroupServices.deleteGroup(params);
            // if(!response){
            //     this.$router.push('/admin/login')
            // } else if(response == -1){
            //     alert('Some thing wrong! Call Fail')
            // }
            // else {
            //     console.log('delete Group Successfully');
            //     this._getGroupCompany()
            //     this.selected = []
            //     this.DeleteGroupSuccessDialogShowed = true;
            // }
        },

        async onConfirmDeleteGroup(param){
            if(param == 'confirm'){
                this.ConfirmDeleteGroupDialogShowed = false;
                const params = {
                    groupId: this.selected[0].group_id
                }
                const response = await AdminGroupServices.deleteGroup(params);
                if(!response){
                    this.$router.push('/admin/login')
                } else if(response == -1){
                    alert('Some thing wrong! Call Fail')
                }
                else {
                    this._getGroupCompany()
                    this.selected = []
                    this.DeleteGroupSuccessDialogShowed = true;
                }
            }
        },

        async _getGroupCompany(){
            const response = await AdminGroupServices.getGroupAdmin();
            if(!response){
                this.$router.push('/admin/login')
            } else if(response == -1){
                alert('Some thing wrong! Call Fail')
            }
            else {
                this.listGroup = response.data.map((item) => {
                    return {...item, manager_start_date: getDateString(item.manager_start_date)}
                })
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
                alert('Some thing wrong! Call Fail')
            }
            else {
                this.AddGroupDialogShowed = false;
                this._getGroupCompany()
                this.addGroupSuccessInfo = params
                this.AddGroupSuccessDialogShowed = true;
            }
        },

        async onEditGroup(params){
            const response = await AdminGroupServices.editGroup(params);
            if(!response){
                this.$router.push('/admin/login')
            } else if(response == -1){
                alert('Some thing wrong! Call Fail')
            }
            else {
                this.EditGroupDialogShowed = false;
                this.selected = []
                this._getGroupCompany()

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
                alert('Some thing wrong! Call Fail')
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
    },

    beforeCreate() {
        SessionUtls.setItem(SessionUtls.tabNameKey, tabName.groupAdmin);
    },

}