/* eslint-disable */
import AdminGroupServices from "../../services/API/AdminGroup/AdminGroupServices"
import moment from 'moment';

import AddTaskServices from "../../services/API/AddTaskAPI/AddTaskServices"

export default {
    name: 'AddParentTaskModal',
    components: {
    },
    props: {
        projectIdProp:{
            type: String,
            default: ''
        }
    },
    data() {
        return {
            categoryName: '',
            categoryNameRules: [
                v => !!v || 'Category Name is required',
            ],


            valid: true,

            projectSearch: '',
            listParentTask: [],

            selectedItem: 0,
            items: [
                { text: 'Real-Time', icon: 'mdi-clock' },
                { text: 'Audience', icon: 'mdi-account' },
                { text: 'Conversions', icon: 'mdi-flag' },
            ],

            statusTextArr: ['Open', 'Inprogress', 'Resolved', 'Closed'],
            statusColorArr: ['#ed8077', '#4488c5', '#5eb5a6', '#a1af2f'],
        };
    },
    mounted(){

    },
    methods: {
        onClose() {
            this.$emit('on-close',2);
        },

        onClickCreateCategoryTask(){
            if(this.$refs.form.validate()){
                const params = {
                    categoryName: this.categoryName,
                    categoryColor: this.picker
                }
                this.$emit('on-create-category-task', params);
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
        async onSearchProject(){
            const params = {
                projectId: this.projectIdProp,
                search: this.projectSearch
            }
            const response = await AddTaskServices.searchParentTask(params)
            if (!response) {
                this.$router.push('/user/login');
                return;
            }
            if(response === -1){
                this.$toast.open({
                    message: "Search Fail",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })
                return
            }
            this.listParentTask = response.data
        },

        onSelectParentTask(params){
            this.$emit('on-select-parent-task', params);
        }
    },
}