/* eslint-disable */
import moment from 'moment';

export default {
    name: 'CreateUserSuccessModal',
    components: {
    },
    props: {
        createUserSuccessInfo:{
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
            this.$emit('on-close',8);
        },
    },
}