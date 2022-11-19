import {
	USER_GET_LIST_PROJECT
} from '@/config/constant';
import axiosClient, { asyncRecallFunction } from '../API';
const ProjectServices = {
	getListProjects: async () => {
		try {
			const response = await asyncRecallFunction(() =>
				axiosClient.get(USER_GET_LIST_PROJECT)
			);
			return response;
		}
		catch (error) {
			return error;
		}
	},


};

export default ProjectServices;
