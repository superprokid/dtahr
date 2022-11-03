export const BASE_URL = "http://26.197.75.244:3000";
// export const BASE_URL = "http://127.0.0.1:3000";

// user url api
export const BASE_API_USER_URL = BASE_URL + '/api/user';
export const USER_LOGIN_URL = BASE_API_USER_URL + '/login';
export const USER_REFRESH_TOKEN_URL = BASE_API_USER_URL + '/refreshtoken';
const USER_GET_TRACKING_HISTORY_URL = BASE_API_USER_URL + '/workhistory';
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
        const result = await callAPI(USER_LOGIN_URL, POST, data)
        return result;
    }
}

const callAPI = (url, method, data) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: method,
            headers: HEADER,
            body: JSON.stringify(data)
        }).then(result => {
            if (result.status === 200) {
                resolve(result.json())
            } else {
                resolve({
                    failed: true,
                });
            }
        }).catch(error => reject(error))

        setTimeout(() => {
            reject({
                failed: true,
                message: 'Network request failed, please try later!'
            })
        }, 10000)
    })
}

export default apiUtls;