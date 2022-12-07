import { ADMIN_GET_GROUP_URL, 
    ADMIN_GET_ALL_FREE_MANAGER_URL, 
    ADMIN_CREATE_GROUP_URL ,
    ADMIN_EDIT_GROUP_URL, 
    ADMIN_DELETE_GROUP_URL, 
    ADMIN_GET_ALL_EMPLOYEE_OF_GROUP_URL,

    ADMIN_CREATE_USER,
    ADMIN_DELETE_USER,
    ADMIN_IMPORT_EMPLOYEE,
} from "@/config/constant";
import axiosAdmin, {callAdminAPI} from "../AdminAPI"

const AdminGroupServices = {

    getGroupAdmin: async () => {
        try {
            const response =  await callAdminAPI(()=>{
                return axiosAdmin.get(ADMIN_GET_GROUP_URL)
            })
            return response
        } catch (error) {
            return error;
        }
    },

    getAllFreeManager: async () => {
        try {
            const response =  await callAdminAPI(()=>{
                return axiosAdmin.get(ADMIN_GET_ALL_FREE_MANAGER_URL)
            })
            return response
        } catch (error) {
            return error;
        }
    },

    createGroup: async (params) => {
        try {
            const response =  await callAdminAPI(()=>{
                return axiosAdmin.post(ADMIN_CREATE_GROUP_URL, params)
            })
            return response
        } catch (error) {
            return error;
        }
    },
    editGroup: async (params) => {
        try {
            const response =  await callAdminAPI(()=>{
                return axiosAdmin.post(ADMIN_EDIT_GROUP_URL, params)
            })
            return response
        } catch (error) {
            return error;
        }
    },
    deleteGroup: async (params) => {
        try {
            const response =  await callAdminAPI(()=>{
                return axiosAdmin.post(ADMIN_DELETE_GROUP_URL, params)
            })
            return response
        } catch (error) {
            return error;
        }
    },
    getAllUserOfSpecificGroup: async (params) => {
        try {
            const response =  await callAdminAPI(()=>{
                return axiosAdmin.get(ADMIN_GET_ALL_EMPLOYEE_OF_GROUP_URL, {params})
            })
            return response
        } catch (error) {
            return error;
        }
    },

    adminCreateUser: async (params) => {
        try {
            const response =  await callAdminAPI(()=>{
                return axiosAdmin.post(ADMIN_CREATE_USER, params)
            })
            return response
        } catch (error) {
            return error;
        }
    },
    adminDeleteUser: async (params) => {
        try {
            const response =  await callAdminAPI(()=>{
                return axiosAdmin.post(ADMIN_DELETE_USER, params)
            })
            return response
        } catch (error) {
            return error;
        }
    },

    adminImportEmployee: async (params) => {
        try {
            const response =  await callAdminAPI(()=>{
                return axiosAdmin.post(ADMIN_IMPORT_EMPLOYEE, params)
            })
            return response
        } catch (error) {
            return error;
        }
    },
}

export default AdminGroupServices;