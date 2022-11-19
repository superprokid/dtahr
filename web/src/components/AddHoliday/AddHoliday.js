import DateTimePicker from '@/components/DateTimePicker/DateTimePicker.vue'
import Input from '@/components/Input/Input.vue';

import HolidayServices from '@/services/API/HolidayAPI/HolidayServices';
import AdminUserManagementService from '../../services/API/AdminUserManagement/AdminUserManagement.service';

export default {
    name: 'AddHoliday',
    components: {
        DateTimePicker,
        Input,
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
            reason: '',
            time: 0,
            isSave: false,
        };
    },
    methods: {
        onClose() {
            this.isSave = false;
            this.$emit('on-close',2);
        },
        async onSave() {
            this.isSave = true;
            let params = {
                employeeId: this.id,
                holidayTime: this.time,
                description: this.reason,
            }
            if (!this.time || !this.reason) {
                return;
            }
            let response
            this.$eventBus.$emit('show-spinner', true);
            if (this.isAdminEdit) {
                response = await AdminUserManagementService.updateUserHoliday(params);
            }
            else {
                response = await HolidayServices.updateHoliday(params);                
            }
            this.$eventBus.$emit('show-spinner', false);
            if (!response) {
                this.$router.push(this.isAdminEdit ? 'admin/login' : 'user/login')
                return
            }
            this.resetData()
            this.$emit('on-save');
        },
        increment () {
            this.time = parseInt(this.time,10) + 1
        },
        decrement () {
            this.time = parseInt(this.time,10) - 1
        },
        resetData() {
            this.isSave = false;
            this.reason = '';
            this.time = 0;
        }
    },
}