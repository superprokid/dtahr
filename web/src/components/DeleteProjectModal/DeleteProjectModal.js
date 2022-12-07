/* eslint-disable */
import DateTimePicker from '@/components/DateTimePicker/DateTimePicker.vue'
import Input from '@/components/Input/Input.vue';

import AdminGroupServices from "../../services/API/AdminGroup/AdminGroupServices"

import moment from 'moment';

import { getAvatar, getDateString, getTimeString, isPastDate} from "../../services/utilities";
import AdminUserManagementService from "../../services/API/AdminUserManagement/AdminUserManagement.service"

export default {
    name: 'DeleteProjectModal',
    components: {
        DateTimePicker,
        Input,
    },
    props: {
        deleteProjectInfo:{
            type: Object,
            default: {},
        },
    },
    data() {
        return {
            valid: true,
            checkbox: false,
        };
    },
    watch: {
        isUpdating (val) {
          if (val) {
            setTimeout(() => (this.isUpdating = false), 3000)
          }
        },
    },
    async mounted(){
        this.$eventBus.$emit('show-spinner', true);
        

        this.$eventBus.$emit('show-spinner', false);
    },
    methods: {
        onClose() {
            this.$emit('on-close',3);
        },
        onConfirmDelete () {
            if(this.$refs.form.validate()){
                const params = {
                    projectId: this.deleteProjectInfo.project_id
                }

                this.$emit('on-delete-project', params);
            }
        },
        reset () {
            this.$refs.form.reset()
        },
        resetValidation () {
            this.$refs.form.resetValidation()
        },

        getAvatar,
    },
}