import { USER_GET_ALL_TASK, USER_UPDATE_TASK } from "@/config/constant";
import axiosClient, {asyncRecallFunction} from "../API"
const TaskBoardServices = {
  getAllTask: async () => {
    try {
      const response = await asyncRecallFunction(() => {
        return axiosClient.get(USER_GET_ALL_TASK)
      });
      return response;
    } catch (error) {
      return error;
    }
  },

  updateTask: async (data) => {
    try {
      const response = await asyncRecallFunction(() => {
        return axiosClient.post(USER_UPDATE_TASK, data)
      });
      return response;
    } catch (error) {
      return error;
    }
  }
}

export default TaskBoardServices;