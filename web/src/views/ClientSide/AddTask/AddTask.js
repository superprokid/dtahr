import SessionUtls from '../../../services/SessionUtls';
import tabName from '../../../config/tabname';

import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

import AddTaskServices from "../../../services/API/AddTaskAPI/AddTaskServices"

import AddCategoryTaskModal from "../../../components/AddCategoryTaskModal/AddCategoryTaskModal.vue"
import AddParentTaskModal from "../../../components/AddParentTaskModal/AddParentTaskModal.vue"

import {USER_GET_IMAGE} from '../../../config/constant'
import { TASK_CHANNEL } from '../../../config/channel';

export default {
    components: {
        quillEditor,
        AddCategoryTaskModal,
        AddParentTaskModal
    },
    data() {

        return {
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
            prioritySelectValue: 1,
            categoryTaskList: [],
            categorySelectValue: '',
            estimatedHours:'',
            actualHours: '',


            addCategoryTaskDialogShowed: false,

            htmlcontent: '<h1>this is content</h1>',
            content: '',
            editorOption: {
                // Some Quill options...
            },
            startDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            startDateModalShowed: false,

            endDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            endDateModalShowed: false,



            // ASSIGNEE
            
            
            name: 'Midnight Crew',
            title: 'The summer breeze',

            employeeList: [],
            assignee: [],
            autoUpdate: true,
            isUpdating: false,

            avtBaseUrl: USER_GET_IMAGE,

            valid: true,

            taskTitle: '',
            taskTitleRules: [
                v => !!v || 'Subject is required',
            ],
            assigneeRules:[
                v => !!v || 'Assignee is required',
                v => v.length > 0 || 'Assignee is required',
            ],
            categoryTaskRules:[
                v => !!v || 'Category Task is required',
            ],

            currentProjectId: this.$route.params.projectId ?? SessionUtls.getItem(SessionUtls.projectSelectedKey),


            addParentTaskDialogShowed: false,

            parentTask: {},
        }
    },
    watch: {
        isUpdating (val) {
          if (val) {
            setTimeout(() => (this.isUpdating = false), 3000)
          }
        },
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
            if(response === -1){
                this.$toast.open({
                    message: "Create Fail",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })
                return
            }
            this.$toast.open({
                message: "Create success",
                type: "success",
                duration: 2000,
                dismissible: true,
                position: "top-right",
              })
            this._getAllCategoryTask()
            this.addCategoryTaskDialogShowed = false
        },
        onClose(params){
            if(params === 1){
                this.addCategoryTaskDialogShowed = false
            }else if(params === 2){
                this.addParentTaskDialogShowed = false
            }
        },
        async _getAllAssignees(){
            const response = await AddTaskServices.getAllUserOfProject({ projectId: this.currentProjectId })
            if (!response) {
                this.$router.push('/user/login');
                return;
            }
            if(response === -1){
                this.$toast.open({
                    message: "Something Went Wrong",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })
                return
            }
            this.employeeList = response.data.map((item) => {
                return {...item, }
            })
        },
        async onClickAddTask(){
            if(this.$refs.form.validate()){
                const params = {
                    taskTitle: this.taskTitle,
                    taskDescription: this.content,
                    assigneeId: this.assignee,
                    projectId: this.currentProjectId,
                    priority: this.prioritySelectValue,
                    categoryId: this.categorySelectValue,
                    startDate: this.startDate,
                    endDate: this.endDate,
                    estimatedHours: this.estimatedHours || null,
                    actualHours: this.actualHours || null,
                    parentTaskId: this.parentTask.task_id || null
                }
                const response = await AddTaskServices.createTask(params)
                if (!response) {
                    this.$router.push('/user/login');
                    return;
                }
                if(response === -1){
                    this.$toast.open({
                        message: "Add Task Fail",
                        type: "error",
                        duration: 2000,
                        dismissible: true,
                        position: "top-right",
                    })
                    return
                }
                this.$toast.open({
                    message: "Add Task Success",
                    type: "success",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })
                this.$mySocket.emit(TASK_CHANNEL, 0);
                window.location.reload();
            }
        },

        onClickAddParentTask(){
            this.addParentTaskDialogShowed = true
        },

        onSelectParentTask(params){
            this.parentTask = params

            this.addParentTaskDialogShowed = false
        }

    },
    computed: {
        editor() {
          return this.$refs.myQuillEditor.quill
        }
      },
    mounted() {
        this.currentProjectId = this.$route.params.projectId ?? this.currentProjectId;
        console.log('this is current quill instance object', this.editor)
        this.$eventBus.$emit('show-spinner', true);
        this._getAllCategoryTask()
        this._getAllAssignees()
        this.$eventBus.$emit('show-spinner', false);
    },
    beforeCreate() {
        SessionUtls.setItem(SessionUtls.tabNameKey, tabName.addTaskUser);
    },


}