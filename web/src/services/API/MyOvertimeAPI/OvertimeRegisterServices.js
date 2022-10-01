import { USER_GET_PROJECTS  } from "@/config/constant";
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

}

export default OvertimeRegisterServices;