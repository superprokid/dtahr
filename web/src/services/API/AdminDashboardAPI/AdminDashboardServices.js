import { 
    ADMIN_GET_WORKING_STATUS,
    ADMIN_GET_WORKING_ACTIVITY,
    ADMIN_GET_WORKING_TIME_AND_HOLIDAY,
    ADMIN_GET_PROJECT_STATUS,

} from "@/config/constant";
import axiosAdmin, {callAdminAPI} from "../AdminAPI"

const AdminDashboardServices = {

    adminGetWorkingStatus: async () => {
        try {
            const response =  await callAdminAPI(()=>{
                return axiosAdmin.get(ADMIN_GET_WORKING_STATUS)
            })
            return response
        } catch (error) {
            return error;
        }
    },
    adminGetWorkingActivity: async () => {
        try {
            const response =  await callAdminAPI(()=>{
                return axiosAdmin.get(ADMIN_GET_WORKING_ACTIVITY)
            })
            return response
        } catch (error) {
            return error;
        }
    },
    adminGetWorkingTimeAndHoliday: async () => {
        try {
            const response =  await callAdminAPI(()=>{
                return axiosAdmin.get(ADMIN_GET_WORKING_TIME_AND_HOLIDAY)
            })
            return response
        } catch (error) {
            return error;
        }
    },
    adminGetProjectStatus: async () => {
        try {
            const response =  await callAdminAPI(()=>{
                return axiosAdmin.get(ADMIN_GET_PROJECT_STATUS)
            })
            return response
        } catch (error) {
            return error;
        }
    },
    
}

export default AdminDashboardServices;