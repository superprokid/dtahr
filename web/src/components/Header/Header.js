import { mapState } from 'vuex'
import CookieUtls from '../../services/CookieUtls';

const OVERTIME_CHANNEL = 'overttime';
const LEAVE_CHANNEL = 'leave';
const REPORT_CHANNEL = 'report';

export default {
    name: 'Header',
    data() {
        return {
            socket: {}
        }
    },
    mounted() {

        this.$mySocket.on(OVERTIME_CHANNEL, (msg) => {
            console.log(msg);
        });
        
        this.$mySocket.on(LEAVE_CHANNEL, (msg) => {
            // this.$root.$emit(REPORT_RECEIVER_SCREEN);
            console.log(msg);
        });
        
        this.$mySocket.on(REPORT_CHANNEL, (msg) => {
            // this.$root.$emit(REPORT_RECEIVER_SCREEN);
            console.log(msg);
        });

    },
    computed: {
        ...mapState(["startDataUser"])
    },
    methods: {
        redirect(component) {
            this.$router.push(component);
        },

        logout() {
            CookieUtls.removeAllCookie();
            this.redirect('login');
        }
    },
}