import axios  from "../axios"
const loginUrl='/api/user/login'
const LoginServices = {
    /*******************************
     * Check login successfuly
     * @param {object} arg: {userName: string, password: string}
     *******************************/
    checkLogin: async(arg) => {
        try { 
            const response = await axios.post(`${loginUrl}`, arg)
            if(response.status != 200){
                return null
            }
            return response.data
        } catch (error) { 
            return error;
        }
    },
 
}

export default LoginServices;