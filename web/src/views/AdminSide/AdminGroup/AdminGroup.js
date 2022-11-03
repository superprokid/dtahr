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
    },
     mounted() {
        this.$eventBus.$emit('show-spinner', true);
        this._getGroupCompany()
        this.$eventBus.$emit('show-spinner', false);
    },

    methods: {
        setItemRowCLass(){
            return 'item-row'
        },
        onClickEditGroup(){
            this.editDialogProp = this.selected[0]
            console.log("this.editDialogProp",this.editDialogProp);

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
                    console.log('delete Group Successfully');
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
            }
        },

        openAddGroupModal(){
            this.AddGroupDialogShowed = true;
        },

        async onCreateGroup(params){
            console.log('params for create group', params);
            const response = await AdminGroupServices.createGroup(params);
            if(!response){
                this.$router.push('/admin/login')
            } else if(response == -1){
                alert('Some thing wrong! Call Fail')
            }
            else {
                console.log('Create Group Successfully');
                this.AddGroupDialogShowed = false;
                this._getGroupCompany()
                this.addGroupSuccessInfo = params
                this.AddGroupSuccessDialogShowed = true;
            }
        },

        async onEditGroup(params){
            console.log('params for edit group', params);
            const response = await AdminGroupServices.editGroup(params);
            if(!response){
                this.$router.push('/admin/login')
            } else if(response == -1){
                alert('Some thing wrong! Call Fail')
            }
            else {
                console.log('Edit Group Successfully');
                this.EditGroupDialogShowed = false;
                this.selected = []
                this._getGroupCompany()

                this.editGroupSuccessInfo = params;
                this.EditGroupSuccessDialogShowed = true;
            }
        },

        
        onClickGroupRow(groupRowSelected){
            console.log('item',groupRowSelected);
            this.isAdminEmployeeManagementShowed = true;
            this.groupRowSelectedProp = groupRowSelected
            this.isAdminGroupManagementShowed = false;
        },
        goBackGroupManagementLayout(){
            this.isAdminEmployeeManagementShowed = false;
            this.isAdminGroupManagementShowed = true;
        },

        onClickTestNotiModal(){
            this.AddGroupSuccessDialogShowed = true;
        },
    },

    beforeCreate() {
        SessionUtls.setItem(SessionUtls.tabNameKey, tabName.groupAdmin);
    },

}