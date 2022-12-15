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
        editDialogProp:{
            type: Object,
            default: {},
        },
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

            previousParam: {},
        };
    },
    mounted(){
        this.previousParam = {
            ...this.editDialogProp
        }
        this.groupName = this.editDialogProp.group_name;
        this.groupFullName = this.editDialogProp.group_full_name;
        this.managerStartDate = this.editDialogProp.manager_start_date
        
        this.$eventBus.$emit('show-spinner', true);
        this._getAllFreeManager()

        this.$eventBus.$emit('show-spinner', false);
    },
    methods: {
        onClose() {
            this.$emit('on-close',2);
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

        onClickEditGroup () {
            if(this.$refs.form.validate()){
                
                
                let isEditApproved = false;

                const params = {
                    groupId: this.editDialogProp.group_id,
                    // groupName: this.groupName,
                    // groupFullName: this.groupFullName,
                    // managerId: this.managerSelect[0].employee_id,
                    // managerStartDate: this.managerStartDate,
                }
                if(this.previousParam.group_name !== this.groupName){
                    isEditApproved =true
                    params.groupName = this.groupName
                }
                if(this.previousParam.group_full_name !== this.groupFullName){
                    isEditApproved =true
                    params.groupFullName = this.groupFullName
                }
                if(this.previousParam.manager_id !== this.managerSelect[0].employee_id){
                    isEditApproved =true
                    params.managerId = this.managerSelect[0].employee_id
                }
                if(this.previousParam.manager_start_date != this.managerStartDate){
                    isEditApproved =true
                    params.managerStartDate = this.managerStartDate
                }

                if(isEditApproved){
                    // goi api
                    this.$emit('on-edit-group', params);
                }
                // const response = await AdminGroupServices.createGroup(params);
                // if(!response){
                //     this.$router.push('/admin/login')
                // } else if(response == -1){
                //     alert('Some thing wrong! Call Fail')
                // }
                // else {
                //     console.log('Create Group Successfully');
                // }
                
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
                this.$toast.open({
                    message: "Something went wrong, call fail",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })
                return
            }
            else {
                this.listFreeManager = response.data.map((item) => {
                    return {...item, }
                })
                this.listFreeManager.push({employee_id: this.editDialogProp.manager_id, full_name: this.editDialogProp.manager_name})

                this.managerSelect.push({employee_id: this.editDialogProp.manager_id, full_name: this.editDialogProp.manager_name})
            }
        },
    },
}