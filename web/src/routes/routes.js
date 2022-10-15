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

// Admin Side
import AdminDashboard from "@/views/AdminSide/AdminDashboard/AdminDashboard.vue"

Vue.use(Router);

const router = new Router({
    mode: "history",
    routes: [
        // Temporary login page
        {
            path: "/admin",
            component: AdminSide,
            redirect: "/admin/login",
            children: [
                { 
                    path: "login",
                    component: AdminLoginPage
                },
                {
                    path: 'home',
                    component: AdminDashboard
                }
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
                path: from.path
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
            return next({
                path: '/',
                query: {returnUrl: to.path}
            })
        }
    }

})
export default router;