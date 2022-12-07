/* eslint-disable */
import { 
    ADMIN_GET_TASK_DETAIL_INFO,

} from "@/config/constant";
import axiosAdmin, {callAdminAPI} from "../AdminAPI"

const AdminTaskDetailServices = {
    
    adminGetTaskDetail: async (params) => {
        try {
            const response =  await callAdminAPI(()=>{
                return axiosAdmin.get(ADMIN_GET_TASK_DETAIL_INFO, {params})
            })
            return response
        } catch (error) {
            return error;
        }
    },
    // adminAddEmployeeToProject:async (params) => {
    //     try {
    //         const response =  await callAdminAPI(()=>{
    //             return axiosAdmin.post(ADMIN_ADD_EMPLOYEE_TO_PROJECT, params)
    //         })
    //         return response
    //     } catch (error) {
    //         return error;
    //     }
    // },

}

export default AdminTaskDetailServices;