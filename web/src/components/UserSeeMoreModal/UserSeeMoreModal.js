/* eslint-disable */
import DateTimePicker from '@/components/DateTimePicker/DateTimePicker.vue'
import Input from '@/components/Input/Input.vue';


import moment from 'moment';

import { getAvatar, getDateString, getTimeString, isPastDate} from "../../services/utilities";

import AdminGroupServices from "../../services/API/AdminGroup/AdminGroupServices"

export default {
    name: 'UserSeeMoreModal',
    components: {
        DateTimePicker,
        Input,
    },
    props: {
        userDetailInfo:{
            type: Object,
            default: {},
        },
    },
    data() {
        return {
            valid: true,

            genderItems: [
                {
                    gender_text: "Male",
                    gender_value: 0
                },
                {
                    gender_text: "Female",
                    gender_value: 1
                },
                {
                    gender_text: "Other",
                    gender_value: 2
                }
            ],
            listGroups: [],
            selectGroup: {},
            employer_name: '',

            emailEdit: '',


            dob: moment(new Date(new Date().getFullYear(), new Date().getMonth(), 1)).format("YYYY-MM-DD"),
            dobPicker: false,

            relativeDob: moment(new Date(new Date().getFullYear(), new Date().getMonth(), 1)).format("YYYY-MM-DD"),
            relativeDobPicker: false
        };
    },
    async mounted(){
        this.userDetailInfo.dob = getDateString(this.userDetailInfo.dob)
        this.userDetailInfo.join_date = getDateString(this.userDetailInfo.dob)
        this.selectGroup = {group_id: this.userDetailInfo.group_id}
        this.emailEdit = this.userDetailInfo.email
        this.dob = getDateString(this.userDetailInfo.dob)
        this.userDetailInfo.relative_dob = getDateString(this.userDetailInfo.relative_dob)
        this.relativeDob = getDateString(this.userDetailInfo.relative_dob)

        const temp = await this.getAllGroup()
        let employerName = ''
        for (let index = 0; index < temp.length; index++) {
            const element = temp[index];
            if(element.group_id === this.userDetailInfo.group_id){
                employerName = element.manager_name
                break
            }
        }
        this.employer_name = employerName
    },
    methods: {
        onClose() {
            this.$emit('on-close', 3);
        },
        async onSave() {
            // this.$emit('on-save');
        },
        onAddHoliday(){
            if(this.$refs.form.validate()){
                const params = {
                    holidayTime: Number(this.time * 480),
                    description: this.reason,
                }

                this.$emit('on-add-holiday', params);
            }
        },
        increment () {
            this.time = parseInt(this.time,10) + 1
        },
        decrement () {
            this.time = parseInt(this.time,10) - 1
        },

        getAvatar(){
            return getAvatar(this.userDetailInfo.avt)
        },
        getDateString,
        getTimeString,

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

        onChangeGroup(value){
            console.log(value);
            this.userDetailInfo.employer_id = value.manager_id
            this.employer_name = value.manager_name
            this.userDetailInfo.group_id = value.group_id
        },

        onSaveUserSeeMore(){
            const params = {
                employeeId: this.userDetailInfo.employee_id,
                
                firstName: this.userDetailInfo.first_name,
                lastName: this.userDetailInfo.last_name,
                dob: this.userDetailInfo.dob,
                address: this.userDetailInfo.address,
                gender: this.userDetailInfo.gender,
                phone: this.userDetailInfo.phone,
                mainSkill: this.userDetailInfo.main_skill,
                subSkill: this.userDetailInfo.sub_skill,
                groupId: this.userDetailInfo.group_id,
                joinDate: this.userDetailInfo.join_date,
                jobRole: this.userDetailInfo.job_role,
                employerId: this.userDetailInfo.employer_id,
                relativeName: this.userDetailInfo.relative_name,
                relativeDob: this.userDetailInfo.relative_dob,
                relativeGender: this.userDetailInfo.relative_gender,
                relativeAddress: this.userDetailInfo.relative_address,
                relativePhone: this.userDetailInfo.relative_phone,
                relationship: this.userDetailInfo.relationship,
                salary: this.userDetailInfo.salary,
                bankAccount: this.userDetailInfo.bank_account,
                bankName: this.userDetailInfo.bank_name,
                role: this.userDetailInfo.role
            }
            if(this.emailEdit != this.userDetailInfo.email) params.email = this.userDetailInfo.email
            this.$emit('on-save-user-see-more', params);
        },

        onSelectDob(dob){
            this.userDetailInfo.dob = dob
        },

        onSelectRelativeDob(dob){
            this.userDetailInfo.relative_dob = dob
        }
    },
}
