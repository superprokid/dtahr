import { MANAGER_ADD_WORKLOG, MANAGER_UPDATE_WORKLOG } from "@/config/constant";
import axiosClient, {asyncRecallFunction} from "../API"
const WorklogEditService = {

  addWorklog: async (params) => {
    try {
      const response = await asyncRecallFunction(() => {
        return axiosClient.post(MANAGER_ADD_WORKLOG, params);
      })
      return response;
    } catch (error) {
      return error;
    }  
  },

  updateWorklog: async (params) => {
    try {
      const response = await asyncRecallFunction(() => {
        return axiosClient.post(MANAGER_UPDATE_WORKLOG, params);
      })
      return response;
    } catch (error) {
      return error;
    }
  }
}

export default WorklogEditService;