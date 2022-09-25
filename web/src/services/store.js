import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export const storeVuex = new Vuex.Store({
    state: {
        startDataUser: {},
    },
    mutations: {
        setStartDataUser (state, startDataUser){ 
            state.startDataUser = startDataUser
        },
    },
})