/* eslint-disable */
import { 
  ADMIN_GET_ALL_WORKTIME,
  ADMIN_UPDATE_WORKTIME,
  ADMIN_CREATE_WORKTIME,
  ADMIN_DELETE_WORKTIME,
} from "@/config/constant";
import axiosAdmin, {callAdminAPI} from "../AdminAPI"

const AdminWorkTimeService = {
  
  getAllWorkTime: async () => {
      try {
          const response =  await callAdminAPI(()=>{
              return axiosAdmin.get(ADMIN_GET_ALL_WORKTIME)
          })
          return response
      } catch (error) {
          return error;
      }
  },
  createWorkTime:async (params) => {
      try {
          const response =  await callAdminAPI(()=>{
              return axiosAdmin.post(ADMIN_CREATE_WORKTIME, params)
          })
          return response
      } catch (error) {
          return error;
      }
  },

  updateWorkTime:async (params) => {
      try {
          const response =  await callAdminAPI(()=>{
              return axiosAdmin.post(ADMIN_UPDATE_WORKTIME, params)
          })
          return response
      } catch (error) {
          return error;
      }
  },
  deleteWorkTime: async (params) => {
      try {
          const response =  await callAdminAPI(()=>{
              return axiosAdmin.post(ADMIN_DELETE_WORKTIME, params)
          })
          return response
      } catch (error) {
          return error;
      }
  }
}

export default AdminWorkTimeService;