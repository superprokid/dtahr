import TasksServices from "../../../services/API/Tasks/TasksServices";
import { getDateStringWithTask, isPastDate } from "../../../services/utilities";
import { USER_GET_IMAGE } from '../../../config/constant'
import SessionUtls from "../../../services/SessionUtls";
import tabName from "../../../config/tabname";

export default {
    data() {
        return {
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

            listCategories: [],
            listUsers: [],
            categorySelected: '',
            employeeSelected: '',
            keyword: '',
            currentProjectId: this.$route.params.projectId ?? SessionUtls.getItem(SessionUtls.projectSelectedKey),

            selectedStatus: 5,
        }
    },
    watch: {
        selectedStatus() {
            this.searchTasks();
        }
    },
    async mounted() {
        this.$eventBus.$emit('show-spinner', true);
        await this._getAllTasks();
        await this._getAllCategory();
        await this._getAllUsers();
        this.$eventBus.$emit('show-spinner', false);
    },
    methods: {
        async _getAllTasks() {
            const response = await TasksServices.getAllTasks({ projectId: this.currentProjectId });
            if (!response) {
                this.$router.push('/user/login');
                return;
            }
            if (response === -1) {
                alert("Call Fail")
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
        },
        async _getAllCategory() {
            const response = await TasksServices.getAllCategory();
            if (!response) {
                this.$router.push('/user/login');
                return;
            }
            if (response === -1) {
                alert("Call Fail");
            }
            this.listCategories = [...response.data];
        },
        async _getAllUsers() {
            const response = await TasksServices.getAllUser({ projectId: this.currentProjectId });
            if (!response) {
                this.$router.push('/user/login');
                return;
            }
            if (response === -1) {
                alert("Call Fail");
            }
            this.listUsers = [...response.data];
        },
        getAvt(avt) {
            if (avt) {
                return USER_GET_IMAGE + '/' + avt
            }
            else {
                return require("@/assets/user-default.png")
            }
        },
        getStatus(status) {
            return {
                text: this.statusTextArr[status],
                color: this.statusColorArr[status],
            }
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
                    if (!String(task.task_id).includes(this.keyword) && !task.task_title.includes(this.keyword)) {
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
        setItemRowCLass(){
            return 'item-row'
        },
        openTaskDetails(task) {
            this.$router.push(`/user/taskside/taskdetail/${this.currentProjectId}/${task.task_id}`);
        }
    },
    beforeCreate() {
        SessionUtls.setItem(SessionUtls.tabNameKey, tabName.taskUser);
        this.$root.$emit('drawer');
    },
}