import Vue from 'vue';
import Router from 'vue-router';
import AdminLoginPage from '../views/AdminSide/LoginSite/LoginPage.vue'
import SessionUtls from "../services/SessionUtls";
import CookieUtls from "../services/CookieUtls";
import AdminSide from "../views/AdminSide/AdminSide.vue";

// UserSide
import ClientSide from "@/views/ClientSide/ClientSide.vue";
import ClientLoginPage from "@/views/ClientSide/LoginSite/LoginPage.vue"
import MyPage from "../views/ClientSide/MyPage/MyPage.vue";
import Holiday from "../views/ClientSide/Holiday/Holiday.vue";
import MyOvertime from "@/views/ClientSide/MyOvertime/MyOvertime.vue"
import MyAbsentTicket from "@/views/ClientSide/MyAbsentTicket/MyAbsentTicket.vue"
import DailyReport from "../views/ClientSide/DailyReport/DailyReportMain.vue";
import UserManagement from "@/views/ClientSide/UserManagement/UserManagement.vue"
import RealTimeCheck from "@/views/ClientSide/RealTimeCheck/RealTimeCheck.vue"
import WorkFromHome from '@/views/ClientSide/WorkFromHome/WorkFromHome.vue';
import AddTask from "../views/ClientSide/AddTask/AddTask.vue"
import Tasks from "../views/ClientSide/Tasks/Tasks.vue";
import TaskBoard from '../views/ClientSide/TaskBoard/TaskBoard.vue';
import TaskDetail from "../views/ClientSide/TaskDetail/TaskDetail.vue"
import EditTask from "../views/ClientSide/EditTask/EditTask.vue"
import TaskSide from '../views/ClientSide/TaskSide/TaskSide.vue';
import Project from '../views/ClientSide/Project/Project.vue';

// Admin Side
import AdminDashboard from "@/views/AdminSide/AdminDashboard/AdminDashboard.vue"
import AdminGroup from "@/views/AdminSide/AdminGroup/AdminGroup.vue"
import AdminHoliday from "@/views/AdminSide/AdminHoliday/AdminHoliday.vue"
import AdminUserManagement from "@/views/AdminSide/AdminUserManagement/AdminUserManagement.vue"
import UserDetail from "../views/AdminSide/UserDetail/UserDetail.vue"
import AdminCSVExport from "@/views/AdminSide/AdminCSVExport/AdminCSVExport.vue"
import AdminProject from "../views/AdminSide/AdminProject/AdminProject.vue"
import AdminProjectDetail from "../views/AdminSide/AdminProjectDetail/AdminProjectDetail.vue"

Vue.use(Router);

const router = new Router({
    mode: "history",
    routes: [
        // Temporary login page
        { 
            path: "/admin/login",
            component: AdminLoginPage
        },
        {
            path: "/admin",
            component: AdminSide,
            redirect: "/admin/login",
            children: [
                {
                    path: 'home',
                    component: AdminDashboard
                },
                {
                    path: 'group',
                    component: AdminGroup
                },
                {
                    path: 'user',
                    component: AdminUserManagement
                },
                {
                    path: 'holiday',
                    component: AdminHoliday
                },
                {
                    path: 'csv',
                    component: AdminCSVExport
                },
                {
                    path: 'userdetail/:employeeId',
                    component: UserDetail
                },
                {
                    path: 'project',
                    component: AdminProject
                },
                {
                    path: 'projectdetail/:projectId',
                    component: AdminProjectDetail
                },
            ]
        },
        { 
            path: "/user/login",
            component: ClientLoginPage
        },
        {
            path: "/user",
            component: ClientSide,
            redirect: '/user/mypage',
            children: [
                {
                    path: 'mypage',
                    component: MyPage
                },
                {
                    path: 'absentticket',
                    component: MyAbsentTicket
                },
                {
                    path: 'holiday',
                    component: Holiday,
                },
                {
                    path: 'myovertime',
                    component: MyOvertime
                },
                {
                    path: 'dailyreport',
                    component: DailyReport,
                },
                {
                    path: 'usermanagement',
                    component: UserManagement,
                },
                {
                    path: 'realtimecheck',
                    component: RealTimeCheck,
                },
                {
                    path: 'workfromhome',
                    component: WorkFromHome,
                },
                {
                    path: 'project',
                    component: Project,
                },
                {
                    path: 'taskside',
                    component: TaskSide,
                    children: [
                        {
                            path: 'tasks/:projectId',
                            component: Tasks
                        },
                        {
                            path: 'addtask/:projectId',
                            component: AddTask,
                        },
                        {
                            path: 'taskdetail/:projectId/:taskId',
                            component: TaskDetail,
                        },
                        {
                            path: 'edittask/:projectId/:taskId',
                            component: EditTask
                        },
                        {
                            path: 'taskboard/:projectId',
                            component: TaskBoard
                        },
                    ]
                }
            ]
        },
        {
            path: "/",
            redirect: '/user/login'
        }
    ]
});

router.beforeEach((to, from, next) => { 
    let accessToken = CookieUtls.getAccessToken()
    let refreshToken = CookieUtls.getRefreshToken()
    let role = CookieUtls.getCookie(CookieUtls.role);
    
    // set current projectId if exist
    const {projectId} = to.params;
    if (projectId) {
        SessionUtls.setItem(SessionUtls.projectSelectedKey, projectId);
    }

    const publicPages = ['/user/login','/admin/login']
    const destination = to.path.split("/")[1]
    if (publicPages.includes(to.path)) {
        if (to.path == '/user/login') {
            if(accessToken || refreshToken) return next({path: '/user/mypage'})
        }
        // else {
        //     return next({path: '/admin/home'})
        // }
        return next()
    }
    let session = SessionUtls.getAdminSession()
    if (session != null) {
        return next()
    }
    else {
        if (destination == "admin") {
            return next({
                path: '/admin/login',
            })
        }
        if (accessToken || refreshToken) {
            let path = to.path.split("/")[2]
            if (['usermanagement', 'realtimecheck'].includes(path) && role != 1) {
                return next({
                    path: from.path
                })
            }
            return next()
        }
        else {
            // TODO: Update 404 page
            return next({
                path: '/',
                query: {returnUrl: to.path}
            })
        }
    }

})
export default router;