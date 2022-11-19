import EditWorklog from '@/components/EditWorklog/EditWorklog.vue';
import AddHoliday from '@/components/AddHoliday/AddHoliday.vue';
import { TIME_TRACKING_CHANNEL } from '../../config/channel';

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
        },
        isAdminEdit: {
            type: Boolean,
            default: false,
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
            this.$mySocket.emit(TIME_TRACKING_CHANNEL,this.id)
            this.$emit('on-update-worklog');
        },
        onSaveEditWorklog() {
            this.EditWorklogDialog = false;
            this.$mySocket.emit(TIME_TRACKING_CHANNEL,this.id)
            this.$emit('on-update-worklog');
        }
    },
}