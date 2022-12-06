/* eslint-disable */
import moment from 'moment';
import {ADMIN_DOWNLOAD_IMPORT_EMPLOYEE_SAMPLE} from "../../config/constant"

export default {
    name: 'ImportEmployeeModal',
    components: {
    },
    props: {
        groupPropInfo:{
            type: Object,
            default: () => {
                return {}
            }
        },

        messageImportFail:{
            type: String,
            default: '',
        }
    },
    data() {
        return {
            valid: true,
            checkbox: false,

            document: null,
            ADMIN_DOWNLOAD_IMPORT_EMPLOYEE_SAMPLE
        };
    },
    mounted(){
        console.log('groupPropInfo', this.groupPropInfo);
        // this.$root.$on('AddAttachmentModal', ()=>{
        //     this.document = null
        // })
    },
    methods: {
        onClose() {
            this.$emit('on-close', 13);
        },
        async sendData () {
            // (in the demo we show the data object at this point)
            // Send data to your server
            // await this.$axios.put('/profile', data)
            // if(this.$refs.form.validate()){
            //     this.$emit('on-confirm-upload-attachment', this.document.fileList)
            // }
            console.log(this.document);
            
            if(this.document?.fileList.length){
                let form = new FormData();
                form.append("groupId", this.groupPropInfo.group_id)
                form.append("managerId", this.groupPropInfo.manager_id)
                form.append('file', this.document.fileList[0])
                this.$emit('on-import-employee', form)
            }
        },

        onRemove(){
            // un implement
        },
       
        validate () {
            this.$refs.form.validate()
        },
    },
}