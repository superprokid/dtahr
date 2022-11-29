/* eslint-disable */
import DateTimePicker from '@/components/DateTimePicker/DateTimePicker.vue'
import Input from '@/components/Input/Input.vue';

import AdminGroupServices from "../../services/API/AdminGroup/AdminGroupServices"

import moment from 'moment';

export default {
    name: 'AddNewUserModal',
    components: {
        DateTimePicker,
        Input,
    },
    props: {
    },
    data() {
        return {
            valid: true,

            firstName: '',
            firstNameRules: [
                v => !!v || 'First Name is required',
            ],

            lastName: '',
            lastNameRules: [
                v => !!v || 'Last Name is required',
            ],

            dob: undefined,
            dobRules: [
                v => !!v || 'Date of birth is required',
            ],
            dobModalShowed: false,

            gender: '',
            genderItems: [
                {
                    gender_text: "Male",
                    gender_value: "0"
                },
                {
                    gender_text: "Female",
                    gender_value: "1"
                },
                {
                    gender_text: "Other",
                    gender_value: "2"
                }
            ],
            genderRules:[
                v => !!v || 'Gender is required',
            ],

            address: '',

            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],

            joinDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),

            phone: '',

            mainSkill: '',
            jobRole: '',
            salary: '',
            bankAccount: '',
            bankName: '',

            relationShip: '',
            relativeName: '',
            relativeDob: undefined,
            relativeDobModalShowed: false,

            relativeGender: '',
            relativePhone: '',
            relativeAddress: '',

            loader: null,
            loading: false,

            selectGroup: {},
            listGroups: [],
            groupRules: [
                v => !!v || 'Group is required',
            ]
            

        };
    },
    async mounted(){
        this.$eventBus.$emit('show-spinner', true);
        await this.getAllGroup()
        this.$eventBus.$emit('show-spinner', false);
    },
    watch: {
        loader () {
          const l = this.loader
          this[l] = !this[l]
  
          setTimeout(() => (this[l] = false), 3000)
  
          this.loader = null
        },
    },
    methods: {
        onClose() {
            this.$emit('on-close',7);
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

        onClickCreateUser () {
            if(this.$refs.form.validate()){
                const params = {
                    email: this.email,
                    firstName: this.firstName,
                    lastName: this.lastName,
                    dob: this.dob,
                    gender: Number(this.gender),
                    groupId: this.selectGroup.group_id,
                    employerId: this.selectGroup.manager_id,
                    joinDate: this.joinDate
                }
                if(this.address != '') params.address = this.address
                if(this.phone != '') params.phone = this.phone
                if(this.mainSkill != '') params.mainSkill = this.mainSkill
                if(this.jobRole != '') params.jobRole = this.jobRole
                if(this.salary != '') params.salary = this.salary
                if(this.bankAccount != '') params.bankAccount = this.bankAccount
                if(this.bankName != '') params.bankName = this.bankName

                if(this.relationShip != '') params.relationShip = this.relationShip
                if(this.relativeName != '') params.relativeName = this.relativeName
                if(this.relativeDob != undefined) params.relativeDob = this.relativeDob
                if(this.relativeGender != '') params.relativeGender = Number(this.relativeGender)
                if(this.relativePhone != '') params.relativePhone = this.relativePhone
                if(this.relativeAddress != '') params.relativeAddress = this.relativeAddress
                
                this.loader = 'loading'
                const group_info = this.selectGroup
                this.$emit('on-create-user', params, group_info);
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

        onChangeGroup(value){
            console.log(value);
            this.selectGroup = value
        },

        async getAllGroup(){
            const response = await AdminGroupServices.getGroupAdmin()
            if(!response){
                this.$router.push('/admin/login')
                return
            } else if(response == -1){
                this.$toast.open({
                    message: "Get group Fail",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })
                return
            }
            this.listGroups = response.data
            return this.listGroups
        },
    },
}