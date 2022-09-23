import axiosBase from 'axios';
import SessionUtls from '../SessionUtls';
import { USER_LOGIN_URL, USER_REFRESH_TOKEN_URL } from '../../config/constant'

// let asyncRecallNum = 0;

function getAccessTokenHeader() {
    axiosBase.defaults.headers.common['Authorization'] = `Bearer ${SessionUtls.getAccessToken()}`
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
        return axiosBase.post(url, data, config);
    },

    // Overwrite method PUT
    put: async (url, data, config) => {
        getAccessTokenHeader();
        return axiosBase.put(url, data, config);
    }
}


async function refreshToken() {
    const refreshToken = SessionUtls.getRefreshToken();
    if (!refreshToken) {
        return false;
    }
    const response = await axiosClient.post(USER_REFRESH_TOKEN_URL, { refreshToken });
    if (response.status === 200) {
        SessionUtls.setAccessToken(response.data.accessToken);
        return true;
    } else {
        SessionUtls.clearLoginSession();
        return false;
    }
}

/**
 * Recall api if needed
 * @param {Promise} request 
 */
export function asyncRecallFunction(apiFunction) {
    return apiFunction().then(async (result) => {
        if (result === 401) {
            await refreshToken();
            return await apiFunction();
        }
    })
}

class API {
    login = async (data) => {
        const response = await axiosClient.post(USER_LOGIN_URL, data);
        if (response.status === 200) {
            return response.data;
        } else {
            return response.status;
        }
    }
}

const api = new API();

export default api