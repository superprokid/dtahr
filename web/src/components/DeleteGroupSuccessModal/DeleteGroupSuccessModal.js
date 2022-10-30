/* eslint-disable */
import moment from 'moment';

export default {
    name: 'DeleteGroupSuccessModal',
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
            this.$emit('on-close',4);
        },
    },
}