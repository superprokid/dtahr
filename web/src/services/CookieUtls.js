import { EXPRIED_COOKIE_DAYS } from "../config/constant";

export default class CookieUtls {
    static accessTokenKey = "ute-hrm-accesstoken";
    static refreshTokenKey = "ute-hrm-refreshtoken";
    static role = "_ute-hrm-role";
    static employeeId = "_ute-hrm-employeeid";

    static setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    static setAccessToken(value) {
        this.setCookie(this.accessTokenKey, value, EXPRIED_COOKIE_DAYS);
    }

    static setRefreshToken(value) {
        this.setCookie(this.refreshTokenKey, value, EXPRIED_COOKIE_DAYS);
    }

    static parseCookie() {
        const cookies = document.cookie;
        if (cookies.trim().length === 0) {
            return {};
        }
        const arrCookies = cookies.split(';').map(v => v.split('='));
        return arrCookies.reduce((acc, v) => {
            acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
            return acc;
        }, {});
    }

    static getCookie(key) {
        return this.parseCookie()[key];
    }

    static getAccessToken() {
        return this.parseCookie()[this.accessTokenKey];
    }

    static getRefreshToken() {
        return this.parseCookie()[this.refreshTokenKey];
    }

    static removeAllCookie() {
        this.setAccessToken(null);
        this.setRefreshToken(null);
    }
}