/* eslint-disable */
import moment from 'moment';

export default {
    name: 'ConfirmDeleteCommentModal',
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
        };
    },
    mounted(){
        console.log('confirmDeleteInfo', this.confirmDeleteInfo);
    },
    methods: {
        onClose() {
            this.$emit('on-close', 1);
        },
        onConfirmDelete(){
            if(this.$refs.form.validate()){
                this.$emit('on-confirm-delete', this.confirmDeleteInfo)
            }
        },
        validate () {
            this.$refs.form.validate()
          },
    },
}