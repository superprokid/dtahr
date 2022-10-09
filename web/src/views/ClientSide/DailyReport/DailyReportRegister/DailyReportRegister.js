/*eslint-disable*/
import DateTimePicker from '@/components/DateTimePicker/DateTimePicker.vue';
import Input from '@/components/Input/Input.vue';
import Button from '@/components/Button/Button.vue';

import OvertimeRegisterServices from '@/services/API/MyOvertimeAPI/OvertimeRegisterServices';
import ReportServices from '../../../../services/API/ReportAPI/ReportServices';
import moment from 'moment';
import { REPORT_MAIN_SCREEN } from '../../../../config/screenName';

const DATE_TIME_FORMAT = 'YYYY-MM-DD hh:mm:ss'
const DATE_FORMAT = 'YYYY-MM-DD'
const TIME_FORMAT = 'hh:mm:ss'

export default {
    name: 'DailyReportRegister',
    components: {
        DateTimePicker,
        Input,
        Button,
    },
    data() {
        return {
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
        };
    },
    async mounted() {
        this.$eventBus.$emit('show-spinner', true);
        await Promise.allSettled([
            this._getProjects(),
            this._getAllUser()
        ]);
        this.$eventBus.$emit('show-spinner', false);

        // listener for hide list user card when click outside
        document.addEventListener('click', (event) => {
            const listUserCard = document.getElementById('listUserCard');
            const buttonOpenListUserCard = document.getElementById('buttonOpenListUserCard');
            if (listUserCard && !listUserCard.contains(event.target) && this.isShowListUser && !buttonOpenListUserCard.contains(event.target)) {
                this.isShowListUser = false
            }
        })
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
            const response = await ReportServices.getAllUser();
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
        async onClickRegisterButton() {
            this.isShowError = true;
            const listUserReceiver = [];
            for (let index = 0; index < this.listUsers.length; index++) {
                const item = this.listUsers[index];
                if (item.ischecked) {
                    listUserReceiver.push(item.employee_id);
                }
            }
            this.isListSelectedUserEmpty = listUserReceiver.length ? false : true;
            
            this.$mySocket.emit('overttime','send message ne');
            console.log(this.$mySocket);

            // check required
            if (this.isListSelectedUserEmpty || this.isNextDayPlanEmpty || this.isProblemsEmpty || this.isProcessStatusEmpty || this.isProjectNameEmpty || this.isTaskEmpty) {
                return;
            }

            const data = {
                projectId: this.projectSelected,
                tasks: this.tasksValue,
                problems: this.problemsValue,
                nextDayPlan: this.nextDayPlan,
                processStatus: this.processStatusSelected,
                dailyReportDate: moment().format('YYYY-MM-DD'),
                receivers: listUserReceiver,
            }
            const response = await ReportServices.registerDailyReport(data);
            if (!response) {
                this.$router.push('/user/login');
            } else {
                if (response == -1) {
                    alert("register failed");
                } else {
                    alert("register success");
                    this.onClickResetButton();
                    // this.$root.$emit(REPORT_MAIN_SCREEN);

                }
            }
        },
        onClickResetButton() {
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

            // reset handle error
            this.isTaskEmpty = true;
            this.isProjectNameEmpty = true;
            this.isProblemsEmpty = true;
            this.isNextDayPlanEmpty = true;
            this.isProcessStatusEmpty = true;
        },
    },
};
