import { USER_GET_CHECK_STATUS, MANAGER_GET_REALTIME  } from "@/config/constant";
import axiosClient, {asyncRecallFunction} from "../API"
const RealtimeCheckService = {
    getGroupStatus: async () => {
        try {
            const response = await asyncRecallFunction(() => {
                return axiosClient.get(USER_GET_CHECK_STATUS)
            });
            return response;
        } catch (error) {
            return error;
        }
    },

    getRealTime: async (startDate, endDate) => {
        try {
            const response = await asyncRecallFunction(() => {
                return axiosClient.get(`${MANAGER_GET_REALTIME}?startDate=${startDate}&endDate=${endDate}`)
            });
            return response;
        } catch (error) {
            return error;
        }
    }
}

export default RealtimeCheckService;