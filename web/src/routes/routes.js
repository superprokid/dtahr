import Vue from 'vue';
import Router from 'vue-router';
// import LoginPage from '../views/LoginSite/LoginPage.vue'
import AdminLoginPage from '../views/AdminSide/LoginSite/LoginPage.vue'
import SessionUtls from "../services/SessionUtls";
import HomePage from "../views/ClientSide/Home/Home.vue";
import AdminSide from "../views/AdminSide/AdminSide.vue";
import ClientSide from "@/views/ClientSide/ClientSide.vue";
import ClientLoginPage from "@/views/ClientSide/LoginSite/LoginPage.vue"

Vue.use(Router);

const router = new Router({
    mode: "history",
    routes: [
        // {
        //     path: "/",
        //     component: LoginPage
        // },
        // {
        //     path: "/home",
        //     component: HomePage
        // },
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
                    component: HomePage
                }
            ]
        },
        {
            path: "/user",
            component: ClientSide,
            children: [
                { 
                    path: "login",
                    component: ClientLoginPage
                },
                {
                    path: 'home',
                    component: HomePage
                }
            ]
        }
    ]
});

router.beforeEach((to, from, next) => { 
    const publicPages = ['/user/login','/admin/login']
    const destination = to.path.split("/")[1]
    if (publicPages.includes(to.path)) {
        return next()
    }
    if(to.path === '/'){
        return next("/user/login")
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
        let accessToken = SessionUtls.getAccessToken()
        let refreshToken = SessionUtls.getRefreshToken()
        if (accessToken || refreshToken) {
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