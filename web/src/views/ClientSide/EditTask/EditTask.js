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
import { getDateString, getTimeString} from "../../../services/utilities";

import {USER_GET_IMAGE} from '../../../config/constant'

import ConfirmDeleteCommentModal from "../../../components/ConfirmDeleteCommentModal/ConfirmDeleteCommentModal.vue"

import $ from 'jquery';

export default {
    components: {
        quillEditor,
        AddCategoryTaskModal,
        ConfirmDeleteCommentModal
    },
    data() {

        return { 
            addCategoryTaskDialogShowed: false,

            valid: true,
            content: '',
            editorOption: {
                // Some Quill options...
            },
            taskDetailData: {},

            employeeList: [],
            avtBaseUrl: USER_GET_IMAGE,
       
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

            prioritySelectValue: undefined,
            priorityList: [
                {
                    priority_text: 'Low',
                    priority_value: 0
                },
                {
                    priority_text: 'Normal',
                    priority_value: 1
                },
                {
                    priority_text: 'High',
                    priority_value: 2
                },
            ],    

            categorySelectValue: undefined,
            categoryTaskList: [],
            categoryTaskRules:[
                v => !!v || 'Category Task is required',
            ],

            statusSelected: '',


            taskTitle: '',
            taskTitleRules: [
                v => !!v || 'Subject is required',
            ],

            assignee: [],
            assigneeRules:[
                v => !!v || 'Assignee is required',
                // v => v.length > 0 || 'Assignee is required',
            ],

            startDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            startDateModalShowed: false,

            endDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            endDateModalShowed: false,

            estimatedHours: undefined,
            actualHours: undefined,

            currentProjectId: this.$route.params.projectId ?? SessionUtls.getItem(SessionUtls.projectSelectedKey),
        }
    },

    methods: {
        remove (item) {
            const index = this.friends.indexOf(item.name)
            if (index >= 0) this.friends.splice(index, 1)
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
                this.$toast.open({
                    message: "Something went wrong",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })
                return
            }
            console.log('response', response.data);
            this.taskDetailData = response.data
            this.taskDetailData.start_date = getDateString(response.data.start_date)
            this.taskDetailData.end_date = getDateString(response.data.end_date)      
            this.taskDetailData.create_at = getDateString(response.data.create_at) + ' ' +getTimeString(response.data.create_at)
            return this.taskDetailData
        },
        async _getAllAssignees(){
            const response = await AddTaskServices.getAllUserOfProject({ projectId: this.currentProjectId })
            if (!response) {
                this.$router.push('/user/login');
                return;
            }
            if(response === -1){
                this.$toast.open({
                    message: "Something went wrong",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })
                return
            }
            console.log('response',response.data);
            this.employeeList = response.data.map((item) => {
                return {...item, }
            })
            return this.employeeList
        },
        async _getAllCategoryTask(){
            const response = await AddTaskServices.getAllTaskCategory()
            if (!response) {
                this.$router.push('/user/login');
                return;
            }
            if(response === -1){
                this.$toast.open({
                    message: "Something went wrong",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })
                return
            }
            this.categoryTaskList = response.data.map(item => {
                return {...item, }
            })
            return this.categoryTaskList
        },

        onClickAddCategoryTask(){
            this.addCategoryTaskDialogShowed = true;
        },
        async onCreateCategoryTask(params){
            const response = await AddTaskServices.createCategoryTask(params)
            if (!response) {
                this.$router.push('/user/login');
                return;
            }
            if (response === -1) {
                this.$toast.open({
                    message: "Something went wrong, please try later",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                });
                return;
            }
            this.$toast.open({
                message: "Success",
                type: "success",
                duration: 2000,
                dismissible: true,
                position: "top-right",
            })
            const allCats = this._getAllCategoryTask()
            console.log('allCats', allCats);
            this.addCategoryTaskDialogShowed = false
        },

        onClickCloseEditTask(){
            this.$router.push(`/user/taskside/taskdetail/${this.currentProjectId}/${this.taskDetailData.task_id}`);
        },

        async onClickUpdateEditTask(){
            if(this.$refs.form.validate()){
                const updateTaskParams = {
                    taskId: this.taskDetailData.task_id,
                }
                if(this.taskTitle != this.taskDetailData.task_title) updateTaskParams.taskTitle = this.taskTitle
                if(this.content != this.taskDetailData.task_description) updateTaskParams.taskDescription = this.content

                if(this.statusSelected != this.taskDetailData.status) updateTaskParams.status = this.statusSelected
                const currAssignee = this.assignee.employee_id || this.assignee
                if(currAssignee != this.taskDetailData.assignee_id) updateTaskParams.assigneeId = currAssignee
                if(this.prioritySelectValue != this.taskDetailData.priority) updateTaskParams.priority = this.prioritySelectValue

                const currCategory = this.categorySelectValue.category_id || this.categorySelectValue
                if(currCategory != this.taskDetailData.category_id) updateTaskParams.categoryId = currCategory
                if(this.startDate != this.taskDetailData.start_date) updateTaskParams.startDate = this.startDate
                if(this.endDate != this.taskDetailData.end_date) updateTaskParams.endDate = this.endDate

                if(this.estimatedHours != this.taskDetailData.estimated_hours) updateTaskParams.estimatedHours = this.estimatedHours
                if(this.actualHours != this.taskDetailData.actual_hours) updateTaskParams.actualHours = this.actualHours

                const response = await TaskDetailServices.userUpdateTask(updateTaskParams)
                if (!response) {
                    this.$router.push('/user/login');
                    return;
                }
                if(response === -1){
                    this.$toast.open({
                        message: "Something went wrong, please try again",
                        type: "error",
                        duration: 2000,
                        dismissible: true,
                        position: "top-right",
                    })
                    return
                    return;
                }
                this.$router.push(`/user/taskside/taskdetail/${this.currentProjectId}/${this.taskDetailData.task_id}`);      
            }
        },
    },

    async mounted() {
        
        console.log('this is current quill instance object', this.editor)
        // const userTempList = await this.getAllUser()
        this.$eventBus.$emit('show-spinner', true);

        const taskDetail = await this._getTaskDetailById()
        const allAssignees = await this._getAllAssignees()
        const allCategory = await this._getAllCategoryTask()

        console.log('taskDetail', taskDetail);
        this.taskTitle = taskDetail.task_title
        this.content = taskDetail.task_description
        this.statusSelected = Number(taskDetail.status)

        this.employeeList = allAssignees
        for (let index = 0; index < allAssignees.length; index++) {
            const element = allAssignees[index];
            if(element.employee_id == taskDetail.assignee_id){
                this.assignee = element
                console.log('this.assignee', this.assignee);
                break
            }
        }
        this.prioritySelectValue = Number(taskDetail.priority)

        console.log('allCategory', allCategory);
        for (let index = 0; index < allCategory.length; index++) {
            const element = allCategory[index];
            if(element.category_id == taskDetail.category_id){
                this.categorySelectValue = element
                break
            }
        }

        this.startDate = taskDetail.start_date
        this.endDate = taskDetail.end_date

        this.estimatedHours = taskDetail.estimated_hours
        this.actualHours = taskDetail.actual_hours
        
        this.$eventBus.$emit('show-spinner', false);   
    },
    beforeCreate() {
        SessionUtls.setItem(SessionUtls.tabNameKey, tabName.taskUser);
        this.$root.$emit('drawer');
    },
}