import { USER_REGISTER_WORK_FROM_HOME } from "@/config/constant";
import axiosClient, {asyncRecallFunction} from "../API"
const WorkFromHomeServices = {

  registerWorkFromHome: async (params) => {
    try {
      const response = await asyncRecallFunction(() => {
        return axiosClient.post(USER_REGISTER_WORK_FROM_HOME, params);
      })
      return response;
    } catch (error) {
      return error;
    }  
  },
}

export default WorkFromHomeServices;