/* eslint-disable */
import { 
    ADMIN_GET_LIST_PROJECT,
    ADMIN_CREATE_PROJECT,
    ADMIN_UPDATE_PROJECT,

} from "@/config/constant";
import axiosAdmin, {callAdminAPI} from "../AdminAPI"

const AdminProjectServices = {
    
    adminGetProjects: async () => {
        try {
            const response =  await callAdminAPI(()=>{
                return axiosAdmin.get(ADMIN_GET_LIST_PROJECT)
            })
            return response
        } catch (error) {
            return error;
        }
    },
    adminCreateProject:async (params) => {
        try {
            const response =  await callAdminAPI(()=>{
                return axiosAdmin.post(ADMIN_CREATE_PROJECT, params)
            })
            return response
        } catch (error) {
            return error;
        }
    },

    adminUpdateProject:async (params) => {
        try {
            const response =  await callAdminAPI(()=>{
                return axiosAdmin.post(ADMIN_UPDATE_PROJECT, params)
            })
            return response
        } catch (error) {
            return error;
        }
    },
    
}

export default AdminProjectServices;