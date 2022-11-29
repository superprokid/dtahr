/* eslint-disable */
import SessionUtls from "../../../services/SessionUtls"
import tabName from '../../../config/tabname';
import { getDateString, getTimeString, getAvatar } from "../../../services/utilities";

import AdminProjectServices from "../../../services/API/AdminProjectAPI/AdminProjectServices"

import AddProjectModal from "../../../components/AddProjectModal/AddProjectModal.vue"
import EditProjectModal from "../../../components/EditProjectModal/EditProjectModal.vue"

export default {
	name: 'AdminProject',
	components:{
        AddProjectModal,
        EditProjectModal,

	},

	data() {
		return {
			singleSelect: false,
            selected: [],
            search: '',
            listProjects: [],

            AddProjectDialogShowed: false,
            EditProjectDialogShowed: false,

            editProjectInfo: {},
		};
	},
    async mounted() {
        this.$eventBus.$emit('show-spinner', true);
        await this.getProjects()
        this.$eventBus.$emit('show-spinner', false);
    },
    computed: {
        projectHeaders() {
            return [
                {
                    text: 'Project Id',
                    align: 'start',
                    value: 'project_id',
                    // width: 120,
                },
                {
                    text: 'Project Name',
                    value: 'project_name',
                    // width: 120,
                },
                {
                    text: 'Client Name',
                    value: 'client_id',
                    // width: 120,
                },
                {
                    text: 'Project Manager Id',
                    value: 'project_manager_id',
                    // width: 120,
                },
                {
                    text: 'Project Manager Name',
                    value: 'manager_full_name',
                    width: 200,
                },
                {
                    text: 'Project Manager Assigned Date',
                    value: 'project_manager_assigned_date',
                    // width: 120,
                },
                {
                    text: 'Project Creation Date',
                    value: 'create_at',
                    // width: 120,
                },
            ]   
        },
    },
	methods: {
        getAvatar,
        onClose(param){
            if(param == 1){
                this.AddProjectDialogShowed = false
            }else if(param == 2){
                this.EditProjectDialogShowed = false
            }
        },
		setItemRowCLass(){
            return 'item-row'
        },
        filterOnlyCapsText(value, search, item) {
            item - 1;
            return value != null &&
                search != null &&
                typeof value === 'string' &&
                value.toString().toLocaleUpperCase().indexOf(search.toLocaleUpperCase()) !== -1
        },
        async getProjects(){
            const response = await AdminProjectServices.adminGetProjects()
            if (!response) {
                this.$router.push('/admin/login');
                return;
            }else if(response == -1){
                this.$toast.open({
                    message: "Get Projects Fail",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })
                return
            }
            this.listProjects = response.data.map((item) => {
                return {...item, create_at: getDateString(item.create_at), project_manager_assigned_date: getDateString(item.project_manager_assigned_date)  }
            })
            console.log('listProjects', this.listProjects);
            return this.listProjects
        },

        onClickProjectRow(row){
            console.log('row', row);
            this.$router.push('/admin/projectdetail/'+ row.project_id);
        },

        async onCreateProject(params){
            const response = await AdminProjectServices.adminCreateProject(params)
            if (!response) {
                this.$router.push('/admin/login');
                return;
            }else if(response == -1){
                this.$toast.open({
                    message: "Create Project Fail",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })
                return
            }
            this.$toast.open({
                message: "Create Project Success",
                type: "success",
                duration: 2000,
                dismissible: true,
                position: "top-right",
            })
            await this.getProjects()
            this.AddProjectDialogShowed = false
        },
        onClickEditProject(){
            this.editProjectInfo = this.selected[0]
            this.EditProjectDialogShowed = true
        },

        async onEditProject(params){
            console.log('params', params);
            const response = await AdminProjectServices.adminUpdateProject(params)
            this.selected = []
            if (!response) {
                this.$router.push('/admin/login');
                return;
            }else if(response == -1){
                this.$toast.open({
                    message: "Update Project Fail",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })
                return
            }
            this.$toast.open({
                message: "Update Project Success",
                type: "success",
                duration: 2000,
                dismissible: true,
                position: "top-right",
            })
            await this.getProjects()
            this.EditProjectDialogShowed = false
        },
	},

	beforeCreate() { 
		SessionUtls.setItem(SessionUtls.tabNameKey, tabName.projectAdmin);
	},
};
