export const LIMIT_RECALL_API = 3;
export const EXPRIED_COOKIE_DAYS = 10 * 365; // 10 years

export const BASE_URL = "http://26.197.75.244:3000";

// user url api
export const BASE_API_USER_URL = BASE_URL + '/api/user';
export const USER_LOGIN_URL = BASE_API_USER_URL + '/login';
export const USER_REFRESH_TOKEN_URL = BASE_API_USER_URL + '/refreshtoken';
export const USER_GET_TRACKING_HISTORY_URL = BASE_API_USER_URL + '/workhistory';
export const USER_GET_START_URL = BASE_API_USER_URL + '/getstart';
export const USER_CHECK_IN_URL = BASE_API_USER_URL + '/checkin';
export const USER_CHECK_OUT_URL = BASE_API_USER_URL + '/checkout';
export const USER_GET_HOLIDAYS = BASE_API_USER_URL + '/getholidays';
export const USER_GET_PROJECTS = BASE_API_USER_URL + '/getprojects';
export const USER_REGISTER_OVERTIME = BASE_API_USER_URL + '/create/overtime';
export const USER_OVERTIME_TICKET = BASE_API_USER_URL + '/overtime/get';
export const USER_GROUP_OVERTIME_TICKET = BASE_API_USER_URL + '/overtime/getall';
export const USER_DELETE_OVERTIME_TICKET = BASE_API_USER_URL + '/delete/overtime';
export const MANAGER_UPDATE_STATUS_OT_TICKET = BASE_API_USER_URL + '/manager/update/overtime';
export const USER_REGISTER_ABSENT = BASE_API_USER_URL + '/create/leave';
export const USER_GET_ABSENT = BASE_API_USER_URL + '/leave/get';
export const USER_GET_GROUP_ABSENT = BASE_API_USER_URL + '/leave/getall';
export const USER_UPDATE_ABSENT = BASE_API_USER_URL + '/manager/update/leave';
export const USER_DELETE_ABSENT = BASE_API_USER_URL + '/delete/leave';
export const USER_GET_REPORT_SEND_TO_USER = BASE_API_USER_URL + "/dailyreport/getreceive";
export const USER_GET_ALL_USER = BASE_API_USER_URL + "/getalluser";
export const USER_REGISTER_DAILY_REPORT = BASE_API_USER_URL + "/create/dailyreport";
export const USER_GET_MYDAILYREPORT = BASE_API_USER_URL + "/dailyreport/get";
export const USER_DELETE_MYDAILYREPORT = BASE_API_USER_URL + "/delete/dailyreport";
export const USER_GET_DAILY_REPORT_DETAILS = BASE_API_USER_URL + "/dailyreport/getdetails";
export const USER_EDIT_DAILY_REPORT = BASE_API_USER_URL + "/edit/dailyreport";

//manager url api
export const MANAGER_GET_USER_ASSIGNED = BASE_API_USER_URL + '/manager/getusers';
export const USER_GET_CHECK_STATUS = BASE_API_USER_URL + "/manager/getalluser";
export const MANAGER_GET_REALTIME = BASE_API_USER_URL + "/manager/getrealtime";
export const MANAGER_GET_USER_WORKLOGS = BASE_API_USER_URL + "/manager/worklog/get";

// admin url api
export const BASE_API_ADMIN_URL = BASE_URL + '/api/admin';
export const ADMIN_LOGIN_URL = BASE_API_ADMIN_URL + '/login';
