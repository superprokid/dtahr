import ReportService from "../../../../services/API/ReportAPI/ReportServices"
import { getDateString } from "../../../../services/utilities";
import OvertimeRegisterServices from '@/services/API/MyOvertimeAPI/OvertimeRegisterServices';
import Button from '@/components/Button/Button.vue';
import moment from 'moment';
import { MY_REPORT_SCREEN } from "../../../../config/screenName";
import { REPORT_CHANNEL } from "../../../../config/channel";
// import moment from 'moment';

export default {
    components: {
        Button,
    },
    data() {
        return {
            listMyReport: [],
            reportHeader: [
                {
                    text: 'Project',
                    align: 'start',
                    value: 'project_name',
                },
                { text: 'Status', value: 'process_status' },
                { text: 'Date', value: 'date' },
                { text: 'Actions', value: 'actions', sortable: false, width: 150, align: 'center' },

            ],
            isEdit: false, //TODO: change later

            isShowError: false,

            projectSelected: '',
            listProjects: [],
            isProjectNameEmpty: true,

            tasksValue: "",
            isTaskEmpty: true,

            problemsValue: "",
            isProblemsEmpty: true,

            nextDayPlan: "",
            isNextDayPlanEmpty: true,

            processStatusList: ["Ahead of schedule", "On schedule", "Behind schedule"],
            processStatusSelected: "",
            isProcessStatusEmpty: true,

            search: '',
            listUsers: [],
            isShowListUser: false,
            isListSelectedUserEmpty: true,

            selectedDailyReportEdit: {},
        }
    },
    computed: {
        keywords() {
            if (!this.search) return []

            const keywords = []

            for (const search of this.searching) {
                keywords.push(search.keyword)
            }

            return keywords
        },
        searching() {
            if (!this.search) return this.listUsers

            const search = this.search.toLowerCase()

            return this.listUsers.filter(item => {
                const text = item.name.toLowerCase()

                return text.indexOf(search) > -1
            })
        },
    },
    async mounted() {
        this.loadMyReport();
        // Re call api
        this.$root.$on(MY_REPORT_SCREEN, () => {
            this.loadMyReport();
        })

        this.$eventBus.$emit('show-spinner', true);
        await Promise.allSettled([
            this._getProjects(),
            this._getAllUser()
        ]);
        this.$eventBus.$emit('show-spinner', false);

        // listener for hide list user card when click outside
        document.addEventListener('click', (event) => {
            const listUserCard = document.getElementById('listUserCardEdit');
            const buttonOpenListUserCard = document.getElementById('buttonOpenListUserCardEdit');
            if (listUserCard && !listUserCard.contains(event.target) && this.isShowListUser && !buttonOpenListUserCard.contains(event.target)) {
                this.isShowListUser = false
            }
        })
    },
    methods: {
        async _getProjects() {
            const response = await OvertimeRegisterServices.getProjects();
            if (!response) {
                this.$router.push('/user/login');
            } else {
                this.listProjects.push(...response.data)
            }
        },
        async _getAllUser() {
            const response = await ReportService.getAllUser();
            if (!response) {
                this.$router.push('/user/login');
            } else {
                this.listUsers.push(...response.data)
            }
        },
        onToggleListUser() {
            this.isShowListUser = !this.isShowListUser;
        },
        onSelectProject(params) {
            if (params === '' || params === null || params === undefined) {
                this.isProjectNameEmpty = true;
            } else {
                this.isProjectNameEmpty = false
                this.projectSelected = params.project_id
            }
        },
        onInputTasks(params) {
            this.tasksValue = params
            if (this.tasksValue === '' || this.tasksValue === null || this.tasksValue === undefined) {
                this.isTaskEmpty = true;
            } else {
                this.isTaskEmpty = false
            }
        },
        onInputProblems(params) {
            this.problemsValue = params
            if (this.problemsValue === '' || this.problemsValue === null || this.problemsValue === undefined) {
                this.isProblemsEmpty = true;
            } else {
                this.isProblemsEmpty = false
            }
        },
        onInputNextDayPlan(params) {
            this.nextDayPlan = params
            if (this.nextDayPlan === '' || this.nextDayPlan === null || this.nextDayPlan === undefined) {
                this.isNextDayPlanEmpty = true;
            } else {
                this.isNextDayPlanEmpty = false
            }
        },
        onSelectProcessStatus(params) {
            if (params === '' || params === null || params === undefined) {
                this.isProcessStatusEmpty = true;
            } else {
                this.isProcessStatusEmpty = false
                this.processStatusSelected = params
            }
        },
        async loadMyReport() {
            this.$eventBus.$emit('show-spinner', true);
            const response = await ReportService.getMyreport();

            this.$eventBus.$emit('show-spinner', false);
            if (!response) {
                this.$router.push('/user/login');
                return;
            }
            this.listMyReport = response.data.map((item) => {
                return { ...item, date: getDateString(item.dailyreport_date) }
            })
        },
        async deleteMyReport(item) {
            const response = await ReportService.deleteMyReport({
                dailyReportId: item.dailyreport_id
            })
            if (!response) {
                this.$router.push('/user/login');
                return;
            }
            if (response === -1) {
                alert('Delete failed');
            } else {
                alert('Delete success');
                await this.loadMyReport();
            }
        },
        async editMyReport(item) {
            this.$eventBus.$emit('show-spinner', true);
            this.selectedDailyReportEdit = await this.getDailyReportDetails(item.dailyreport_id);
            this.projectSelected = this.selectedDailyReportEdit.project_id ?? "";
            this.tasksValue = this.selectedDailyReportEdit.tasks ?? "";
            this.problemsValue = this.selectedDailyReportEdit.problems ?? "";
            this.nextDayPlan = this.selectedDailyReportEdit.next_day_plan ?? "";
            this.processStatusSelected = this.selectedDailyReportEdit.process_status ?? "";

            this.resetError(false);

            const listReceiver = this.selectedDailyReportEdit.receivers ?? [];
            this.listUsers = this.listUsers.map(item => {
                let ischecked = false;
                if (listReceiver.includes(item.employee_id)) {
                    ischecked = true;
                }
                return { ...item, ischecked }
            })

            this.$eventBus.$emit('show-spinner', false);
            this.isEdit = true;

        },
        async getDailyReportDetails(id) {
            const response = await ReportService.getDailyReportDetails({
                dailyReportId: id
            });
            if (!response) {
                this.$router.push('/user/login');
                return;
            }
            if (response !== -1) {
                return response.data;
            }
            return {};
        },
        onSaveMyReport() {
            this.isShowError = true;

            this.isShowError = true;
            const listUserReceiver = [];
            for (let index = 0; index < this.listUsers.length; index++) {
                const item = this.listUsers[index];
                if (item.ischecked) {
                    listUserReceiver.push(item.employee_id);
                }
            }
            this.isListSelectedUserEmpty = listUserReceiver.length ? false : true;

            // check required
            if (this.isListSelectedUserEmpty || this.isNextDayPlanEmpty || this.isProblemsEmpty || this.isProcessStatusEmpty || this.isProjectNameEmpty || this.isTaskEmpty) {
                return;
            }

            const data = {
                dailyreportId: this.selectedDailyReportEdit.dailyreport_id,
                projectId: this.projectSelected,
                tasks: this.tasksValue,
                problems: this.problemsValue,
                nextDayPlan: this.nextDayPlan,
                processStatus: this.processStatusSelected,
                dailyReportDate: moment().format('YYYY-MM-DD'),
                receivers: listUserReceiver,
            }

            this.$eventBus.$emit('show-spinner', true);

            ReportService.editDailyReport(data).then(result => {
                this.$eventBus.$emit('show-spinner', false);
                if (!result) {
                    this.$router.push('/user/login');
                    return;
                }
                if (result === -1) {
                    alert('Update failed, please try again');
                } else {
                    alert('Update success');
                    this.loadMyReport().then(() => {
                        this.toggleIsEdit();
                    });
                    this.$mySocket.emit(REPORT_CHANNEL, 0);
                }
            })
        },

        onBackToListMyReport() {
            this.isShowError = false;

            // reset value
            this.projectSelected = "";
            this.tasksValue = "";
            this.problemsValue = "";
            this.nextDayPlan = "";
            this.processStatusSelected = "";
            this.listUsers = this.listUsers.map(item => {
                return { ...item, ischecked: false }
            })

            this.resetError(true);
        },

        resetError(status) {
            // reset handle error
            this.isTaskEmpty = status;
            this.isProjectNameEmpty = status;
            this.isProblemsEmpty = status;
            this.isNextDayPlanEmpty = status;
            this.isProcessStatusEmpty = status;
        },

        toggleIsEdit() {
            this.isEdit = !this.isEdit
        }
    },
}