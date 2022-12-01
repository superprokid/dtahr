import { gantt } from 'dhtmlx-gantt';
import tabName from '../../../config/tabname';
import TasksServices from '../../../services/API/Tasks/TasksServices';
import SessionUtls from '../../../services/SessionUtls';
import { addDays, addMonths, getAvatar, getDateString } from '../../../services/utilities';

export default {
    data() {
        return {
            tasks: {
                data: [],
            },
            selectedTask: null,
            selectedStartDate: getDateString(),
            selectedEndDate: getDateString(addMonths(new Date, 1)),

            monthRange: 1,

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
        };
    },
    watch: {
        selectedStartDate(newValue) {
            this.selectedEndDate = getDateString(addMonths(newValue, this.monthRange));
            this.$eventBus.$emit('show-spinner', true);
            this.getData().finally(() => {
                this.$eventBus.$emit('show-spinner', false);
            });
        }
    },

    computed: {

    },
    methods: {
        // Gantt Event --->>
        $_initGanttEvents: function () {
            if (!gantt.$_eventsInitialized) {
                gantt.attachEvent('onTaskSelected', (id) => {
                    let task = gantt.getTask(id);
                    this.$emit('task-selected', task);
                });

                gantt.attachEvent('onTaskIdChange', (id, new_id) => {
                    if (gantt.getSelectedId() == new_id) {
                        let task = gantt.getTask(new_id);
                        this.$emit('task-selected', task);
                    }
                });

                gantt.$_eventsInitialized = true;
            }
        },

        $_initDataProcessor: function () {
            if (!gantt.$_dataProcessorInitialized) {
                gantt.createDataProcessor((entity, action, data, id) => {
                    this.$emit(`${entity}-updated`, id, action, data);
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
            const newData = response.data.map((item) => {
                return {
                    ...item,
                    id: item.task_id,
                    text: item.task_title,
                    start_date: getDateString(item.start_date),
                    end_date: getDateString(addDays(item.end_date, 1)),
                    // endDate: get
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
        getAvatar,

        searchTasks() {
            this.filterTasks = this.allTasks.filter((task) => {
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
                return true;
            });

            this.renderGantt();
        },
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