import tabName from "../../config/tabname";
import SessionUtls from "../../services/SessionUtls";
import { mapState } from "vuex";
import { TAB_TYPE } from "../../config/constant";

const listUserItem = [
    {
        title: 'My Page',
        icon: 'mdi-view-dashboard',
        to: "/mypage", // name of router path
        id: tabName.myPageUser, // id of page
    },
    {
        title: 'Project',
        icon: 'mdi-application-array-outline',
        to: "/project",
        id: tabName.projectUser,
    },
    {
        title: 'Overtime ticket',
        icon: 'mdi-clock',
        to: "/myovertime", // name of router path
        id: tabName.overtimeUser, // id of page
    },
    {
        title: 'Leave ticket',
        icon: 'mdi-exit-run',
        to: "/absentticket", // name of router path
        id: tabName.leaveUser, // id of page
    },
    {
        title: 'Holiday list',
        icon: 'mdi-calendar-star-outline',
        to: "/holiday",
        id: tabName.holidayUser,
    },
    {
        title: 'Daily report',
        icon: 'mdi-file-chart-outline',
        to: "/dailyreport",
        id: tabName.dailyreportUser,
    },
    {
        title: 'Work From Home ticket',
        icon: 'mdi-cast-education',
        to: "/workfromhome", // name of router path
        id: tabName.workFromHome,
    },
];

const listTaskItem = [
    {
        title: 'Add Task',
        icon: 'mdi-plus-thick',
        to: "/addtask", // name of router path
        id: tabName.addTaskUser,
    },
    {
        title: 'Tasks',
        icon: 'mdi-file-tree',
        to: "/tasks", // name of router path
        id: tabName.taskUser,
    },
    {
        title: 'Task Board',
        icon: 'mdi-poll',
        to: "/taskboard", // name of router path
        id: tabName.taskBoardUser,
    },
    {
        title: 'Gantt Chart',
        icon: 'mdi-chart-timeline',
        to: "/ganttchart", // name of router path
        id: tabName.ganttChartUser,
    },
    {
        title: 'Project',
        icon: 'mdi-application-array-outline',
        to: "/project",
        toUser: '/user/project',
        id: tabName.projectUser,
    },
];

export default {
    data() {
        return {
            items: [],
            right: null,
            role: '',
            currentTab: SessionUtls.getItem(SessionUtls.tabNameKey),
            tabType: SessionUtls.getItem(SessionUtls.tabTypeKey),
        }
    },
    computed: {
        ...mapState(["startDataUser", "drawerMini"])
    },

    watch: {
        startDataUser: {
            handler(newVal) {
                if (this.tabType == TAB_TYPE.USER && newVal.role == 1 && this.items.length < 8) {
                    this.items.push({
                        title: 'Employee Management',
                        icon: 'mdi-account-cog',
                        to: "/usermanagement",
                        id: tabName.userManagement,
                    },
                        {
                            title: 'Realtime Check',
                            icon: 'mdi-calendar-clock-outline',
                            to: "/realtimecheck",
                            id: tabName.realtimeCheck,
                        })
                }
            }
        },
    },
    methods: {
        redirect(item) {
            if (this.tabType == TAB_TYPE.USER) {
                this.$router.push('/user' + item.to);
            } else {
                this.$router.push(item.toUser || `/user/taskside${item.to}/${SessionUtls.getItem(SessionUtls.projectSelectedKey)}`).catch(() => {});
            }
            this.currentTab = item.id;
        }
    },

    mounted() {
        const currentTabType = SessionUtls.getItem(SessionUtls.tabTypeKey);
        this.tabType = currentTabType;
        if (currentTabType == TAB_TYPE.USER) {
            this.items = listUserItem;
        } else {
            this.items = listTaskItem;
        }
        this.currentTab = SessionUtls.getItem(SessionUtls.tabNameKey);
        this.$root.$on('drawer', () => {
            this.currentTab = SessionUtls.getItem(SessionUtls.tabNameKey);
            const currentTabType = SessionUtls.getItem(SessionUtls.tabTypeKey);
            this.tabType = currentTabType;
            if (currentTabType == TAB_TYPE.USER) {
                this.items = listUserItem;
            } else {
                this.items = listTaskItem;
            }
        })
    },
}