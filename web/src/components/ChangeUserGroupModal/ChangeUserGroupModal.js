/* eslint-disable */
import DateTimePicker from '@/components/DateTimePicker/DateTimePicker.vue'
import Input from '@/components/Input/Input.vue';


import moment from 'moment';

import { getAvatar, getDateString, getTimeString, isPastDate} from "../../services/utilities";
import AdminUserManagementService from "../../services/API/AdminUserManagement/AdminUserManagement.service"

import AdminGroupServices from "../../services/API/AdminGroup/AdminGroupServices"

export default {
    name: 'ChangeUserGroupModal',
    components: {
        DateTimePicker,
        Input,
    },
    props: {
        changeUserGroupInfo:{
            type: Object,
            default: {},
        },
    },
    data() {
        return {
            valid: true,
            
            selectGroup: '',
            listGroup: [],
            listGroupRules: [
                v => !!v || 'Group is required',
            ],
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
        const tempGroupList = await this.getAllGroups()
        for (let index = 0; index < tempGroupList.length; index++) {
            const element = tempGroupList[index];
            if(element.group_id === this.changeUserGroupInfo.group_id){
                this.selectGroup = element
                break
            }
        }
        this.$eventBus.$emit('show-spinner', false);
    },
    methods: {
        onClose() {
            this.$emit('on-close', 11);
        },
        onChangeUserGroup () {
            if(this.$refs.form.validate()){
                const params = {
                    employeeId: this.changeUserGroupInfo.employee_id,
                    groupId: this.selectGroup.group_id,
                    employerId: this.selectGroup.manager_id
                }

                this.$emit('on-change-user-group', params);
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
        getAvatar,
        
        async getAllGroups(){
            const response = await AdminGroupServices.getGroupAdmin()
            if(!response){
                this.$router.push('/admin/login')
            } else if(response == -1){
                this.$toast.open({
                    message: "Get Group Fail",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })             
                return
            }
            this.listGroup = response.data.map((item) => {
                return {...item, manager_start_date: getDateString(item.manager_start_date)}
            })
            console.log('this.listGroup', this.listGroup);
            return this.listGroup
        },
        onChangeGroup(value){
            this.selectGroup = value
            console.log(this.selectGroup);
        }
    },
}