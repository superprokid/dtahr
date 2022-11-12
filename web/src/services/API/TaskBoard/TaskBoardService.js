import { USER_GET_ALL_TASK, USER_UPDATE_TASK, USER_GET_ALL_CATEGORY_TASK } from "@/config/constant";
import axiosClient, {asyncRecallFunction} from "../API"
const TaskBoardServices = {

  getAllCategory: async () => {
		try {
			const response = await asyncRecallFunction(() =>
				axiosClient.get(USER_GET_ALL_CATEGORY_TASK)
			);
			return response;
		}
		catch (error) {
			return error;
		}
  },

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