import storageUtls from "./storageUtls";

export const BASE_URL = "http://26.197.75.244:3000";
// export const BASE_URL = "http://127.0.0.1:3000";

// user url api
export const BASE_API_USER_URL = BASE_URL + '/api/user';
export const USER_LOGIN_URL = BASE_API_USER_URL + '/login';
export const USER_REFRESH_TOKEN_URL = BASE_API_USER_URL + '/refreshtoken';
const USER_GET_WORK_HISTORY = BASE_API_USER_URL + '/workhistory';
const USER_GET_START_URL = BASE_API_USER_URL + '/getstart';
const USER_CHECK_IN_URL = BASE_API_USER_URL + '/checkin';
const USER_CHECK_OUT_URL = BASE_API_USER_URL + '/checkout';
const USER_GET_HOLIDAYS = BASE_API_USER_URL + '/getholidays';
const USER_GET_PROJECTS = BASE_API_USER_URL + '/getprojects';
const USER_REGISTER_OVERTIME = BASE_API_USER_URL + '/create/overtime';
const USER_OVERTIME_TICKET = BASE_API_USER_URL + '/overtime/get';
const USER_GROUP_OVERTIME_TICKET = BASE_API_USER_URL + '/overtime/getall';
const USER_DELETE_OVERTIME_TICKET = BASE_API_USER_URL + '/delete/overtime';
const MANAGER_UPDATE_STATUS_OT_TICKET = BASE_API_USER_URL + '/manager/update/overtime';
const USER_REGISTER_ABSENT = BASE_API_USER_URL + '/create/leave';
const USER_GET_ABSENT = BASE_API_USER_URL + '/leave/get';
const USER_GET_GROUP_ABSENT = BASE_API_USER_URL + '/leave/getall';
const USER_UPDATE_ABSENT = BASE_API_USER_URL + '/manager/update/leave';
const USER_DELETE_ABSENT = BASE_API_USER_URL + '/delete/leave';
const USER_GET_REPORT_SEND_TO_USER = BASE_API_USER_URL + "/dailyreport/getreceive";
const USER_GET_ALL_USER = BASE_API_USER_URL + "/getalluser";
const USER_REGISTER_DAILY_REPORT = BASE_API_USER_URL + "/create/dailyreport";
const USER_GET_MYDAILYREPORT = BASE_API_USER_URL + "/dailyreport/get";
const USER_DELETE_MYDAILYREPORT = BASE_API_USER_URL + "/delete/dailyreport";
const USER_GET_DAILY_REPORT_DETAILS = BASE_API_USER_URL + "/dailyreport/getdetails";
const USER_EDIT_DAILY_REPORT = BASE_API_USER_URL + "/edit/dailyreport";
const USER_CHANGE_PASSWORD = BASE_API_USER_URL + "/changepassword";
const USER_UPDATE_PROFILE = BASE_API_USER_URL + "/changeprofile";
const USER_GET_IMAGE = "/api/public/avts";
const USER_REGISTER_WORK_FROM_HOME = BASE_API_USER_URL + "/create/wfh"

const HEADER = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};
const POST = 'POST';
const GET = 'GET';

const apiUtls = {
    login: async (data) => {
        const result = await callAPI(USER_LOGIN_URL, HEADER, POST, data);
        return result;
    },
    getStart: async () => {
        const result = await recallAPI(USER_GET_START_URL, HEADER, GET);
        return result;
    },
    getWorkHistory: async (startDate, endDate) => {
        const result = await recallAPI(`${USER_GET_WORK_HISTORY}?startDate=${startDate}&endDate=${endDate}`, HEADER, GET);
        return result;
    },
    registerLeaveTicker: async (data) => {
        try {
            const result = await recallAPI(USER_REGISTER_ABSENT, HEADER, POST, data);
            return result;
        } catch (error) {
            throw error;
        }
    },
    getMyLeaveTicket: async () => {
        try {
            const result = await recallAPI(USER_GET_ABSENT, HEADER, GET);
            return result;
        } catch (error) {
            throw error;
        }
    },
    deleteLeaveTicker: async (leaveId) => {
        try {
            const result = await recallAPI(USER_DELETE_ABSENT, HEADER, POST, { leaveId });
            return result;
        } catch (error) {
            throw error;
        }
    }

}

const refreshToken = async () => {
    const refreshToken = await storageUtls.getString(storageUtls.refresh_token);
    const result = await callAPI(USER_REFRESH_TOKEN_URL, HEADER, POST, {
        refreshToken
    });
    if (result.failed) {
        storageUtls.clearLoginSession()
        return false;
    } else {
        storageUtls.setString(storageUtls.access_token, result.accessToken);
        return true;
    }

}

const callAPI = (url, header, method, data = {}) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: method,
            headers: header,
            body: method == GET ? null : JSON.stringify(data)
        }).then(result => {
            if (result.status === 200) {
                resolve(result.json());
            } else {
                resolve({
                    status: result.status,
                    failed: true,
                });
            }
        }).catch(error => reject({
            failed: true,
            error: true,
            errorMsg: error
        }))

        setTimeout(() => {
            reject({
                failed: true,
                message: 'Network request failed, please try later!'
            })
        }, 10000)
    })
}

const callAPIWithToken = async (url, header, method, data) => {
    const accessToken = await storageUtls.getString(storageUtls.access_token);
    header['Authorization'] = 'Bearer ' + accessToken;
    const response = await callAPI(url, header, method, data);
    return response;
}

const recallAPI = async (url, header, method, data) => {
    const response = await callAPIWithToken(url, header, method, data);
    if (response.error) {
        return -1;
    }
    if (response.failed) {
        if (response.status === 401) {
            const refresh = await refreshToken();
            if (!refresh) {
                return refresh;
            } else {
                return await callAPIWithToken(url, header, method, data);
            }
        }
        return -1;
    }
    return response;
}

export default apiUtls;