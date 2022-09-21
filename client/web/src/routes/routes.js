import Vue from 'vue';
import Router from 'vue-router';
import LoginPage from '../views/LoginSite/LoginPage.vue'

Vue.use(Router);

const router = new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            component: LoginPage
        },
        {
            path: "/home",
            component: LoginPage
        },
    ]
});

export default router;