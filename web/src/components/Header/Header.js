import { mapState } from 'vuex'
import CookieUtls from '../../services/CookieUtls';

export default {
    name: 'Header',
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