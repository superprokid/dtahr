import { USER_GET_REPORT_SEND_TO_USER, USER_GET_ALL_USER, USER_REGISTER_DAILY_REPORT, USER_GET_MYDAILYREPORT, USER_DELETE_MYDAILYREPORT, USER_GET_DAILY_REPORT_DETAILS, USER_EDIT_DAILY_REPORT } from "@/config/constant";
import axiosClient, { asyncRecallFunction } from "../API";
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

    registerDailyReport: async (data) => {
        try {
            const response = await asyncRecallFunction(() => {
                return axiosClient.post(USER_REGISTER_DAILY_REPORT, data);
            });
            return response;
        } catch (error) {
            return error;
        }
    },

    getAllUser: async () => {
        try {
            const response = await asyncRecallFunction(() => {
                return axiosClient.get(USER_GET_ALL_USER)
            });
            return response;
        } catch (error) {
            return error;
        }
    },

    getMyreport: async () => {
        try {
            const response = await asyncRecallFunction(() => {
                return axiosClient.get(USER_GET_MYDAILYREPORT)
            });
            return response;
        } catch (error) {
            return error;
        }
    },

    deleteMyReport: async (data) => {
        try {
            const response = await asyncRecallFunction(() => {
                return axiosClient.post(USER_DELETE_MYDAILYREPORT, data)
            });
            return response;
        } catch (error) {
            return error;
        }
    },

    getDailyReportDetails: async (params) => {
        try {
            const response = await asyncRecallFunction(() => {
                return axiosClient.get(USER_GET_DAILY_REPORT_DETAILS, { params })
            });
            return response;
        } catch (error) {
            return error;
        }
    },

    editDailyReport: async (data) => {
        try {
            const response = await asyncRecallFunction(() => {
                return axiosClient.post(USER_EDIT_DAILY_REPORT, data)
            });
            return response;
        } catch (error) {
            return error;
        }
    }
}

export default ReportService;