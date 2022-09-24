import api from "../API"
const LoginServices = {
    /*******************************
     * Check login successfuly
     * @param {object} arg: {userName: string, password: string}
     *******************************/
    checkLogin: async(arg) => {
        try { 
            const response = await api.login(arg);
            return response;
        } catch (error) { 
            return error;
        }
    },
 
}

export default LoginServices;