import {
	USER_GET_ALL_TASK_LIST,
	USER_GET_ALL_CATEGORY_TASK,
	USER_GET_ALL_USER,
} from '@/config/constant';
import axiosClient, { asyncRecallFunction } from '../API';
const TasksServices = {
	getAllTasks: async (params) => {
		try {
			const response = await asyncRecallFunction(() =>
				axiosClient.get(USER_GET_ALL_TASK_LIST, { params })
			);
			return response;
		}
		catch (error) {
			return error;
		}
	},
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
	getAllUser: async () => {
		try {
			const response = await asyncRecallFunction(() => {
				return axiosClient.get(USER_GET_ALL_USER)
			});
			return response;
		} catch (error) {
			return error;
		}
	},


};

export default TasksServices;
