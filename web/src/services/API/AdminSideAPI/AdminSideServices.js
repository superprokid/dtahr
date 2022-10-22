import { ADMIN_GET_START_URL } from "@/config/constant";
import axiosAdmin, {callAdminAPI} from "../AdminAPI"

const AdminSideServices = {

    getStartAdmin: async () => {
        try {
            const response =  await callAdminAPI(()=>{
                return axiosAdmin.get(ADMIN_GET_START_URL)
            })
            return response
        } catch (error) {
            return error;
        }
    }
}

export default AdminSideServices;