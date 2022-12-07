/* eslint-disable */
import moment from 'moment';

export default {
    name: 'ConfirmDeleteUserModal',
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
            this.$emit('on-close',9);
        },
        onConfirmDelete(){
            if(this.$refs.form.validate()){
                this.$emit('on-confirm-delete-user', 'confirm')
            }
        },
        validate () {
            this.$refs.form.validate()
          },
    },
}