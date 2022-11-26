/* eslint-disable */ 
import { getDateString } from "../../../services/utilities";

import AdminUserManagementService from "../../../services/API/AdminUserManagement/AdminUserManagement.service";

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
            userSelected: undefined,
            search: '',
            listUsers: [],
            
            avtBaseUrl: USER_GET_IMAGE
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
        this.$eventBus.$emit('show-spinner', false);
    },
    methods: {
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

    },

    beforeCreate() {
        SessionUtls.setItem(SessionUtls.tabNameKey, tabName.userAdmin);
    },
}