import SessionUtls from '../../../services/SessionUtls';
import AdminGroupServices from "../../../services/API/AdminGroup/AdminGroupServices"
import { getDateString } from "../../../services/utilities";

import tabName from '../../../config/tabname';

import Table from "../../../components/Table/Table.vue"
import AddHoliday from '@/components/AddHoliday/AddHoliday.vue';

export default {
    name: "AdminGroup",
    components: {
        Table,
        AddHoliday
    },
    props: {

    },

    data() {
        return {
            singleSelect: false,
            selected: [],
            
            search: '',
            listGroup: [],

            //Modal of add, edit modal
            isAddGroupShowed: false,
            AddHolidayDialog: false,
            EditWorklogDialog: false,
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
        onSelectGroup(items){
            this.selected = items
        },  
        onClickAddGroup(){
            console.log('add clicked');
            this.isAddGroupShowed = true;
        },
        onClickEditGroup(){
            console.log('edit clicked');
        },
        onClickDeleteGroup(){
            console.log('delete clicked');
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
            if(screen == 1)
                this.EditWorklogDialog = false;
            else if (screen == 2)
                this.AddHolidayDialog = false;
        },
    },

    beforeCreate() {
        SessionUtls.setItem(SessionUtls.tabNameKey, tabName.groupAdmin);
    },

}