import { mapState } from 'vuex'

export default {
    name: 'Header',
    computed: {
        ...mapState(["startDataUser"])
    },
    methods: {
        redirect(component) {
            this.$router.push(component);
        }
    },
}