import { USER_GROUP_OVERTIME_TICKET, MANAGER_UPDATE_STATUS_OT_TICKET  } from "@/config/constant";
import axiosClient, {asyncRecallFunction} from "../API"
const OvertimeTicketServices = {

    getOvertimeTickets: async() => {
        try {
            const response = await asyncRecallFunction(() => {
                return axiosClient.get(USER_GROUP_OVERTIME_TICKET)
            });
            return response;
        } catch (error) {
            return error;
        }
    },
    updateOvertimeTickets: async(params) => {
        try {
            const response = await asyncRecallFunction(() => {
                return axiosClient.post(MANAGER_UPDATE_STATUS_OT_TICKET, params)
            });
            return response;
        } catch (error) {
            return error;
        }
    },
}

export default OvertimeTicketServices;