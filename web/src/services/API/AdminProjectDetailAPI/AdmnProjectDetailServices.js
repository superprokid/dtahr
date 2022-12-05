/* eslint-disable */
import { 
    ADMIN_GET_STATUS_PROJECT,
    ADMIN_GET_PROJECT_DETAIL_INFO,
    ADMIN_ADD_EMPLOYEE_TO_PROJECT,

    ADMIN_GET_ALL_EMPLOYEE_IN_PROJECT_EXCEPT_ASSIGNEE,
    ADMIN_DELETE_EMPLOYEE_OUT_PROJECT,
    ADMIN_GET_ALL_TASK,
    ADMIN_GET_ALL_USER_IN_PROJECT,
    ADMIN_GET_ALL_TASK_CATEGORY,

    ADMIN_DELETE_TASK,


} from "@/config/constant";
import axiosAdmin, {callAdminAPI} from "../AdminAPI"

const AdminProjectDetailServices = {
    
    adminGetProjectStatus: async (params) => {
        try {
            const response =  await callAdminAPI(()=>{
                return axiosAdmin.get(ADMIN_GET_STATUS_PROJECT, {params})
            })
            return response
        } catch (error) {
            return error;
        }
    },
    adminGetProjectDetail: async (params) => {
        try {
            const response =  await callAdminAPI(()=>{
                return axiosAdmin.get(ADMIN_GET_PROJECT_DETAIL_INFO, {params})
            })
            return response
        } catch (error) {
            return error;
        }
    },
    adminAddEmployeeToProject:async (params) => {
        try {
            const response =  await callAdminAPI(()=>{
                return axiosAdmin.post(ADMIN_ADD_EMPLOYEE_TO_PROJECT, params)
            })
            return response
        } catch (error) {
            return error;
        }
    },

    adminGetAllUserInProjectExceptAssignees: async (params) => {
        try {
            const response =  await callAdminAPI(()=>{
                return axiosAdmin.get(ADMIN_GET_ALL_EMPLOYEE_IN_PROJECT_EXCEPT_ASSIGNEE, {params})
            })
            return response
        } catch (error) {
            return error;
        }
    },
    adminDeleteEmployeeOutProject:async (params) => {
        try {
            const response =  await callAdminAPI(()=>{
                return axiosAdmin.post(ADMIN_DELETE_EMPLOYEE_OUT_PROJECT, params)
            })
            return response
        } catch (error) {
            return error;
        }
    },

    adminGetAllTask: async (params) => {
        try {
            const response =  await callAdminAPI(()=>{
                return axiosAdmin.get(ADMIN_GET_ALL_TASK, {params})
            })
            return response
        } catch (error) {
            return error;
        }
    },
    adminGetAllUserInProject: async (params) => {
        try {
            const response =  await callAdminAPI(()=>{
                return axiosAdmin.get(ADMIN_GET_ALL_USER_IN_PROJECT, {params})
            })
            return response
        } catch (error) {
            return error;
        }
    },
    adminGetAllTaskCategory: async (params) => {
        try {
            const response =  await callAdminAPI(()=>{
                return axiosAdmin.get(ADMIN_GET_ALL_TASK_CATEGORY, {params})
            })
            return response
        } catch (error) {
            return error;
        }
    },
    adminDeleteTask:async (params) => {
        try {
            const response =  await callAdminAPI(()=>{
                return axiosAdmin.post(ADMIN_DELETE_TASK, params)
            })
            return response
        } catch (error) {
            return error;
        }
    },
    
}

export default AdminProjectDetailServices;