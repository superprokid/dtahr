import { USER_GET_START_URL, USER_GET_NOTIFY, USER_UPDATE_NOTIFY  } from "@/config/constant";
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
    },

    getNotify: async () => {
        try {
            const response = await asyncRecallFunction(() => {
                return axiosClient.get(USER_GET_NOTIFY)
            });
            return response;
        } catch (error) {
            return error;
        }
    },

    updateNotify: async (data) => {
        try {
            const response = await asyncRecallFunction(() => {
                return axiosClient.post(USER_UPDATE_NOTIFY, data)
            });
            return response;
        } catch (error) {
            return error;
        }
    }

}

export default MyPageServices;