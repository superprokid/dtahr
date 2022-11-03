/* eslint-disable */
import moment from 'moment';

export default {
    name: 'EditGroupSuccessModal',
    components: {
    },
    props: {
        editGroupSuccessInfo:{
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    data() {
        return {

        };
    },
    mounted(){

    },
    methods: {
        onClose() {
            this.$emit('on-close',6);
        },
    },
}