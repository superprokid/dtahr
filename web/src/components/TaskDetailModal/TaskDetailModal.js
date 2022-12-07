
/* eslint-disable */
import AdminGroupServices from "../../services/API/AdminGroup/AdminGroupServices"
import moment from 'moment';

import { getDateString, getTimeString, isPastDate, getAvatar} from "../../services/utilities";
import AdminTaskDetailServices from "../../services/API/AdminTaskDetail/AdminTaskDetailServices"

import {USER_GET_IMAGE, USER_DOWN_ATTACHMENT} from '../../config/constant'

export default {
    name: 'TaskDetailModal',
    components: {
    },
    props: {
        taskDetailPropInfo: {
            type: Object,
            default: () => {
                return {}
            }
        },
    },
    data() {
        return {
            checkbox: false,
            categoryName: '',
            categoryNameRules: [
                v => !!v || 'Category Name is required',
            ],

            valid: true,

            taskDetailData: {},
            statusTextArr: ['Open', 'Inprogress', 'Resolved', 'Closed'],
            statusColorArr: ['#ed8077', '#4488c5', '#5eb5a6', '#a1af2f'],

            priorityName: ['Low', "Normal", 'High'],
            listAttachment: [],
            numberOfAttachment: 0,

            listComments: [],
            numberOfComments: 0,

            confirmDeleteCheckboxShowed: false,
            
            childTaskHeader: [
                {
                    text: 'Key',
                    align: 'start',
                    value: 'task_number',
                    width: 100,
                },
                {
                    text: 'Subject',
                    value: 'task_title'
                },
                {
                    text: 'Status',
                    value: 'status',
                    width: 100
                },
            ],

        };
    },
    mounted(){
        this.$eventBus.$emit('show-spinner', true);
        this._getTaskDetailById().then((result)=>{
            this.listComments = result.comments.map((item) => {
                return {
                    ...item,    
                    create_at: getDateString(item.create_at) + ' ' +getTimeString(item.create_at),       
                }
            })
            this.listAttachment = result.attachments.map((item) =>{
                const arr = item.path.split("\\")
                return {
                    ...item, dir_path: arr[0], file_name: arr[1], href: `${USER_DOWN_ATTACHMENT}/${arr[0]}/${arr[1]}`
                }
            })
            this.numberOfAttachment = this.listAttachment.length
            this.numberOfComments = this.listComments.length
        })
        this.$eventBus.$emit('show-spinner', false);
    },
    methods: {
        getAvatar,
        setItemRowCLass(){
            return 'item-row'
        },
        onClose() {
            this.$emit('on-close',3);
        },

        onClickDeleteTask(){
            if(this.confirmDeleteCheckboxShowed == false){
                this.confirmDeleteCheckboxShowed = true
            }else{
                if(this.$refs.form.validate()){
                    const params = {
                        taskId: this.taskDetailPropInfo.task_id
                    }
                    this.$emit('on-delete-task', params);
                }
            }
            
            
        },
        reset () {
            this.$refs.form.reset()
        },
        resetValidation () {
            this.$refs.form.resetValidation()
        },

        remove (item) {
            this.managerSelect.splice(this.managerSelect.indexOf(item), 1)
        },

        async _getTaskDetailById(){
            const params = {
                taskId: this.taskDetailPropInfo.task_id
            }
            const response = await AdminTaskDetailServices.adminGetTaskDetail(params)
            if (!response) {
                this.$router.push('/admin/login');
                return;
            }
            if(response === -1){
                this.$toast.open({
                    message: "Get Task Detail Fail",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })
                return
            }
            this.taskDetailData = response.data
            this.taskDetailData.start_date = getDateString(response.data.start_date)
            this.taskDetailData.end_date = getDateString(response.data.end_date)      
            this.taskDetailData.create_at = getDateString(response.data.create_at) + ' ' +getTimeString(response.data.create_at)
            this.taskDetailData.isLate = isPastDate(response.data.end_date) && response.data.status != 3
            console.log('this.taskDetailData',this.taskDetailData);
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

    },
}