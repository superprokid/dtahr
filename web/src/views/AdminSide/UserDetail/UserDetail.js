/* eslint-disable */
import SessionUtls from '../../../services/SessionUtls';
import CookieUtls from '../../../services/CookieUtls';
import tabName from '../../../config/tabname';

import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

import AddTaskServices from "../../../services/API/AddTaskAPI/AddTaskServices"
import TaskDetailServices from "../../../services/API/TaskDetailAPI/TaskDetailServices"
import AddCategoryTaskModal from "../../../components/AddCategoryTaskModal/AddCategoryTaskModal.vue"
import ReportServices from "../../../services/API/ReportAPI/ReportServices"
import { getAvatar, getDateString, getTimeString, isPastDate} from "../../../services/utilities";
import axiosFaceRecognition from '../../../services/API/FaceRecognitionAPI';

import {USER_GET_IMAGE, USER_DOWN_ATTACHMENT} from '../../../config/constant'

import ConfirmDeleteCommentModal from "../../../components/ConfirmDeleteCommentModal/ConfirmDeleteCommentModal.vue"
import AddAttachmentModal from "../../../components/AddAttachmentModal/AddAttachmentModal.vue"

import AdminUserDetailServices from "../../../services/API/AdminUserDetailAPI/AdminUserDetailServices"

import moment from 'moment';

import AddHolidayModal from "../../../components/AddHolidayModal/AddHolidayModal.vue"
import EditWorklogModal from "../../../components/EditWorklogModal/EditWorklogModal.vue"
import UserSeeMoreModal from "../../../components/UserSeeMoreModal/UserSeeMoreModal.vue"

const WORKLOG_DEFAULT = {
    work_date: 'No work schedule today',
    checkin_at:  'No work schedule today',
    work_total: 'No work schedule today',
    work_status: 'No work schedule today',
}

export default {
    components: {
        AddHolidayModal,
        EditWorklogModal,
        UserSeeMoreModal
    },
    data() {
        return { 
            userDetailInfo: {},
            projectUserJoinedDetailInfo: {},
            todayWorklog: {},

            startDate: moment(new Date(new Date().getFullYear(), new Date().getMonth(), 1)).format("YYYY-MM-DD"),
            startDatePicker: false,
            
            endDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            endDatePicker: false,

            userHistoryTracking: {},

            addHolidayModalShowed: false,
            editWorklogModalShowed: false,
            userSeeMoreModalShowed: false,
            faceRecognitionModalShowed: false,
            addHolidayInfo: {},
            editWorklogInfo: {},
            userDetailInfoProp: {},

            userDetailFeatureShowed: true,
            userDetailWorklogShowed: false,

            startDateWorklog: moment(new Date(new Date().getFullYear(), new Date().getMonth(), 1)).format("YYYY-MM-DD"),
            startDateWorklogPicker: false,
            
            endDateWorklog: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            endDateWorklogPicker: false,

            listUserWorklogs: [],

            searchWorklog: '',
        }
    },
    computed: {
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
        },
    },
    methods: {
        onClose(param){
            if(param == 1){
                this.addHolidayModalShowed = false
            }else if(param == 2){
                this.editWorklogModalShowed = false
            }else if(param == 3){
                this.userSeeMoreModalShowed = false
            } else if(param == 4){
                this.faceRecognitionModalShowed = false
            }
        },
        filterOnlyCapsText(value, search, item) {
            item - 1;
            return value != null &&
                search != null &&
                typeof value === 'string' &&
                value.toString().toLocaleUpperCase().indexOf(search.toLocaleUpperCase()) !== -1
        },

        // Get user detail by Id
        async getUserDetailById(){
            const params = {
                employeeId: this.$route.params.employeeId
            }
            const response = await AdminUserDetailServices.adminGetUserDetailById(params)
            if(!response){
                this.$router.push('/admin/login')
            } else if(response == -1){
                this.$toast.open({
                    message: "Get User Detail Fail",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })
                return
            }
            this.userDetailInfo = response.data
            return this.userDetailInfo
        },

        // Get avatar of user
        getAvatar(){
            return getAvatar(this.userDetailInfo.avt)
        },
        getDateString,
        getTimeString,

        // Get Today User's Worklog
        async getUserWorklog(){
            const params = {
                startDate: moment(new Date()).format('YYYY-MM-DD'),
                endDate: moment(new Date()).format('YYYY-MM-DD'),
                employeeId: this.$route.params.employeeId,
            }
            const response = await AdminUserDetailServices.adminGetUserWorklogs(params)
            if(!response){
                this.$router.push('/admin/login')
            } else if(response == -1){
                this.$toast.open({
                    message: "Get Project User Joined Fail",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })
                return
            }
            this.todayWorklog = WORKLOG_DEFAULT
            if(response.data.length > 0){
                this.todayWorklog = {
                    work_date: getDateString(response.data[0].work_date),
                    checkin_at: getDateString(response.data[0].create_at) + ' ' + getTimeString(response.data[0].create_at),
                    work_total: response.data[0].work_total,
                    work_status: response.data[0].work_status == 0 ? 'Already Checkin' : 'Already Checkout'
                }
            }
            return this.todayWorklog
        },

        _groupArrayByDateKey(arr, dateKey) {
            return arr.reduce(function (previousResult, item) {
                const key = moment(item[dateKey]).format('YYYY-MM-DD');
                previousResult[key] = previousResult[key] || [];
                previousResult[key].push(item);
                return previousResult;
            }, {});
        },

        // Get User tracking history
        async getUserHistoryTracking(){
            const params = {
                startDate: this.startDate,
                endDate: this.endDate,
                employeeId: this.$route.params.employeeId,
            }
            const response = await AdminUserDetailServices.adminGetUserTrackingHistory(params)
            if(!response){
                this.$router.push('/admin/login')
            } else if(response == -1){
                this.$toast.open({
                    message: "Get User Tracking Fail",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })
                return
            }
            this.userHistoryTracking = this._groupArrayByDateKey(response.data.reverse(), "work_date")
            return this.userHistoryTracking
        },
        async onSelectStartTrackingDate(startDate){
            this.startDate = startDate
            this.startDatePicker = false

            this.$eventBus.$emit('show-spinner', true); 
            this.getUserHistoryTracking()
            this.$eventBus.$emit('show-spinner', false); 
        },

        async onSelectEndTrackingDate(endDate){
            this.endDate = endDate
            this.endDatePicker = false

            this.$eventBus.$emit('show-spinner', true); 
            this.getUserHistoryTracking()
            this.$eventBus.$emit('show-spinner', false); 
        },

        onClickAddHoliday(){
            this.addHolidayInfo = {
                fullName: this.userDetailInfo.full_name
            }
            this.addHolidayModalShowed = true
        },

        async onAddHoliday(params){
            this.$eventBus.$emit('show-spinner', true);
            params.employeeId = this.userDetailInfo.employee_id
            const response = await AdminUserDetailServices.adminAddHoliday(params)
            if(!response){
                this.$router.push('/admin/login')
                return
            } else if(response == -1){
                this.$toast.open({
                    message: "Add Holiday Fail",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })
                return
            }
            this.$toast.open({
                message: "Add Holiday Success",
                type: "success",
                duration: 2000,
                dismissible: true,
                position: "top-right",
            })
            this.addHolidayModalShowed = false
            
            await this.getUserDetailById()
            await this.getUserHistoryTracking()
            this.$eventBus.$emit('show-spinner', false);
        },
        onClickEditWorklog(){
            this.editWorklogInfo = {
                fullName: this.userDetailInfo.full_name
            }
            this.editWorklogModalShowed = true
        },
        async onClickFaceRecognition() {
            let param = {
                employeeId: this.userDetailInfo.employee_id,
            }
            try {
                await axiosFaceRecognition.registerLocalRecognition(param)
                this.$toast.open({
                    message: "Register Face Recognition Success",
                    type: "success",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })
            } catch (error) {
                this.$toast.open({
                    message: "Register Failed",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })
                return
            }
            // Todo : Show modal
            // this.faceRecognitionModalShowed = true
        },
        async onEditWorklog(params){
            params.employeeId = this.userDetailInfo.employee_id
            const response = await AdminUserDetailServices.adminEditWorklog(params)
            if(!response){
                this.$router.push('/admin/login')
                return
            } else if(response == -1){
                this.$toast.open({
                    message: "Edit Worklog Fail",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })
                return
            }
            this.$toast.open({
                message: "Edit Worklog Success",
                type: "success",
                duration: 2000,
                dismissible: true,
                position: "top-right",
            })
            this.editWorklogModalShowed = false
            
            await this.getUserDetailById()
            await this.getUserHistoryTracking()
            this.$eventBus.$emit('show-spinner', false);
        },

        onClickUserInfoSeeMore(){
            this.userDetailInfoProp = this.userDetailInfo
            this.userSeeMoreModalShowed = true
        },

        async onSaveUserSeeMore(params){
            console.log('params', params);
            const response = await AdminUserDetailServices.adminUpdatePersonalUserInfo(params)
            if(!response){
                this.$router.push('/admin/login')
                return
            } else if(response == -1){
                this.$toast.open({
                    message: "Update Personal User's Info Fail",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })
                return
            }
            this.$toast.open({
                message: "Update Personal User's Info Success",
                type: "success",
                duration: 2000,
                dismissible: true,
                position: "top-right",
            })
            this.userSeeMoreModalShowed = false
        },

        onClickWorklogSeeMore(){
            console.log('worklog');
            this.userDetailFeatureShowed = false
            this.userDetailWorklogShowed = true
        },

        goBackUserDetailFeature(){
            this.userDetailWorklogShowed = false,
            this.userDetailFeatureShowed = true
        },

        async onSelectStartDateWorklog(date){
            console.log('start worklog',date );
            this.startDateWorklog = date
            const params = {
                startDate: this.startDateWorklog,
                endDate: this.endDateWorklog,
                employeeId: this.$route.params.employeeId
            }
            await this.getListWorklogsOfUser(params)
        },
        async onSelectEndDateWorklog(date){
            this.endDateWorklog = date
            const params = {
                startDate: this.startDateWorklog,
                endDate: this.endDateWorklog,
                employeeId: this.$route.params.employeeId
            }
            await this.getListWorklogsOfUser(params)
        },

        async getListWorklogsOfUser(params){
            const response = await AdminUserDetailServices.adminGetUserWorklogs(params)
            if (!response) {
                this.$router.push('/admin/login');
                return;
            }else if(response == -1){
                this.$toast.open({
                    message: "Get Users Worklog Fail",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })
                return
            }
            
            this.listUserWorklogs = response.data.map(item => {
                return {...item, full_name: this.userDetailInfo.full_name, 
                                work_date: moment(item.work_date).format('YYYY-MM-DD'), 
                                create_at: getDateString(item.create_at) + ' ' + getTimeString(item.create_at), 
                                update_at: getDateString(item.update_at) + ' ' + getTimeString(item.update_at), 
                                work_status: item.work_status == 0 ? 'Đã Checkin' : 'Đã Checkout',}
            })
            return this.listUserWorklogs
        },
    },
    
    async mounted() {
        this.$eventBus.$emit('show-spinner', true); 
        const userDetailInfo = await this.getUserDetailById()
        console.log('userDetailInfo', userDetailInfo);
        const todayWorklog = await this.getUserWorklog()
        const trackingHistory = await this.getUserHistoryTracking()

        const params = {
            startDate: this.startDateWorklog,
            endDate: this.endDateWorklog,
            employeeId: this.$route.params.employeeId
        }
        const listWorklogs = await this.getListWorklogsOfUser(params)
        this.$eventBus.$emit('show-spinner', false);  
    },

}