import {
	USER_OVERTIME_TICKET,
	USER_DELETE_OVERTIME_TICKET,
} from '@/config/constant';
import axiosClient, { asyncRecallFunction } from '../API';
const OvertimeHistoryServices = {
	getOvertimeTickets: async () => {
		try {
			const response = await asyncRecallFunction(() => {
				return axiosClient.get(USER_OVERTIME_TICKET);
			});
			return response;
		} catch (error) {
			return error;
		}
	},

	deleteOverTimeTicket: async (params) => {
		try {
			const response = await asyncRecallFunction(() => {
				return axiosClient.post(USER_DELETE_OVERTIME_TICKET, params);
			});
			return response;
		} catch (error) {
			return error;
		}
	},
};

export default OvertimeHistoryServices;
