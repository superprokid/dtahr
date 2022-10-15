import { MANAGER_UPDATE_WORKLOG } from "@/config/constant";
import axiosClient, {asyncRecallFunction} from "../API"
const WorklogEditService = {

  updateWorklog: async (params) => {
    try {
      const response = await asyncRecallFunction(() => {
        return axiosClient.post(MANAGER_UPDATE_WORKLOG, params);
      })
      return response;
    } catch (error) {
      return error;
    }  
  },
}

export default WorklogEditService;