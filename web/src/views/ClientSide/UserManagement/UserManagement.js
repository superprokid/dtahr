/* eslint-disable */ 
import HolidayService from "../../../services/API/HolidayAPI/HolidayServices";
import { getDateString } from "../../../services/utilities";

import RealtimeCheckService from "@/services/API/RealtimeCheck/RealtimeCheck"
import UserManagementServices from '@/services/API/UserManagementAPI/UserManagementServices';


//Test History
import moment from 'moment';
import Button from '@/components/Button/Button.vue'
import HistoryTrackingServices from '@/services/API/MyPageAPI/HistoryTrackingServices';
import { mapState } from 'vuex'
import DateTimePicker from '@/components/DateTimePicker/DateTimePicker.vue'
import VuetifyDialog from '@/components/VuetifyDialog/VuetifyDialog.vue'
import EmployeeModal from "@/components/EmployeeModal/EmployeeModal.vue";

import SessionUtls from '../../../services/SessionUtls';
import tabName from '../../../config/tabname';

const WORKLOG_DEFAULT = {
    work_status: null,
    work_total: 0,
    create_at: null,
}

export default {
    name: "UserManagement",
    components: {
        DateTimePicker,
        Button,
        VuetifyDialog,
        EmployeeModal
    },
    data() {
        return {
            userSelected: undefined,
            search: '',
            calories: '',
            listUsers: [],
            isTableUserShowed: true,
            isUserManagementLayoutShowed: false,
            isUserWorklogSeeMoreShowed: false,
            isEmployeeInformationShowed: false,

            listUserWorklogs: [],

            startDate: undefined,
            endDate: undefined,

            singleUserWorklog: WORKLOG_DEFAULT,


            //History Tracking
            events: [],
            userTrackingHistory: {},

            //Employee Modal
            openDialog: false,
            propPackage: {},
            
        }
    },
    created() {
        let date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        this.startDate = firstDay;
        let lastDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        this.endDate = lastDate;
    },
    computed: {
        ...mapState(["startDataUser"]),
        timeline() {
            return this.events.slice().reverse()
        },
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
        worklogHeaders(){
            return [
                {
                    text: 'Employee ID',
                    align: 'start',
                    value: 'employee_id',
                    width: 200,
                },
                {
                    text: 'Full Name',
                    value: 'full_name'
                },
                {
                    text: 'Work Date',
                    value: 'work_date',
                },
                {
                    text: "Checkin At",
                    value: 'create_at'
                },
                {
                    text: "Recent activity",
                    value: 'update_at'
                },
                {
                    text: "Work Status",
                    value: 'work_status'
                },
                {
                    text: "Work Total (Min)",
                    value: 'work_total'
                },
            ]
        }

    },
    async mounted() {
        this.$eventBus.$emit('show-spinner', true);
        // await this._getListHoliday();
        await this._getListUser();
        this._getUserHistoryTracking();
        this.$eventBus.$emit('show-spinner', false);
    },
    methods: {
        filterOnlyCapsText(value, search, item) {
            item - 1;
            return value != null &&
                search != null &&
                typeof value === 'string' &&
                value.toString().toLocaleUpperCase().indexOf(search.toLocaleUpperCase()) !== -1
        },

        async _getListUser() {
            const response = await RealtimeCheckService.getGroupStatus()
            if (!response) {
                this.$router.push('/user/login');
                return;
            }
            this.listUsers = response.data.map(item => {
                return {...item,  dob: getDateString(item.dob), gender: item.gender == 0 ? 'Male' : 'Female', join_date: getDateString(item.join_date)}
            })
        },

        async _getListWorklogsOfUser(params){
            const response = await UserManagementServices.getUserWorklogs(params)
            if (!response) {
                this.$router.push('/user/login');
                return;
            }
            if(response == -1){
                alert("Something wrong, please try again!")
                return;
            }

            this.listUserWorklogs = response.data.map(item => {
                return {...item, full_name: this.userSelected.full_name, work_date: moment(item.work_date).format('YYYY-MM-DD'), create_at: this._formatDateTime(item.create_at)
                                , update_at: this._formatDateTime(item.update_at), work_status: item.work_status == 0 ? 'Đã Checkin' : 'Đã Checkout'
                                , }
            })
            // console.log('listUserWorklogs', this.listUserWorklogs);

        },
        async _getOneWorklog(params){
            const response = await UserManagementServices.getUserWorklogs(params)
            if (!response) {
                this.$router.push('/user/login');
                return;
            }
            if(response == -1){
                alert("Something wrong, please try again!")
                return;
            }
            const formatWorklog = response.data.length? response.data[0] : WORKLOG_DEFAULT;
            console.log('this.singleUserWorklog',this.singleUserWorklog);

            this.singleUserWorklog = {
                work_date: formatWorklog.work_date? this._formatDate(formatWorklog.work_date) : 'No work schedule today',
                create_at: formatWorklog.create_at? this._formatDateTime(formatWorklog.create_at): 'No work schedule today',
                update_at: formatWorklog.update_at? this._formatDateTime(formatWorklog.update_at): 'No work schedule today',
                work_status: formatWorklog.work_status? formatWorklog.work_status == 0 ? 'Already Checkin' : 'Already Checkout' : 'No work schedule today',
                work_total: formatWorklog.work_total? formatWorklog.work_total : 'No work schedule today'
            };
        },

        async clickOnUser(userSelected){
            console.log('item',userSelected);
            //Hide table list users
            this.isTableUserShowed = false;
            //Show user selected management
            this.isUserManagementLayoutShowed = true;
            this.userSelected = userSelected;


            this.$eventBus.$emit('show-spinner', true);
            const params = {
                startDate: moment(new Date()).format('YYYY-MM-DD'),
                endDate: moment(new Date()).format('YYYY-MM-DD'),
                employeeId: this.userSelected.employee_id,
            }
            await this._getOneWorklog(params);
            
            this.$eventBus.$emit('show-spinner', false);
        },
        async onClickWorklogSeeMore(){
            //Hide user selected management
            this.isUserManagementLayoutShowed = false;

            //Get worklogs of user
            const params = {
                startDate: moment(this.startDate).format('YYYY-MM-DD'),
                endDate: moment(this.endDate).format('YYYY-MM-DD'),
                employeeId: this.userSelected.employee_id,
            }
            console.log('params', params);
            this.$eventBus.$emit('show-spinner', true);
            await this._getListWorklogsOfUser(params);
            this.$eventBus.$emit('show-spinner', false);

            //Show selected user's  worklog more
            this.isUserWorklogSeeMoreShowed = true;
        },


        async onInputStartDate(params) {
            this.startDate = new Date(params)
            let param = {
                startDate: moment(this.startDate).format('YYYY-MM-DD'),
                endDate: moment(this.endDate).format('YYYY-MM-DD'),
                employeeId: this.userSelected.employee_id,
            }
            this.$eventBus.$emit("show-spinner", true);
            await this._getListWorklogsOfUser(param);
            this.$eventBus.$emit("show-spinner", false);
        },

        async onInputEndDate(params) {
            this.endDate = new Date(params)
            let param = {
                startDate: moment(this.startDate).format('YYYY-MM-DD'),
                endDate: moment(this.endDate).format('YYYY-MM-DD'),
                employeeId: this.userSelected.employee_id,
            }
            this.$eventBus.$emit("show-spinner", true);
            await this._getListWorklogsOfUser(param);
            this.$eventBus.$emit("show-spinner", false);
        },




        // History tracking of user
        async _getUserHistoryTracking() {
            const response = await HistoryTrackingServices.getHistoryTrackingOfUser();
            if (!response) {
                this.$router.push('/user/login')
            } else {
                this.userTrackingHistory = this._groupArrayByDateKey(response.data.reverse(), "work_date")
            }
        },
        _groupArrayByDateKey(arr, dateKey) {
            return arr.reduce(function (previousResult, item) {
                const key = moment(item[dateKey]).format('YYYY-MM-DD');
                previousResult[key] = previousResult[key] || [];
                previousResult[key].push(item);
                return previousResult;
            }, {});
        },

        async onInputStartDate(params) {
            this.startDate = new Date(params)
            let param = {
                startDate: moment(this.startDate).format('YYYY-MM-DD'),
                endDate: moment(this.endDate).format('YYYY-MM-DD')
            }
            this.$eventBus.$emit("show-spinner", true);
            let response = await HistoryTrackingServices.getHistoryTrackingWithFilter(param)
            if (!response) {
                this.$router.push('/user/login')
            } else {
                console.log(response)
                this.userTrackingHistory = this._groupArrayByDateKey(response.data.reverse(), "work_date")
            }
            this.$eventBus.$emit("show-spinner", false);
        },

        async onInputEndDate(params) {
            this.endDate = new Date(params)
            let param = {
                startDate: moment(this.startDate).format('YYYY-MM-DD'),
                endDate: moment(this.endDate).format('YYYY-MM-DD')
            }
            this.$eventBus.$emit("show-spinner", true);
            let response = await HistoryTrackingServices.getHistoryTrackingWithFilter(param)
            if (!response) {
                this.$router.push('/user/login')
            } else {
                console.log(response)
                this.userTrackingHistory = this._groupArrayByDateKey(response.data.reverse(), "work_date")
            }
            this.$eventBus.$emit("show-spinner", false);
        },

        async onClickUserSeeMore(){
            // Show personal information dialog
            const params = {
                employeeId: this.userSelected.employee_id
            }
            const response = await UserManagementServices.getEmployeeInfo(params)
            if (!response) {
                this.$router.push('/user/login');
                return;
            }
            if(response == -1){
                alert("Something wrong, please try again!")
                return;
            }
            // this.propPackage = response.data;
            
            // this.propPackage = response.data.map((item) =>{
            //     return {...item,  dob: getDateString(item.dob), join_date: getDateString(item.join_date), holiday_time: item.holiday_time.toFixed(3), 
            //                     relative_dob: getDateString(item.relative_dob)}
            // });
            const employeeInfo = response.data
            this.propPackage = {
                ...employeeInfo,
                dob: getDateString(employeeInfo.dob), 
                join_date: getDateString(employeeInfo.join_date), 
                holiday_time: employeeInfo.holiday_time.toFixed(3), 
                relative_dob: getDateString(employeeInfo.relative_dob)
            }
            console.log('this.propPackage',this.propPackage);
            this.openDialog = true;
        },


        /**
         * 
         * @param {date} date 
         * @returns date after format YYYY-MM-DD HH:MM:SS
         */
        _formatDateTime(date) {
			return (
				getDateString(new Date(date)) +
				' ' +
				new Date(date).toLocaleTimeString()
			);
		},

        /**
         * 
         * @param {date} date 
         * @returns date after format YYYY-MM-DD
         */
         _formatDate(date) {
			return (
				getDateString(new Date(date))
			);
		},
    },

    beforeCreate() {
        SessionUtls.setItem(SessionUtls.tabNameKey, tabName.userManagement);
    },
}