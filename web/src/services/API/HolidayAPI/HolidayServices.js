import { USER_GET_HOLIDAYS } from "../../../config/constant"
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
    }
}