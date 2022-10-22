import axiosBase from 'axios';
import CookieUtls from '../CookieUtls';
import {
	USER_REFRESH_TOKEN_URL,
	// LIMIT_RECALL_API,
} from '../../config/constant';

// let asyncRecallNum = 0;

function getAccessTokenHeader() {
	axiosBase.defaults.headers.common[
		'Authorization'
	] = `Bearer ${CookieUtls.getAccessToken()}`;
}

const axiosClient = {
	// Overwrite method GET
	get: async (url, config) => {
		getAccessTokenHeader();
		return axiosBase.get(url, config);
	},

	// Overwrite method POST
	post: async (url, data, config) => {
		getAccessTokenHeader();
		console.log(data)
		return axiosBase.post(url, data, config);
	},

	// Overwrite method PUT
	put: async (url, data, config) => {
		getAccessTokenHeader();
		return axiosBase.put(url, data, config);
	},
};

async function refreshToken() {
	const refreshToken = CookieUtls.getRefreshToken();
	if (!refreshToken) {
		return false
	}
	try {
		const response = await axiosClient.post(USER_REFRESH_TOKEN_URL, {
			refreshToken,
		});
		CookieUtls.setAccessToken(response.data.accessToken);
		return true;
	} catch {
		CookieUtls.removeAllCookie();
		return false
	}
}

/**
 * Recall api if needed
 * @param {Promise} request
 */
export function asyncRecallFunction(apiFunction) {
	return apiFunction().then(async (result) => {
		// asyncRecallNum = 0;
		return result;
	}).catch(async error => {
		if (error.response.status === 401) {
			let response = await refreshToken();
			console.log(response);
			if (!response) {
				return response
			}
			return await apiFunction();
		} else {
			return -1;
		}

		// if (error.response.status === 403) {
		// 	if (asyncRecallNum >= LIMIT_RECALL_API) {
		// 		return null;
		// 	}
		// 	asyncRecallNum++;
		// 	return asyncRecallFunction(apiFunction);
		// }
	})
}

export default axiosClient;
