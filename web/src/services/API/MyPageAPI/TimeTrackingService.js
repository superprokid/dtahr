import {USER_CHECK_IN_URL, USER_CHECK_OUT_URL} from '@/config/constant';
import axiosClient, { asyncRecallFunction } from "../API"
const TimeTrackingServices = {

    checkIn: async () => {
        try {
            const response = await asyncRecallFunction(() => {
                return axiosClient.post(USER_CHECK_IN_URL)
            });
            return response;
        } catch (error) {
            return error;
        }
    },

    checkOut: async () => {
      try {
        const response = await asyncRecallFunction(() => {
          return axiosClient.post(USER_CHECK_OUT_URL)
        });
        return response;
      } catch (error) {
        return error;
      }
    }
  
}

export default TimeTrackingServices;