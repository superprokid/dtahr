import { USER_REGISTER_WORK_FROM_HOME, MANAGER_GET_ALL_WFH_TICKET, MANAGER_UPDATE_WFH_TICKET, USER_GET_CHECK_STATUS, MANAGER_GET_WFH_TICKET_OF_SELECTED_USER,
  USER_GET_THEIR_WFH_TICKET, USER_DELETE_THEIR_WFH_TICKET } from "@/config/constant";
import axiosClient, {asyncRecallFunction} from "../API"
const WorkFromHomeServices = {

  userDeleteTheirWfhTicket: async (params) => {
    try {
      const response = await asyncRecallFunction(() => {
        return axiosClient.post(USER_DELETE_THEIR_WFH_TICKET, params);
      })
      return response;
    } catch (error) {
      return error;
    }  
  },


  registerWorkFromHome: async (params) => {
    try {
      const response = await asyncRecallFunction(() => {
        return axiosClient.post(USER_REGISTER_WORK_FROM_HOME, params);
      })
      return response;
    } catch (error) {
      return error;
    }  
  },

  managerGetAllWfhTicket: async () => {
    try {
      const response = await asyncRecallFunction(() => {
        return axiosClient.get(MANAGER_GET_ALL_WFH_TICKET);
      })
      return response;
    } catch (error) {
      return error;
    }  
  },

  managerUpdateWfhTicket: async (params) => {
    try {
      const response = await asyncRecallFunction(() => {
        return axiosClient.post(MANAGER_UPDATE_WFH_TICKET, params);
      })
      return response;
    } catch (error) {
      return error;
    }  
  },

  managerGetAllUserAssigned: async () => {
    try {
        const response = await asyncRecallFunction(() => {
            return axiosClient.get(USER_GET_CHECK_STATUS)
        });
        return response;
    } catch (error) {
        return error;
    }
  },

  managerGetWfhTicketOfSelectedSpecificUser: async (params) => {
    try {
        const response = await asyncRecallFunction(() => {
            return axiosClient.get(MANAGER_GET_WFH_TICKET_OF_SELECTED_USER, {params})
        });
        return response;
    } catch (error) {
        return error;
    }
  },

  userGetTheirWfhTickets:async () => {
    try {
        const response = await asyncRecallFunction(() => {
            return axiosClient.get(USER_GET_THEIR_WFH_TICKET)
        });
        return response;
    } catch (error) {
        return error;
    }
  },

}

export default WorkFromHomeServices;