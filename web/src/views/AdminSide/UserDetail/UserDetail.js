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

import {USER_GET_IMAGE, USER_DOWN_ATTACHMENT} from '../../../config/constant'

import ConfirmDeleteCommentModal from "../../../components/ConfirmDeleteCommentModal/ConfirmDeleteCommentModal.vue"
import AddAttachmentModal from "../../../components/AddAttachmentModal/AddAttachmentModal.vue"

import AdminUserDetailServices from "../../../services/API/AdminUserDetailAPI/AdminUserDetailServices"



export default {
    components: {

    },
    data() {
        return { 
            userDetailInfo: {},

        }
    },
    computed: {
        
    },
    methods: {
        async getUserDetailById(){
            const params = {
                employeeId: this.$route.params.employeeId
            }
            console.log('params', params);
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

        getAvatar(){
            return getAvatar(this.userDetailInfo.avt)
        },
        getDateString,
    },
    
    async mounted() {
        this.$eventBus.$emit('show-spinner', true); 
        const userDetailInfo = await this.getUserDetailById()
        console.log('userDetailInfo', userDetailInfo);
        this.$eventBus.$emit('show-spinner', false);  
    },

}