/* eslint-disable */
import { 
    ADMIN_GET_USER_INFO,
    ADMIN_GET_USER_PROJECT_JOINED,
    ADMIN_GET_WORKLOG_USER,
    ADMIN_GET_WORK_HISTORY_USER,
    ADMIN_UPDATE_HOLIDAY_USER,
    ADMIN_UPDATE_WORKLOG_USER,

    ADMIN_UPDATE_PERSONAL_USER_INFORMATION,
    ADMIN_CHANGE_USER_PASSWORD,

    ADMIN_ACTIVE_ACCOUNT
} from "@/config/constant";
import axiosAdmin, {callAdminAPI} from "../AdminAPI"

const AdminUserDetailServices = {

    adminGetUserDetailById: async (params) => {
        try {
            const response =  await callAdminAPI(()=>{
                return axiosAdmin.get(ADMIN_GET_USER_INFO, {params})
            })
            return response
        } catch (error) {
            return error;
        }
    },

    adminGetUserProjectJoined: async (params) => {
        try {
            const response =  await callAdminAPI(()=>{
                return axiosAdmin.get(ADMIN_GET_USER_PROJECT_JOINED, {params})
            })
            return response
        } catch (error) {
            return error;
        }
    },

    adminGetUserWorklogs: async (params) => {
        try {
            const response =  await callAdminAPI(()=>{
                return axiosAdmin.get(ADMIN_GET_WORKLOG_USER, {params})
            })
            return response
        } catch (error) {
            return error;
        }
    },

    adminGetUserTrackingHistory: async (params) => {
        try {
            const response =  await callAdminAPI(()=>{
                return axiosAdmin.get(ADMIN_GET_WORK_HISTORY_USER, {params})
            })
            return response
        } catch (error) {
            return error;
        }
    },
    adminAddHoliday: async (params) => {
        try {
            const response =  await callAdminAPI(()=>{
                return axiosAdmin.post(ADMIN_UPDATE_HOLIDAY_USER, params)
            })
            return response
        } catch (error) {
            return error;
        }
    },
    adminEditWorklog: async (params) => {
        try {
            const response =  await callAdminAPI(()=>{
                return axiosAdmin.post(ADMIN_UPDATE_WORKLOG_USER, params)
            })
            return response
        } catch (error) {
            return error;
        }
    },

    adminUpdatePersonalUserInfo:async (params) => {
        try {
            const response =  await callAdminAPI(()=>{
                return axiosAdmin.post(ADMIN_UPDATE_PERSONAL_USER_INFORMATION, params)
            })
            return response
        } catch (error) {
            return error;
        }
    },

    adminChangePassword:async (params) => {
        try {
            const response =  await callAdminAPI(()=>{
                return axiosAdmin.post(ADMIN_CHANGE_USER_PASSWORD, params)
            })
            return response
        } catch (error) {
            return error;
        }
    },

    adminActiveAccount:async (params) => {
        try {
            const response =  await callAdminAPI(()=>{
                return axiosAdmin.post(ADMIN_ACTIVE_ACCOUNT, params)
            })
            return response
        } catch (error) {
            return error;
        }
    },
}

export default AdminUserDetailServices;