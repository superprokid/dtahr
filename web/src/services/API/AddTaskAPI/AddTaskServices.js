import {
	USER_GET_ALL_CATEGORY_TASK,
    USER_CREATE_CATEGORY_TASK,
	USER_CREATE_TASK
} from '@/config/constant';
import axiosClient, { asyncRecallFunction } from '../API';
const AbsentRegisterServices = {
	getAllTaskCategory: async () => {
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

	createCategoryTask: async (params) => {
		try {
			const response = await asyncRecallFunction(() => {
				return axiosClient.post(USER_CREATE_CATEGORY_TASK, params);
			});
			return response;
		} catch (error) {
			return error;
		}
	},

	createTask: async (params) => {
		try {
			const response = await asyncRecallFunction(() => {
				return axiosClient.post(USER_CREATE_TASK, params);
			});
			return response;
		} catch (error) {
			return error;
		}
	}
};

export default AbsentRegisterServices;
