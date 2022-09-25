import { USER_GET_TRACKING_HISTORY_URL  } from "@/config/constant";
import axiosClient, {asyncRecallFunction} from "../API"
const HistoryTrackingServices = {

    getHistoryTrackingOfUser: async () => {
        try {
            const response = await asyncRecallFunction(() => {
                return axiosClient.get(USER_GET_TRACKING_HISTORY_URL)
            });
            return response;
        } catch (error) {
            return error;
        }
    },

    getHistoryTrackingWithFilter: async (data) => {
        try {
            const response = await asyncRecallFunction(() => {
                return axiosClient.get(USER_GET_TRACKING_HISTORY_URL, {params: {startDate: data.startDate, endDate: data.endDate}})
            });
            return response;
        } catch (error) {
            return error;
        }
    }
}

export default HistoryTrackingServices;