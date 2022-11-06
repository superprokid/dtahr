/* eslint-disable */
import moment from 'moment';

export default {
    name: 'AddGroupSuccessModal',
    components: {
    },
    props: {
        addGroupSuccessInfo:{
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
            this.$emit('on-close',3);
        },
    },
}