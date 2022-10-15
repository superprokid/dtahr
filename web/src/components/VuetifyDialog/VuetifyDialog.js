import EditWorklog from '@/components/EditWorklog/EditWorklog.vue';
import AddHoliday from '@/components/AddHoliday/AddHoliday.vue';

export default {
    name: 'VuetifyDialog',
    components: {
        EditWorklog,
        AddHoliday,
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
            AddHolidayDialog: false,
            EditWorklogDialog: false,
        };
    },
    
    methods: {
        onClose(screen) {
            if(screen == 1)
                this.EditWorklogDialog = false;
            else if (screen == 2)
                this.AddHolidayDialog = false;
        },
        onSaveAddHoliday() {
            this.AddHolidayDialog = false;
            this.$emit('on-update-worklog');
        },
        onSaveEditWorklog() {
            this.EditWorklogDialog = false;
            this.$emit('on-update-worklog');
        }
    },
}