import AddWorklog from '@/components/AddWorklog/AddWorklog.vue';
import EditWorklog from '@/components/EditWorklog/EditWorklog.vue';

export default {
    name: 'VuetifyDialog',
    components: {
        AddWorklog,
        EditWorklog,
    },
    props: {
        username: {
            type: String,
            default: '',
        },
        id: {
            type: String,
            default: '',
        }
    },
    data() {
        return {
            AddWorklogDialog: false,
            EditWorklogDialog: false,
        };
    },
    
    methods: {
        onClose(screen) {
            if(screen == 1)
                this.AddWorklogDialog = false;
            else if (screen == 2)
                this.EditWorklogDialog = false;
        },
        onSaveAddWorklog() {
            this.AddWorklogDialog = false;
        },
        onSaveEditWorklog() {
            this.AddWorklogDialog = false;
        }
    },
}