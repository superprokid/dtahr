import axiosBase from 'axios';
import SessionUtls from '../SessionUtls';


function getAdminSessionHeader() {
	axiosBase.defaults.headers.common[
		'Authorization'
	] = `Bearer ${SessionUtls.getAdminSession()}`;
}

export function callAdminAPI(apiFuction){
	console.log('apiFuction',apiFuction);
    return apiFuction().then(async (result)=>{
        return result;
    }).catch(async (error)=>{
        if(error.response.status === 401){
			SessionUtls.clearItem(SessionUtls.adminSession)
            return false; // unauthorized
        }else{
            return -1; // call fail
        }
    })
}

const axiosAdmin = {
	// Overwrite method GET
	get: async (url, config) => {
		getAdminSessionHeader();
		return axiosBase.get(url, config);
	},

	// Overwrite method POST
	post: async (url, data, config) => {
		getAdminSessionHeader();
		console.log(data)
		return axiosBase.post(url, data, config);
	},

	// Overwrite method PUT
	put: async (url, data, config) => {
		getAdminSessionHeader();
		return axiosBase.put(url, data, config);
	},
};



export default axiosAdmin;
