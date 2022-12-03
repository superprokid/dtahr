/* eslint-disable */
import SessionUtls from "../../../services/SessionUtls"
import tabName from '../../../config/tabname';
import { getDateString, getTimeString, getAvatar } from "../../../services/utilities";

import AdminProjectServices from "../../../services/API/AdminProjectAPI/AdminProjectServices"
import AdminProjectDetailServices from "../../../services/API/AdminProjectDetailAPI/AdmnProjectDetailServices"

import AddEmployeeToProjectModal from "../../../components/AddEmployeeToProjectModal/AddEmployeeToProjectModal.vue"
import DeleteEmployeeOutProjectModal from "../../../components/DeleteEmployeeOutProjectModal/DeleteEmployeeOutProjectModal.vue"

export default {
	name: 'AdminProjectDetail',
	components:{
		AddEmployeeToProjectModal,
		DeleteEmployeeOutProjectModal,
	},

	data() {
		return {
			valid: true,
			projectStatusInfo: {},

			percentageOpen: 0,
			percentageInProgress: 0,
			percentageResolved: 0,
			percentageClosed: 0,

			projectDetailInfo: {},

			projectEmployeeSelected: [],
			listProjectEmployee: [],
			employeeSearch: '',
			singleSelectProjectEmployee: false,
			genderArray:[
                'Male', 'Female', 'Other'
            ],
			
			AddEmployeeToProjectDialogShowed: false,
			projectIdProp: '',
			DeleteEmployeeOutProjectDialogShowed: false,
			confirmDeleteEmployeeOutProjectInfo: {}
		};
	},
    async mounted() {
        this.$eventBus.$emit('show-spinner', true);
		const projectStatus = await this.getProjectStatus()
		this.percentageOpen = Math.round((projectStatus.open / projectStatus.total)*100)
		this.percentageInprogress = Math.round((projectStatus.inprogress / projectStatus.total)*100)
		this.percentageResolved = Math.round((projectStatus.resolved / projectStatus.total)*100)
		this.percentageClosed = Math.round((projectStatus.closed / projectStatus.total)*100)
		const projectDetail = await this.getProjectDetail()
		console.log('projectDetail', projectDetail);
		

        this.$eventBus.$emit('show-spinner', false);
    },
    computed: {
        projectEmployeeHeaders(){
            return [
                {
                    text: 'Employee ID',
                    align: 'start',
                    value: 'employee_id',
                    width: 120,
                },
                {
                    text: 'Status',
                    value: 'is_deleted',
                    width: 120,
                },
                {
                    text: 'Full Name',
                    value: 'full_name',
                    width: 200,
                },
                {
                    text: "Gender",
                    value: 'gender',
                    width: 100,
                },
                {
                    text: 'Job role',
                    value: 'job_role',
                    width: 120,
                },
				{
                    text: 'Main Skill',
                    value: 'main_skill',
                    width: 120,
                },
                {
                    text: 'Joined Date',
                    value: 'assigned_date',
                    width: 120,
                },

            ]
        },
    },
	methods: {
		onClose(screen) {
            if(screen == 1){
                this.AddEmployeeToProjectDialogShowed = false;
            }else if(screen == 2){
				this.DeleteEmployeeOutProjectDialogShowed = false;
			}
        },
		filterOnlyCapsText(value, search, item) {
            item - 1;
            return value != null &&
                search != null &&
                typeof value === 'string' &&
                value.toString().toLocaleUpperCase().indexOf(search.toLocaleUpperCase()) !== -1
        },
		setItemRowCLass(item) {
            return 'item-row';
        },
		getAvatar,
		async getProjectStatus(){
			const params = {
				projectId: this.$route.params.projectId
			}
			const response = await AdminProjectDetailServices.adminGetProjectStatus(params)
            if (!response) {
                this.$router.push('/admin/login');
                return;
            }else if(response == -1){
                this.$toast.open({
                    message: "Get Project Status Fail",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })
                return
            }
			this.projectStatusInfo = response.data
			return this.projectStatusInfo
		},

		async getProjectDetail(){
			const params = {
				projectId: this.$route.params.projectId
			}
			const response = await AdminProjectDetailServices.adminGetProjectDetail(params)
            if (!response) {
                this.$router.push('/admin/login');
                return;
            }else if(response == -1){
                this.$toast.open({
                    message: "Get Project Detail Fail",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })
                return
            }
			this.projectDetailInfo = response.data
			this.projectDetailInfo.project_manager_assigned_date = getDateString(response.data.project_manager_assigned_date)
			this.projectDetailInfo.number = response.data.employees.length

			this.listProjectEmployee = response.data.employees.map(item => {
				return {...item,  gender: this.genderArray[item.gender], assigned_date: getDateString(item.assigned_date)}
			})
			return this.projectDetailInfo
		},

		onClickAddEmployeeToProject(){
			this.projectIdProp = this.$route.params.projectId
			this.AddEmployeeToProjectDialogShowed = true

		},

		async onAddEmployeeToProject(params){
			const response = await AdminProjectDetailServices.adminAddEmployeeToProject(params)
            if (!response) {
                this.$router.push('/admin/login');
                return;
            }else if(response == -1){
                this.$toast.open({
                    message: "Add Employee to Project Fail",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })
                return
            }
			this.AddEmployeeToProjectDialogShowed = false
			this.$toast.open({
                message: "Add Employee to Project Success",
                type: "success",
                duration: 2000,
                dismissible: true,
                position: "top-right",
            })
			await this.getProjectDetail()
		},

		onClickRemoveEmployeeOutProject(){
			this.DeleteEmployeeOutProjectDialogShowed = true
			this.confirmDeleteEmployeeOutProjectInfo = this.projectEmployeeSelected[0]
		},

		async onDeleteEmployeeOutProject(params){
			params.projectId = this.$route.params.projectId
			const response = await AdminProjectDetailServices.adminDeleteEmployeeOutProject(params)
			this.projectEmployeeSelected = []
            if (!response) {
                this.$router.push('/admin/login');
                return;
            }else if(response == -1){
                this.$toast.open({
                    message: "Remove Employee in Project Fail",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })
                return
            }
			this.DeleteEmployeeOutProjectDialogShowed = false
			this.$toast.open({
                message: "Remove Employee in Project Success",
                type: "success",
                duration: 2000,
                dismissible: true,
                position: "top-right",
            })
			await this.getProjectDetail()
		},
	},


};
