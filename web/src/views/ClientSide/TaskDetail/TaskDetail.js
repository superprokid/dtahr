/* eslint-disable */
import SessionUtls from '../../../services/SessionUtls';
import tabName from '../../../config/tabname';

import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

import AddTaskServices from "../../../services/API/AddTaskAPI/AddTaskServices"
import TaskDetailServices from "../../../services/API/TaskDetailAPI/TaskDetailServices"
import AddCategoryTaskModal from "../../../components/AddCategoryTaskModal/AddCategoryTaskModal.vue"
import ReportServices from "../../../services/API/ReportAPI/ReportServices"


import {USER_GET_IMAGE} from '../../../config/constant'

export default {
    components: {
        quillEditor,
        AddCategoryTaskModal
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
        },
    },
    computed: {
        // editor() {
        //   return this.$refs.myQuillEditor.quill
        // }
      },
    mounted() {
        console.log('this is current quill instance object', this.editor)
        this.$eventBus.$emit('show-spinner', true);
        this._getTaskDetailById()
        this.$eventBus.$emit('show-spinner', false);
    },

}