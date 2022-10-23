import {
	USER_GET_ABSENT,
	USER_GET_GROUP_ABSENT,
	USER_REGISTER_ABSENT,
	USER_UPDATE_ABSENT,
	USER_DELETE_ABSENT
} from '@/config/constant';
import axiosClient, { asyncRecallFunction } from '../API';
const AbsentRegisterServices = {
	getUserAbsent: async () => {
		try {
			const response = await asyncRecallFunction(() =>
				axiosClient.get(USER_GET_ABSENT)
			);
			return response;
		}
		catch (error) {
			return error;
		}
	},

	getGroupAbsent: async () => {
		try {
			const response = await asyncRecallFunction(() =>
				axiosClient.get(USER_GET_GROUP_ABSENT)
			);
			return response;
		}
		catch (error) {
			return error;
		}
	},

	updateAbsent: async (data) => {
		try {
			const response = await asyncRecallFunction(() =>
				axiosClient.post(USER_UPDATE_ABSENT, data)
			);
			return response;
		}
		catch (error) {
			return error;
		}
	},

	registerAbsent: async (params) => {
		try {
			const response = await asyncRecallFunction(() => {
				return axiosClient.post(USER_REGISTER_ABSENT, params);
			});
			return response;
		} catch (error) {
			return error;
		}
	},

	deleteAbsent: async (params) => {
		try {
			const response = await asyncRecallFunction(() => {
				return axiosClient.post(USER_DELETE_ABSENT, params);
			});
			return response;
		} catch (error) {
			return error;
		}
	}
};

export default AbsentRegisterServices;
