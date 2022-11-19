import {
  ADMIN_GET_ALL_USER,
  ADMIN_GET_USER_INFO,
  ADMIN_ADD_USER,
  ADMIN_UPDATE_USER,
  ADMIN_DELETE_USER,
  ADMIN_GET_WORKLOG_USER,
  ADMIN_GET_WORK_HISTORY_USER,
  ADMIN_GET_USER_PROJECT_JOINED,
  ADMIN_UPDATE_WORKLOG_USER,
  ADMIN_UPDATE_HOLIDAY_USER,
} from "@/config/constant";
import axiosAdmin, {callAdminAPI} from "../AdminAPI"

const AdminUserManagementService = {

  getAllUser: async () => {
      try {
          const response =  await callAdminAPI(()=>{
              return axiosAdmin.get(ADMIN_GET_ALL_USER)
          })
          return response
      } catch (error) {
          return error;
      }
  },
  getUserInfo: async (data) => {
      try {
          const response =  await callAdminAPI(()=>{
              return axiosAdmin.get(ADMIN_GET_USER_INFO,{params: data})
          })
          return response
      } catch (error) {
          return error;
      }
  },
  getUserProjectJoined: async (data) => {
    try {
      const response = await callAdminAPI(() => {
          return axiosAdmin.get(ADMIN_GET_USER_PROJECT_JOINED, {params: data})
      });
      return response;
    } catch (error) {
        return error;
    }
  },
  addUser: async (data) => {
      try {
          const response =  await callAdminAPI(()=>{
              return axiosAdmin.post(ADMIN_ADD_USER, data)
          })
          return response
      } catch (error) {
          return error;
      }
  },

  updateUser: async (data) => {
      try {
          const response =  await callAdminAPI(()=>{
              return axiosAdmin.post(ADMIN_UPDATE_USER, data)
          })
          return response
      } catch (error) {
          return error;
      }
  },

  deleteUser: async (data) => {
      try {
          const response =  await callAdminAPI(()=>{
              return axiosAdmin.post(ADMIN_DELETE_USER, data)
          })
          return response
      } catch (error) {
          return error;
      }
  },
  getUserWorklogs: async (data) => {
      try {
          const response =  await callAdminAPI(()=>{
              return axiosAdmin.get(ADMIN_GET_WORKLOG_USER, {params: data})
          })
          return response
      } catch (error) {
          return error;
      }
  },
  getUserWorkHistory: async (data) => {
      try {
          const response =  await callAdminAPI(()=>{
              return axiosAdmin.get(ADMIN_GET_WORK_HISTORY_USER, {params: data})
          })
          return response
      } catch (error) {
          return error;
      }
  },
  updateUserWorklog: async (data) => {
      try {
          const response =  await callAdminAPI(()=>{
              return axiosAdmin.post(ADMIN_UPDATE_WORKLOG_USER, data)
          })
          return response
      } catch (error) {
          return error;
      }
  },
  updateUserHoliday: async (data) => {
    try {
        const response =  await callAdminAPI(()=>{
            return axiosAdmin.post(ADMIN_UPDATE_HOLIDAY_USER, data)
        })
        return response
    } catch (error) {
        return error;
    }
  }
}

export default AdminUserManagementService;