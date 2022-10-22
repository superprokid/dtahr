import { ADMIN_GET_GROUP_URL } from "@/config/constant";
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
    }
}

export default AdminGroupServices;