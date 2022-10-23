import DateTimePicker from '@/components/DateTimePicker/DateTimePicker.vue'
import Input from '@/components/Input/Input.vue';

import AdminGroupServices from "../../services/API/AdminGroup/AdminGroupServices"

import moment from 'moment';

export default {
    name: 'AddGroupModal',
    components: {
        DateTimePicker,
        Input,
    },
    props: {
        
    },
    data() {
        return {
            // date : moment().subtract(1, "days").format("YYYY-MM-DD"),
            description: '',
            total: 0,

            valid: true,

            groupName: '',
            groupNameRules: [
                v => !!v || 'Group Name is required',
                v => (v && v.length <= 10) || 'Group Name must be less than 10 characters',
            ],

            groupFullName: '',
            groupFullNameRules: [
                v => !!v || 'Group Name is required',
                v => (v && v.length <= 100) || 'Group Full Name must be less than 100 characters',
            ],
            
            select: null,
            items: [
                'Item 1',
                'Item 2',
                'Item 3',
                'Item 4',
            ],

            managerSelect: [],
            comboboxRules: [
                v => !!v || 'Manager is required',
            ],
            managerStartDate: moment(new Date()).format("YYYY-MM-DD"),

            listFreeManager: [],

        };
    },
    mounted(){
        this.$eventBus.$emit('show-spinner', true);
        this._getAllFreeManager()
        this.$eventBus.$emit('show-spinner', false);
    },
    methods: {
        onClose() {
            this.$emit('on-close',1);
        },
        async onSave() {
            // this.$emit('on-save');
        },
        allowedDates(date) {
            if(date >= moment().format('YYYY-MM-DD')) {
                return false;
            }
            return true
        },

        onClickCreateGroup () {
            if(this.$refs.form.validate()){
                const params = {
                    groupName: this.groupName,
                    groupFullName: this.groupFullName,
                    managerId: this.managerSelect[0].employee_id,
                    managerStartDate: this.managerStartDate,
                }
                // console.log('params for create group', params);
                // const response = await AdminGroupServices.createGroup(params);
                // if(!response){
                //     this.$router.push('/admin/login')
                // } else if(response == -1){
                //     alert('Some thing wrong! Call Fail')
                // }
                // else {
                //     console.log('Create Group Successfully');
                // }
                this.$emit('on-create-group', params);
            }
        },
        reset () {
            this.$refs.form.reset()
        },
        resetValidation () {
            this.$refs.form.resetValidation()
        },

        remove (item) {
            this.managerSelect.splice(this.managerSelect.indexOf(item), 1)
        },
        required(value) {
            if (value instanceof Array && value.length == 0) {
              return 'Manager is Required.';
            }
            if (value instanceof Array && value.length > 1) {
                return 'Only 1 Manager.';
              }
            return !!value || 'Manager is Required.';
        },

        async _getAllFreeManager(){
            const response = await AdminGroupServices.getAllFreeManager();
            if(!response){
                this.$router.push('/admin/login')
            } else if(response == -1){
                alert('Some thing wrong! Call Fail')
            }
            else {
                this.listFreeManager = response.data.map((item) => {
                    return {...item, }
                })
                console.log('this.listFreeManager',this.listFreeManager);
            }
        },
    },
}