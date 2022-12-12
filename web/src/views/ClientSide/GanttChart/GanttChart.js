/*eslint-disable*/
import { gantt } from 'dhtmlx-gantt';
import tabName from '../../../config/tabname';
import TasksServices from '../../../services/API/Tasks/TasksServices';
import TaskDetailServices from "../../../services/API/TaskDetailAPI/TaskDetailServices"
import SessionUtls from '../../../services/SessionUtls';
import { addDays, addMonths, getAvatar, getDateString } from '../../../services/utilities';
import moment from 'moment';

export default {
    data() {
        return {
            tasks: {
                data: [],
            },
            selectedTask: null,
            selectedStartDate: getDateString(),
            selectedEndDate: getDateString(addMonths(new Date, 1)),

            statusColorArr: ['#ed8077', '#4488c5', '#5eb5a6', '#a1af2f'],
            currentProjectId: this.$route.params.projectId ?? SessionUtls.getItem(SessionUtls.projectSelectedKey),

            listCategories: [],
            listUsers: [],
            categorySelected: '',
            employeeSelected: '',
            keyword: '',

            allTasks: [],
            filterTasks: [],

            startDateMenu: false,
            selectedStatus: 5,

            monthRange: 1,
            listMonthSpan: [
                {
                    value: 1,
                    text: "1 Month"
                },
                {
                    value: 3,
                    text: "3 Months"
                },
                {
                    value: 6,
                    text: "6 Months"
                },
            ]
        };
    },
    watch: {
        selectedStartDate(newValue) {
            this.selectedEndDate = getDateString(addMonths(newValue, this.monthRange));
            this.$eventBus.$emit('show-spinner', true);
            this.getData().finally(() => {
                this.$eventBus.$emit('show-spinner', false);
                this.searchTasks();
            });
        },
        monthRange(newValue) {
            this.selectedEndDate = getDateString(addMonths(this.selectedStartDate, newValue));
            this.$eventBus.$emit('show-spinner', true);
            this.getData().finally(() => {
                this.$eventBus.$emit('show-spinner', false);
                this.searchTasks();
            });
        },
        selectedStatus() {
            this.searchTasks();
        }
    },

    computed: {

    },
    methods: {
        // Gantt Event --->>
        $_initGanttEvents: function () {
            if (!gantt.$_eventsInitialized) {
                gantt.$_eventsInitialized = true;
            }
        },

        $_initDataProcessor: function () {
            if (!gantt.$_dataProcessorInitialized) {
                gantt.createDataProcessor(async (entity, action, data, id) => {
                    const currentTask = this.getTaskById(id, this.allTasks);
                    const newStartDate = getDateString(data.start_date);
                    const newEndDate = getDateString(data.end_date);
                    this.$eventBus.$emit('show-spinner', true);
                    if ((currentTask.firstStartDate != newStartDate || currentTask.firstEndDate != newEndDate) && newStartDate != newEndDate) {
                        const startDate = newStartDate, endDate = getDateString(addDays(newEndDate, -1));
                        const response = await TaskDetailServices.userUpdateTask({
                            taskId: id,
                            startDate,
                            endDate
                        })
                        if (!response || response == -1) {
                            this.$toast.open({
                                message: "Something went wrong, please try later",
                                type: "error",
                                duration: 2000,
                                dismissible: true,
                                position: "top-right",
                            })
                        } else {
                            this.$toast.open({
                                message: "Update task success",
                                type: "success",
                                duration: 2000,
                                dismissible: true,
                                position: "top-right",
                            })
                        }
                    }
                    await this.getData();
                    this.$eventBus.$emit('show-spinner', false);
                });

                gantt.$_dataProcessorInitialized = true;
            }
        },
        // Gantt Event <<---

        // redner Gantt
        renderGantt: function () {
            gantt.config.start_date = new Date(this.selectedStartDate);
            gantt.config.end_date = new Date(this.selectedEndDate);
            const tasks = { data: this.filterTasks };
            gantt.config.show_tasks_outside_timescale = true;
            gantt.config.min_column_width = 50;
            gantt.clearAll();
            gantt.parse(tasks);
            gantt.render();
        },

        getData: async function () {
            const response = await TasksServices.getAllTaskForGantt({
                startDate: getDateString(this.selectedStartDate),
                endDate: getDateString(this.selectedEndDate),
                projectId: this.currentProjectId
            });
            if (!response) {
                this.$router.push("/user/login");
                return;
            }
            if (response == -1) {
                return;
            }
            const newData = response.data.map((item) => {
                const newStartDate = getDateString(item.start_date);
                const newEndDate = getDateString(addDays(item.end_date, 1))
                return {
                    ...item,
                    id: item.task_id,
                    text: item.task_title,
                    start_date: newStartDate,
                    end_date: newEndDate,
                    firstStartDate: newStartDate,
                    firstEndDate: newEndDate,
                    parent: item.parent_task_id,
                    color: this.statusColorArr[item.status]
                }
            })
            this.allTasks = [...newData];
            this.filterTasks = [...newData];
            this.renderGantt();
        },

        initGanttChart: function () {
            this.$_initGanttEvents();
            gantt.config.date_format = "%Y-%m-%d";
            gantt.config.scales = [
                { unit: "month", step: 1, format: "%F, %Y" },
                { unit: "day", step: 1, format: "%j" }
            ];
            gantt.config.open_tree_initially = true;
            gantt.config.columns = [
                {
                    name: 'text',
                    label: 'Subject',
                    tree: true,
                    width: '*',
                    template: function (obj) {
                        return `${obj.text}`;
                    },
                },
                {
                    name: 'startDate',
                    label: 'Assignee',
                    width: 150,
                    template: function (obj) {
                        return `${obj.assignee || "No assign"}`;
                    },
                },
            ];
            gantt.init(this.$refs.ganttContainer);
            gantt.parse(this.tasks);
            this.$_initDataProcessor();
        },

        initEventGanttChart: function () {
            const context = this;
            gantt.attachEvent("onTaskDblClick", function (id) {
                context.openTaskDetails(context, id);
                return false;
            });
        },

        openTaskDetails: function (context, taskId) {
            const newRoute = context.$router.resolve(`/user/taskside/taskdetail/${this.currentProjectId}/${taskId}`);
            window.open(newRoute.href, '_blank');
        },

        async _getAllCategory() {
            const response = await TasksServices.getAllCategory();
            if (!response) {
                this.$router.push('/user/login');
                return;
            }
            if (response === -1) {
                this.$toast.open({
                    message: "Something went wrong",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })
                return
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
                this.$toast.open({
                    message: "Something went wrong",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })
                return
            }
            this.listUsers = [...response.data];
        },
        getAvatar,

        searchTasks() {
            const listFilteredTask = [...this.allTasks].filter((task) => {
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
            const listParentTaskNotFilter = []
            for (let i = 0; i < listFilteredTask.length; i++) {
                const task = listFilteredTask[i];
                if (task.parent_task_id && !this.getTaskById(task.parent_task_id, listFilteredTask)) {
                    const parentTask = this.getTaskById(task.parent_task_id, this.allTasks);
                    if (parentTask) {
                        listParentTaskNotFilter.push(parentTask);
                    }
                }
            }
            listFilteredTask.push(...listParentTaskNotFilter);
            this.filterTasks = [...listFilteredTask];

            this.renderGantt();
        },

        getTaskById(id, listTask) {
            for (let i = 0; i < listTask.length; i++) {
                const task = listTask[i];
                if (task.task_id == id) {
                    return task;
                }
            }
            return false;
        }
    },
    async mounted() {
        this.$eventBus.$emit('show-spinner', true);
        this.initGanttChart();
        this.initEventGanttChart();
        await this.getData();
        await this._getAllCategory();
        await this._getAllUsers();
        this.$eventBus.$emit('show-spinner', false);
    },
    beforeCreate() {
        SessionUtls.setItem(SessionUtls.tabNameKey, tabName.ganttChartUser);
        this.$root.$emit('drawer');
    },
};