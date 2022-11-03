import { ADMIN_GET_HOLIDAY, ADMIN_CREATE_HOLIDAY, ADMIN_DELETE_HOLIDAY } from "@/config/constant";
import axiosAdmin, {callAdminAPI} from "../AdminAPI"

const AdminHolidayService = {

  getHoliday: async () => {
    try {
      const response = await callAdminAPI(() => {
        return axiosAdmin.get(ADMIN_GET_HOLIDAY);
      });
      return response;
    }
    catch (error) {
      return error;
    }
  },
  
  createHoliday: async (data) => {
    try {
      const response = await callAdminAPI(() => {
        return axiosAdmin.post(ADMIN_CREATE_HOLIDAY, data);
      });
      return response;
    }
    catch (error) {
      return error;
    }
  },

  deleteHoliday: async (data) => {
    try {
      const response = await callAdminAPI(() => {
        return axiosAdmin.post(ADMIN_DELETE_HOLIDAY, data);
      });
      return response;
    }
    catch (error) {
      return error;
    }
  }
}

export default AdminHolidayService;