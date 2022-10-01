import tabName from "../../config/tabname";
import SessionUtls from "../../services/SessionUtls";

export default {
    data() {
        return {
            items: [
                {
                    title: 'My Page',
                    icon: 'mdi-view-dashboard',
                    to: "mypage", // name of router path
                    id: tabName.myPageUser, // id of page
                },
                {
                    title: 'Overtime ticket',
                    icon: 'mdi-clock',
                    to: "myovertime", // name of router path
                    id: tabName.overtimeUser, // id of page
                },
                {
                    title: 'Leave ticket',
                    icon: 'mdi-alien-outline',
                    to: "absentticket", // name of router path
                    id: tabName.leaveUser, // id of page
                },
                {
                    title: 'Holiday list',
                    icon: 'mdi-calendar-star-outline',
                    to: "holiday",
                    id: tabName.holidayUser,
                }
            ],
            right: null,
            currentTab: SessionUtls.getItem(SessionUtls.tabNameKey),
        }
    },
    methods: {
        redirect(item) {
            this.$router.push(item.to);
            SessionUtls.setItem(SessionUtls.tabNameKey, item.id);
            this.currentTab = item.id;
        }
    }
}