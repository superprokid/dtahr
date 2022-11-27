import {
  ADMIN_EXPORT_LEAVE_CSV,
  ADMIN_EXPORT_OVERTIME_CSV,
  ADMIN_EXPORT_SALARY_CSV
} from "@/config/constant";
import axiosAdmin, {callAdminAPI} from "../AdminAPI"

const AdminCSVServices = {
  exportSalaryCSV: async (params) => {
    try {
      const response = await callAdminAPI(() => {
        return axiosAdmin.get(ADMIN_EXPORT_SALARY_CSV, {
          params,
          responseType: "blob",
        });
      })
      return response; 
    } catch (error) {
      return error;
    }
  },
  exportLeaveCSV: async (params) => {
      try {
          const response =  await callAdminAPI(()=>{
            return axiosAdmin.get(ADMIN_EXPORT_LEAVE_CSV, {
              params,
              responseType: "blob",
            })
          })
          return response
      } catch (error) {
          return error;
      }
  },
  exportOvertimeCSV: async (params) => {
      try {
          const response =  await callAdminAPI(()=>{
            return axiosAdmin.get(ADMIN_EXPORT_OVERTIME_CSV, {
              params,
              responseType: "blob",
            })
          })
          return response
      } catch (error) {
          return error;
      }
  }
}

export default AdminCSVServices;