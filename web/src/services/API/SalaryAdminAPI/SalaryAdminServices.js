/* eslint-disable */
import { 
    ADMIN_GET_SALARY_BY_MONTH,
    ADMIN_CHANGE_SALARY,

} from "@/config/constant";
import axiosAdmin, {callAdminAPI} from "../AdminAPI"

const SalaryAdminServices = {

    adminGetSalaryByMonth: async (params) => {
        try {
            const response =  await callAdminAPI(()=>{
                return axiosAdmin.get(ADMIN_GET_SALARY_BY_MONTH, {params})
            })
            return response
        } catch (error) {
            return error;
        }
    },
    adminChangeSalary: async (params) => {
        try {
            const response =  await callAdminAPI(()=>{
                return axiosAdmin.post(ADMIN_CHANGE_SALARY, params)
            })
            return response
        } catch (error) {
            return error;
        }
    },


}

export default SalaryAdminServices;