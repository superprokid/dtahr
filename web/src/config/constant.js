export const LIMIT_RECALL_API = 3;
export const EXPRIED_COOKIE_DAYS = 10 * 365; // 10 years

export const BASE_URL = "http://26.197.75.244:3000";
export const FACE_API_URL = "http://26.74.195.215:5000";
// export const BASE_URL = "http://127.0.0.1:3000";

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
export const USER_CHANGE_PASSWORD = BASE_API_USER_URL + "/changepassword";
export const USER_UPDATE_PROFILE = BASE_API_USER_URL + "/changeprofile";
export const USER_GET_IMAGE = BASE_URL + "/api/public/avts";
export const USER_REGISTER_WORK_FROM_HOME = BASE_API_USER_URL + "/create/wfh"
export const USER_GET_THEIR_WFH_TICKET = BASE_API_USER_URL + "/wfh/get"
export const USER_DELETE_THEIR_WFH_TICKET = BASE_API_USER_URL + "/delete/wfh"
export const USER_GET_ALL_CATEGORY_TASK = BASE_API_USER_URL + "/category/getall"
export const USER_CREATE_CATEGORY_TASK = BASE_API_USER_URL + "/category/create"
export const USER_CREATE_TASK = BASE_API_USER_URL + "/task/create"
export const USER_GET_ALL_TASK = BASE_API_USER_URL + "/task/getbystatus"
export const USER_UPDATE_TASK = BASE_API_USER_URL + "/task/update"
export const USER_GET_TASK_DETAIL = BASE_API_USER_URL + "/task/getdetails"
export const USER_GET_ALL_TASK_LIST = BASE_API_USER_URL + "/task/getall"
export const USER_CREATE_COMMENT = BASE_API_USER_URL + "/comment/create"
export const USER_UPDATE_COMMENT = BASE_API_USER_URL + "/comment/update"
export const USER_DELETE_COMMENT = BASE_API_USER_URL + "/comment/delete"
export const USER_UPLOAD_ATTACHMENT = BASE_API_USER_URL + "/task/attachment/upload"
export const USER_DELETE_ATTACHMENT = BASE_API_USER_URL + "/task/attachment/delete"

export const USER_DOWN_ATTACHMENT = BASE_URL + "/api/public/download";
export const USER_GET_LIST_PROJECT = BASE_URL + "/api/user/project/getlist";

//manager url api
export const MANAGER_GET_USER_ASSIGNED = BASE_API_USER_URL + '/manager/getusers';
export const USER_GET_CHECK_STATUS = BASE_API_USER_URL + "/manager/getalluser";
export const MANAGER_GET_REALTIME = BASE_API_USER_URL + "/manager/getrealtime";
export const MANAGER_GET_USER_WORKLOGS = BASE_API_USER_URL + "/manager/worklog/get";
export const MANAGER_GET_EMPLOYEE_INFO = BASE_API_USER_URL + "/manager/employee/getinfo";
export const MANAGER_UPDATE_WORKLOG = BASE_API_USER_URL + "/manager/worklog/update";
export const MANAGER_GET_HISTORY_WORKLOGS_OF_USER = BASE_API_USER_URL + "/manager/workhistory/get"
export const MANAGER_GET_PROJECT_USER_JOINED = BASE_API_USER_URL + "/manager/project/get"
export const MANAGER_UPDATE_HOLIDAY = BASE_API_USER_URL + "/manager/holiday/update"
export const MANAGER_GET_ALL_WFH_TICKET = BASE_API_USER_URL + "/manager/wfh/getall"
export const MANAGER_UPDATE_WFH_TICKET = BASE_API_USER_URL + "/manager/update/wfh"
export const MANAGER_GET_WFH_TICKET_OF_SELECTED_USER = BASE_API_USER_URL + "/manager/wfh/get"



// admin url api
export const BASE_API_ADMIN_URL = BASE_URL + '/api/admin';
export const ADMIN_LOGIN_URL = BASE_API_ADMIN_URL + '/login';
export const ADMIN_GET_START_URL = BASE_API_ADMIN_URL + '/getstart';
export const ADMIN_GET_GROUP_URL = BASE_API_ADMIN_URL + '/group/get';
export const ADMIN_GET_ALL_FREE_MANAGER_URL = BASE_API_ADMIN_URL + '/employee/getfreemanager';
export const ADMIN_CREATE_GROUP_URL = BASE_API_ADMIN_URL + '/group/create';
export const ADMIN_EDIT_GROUP_URL = BASE_API_ADMIN_URL + '/group/update';
export const ADMIN_DELETE_GROUP_URL = BASE_API_ADMIN_URL + '/group/delete';
export const ADMIN_GET_ALL_EMPLOYEE_OF_GROUP_URL = BASE_API_ADMIN_URL + '/group/getalluser';
export const ADMIN_GET_HOLIDAY = BASE_API_ADMIN_URL + '/holiday/get';
export const ADMIN_CREATE_HOLIDAY = BASE_API_ADMIN_URL + '/holiday/create';
export const ADMIN_DELETE_HOLIDAY = BASE_API_ADMIN_URL + '/holiday/delete';
export const ADMIN_GET_ALL_USER = BASE_API_ADMIN_URL + '/getalluser';
// export const ADMIN_GET_USER_INFO = BASE_API_ADMIN_URL + '/employee/get';
export const ADMIN_GET_USER_PROJECT_JOINED = BASE_API_ADMIN_URL + '/employee/getproject';
export const ADMIN_ADD_USER = BASE_API_ADMIN_URL + '/create/employee';
export const ADMIN_UPDATE_USER = BASE_API_ADMIN_URL + '/update/employee';
export const ADMIN_DELETE_USER = BASE_API_ADMIN_URL + '/delete/employee';
export const ADMIN_GET_WORKLOG_USER = BASE_API_ADMIN_URL + '/worklog/get';
export const ADMIN_UPDATE_WORKLOG_USER = BASE_API_ADMIN_URL + '/worklog/update';
export const ADMIN_UPDATE_HOLIDAY_USER = BASE_API_ADMIN_URL + '/holidaytime/update';
export const ADMIN_GET_WORK_HISTORY_USER = BASE_API_ADMIN_URL + '/workhistory/get';
export const ADMIN_CREATE_USER = BASE_API_ADMIN_URL + '/create/employee';
export const ADMIN_EXPORT_LEAVE_CSV = BASE_API_ADMIN_URL + '/export/leave';
export const ADMIN_EXPORT_OVERTIME_CSV = BASE_API_ADMIN_URL + '/export/overtime';
export const ADMIN_EXPORT_SALARY_CSV = BASE_API_ADMIN_URL + '/export/salary';
export const ADMIN_GET_USER_INFO = BASE_API_ADMIN_URL + '/employee/getinfo';
export const ADMIN_UPDATE_PERSONAL_USER_INFORMATION = BASE_API_ADMIN_URL + '/employee/update';

// constant
export const TAB_TYPE = {
    USER: 'user',
    TASK: 'task'
}
