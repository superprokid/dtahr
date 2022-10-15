import { USER_GET_HOLIDAYS, MANAGER_UPDATE_HOLIDAY } from "../../../config/constant"
import axiosClient, { asyncRecallFunction } from "../API"

export default {
    getHolidays: async () => {
        try {
            const response = await asyncRecallFunction(() => {
                return axiosClient.get(USER_GET_HOLIDAYS)
            });
            return response;
        } catch (error) {
            return error
        }
    },

    updateHoliday: async (data) => {
        try {
            const response = await asyncRecallFunction(() => {
                return axiosClient.post(MANAGER_UPDATE_HOLIDAY, data)
            });
            return response;
        } catch (error) {
            return error
        }
    }
}