import {
    USER_GET_TASK_DETAIL,
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

	// createCategoryTask: async (params) => {
	// 	try {
	// 		const response = await asyncRecallFunction(() => {
	// 			return axiosClient.post(USER_CREATE_CATEGORY_TASK, params);
	// 		});
	// 		return response;
	// 	} catch (error) {
	// 		return error;
	// 	}
	// },


};

export default AbsentRegisterServices;
