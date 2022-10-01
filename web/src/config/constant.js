export const LIMIT_RECALL_API = 3;

export const BASE_URL = "http://26.197.75.244:3000";

// user url api
export const BASE_API_USER_URL = BASE_URL + "/api/user";
export const USER_LOGIN_URL = BASE_API_USER_URL + "/login";
export const USER_REFRESH_TOKEN_URL = BASE_API_USER_URL + "/refreshtoken"
export const USER_GET_TRACKING_HISTORY_URL = BASE_API_USER_URL + "/workhistory";
export const USER_GET_START_URL = BASE_API_USER_URL + "/getstart";
export const USER_CHECK_IN_URL = BASE_API_USER_URL + "/checkin";
export const USER_CHECK_OUT_URL = BASE_API_USER_URL + "/checkout";
export const USER_GET_HOLIDAYS = BASE_API_USER_URL + "/getholidays";
export const USER_GET_PROJECTS = BASE_API_USER_URL + "/getprojects";

// admin url api
export const BASE_API_ADMIN_URL = BASE_URL + "/api/admin";
export const ADMIN_LOGIN_URL = BASE_API_ADMIN_URL + "/login";
