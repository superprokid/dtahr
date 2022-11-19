import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export const storeVuex = new Vuex.Store({
    state: {
        startDataUser: {},
        drawerMini: false,
        startDataAdmin: {},
        projectSelected: '',
    },
    mutations: {
        setStartDataUser(state, startDataUser) {
            state.startDataUser = startDataUser
        },
        setDrawerMini(state) {
            state.drawerMini = !state.drawerMini;
        },
        setStartDataAdmin(state, startDataAdmin) {
            state.startDataAdmin = startDataAdmin
        },
        setProjectSelected(state, projectSelected) {
            state.projectSelected = projectSelected
        },
    },
})