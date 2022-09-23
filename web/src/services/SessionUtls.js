export default class SessionUtls {
    static accessTokenKey = "ute-hrm-accesstoken";
    static refreshTokenKey = "ute-hrm-refreshtoken";

    /**
     * Get value from sessionStorage by key
     * @param {String} key 
     * @returns 
     */
    static getItem(key) {
        return sessionStorage.getItem(key);
    }

    /**
     * Set value to sessionStorage with key
     * @param {String} key 
     * @param {String} value 
     */
    static setItem(key, value) {
        sessionStorage.setItem(key, value);
    }

    /**
     * Remove key in sessionStorage
     * @param {String} key 
     */
    static clearItem(key) {
        sessionStorage.removeItem(key);
    }

    /**
     * Get access token from sessionStorage
     * @returns 
     */
    static getAccessToken() {
        return this.getItem(this.accessTokenKey);
    }

    /**
     * Set access token to sessionStorage
     * @param {String} accessToken 
     */
    static setAccessToken(accessToken) {
        this.setItem(this.accessTokenKey, accessToken);
    }

    /**
     * Get refresh token from sessionStorage
     * @returns 
     */
    static getRefreshToken() {
        return this.getItem(this.refreshTokenKey);
    }

    /**
     * Set refresh token to sessionStorage
     * @param {String} accessToken 
     */
    static setRefreshToken(refreshToken) {
        this.setItem(this.refreshTokenKey, refreshToken);
    }

    static clearLoginSession() {
        this.clearItem(this.accessTokenKey);
        this.clearItem(this.refreshTokenKey);
    }
}