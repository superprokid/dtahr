/*eslint-disable*/
import DateTimePicker from '@/components/DateTimePicker/DateTimePicker.vue';
import Input from '@/components/Input/Input.vue';
import Button from '@/components/Button/Button.vue';

import OvertimeRegisterServices from '@/services/API/MyOvertimeAPI/OvertimeRegisterServices';
import moment from 'moment';

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

            selected: [],

            items: [
                {
                    image: 'https://cdn-images-1.medium.com/max/1024/1*9C9hLji68wV373tk8okLYA.jpeg',
                    title: 'TBI’s 5 Best: SF Mocktails to Finish Dry January Strong',
                    category: 'Travel',
                    keyword: 'Drinks',

                },
                {
                    image: 'https://cdn-images-1.medium.com/max/1024/1*BBNtYUieAqHoXKjiJ2mMjQ.png',
                    title: 'PWAs on iOS 12.2 beta: the good, the bad, and the “not sure yet if good”',
                    category: 'Technology',
                    keyword: 'Phones',
                },
                {
                    image: 'https://cdn-images-1.medium.com/max/1024/1*rTEtei1UEmNqbq6evRsExw.jpeg',
                    title: 'How to Get Media Mentions for Your Business',
                    category: 'Media',
                    keyword: 'Social',
                },
                {
                    image: 'https://cdn-images-1.medium.com/max/1024/1*FD2nkJewVeQnGf0ommQfrw.jpeg',
                    title: 'The Pitfalls Of Outsourcing Self-Awareness To Artificial Intelligence',
                    category: 'Technology',
                    keyword: 'Military',
                },
                {
                    image: 'https://cdn-images-1.medium.com/max/1024/1*eogFpsVgNzXQLCVgFzT_-A.jpeg',
                    title: 'Degrees of Freedom and Sudoko',
                    category: 'Travel',
                    keyword: 'Social',
                },
            ],
            search: '',
        };
    },
    mounted() {
        this.$eventBus.$emit('show-spinner', true);
        this._getProjects();
        this.$eventBus.$emit('show-spinner', false);
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
            if (!this.search) return this.items

            const search = this.search.toLowerCase()

            return this.items.filter(item => {
                const text = item.title.toLowerCase()

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
            console.log('projectSelected', this.processStatusSelected);
            console.log('task', this.tasksValue);
            console.log('problem', this.problemsValue);
            console.log('plan', this.nextDayPlan);
            console.log('status', this.processStatusSelected);

        },
        onClickResetButton() {
            this.isShowError = false;

            // reset value
            this.projectSelected = "";
            this.tasksValue = "";
            this.problemsValue = "";
            this.nextDayPlan = "";
            this.processStatusSelected = "";

            // reset handle error
            this.isTaskEmpty = true;
            this.isProjectNameEmpty = true;
            this.isProblemsEmpty = true;
            this.isNextDayPlanEmpty = true;
            this.isProcessStatusEmpty = true;
        },
    },
};
