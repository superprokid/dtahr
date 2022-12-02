/* eslint-disable */
import { 
    ADMIN_GET_STATUS_PROJECT,
    ADMIN_GET_PROJECT_DETAIL_INFO,
    ADMIN_ADD_EMPLOYEE_TO_PROJECT,

    ADMIN_GET_ALL_EMPLOYEE_IN_PROJECT_EXCEPT_ASSIGNEE,
    ADMIN_DELETE_EMPLOYEE_OUT_PROJECT,

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
}

export default AdminProjectDetailServices;