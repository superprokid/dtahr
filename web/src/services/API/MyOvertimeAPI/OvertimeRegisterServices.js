import { USER_GET_PROJECTS, USER_REGISTER_OVERTIME  } from "@/config/constant";
import axiosClient, {asyncRecallFunction} from "../API"
const OvertimeRegisterServices = {

    getProjects: async () => {
        try {
            const response = await asyncRecallFunction(() => {
                return axiosClient.get(USER_GET_PROJECTS)
            });
            return response;
        } catch (error) {
            return error;
        }
    },
    registerOvertime: async (params) => {
        try {
            const response = await asyncRecallFunction(() => {
                return axiosClient.post(USER_REGISTER_OVERTIME, params)
            });
            return response;
        } catch (error) {
            return error;
        }
    },
}

export default OvertimeRegisterServices;