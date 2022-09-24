import { USER_LOGIN_URL, ADMIN_LOGIN_URL } from "../../../config/constant";
import axiosClient from "../API"
const LoginServices = {
    /*******************************
     * Check login successfuly
     * @param {object} arg: {userName: string, password: string}
     *******************************/
    checkLogin: async(arg) => {
        try {
            const response = await axiosClient.post(USER_LOGIN_URL, arg);
            return response;
        } catch (error) { 
            return error;
        }
    },
    adminLogin: async (arg) => {
        try {
            const response = await axiosClient.post(ADMIN_LOGIN_URL, arg);
            return response;
        } catch (error) {
            return error;
        }
    }
}

export default LoginServices;