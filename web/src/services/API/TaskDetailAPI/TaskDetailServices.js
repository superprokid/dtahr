import {
    USER_GET_TASK_DETAIL,
	USER_CREATE_COMMENT,
	USER_UPDATE_COMMENT,
	USER_DELETE_COMMENT,
	USER_UPDATE_TASK
} from '@/config/constant';
import axiosClient, { asyncRecallFunction } from '../API';
const AbsentRegisterServices = {
	getTaskDetailById: async (params) => {
		try {
			const response = await asyncRecallFunction(() =>
				axiosClient.get(USER_GET_TASK_DETAIL, {params})
			);
			return response;
		}
		catch (error) {
			return error;
		}
	},

	createComment: async (params) => {
		try {
			const response = await asyncRecallFunction(() => {
				return axiosClient.post(USER_CREATE_COMMENT, params);
			});
			return response;
		} catch (error) {
			return error;
		}
	},

	updateComment: async (params) => {
		try {
			const response = await asyncRecallFunction(() => {
				return axiosClient.post(USER_UPDATE_COMMENT, params);
			});
			return response;
		} catch (error) {
			return error;
		}
	},

	deleteComment: async (params) => {
		try {
			const response = await asyncRecallFunction(() => {
				return axiosClient.post(USER_DELETE_COMMENT, params);
			});
			return response;
		} catch (error) {
			return error;
		}
	},

	userUpdateTask: async (params) => {
		try {
			const response = await asyncRecallFunction(() => {
				return axiosClient.post(USER_UPDATE_TASK, params);
			});
			return response;
		} catch (error) {
			return error;
		}
	},


};

export default AbsentRegisterServices;
