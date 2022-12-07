/* eslint-disable */
import { 
  ADMIN_GET_POLICY,
  ADMIN_UPDATE_POLICY,
} from "@/config/constant";
import axiosAdmin, {callAdminAPI} from "../AdminAPI"

const AdminPolicyService = {
  
  getPolicy: async () => {
      try {
          const response =  await callAdminAPI(()=>{
              return axiosAdmin.get(ADMIN_GET_POLICY)
          })
          return response
      } catch (error) {
          return error;
      }
  },
  updatePolicy: async (data) => {
      try {
          const response =  await callAdminAPI(()=>{
              return axiosAdmin.post(ADMIN_UPDATE_POLICY, data)
          })
          return response
      } catch (error) {
          return error;
      }
  },
}

export default AdminPolicyService;