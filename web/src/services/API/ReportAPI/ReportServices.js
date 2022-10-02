import { USER_GET_REPORT_SEND_TO_USER  } from "@/config/constant";
import axiosClient, {asyncRecallFunction} from "../API"
const ReportService = {

    getReportReceive: async () => {
        try {
            const response = await asyncRecallFunction(() => {
                return axiosClient.get(USER_GET_REPORT_SEND_TO_USER)
            });
            return response;
        } catch (error) {
            return error;
        }
    },

    registerDailyReport: async () => {
        try {
            const response = await asyncRecallFunction(() => {
                return axiosClient.get(USER_GET_REPORT_SEND_TO_USER)
            });
            return response;
        } catch (error) {
            return error;
        }
    }
}

export default ReportService;