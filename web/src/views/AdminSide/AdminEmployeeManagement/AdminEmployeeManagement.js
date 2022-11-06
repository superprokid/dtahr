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

export default {
    name: "AdminEmployeeManagement",
    components: {

    },
    props: {
        groupRowSelected: {
            type: Object,
            default: () => {
                return {}
            }
        },
    },

    data() {
        return {
            search: '',
            listUsersOfSpecificGroup: [],

            selected: [],
        }
    },
    computed: {
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
        this._getEmployeeOfSpecificGroup()
        this.$eventBus.$emit('show-spinner', false);
    },

    methods: {
        setItemRowCLass(){
            return 'item-row'
        },
        filterOnlyCapsText(value, search, item) {
            item - 1;
            return value != null &&
                search != null &&
                typeof value === 'string' &&
                value.toString().toLocaleUpperCase().indexOf(search.toLocaleUpperCase()) !== -1
        },

        async _getEmployeeOfSpecificGroup(){
            const params = {
                groupId: this.groupRowSelected.group_id
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
        }
    },

}