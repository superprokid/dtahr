/* eslint-disable */
import SessionUtls from "../../../services/SessionUtls"
import tabName from '../../../config/tabname';
import { getDateString, getTimeString, getAvatar, getDateStringWithTask, isPastDate } from "../../../services/utilities";

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
			confirmDeleteEmployeeOutProjectInfo: {},

            isProjectTaskShowed: false,
            isProjectDetailShowed: true,

            selectedStatus: 5,
            allTasks: [],
            listFiltered: [],
            headers: [
                { width: 120, text: 'Category', value: 'category_name', align: 'center', },
                { width: 80, text: 'Key', value: 'task_id', align: 'start', },
                { width: 300, text: 'Subject', value: 'task_title', align: 'start', },
                { width: 200, text: 'Assignee', value: 'assignee', align: 'center', },
                { width: 120, text: 'Status', value: 'status', align: 'center', },
                { width: 100, text: 'Priority', value: 'priority', align: 'center', },
                { width: 150, text: 'Created', value: 'create_at', align: 'center', },
                { width: 150, text: 'Start date', value: 'start_date', align: 'center', },
                { width: 170, text: 'Due date', value: 'end_date', align: 'center', },
                { width: 150, text: 'Estimated hours', value: 'estimated_hours', align: 'center', },
                { width: 130, text: 'Actual hours', value: 'actual_hours', align: 'center', },
                { width: 150, text: 'Updated', value: 'update_at', align: 'center' }
            ],
            statusTextArr: ['Open', 'Inprogress', 'Resolved', 'Closed'],
            statusColorArr: ['#ed8077', '#4488c5', '#5eb5a6', '#a1af2f'],
            priorityIconArr: ['mdi-arrow-down', 'mdi-arrow-right', 'mdi-arrow-up'],
            priorityColorArr: ['green', 'blue', 'red'],

            categorySelected: '',
            listCategories: [],
            listUsers: [],
            employeeSelected: '',
            keyword: '',

		};
	},
    watch: {
        selectedStatus() {
            this.searchTasks();
        }
    },
    async mounted() {
        this.$eventBus.$emit('show-spinner', true);
		const projectStatus = await this.getProjectStatus()
		this.percentageOpen = Math.round((projectStatus.open / projectStatus.total)*100)
		this.percentageInprogress = Math.round((projectStatus.inprogress / projectStatus.total)*100)
		this.percentageResolved = Math.round((projectStatus.resolved / projectStatus.total)*100)
		this.percentageClosed = Math.round((projectStatus.closed / projectStatus.total)*100)
		const projectDetail = await this.getProjectDetail()
        await this.getAllTask()
        await this._getAllUsers();
        await this._getAllCategory();
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
        setItemRowCLass(){
            return 'item-row'
        },
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

        onClickSeeProjectTask(){
            this.isProjectTaskShowed = true
            this.isProjectDetailShowed = false
        },

        goBackProjectDetail(){
            this.isProjectTaskShowed = false
            this.isProjectDetailShowed = true
        },

        async getAllTask(){
            const params = {
                projectId: this.$route.params.projectId
            }
            const response = await AdminProjectDetailServices.adminGetAllTask(params)
            if (!response) {
                this.$router.push('/admin/login');
                return;
            }else if(response == -1){
                this.$toast.open({
                    message: "Get All Task Fail",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })
                return
            }
            this.allTasks = response.data.map(item => {
                return {
                    ...item,
                    isLate: isPastDate(item.end_date) && item.status != 3,
                    start_date: getDateStringWithTask(item.start_date),
                    end_date: getDateStringWithTask(item.end_date),
                    create_at: getDateStringWithTask(item.create_at),
                    update_at: getDateStringWithTask(item.update_at),
                }
            })
            this.listFiltered = [...this.allTasks];
            console.log(this.listFiltered);
        },
        getStatus(status) {
            return {
                text: this.statusTextArr[status],
                color: this.statusColorArr[status],
            }
        },

        async _getAllUsers() {
            const params = {
                projectId: this.$route.params.projectId
            }
            const response = await AdminProjectDetailServices.adminGetAllUserInProject(params);
            if (!response) {
                this.$router.push('/admin/login');
                return;
            }
            else if(response == -1){
                this.$toast.open({
                    message: "Get All User In Project Fail",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })
                return
            }
            this.listUsers = [...response.data];
        },
        async _getAllCategory() {
            const response = await AdminProjectDetailServices.adminGetAllTaskCategory();
            if (!response) {
                this.$router.push('/user/login');
                return;
            }
            else if(response == -1){
                this.$toast.open({
                    message: "Get All Task Category Fail",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })
                return
            }
            this.listCategories = [...response.data];
        },
        searchTasks() {
            this.listFiltered = this.allTasks.filter((task) => {
                if (this.categorySelected && this.categorySelected != task.category_id) {
                    return false;
                }
                if (this.employeeSelected && this.employeeSelected != task.assignee_id) {
                    return false;
                }
                if (this.keyword) {
                    if (!String(task.task_number).includes(this.keyword) && !task.task_title.includes(this.keyword)) {
                        return false;
                    }
                }
                switch (this.selectedStatus) {
                    case "0": // Open
                    case "1": // In Progress
                    case "2": // Resolved
                    case "3": // Closed
                        if (task.status == this.selectedStatus) {
                            return true;
                        } else {
                            return false;
                        }
                    case "4": // Not Closed
                        if (task.status != 3) {
                            return true;
                        } else {
                            return false;
                        }
                    case "5":
                        return true;
                    default:
                        break;
                }
                return true;
            });
        },
	},


};
