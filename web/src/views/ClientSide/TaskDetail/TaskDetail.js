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
import { getDateString, getTimeString} from "../../../services/utilities";

import {USER_GET_IMAGE} from '../../../config/constant'

import ConfirmDeleteCommentModal from "../../../components/ConfirmDeleteCommentModal/ConfirmDeleteCommentModal.vue"

export default {
    components: {
        quillEditor,
        AddCategoryTaskModal,
        ConfirmDeleteCommentModal
    },
    data() {

        return { 
            htmlcontent: '<h1>this is content</h1>',
            content: '',
            editorOption: {
                // Some Quill options...
            },
            startDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            startDateModalShowed: false,

            endDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            endDateModalShowed: false,

            taskDetailData: {},
            statusTextArr: ['Open', 'Inprogress', 'Resolved', 'Closed'],
            statusColorArr: ['#ed8077', '#4488c5', '#5eb5a6', '#a1af2f'],

            priorityName: ['Low', "Normal", 'High'],

            avtBaseUrl: USER_GET_IMAGE,

            reveal: false,

            selectedProgress: undefined,
            statusList: [
                {
                    statusTitle: 'Open',
                    statusColor: '#ed8077',
                    statusValue: 0
                },
                {
                    statusTitle: 'Inprogress',
                    statusColor: '#4488c5',
                    statusValue: 1
                },
                {
                    statusTitle: 'Resolved',
                    statusColor: '#5eb5a6',
                    statusValue: 2
                },
                {
                    statusTitle: 'Closed',
                    statusColor: '#a1af2f',
                    statusValue: 3
                },
            ],

            selectedUser: '',
            userList: [],
            
            startDate: '',
            startDateModalShowed: false,

            endDate: '',
            endDateModalShowed: false,

            listComments: [],
            numberOfComments: 0,

            currentLoginedEmployeeId: CookieUtls.getCookie(CookieUtls.employeeId),

            isUpdateComment: false,
            updateCommentSelectedId: undefined,

            ConfirmDeleteCommentDialogShowed: false,
            

        }
    },
    watch: {
        // isUpdating (val) {
        //   if (val) {
        //     setTimeout(() => (this.isUpdating = false), 3000)
        //   }
        // },
    },
    methods: {
        onClickCloseComment(){
            this.reveal = false
            this.content = ''
            this.isUpdateComment = false
        },
        onEditorBlur(quill) {
          console.log('editor blur!', quill)
        },
        onEditorFocus(quill) {
          console.log('editor focus!', quill)
        },
        onEditorReady(quill) {
          console.log('editor ready!', quill)
        },
        onEditorChange({ quill, html, text }) {
          console.log('editor change!', quill, html, text)
          this.content = html
        },

        async _getTaskDetailById(){
            const params = {
                taskId: this.$route.params.taskId
            }
            const response = await TaskDetailServices.getTaskDetailById(params)
            if (!response) {
                this.$router.push('/user/login');
                return;
            }
            if(response === -1){
                alert("Call Fail")
            }
            console.log('response', response.data);
            this.taskDetailData = response.data
            this.taskDetailData.start_date = getDateString(response.data.start_date)
            this.taskDetailData.end_date = getDateString(response.data.end_date)      
            this.taskDetailData.create_at = getDateString(response.data.create_at) + ' ' +getTimeString(response.data.create_at)
            return this.taskDetailData
        },

        getStatus(status) {
            return {
                text: this.statusTextArr[status],
                color: this.statusColorArr[status],
            }
        },
        getPriorityName(priority){
            return this.priorityName[priority]
        },

        onClickEditTaskDetail(){
            console.log('onclick edit task detail');
            this.$router.push('/user/edittask/'+this.taskDetailData.task_id);
        },

        async getAllUser() {
            const response = await ReportServices.getAllUser();
            if (!response) {
              this.$router.push("/user/login");
            }
            if(response === -1){
                alert("Call Failed")
            }
            this.userList = [...response.data];
            return response.data
        },

        async onclickSubmitComment(){
            // call create api

            if(this.isUpdateComment == true){
                console.log('update comment ko phai create comment');
                const updateCommentParams = {
                    commentId: this.updateCommentSelectedId,
                }
                if(String(this.content).trim()){
                    updateCommentParams.content = this.content
                    const updateCommentResponse = await TaskDetailServices.updateComment(updateCommentParams)
                    if (!updateCommentResponse) {
                        this.$router.push('/user/login');
                        return;
                    }
                    if(updateCommentResponse === -1){
                        alert("Call Fail")
                    }
                    this.isUpdateComment = false
                    this.content = ''
                }
            }else{
                // call create comment api
                const commentParams = {
                    taskId: this.taskDetailData.task_id,
                    // content: this.content
                }
                if(String(this.content).trim()){
                    commentParams.content = this.content
                    const createCommentResponse = await TaskDetailServices.createComment(commentParams)
                    if (!createCommentResponse) {
                        this.$router.push('/user/login');
                        return;
                    }
                    if(createCommentResponse === -1){
                        alert("Call Fail")
                    }
                    this.content = ''
                }
                // call update task api
                const updateTaskParams = {
                    taskId: this.taskDetailData.task_id,
                }
                if(String(this.selectedProgress) !== this.taskDetailData.status){
                    updateTaskParams.status = this.selectedProgress
                }
                const currEmployeeId = this.selectedUser.employee_id || this.selectedUser
                if(currEmployeeId !== this.taskDetailData.assignee_id){
                    updateTaskParams.assigneeId = currEmployeeId
                }
                if(getDateString(this.startDate) !== getDateString(this.taskDetailData.start_date)){
                    updateTaskParams.startDate = getDateString(this.startDate)
                }
                if(getDateString(this.endDate) !== getDateString(this.taskDetailData.end_date)){
                    updateTaskParams.endDate = getDateString(this.endDate)
                }

                const updateTaskStatusResponse = await TaskDetailServices.userUpdateTask(updateTaskParams)
                if (!updateTaskStatusResponse) {
                    this.$router.push('/user/login');
                    return;
                }
                if(updateTaskStatusResponse === -1){
                    alert("Call Fail")
                }
            }
            
            
            // update task detail frontend
            const userTempList = await this.getAllUser()
            this._getTaskDetailById().then((result)=>{
                console.log('result', result);
                this.selectedProgress = Number(result.status)
    
                this.listComments = result.comments.map((item) => {
                    return {
                        ...item,    
                        create_at: getDateString(item.create_at) + ' ' +getTimeString(item.create_at),       
                    }
                })
    
                this.numberOfComments = this.listComments.length
                console.log('listcomments', this.listComments);
                for (let index = 0; index < userTempList.length; index++) {
                    const element = userTempList[index];
                    if(element.employee_id == result.assignee_id){
                        this.selectedUser = element
                        console.log('this.selectedUser', this.selectedUser);
                        break
                    }
                }
                this.startDate = getDateString(result.start_date)
                this.endDate = getDateString(result.end_date)
            })

            // close reveal go up
            this.reveal = false

            // alert('Successfully')

        },


        onClickEditComment(item){
            console.log('edit comment clicked', item);
            this.content = item.content
            this.isUpdateComment = true
            this.updateCommentSelectedId = item.taskcomment_id
            this.reveal = true;

        },

        onClickDeleteComment(item){
            console.log('delete comment clicked', item);
            this.confirmDeleteInfo = item
            this.ConfirmDeleteCommentDialogShowed = true
            
        },
        async onConfirmDeleteComment(param){
            const deleteCommentParams = {
                commentId: param.taskcomment_id
            }
            const deleteCommentResponse = await TaskDetailServices.deleteComment(deleteCommentParams)
            if (!deleteCommentResponse) {
                this.$router.push('/user/login');
                return;
            }
            if(deleteCommentResponse === -1){
                alert("Call Fail")
            }
            const userTempList = await this.getAllUser()
            this._getTaskDetailById().then((result)=>{
                console.log('result', result);
                this.selectedProgress = Number(result.status)
    
                this.listComments = result.comments.map((item) => {
                    return {
                        ...item,    
                        create_at: getDateString(item.create_at) + ' ' +getTimeString(item.create_at),       
                    }
                })
    
                this.numberOfComments = this.listComments.length
                console.log('listcomments', this.listComments);
                for (let index = 0; index < userTempList.length; index++) {
                    const element = userTempList[index];
                    if(element.employee_id == result.assignee_id){
                        this.selectedUser = element
                        console.log('this.selectedUser', this.selectedUser);
                        break
                    }
                }
                this.startDate = getDateString(result.start_date)
                this.endDate = getDateString(result.end_date)
            })
            this.ConfirmDeleteCommentDialogShowed = false
        },
        onClose(param){
            if(param == 1){
                this.ConfirmDeleteCommentDialogShowed = false
            }
        },

    },
    computed: {
        // editor() {
        //   return this.$refs.myQuillEditor.quill
        // }
      },
    async mounted() {
        
        console.log('this is current quill instance object', this.editor)
        const userTempList = await this.getAllUser()
        this.$eventBus.$emit('show-spinner', true);
        this._getTaskDetailById().then((result)=>{
            console.log('result', result);
            this.selectedProgress = Number(result.status)

            this.listComments = result.comments.map((item) => {
                return {
                    ...item,    
                    create_at: getDateString(item.create_at) + ' ' +getTimeString(item.create_at),       
                }
            })

            this.numberOfComments = this.listComments.length
            console.log('listcomments', this.listComments);
            for (let index = 0; index < userTempList.length; index++) {
                const element = userTempList[index];
                if(element.employee_id == result.assignee_id){
                    this.selectedUser = element
                    console.log('this.selectedUser', this.selectedUser);
                    break
                }
            }
            this.startDate = getDateString(result.start_date)
            this.endDate = getDateString(result.end_date)
        })
        
        this.$eventBus.$emit('show-spinner', false);   
        
    },
    beforeCreate() {
        SessionUtls.setItem(SessionUtls.tabNameKey, tabName.taskUser);
        this.$root.$emit('drawer');
    },
}