import { USER_GET_START_URL  } from "@/config/constant";
import axiosClient, {asyncRecallFunction} from "../API"
const MyPageServices = {

    getStartUser: async () => {
        try {
            const response = await asyncRecallFunction(() => {
                return axiosClient.get(USER_GET_START_URL)
            });
            return response;
        } catch (error) {
            return error;
        }
    }

}

export default MyPageServices;