<template>
    <nav>
        <v-app-bar dark app style="background-color: white">
            <v-app-bar-nav-icon color="#1A2B34" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="text-uppercase " style="color: #1A2B34">
                <span>HRM </span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <div style="margin-right: 50px">
                <v-menu left bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                            <v-icon style="margin-right:10px;color: #1A2B34">mdi-cog</v-icon>
                            <span style="color: #1A2B34"> {{startDataAdmin.username}}</span>
                        </v-btn>
                    </template>

                    <v-list>
                        <!-- <v-list-item @click="() => {}">
                            <v-list-item-title>Setting Profile</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="() => {}">
                            <v-list-item-title>Change Password</v-list-item-title>
                        </v-list-item> -->
                        <v-list-item @click="logout">
                            <v-list-item-title>Logout</v-list-item-title>
                        </v-list-item>
                    </v-list>


                </v-menu>
            </div>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" dark app color="#363636" class=" darken-4" id="admin-drawer">
            <v-layout column align-center>
                <v-flex class="mt-5">
                    <v-avatar size="100">
                        <img src="https://www.bootdey.com/app/webroot/img/Content/avatar/avatar1.png" alt="">
                    </v-avatar>
                    <p class="white--text subheading mt-1 text-center">{{startDataAdmin.username}}</p>
                </v-flex>
                <v-flex class="mt-4 mb-4">
                </v-flex>
            </v-layout>

            <!-- <v-list-item>
                <v-list-item-avatar class="align-self-center" color="white" contain>
                    <v-img src="https://www.bootdey.com/app/webroot/img/Content/avatar/avatar1.png"
                        max-height="30" />
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title class="display-1">
                        {{startDataAdmin.username}}
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item> -->

            <v-divider class="mb-2" />

            <v-list nav>
                <v-list-item v-for="item in items" :key="item.id" link @click="redirect(item)"
                    :class="item.id === currentTab ? 'drawer-item-active' : 'drawer-item'">
                    <v-list-item-icon class="drawer-item-icon">
                        <v-icon :color="item.id === currentTab ? 'white' : null">{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

        </v-navigation-drawer>
    </nav>
</template>
<script>
//  import Popup from './Popup.vue'
/* eslint-disable */
import SessionUtls from '../services/SessionUtls';
import { mapState } from "vuex";

import tabName from "../config/tabname";
import { REAL_TIME_TRACKING_CHANNEL } from '../config/channel';
import { ADMIN_DASHBOARD_SCREEN } from '../config/screenName';

export default {
    name: 'Navbar',
    components: {
        //  Popup
    },
    data: () => ({
        drawer: true,
        // links: [
        //     { icon: 'dashboard', text: 'Dashboard', route: '/' },
        //     { icon: 'folder', text: 'My Project', route: '/' },
        //     { icon: 'person', text: 'Team', route: '/' }
        // ]
        items: [
            {
                title: 'Dashboard',
                icon: 'mdi-view-dashboard',
                to: "/admin/home", // name of router path
                id: tabName.homeAdmin, // id of page
            },
            {
                title: 'Group',
                icon: 'mdi-scoreboard',
                to: "/admin/group", // name of router path
                id: tabName.groupAdmin, // id of page
            },
            {
                title: 'Employee',
                icon: 'mdi-account-group',
                to: "/admin/user", // name of router path
                id: tabName.userAdmin, // id of page
            },
            {
                title: 'Holiday',
                icon: 'mdi-airplane-clock',
                to: "/admin/holiday", // name of router path
                id: tabName.holidayAdmin, // id of page
            },
            // {
            //     title: 'CSV Export',
            //     icon: 'mdi-file-export-outline',
            //     to: "/admin/csv", // name of router path
            //     id: tabName.csvAdmin, // id of page
            // },
            {
                title: 'Projects',
                icon: 'mdi-file-document-multiple-outline',
                to: "/admin/project", // name of router path
                id: tabName.projectAdmin, // id of page
            },
            {
                title: 'Working Time',
                icon: 'mdi-clock-outline',
                to: "/admin/workingtime", // name of router path
                id: tabName.workingTimeAdmin, // id of page
            },
            {
                title: 'Policy',
                icon: 'mdi-file-document-outline',
                to: "/admin/policy", // name of router path
                id: tabName.policyAdmin, // id of page
            },
            {
                title: 'Salary',
                icon: 'mdi-cash-100',
                to: "/admin/salary", // name of router path
                id: tabName.salaryAdmin, // id of page
            }
        ],
        currentTab: '',

    }),
    watch: {
        currentTab(newVal){
            console.log('this.currentTab',newVal);
        }   
    },
    mounted(){
        this.currentTab = SessionUtls.getItem(SessionUtls.tabNameKey)
        this.$root.$on('drawer', () => {
            this.currentTab = SessionUtls.getItem(SessionUtls.tabNameKey);
        })

        this.$mySocket.on(REAL_TIME_TRACKING_CHANNEL, (msg) => {
            this.$root.$emit(ADMIN_DASHBOARD_SCREEN, msg);
        });
    },
    computed: {
        ...mapState(["startDataAdmin"])
    },
    methods: {
        logout() {
            // CookieUtls.removeAllCookie();
            // this.redirect('login');
            SessionUtls.clearItem(SessionUtls.adminSession)
            this.redirectToSite('login');
        },
        redirectToSite(component) {
            this.$router.push(component);
        },
        redirect(item) {
            this.$router.push(item.to).catch((err) => {});
            this.currentTab = item.id;
        }
    }

}
</script>
<style scoped>
.border {
    border-left: 4px solid #0ba518;
}

#admin-drawer .drawer-item-active {
    padding: 5px;
    margin: 3px;
    background-color: #4CAF50;
    color: white;
}

#admin-drawer .drawer-item {
    padding: 5px;
    margin: 3px;
}

#admin-drawer .drawer-item-icon {
    margin: 10px;
    margin-right: 20px;
}


#admin-drawer .drawer-item-title {
    font-size: 15px;
}
</style>
 