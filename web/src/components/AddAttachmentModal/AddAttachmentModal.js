/* eslint-disable */
import moment from 'moment';

export default {
    name: 'AddAttachmentModal',
    components: {
    },
    props: {
        confirmDeleteInfo:{
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    data() {
        return {
            valid: true,
            checkbox: false,

            document: null,

        };
    },
    mounted(){
        console.log('confirmDeleteInfo', this.confirmDeleteInfo);
        this.$root.$on('AddAttachmentModal', ()=>{
            this.document = null
        })
    },
    methods: {
        onClose() {
            this.$emit('on-close', 2);
        },
        // onClickUploadAttachment(){
        //     if(this.$refs.form.validate()){
        //         this.$emit('on-confirm-upload-attachment', 'zzzz')
        //     }
        // },
        async sendData () {
            // (in the demo we show the data object at this point)
            // Send data to your server
            // await this.$axios.put('/profile', data)
            // if(this.$refs.form.validate()){
            //     this.$emit('on-confirm-upload-attachment', this.document.fileList)
            // }
            
            if(this.document.fileList.length){
                this.$emit('on-confirm-upload-attachment', this.document.fileList)
            }
        },
       
        validate () {
            this.$refs.form.validate()
        },
    },
}