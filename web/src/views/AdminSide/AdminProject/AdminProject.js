/* eslint-disable */
import SessionUtls from "../../../services/SessionUtls"
import tabName from '../../../config/tabname';
import { getDateString, getTimeString, getAvatar } from "../../../services/utilities";

import AdminProjectServices from "../../../services/API/AdminProjectAPI/AdminProjectServices"
import AdminCSVServices from "../../../services/API/CSVExportAPI/CSVExport.services"

import AddProjectModal from "../../../components/AddProjectModal/AddProjectModal.vue"
import EditProjectModal from "../../../components/EditProjectModal/EditProjectModal.vue"
import DeleteProjectModal from "../../../components/DeleteProjectModal/DeleteProjectModal.vue"

export default {
	name: 'AdminProject',
	components:{
        AddProjectModal,
        EditProjectModal,
        DeleteProjectModal,

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

            deleteProjectInfo: {},
            DeleteProjectDialogShowed: false,
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
            }else if(param == 3){
                this.DeleteProjectDialogShowed = false
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

        onClickDeleteProject(){
            this.deleteProjectInfo = this.selected[0]
            this.DeleteProjectDialogShowed = true
        },
        async onDeleteProject(params){
            this.$eventBus.$emit('show-spinner', true);
            const response = await AdminProjectServices.adminDeleteProject(params)
            this.selected = []
            if (!response) {
                this.$router.push('/admin/login');
                return;
            }else if(response == -1){
                this.$toast.open({
                    message: "Delete Project Fail",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })
                return
            }
            this.DeleteProjectDialogShowed = false
            this.$toast.open({
                message: "Delete Project Success",
                type: "success",
                duration: 2000,
                dismissible: true,
                position: "top-right",
            })
            await this.getProjects()
            this.$eventBus.$emit('show-spinner', false);
        },

        async onClickExportProject(){
            let listProjectTemp = this.selected.map((item)=> item.project_id)
            const params = {
                listProject: listProjectTemp
            }
            const response = await AdminCSVServices.exportProjectCSV(params)
            this.selected = []
            if(!response){
                this.$router.push('/admin/login')
            } else if(response == -1){
                this.$toast.open({
                    message: "Export Project Fail",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })             
                return
            }
            // success
            let name = `Project-Information.xlsx`;
            if (window.navigator.msSaveBlob) {
                window.navigator.msSaveBlob(response.data, name);
            } else {
                let url = window.URL.createObjectURL(response.data);
                let a = document.createElement('a');
                a.href = url;
                a.download = name;
                a.target = '_blank';
                a.click();
            }
        }

	},

	beforeCreate() { 
		SessionUtls.setItem(SessionUtls.tabNameKey, tabName.projectAdmin);
	},
};
