import { USER_CHANGE_PASSWORD } from "@/config/constant";
import axiosClient, {asyncRecallFunction} from "../API"
const PasswordServices = {
  updatePassword: async (params) => {
    try {
      const response = await asyncRecallFunction(() => {
        return axiosClient.post(USER_CHANGE_PASSWORD, params)
      });
      return response;
    } catch (error) {
      return error;
    }
  }
}

export default PasswordServices;