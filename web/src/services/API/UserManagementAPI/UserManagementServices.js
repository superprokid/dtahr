import { MANAGER_GET_USER_WORKLOGS, MANAGER_GET_EMPLOYEE_INFO } from "@/config/constant";
import axiosClient, {asyncRecallFunction} from "../API"
const UserManagementServices = {

    getUserWorklogs: async (params) => {
        try {
            const response = await asyncRecallFunction(() => {
                return axiosClient.get(MANAGER_GET_USER_WORKLOGS, {params})
            });
            return response;
        } catch (error) {
            return error;
        }
    },
    getEmployeeInfo: async (params) => {
        try {
            const response = await asyncRecallFunction(() => {
                return axiosClient.get(MANAGER_GET_EMPLOYEE_INFO, {params})
            });
            return response;
        } catch (error) {
            return error;
        }
    },
}

export default UserManagementServices;