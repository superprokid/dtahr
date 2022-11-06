import AsyncStorage from "@react-native-async-storage/async-storage"

const storageUtls = {
    access_token: 'accessToken',
    refresh_token: 'refreshToken',
    
    getBoolean: async (key) => {
        try {
            return await AsyncStorage.getItem(key);
        } catch (error) {
            return false;
        }
    },
    setBoolean: async (key, value) => {
        try {
            await AsyncStorage.setItem(key, String(value));
        } catch (error) {
            return false;
        }
    },
    getString: async (key) => {
        try {
            const result = await AsyncStorage.getItem(key);
            if (result == null) {
                return "";
            }
            return result;
        } catch (error) {
            return "";
        }
    },
    setString: async (key, value) => {
        try {
            await AsyncStorage.setItem(key, String(value));
        } catch (error) {
            return false;
        }
    },
    getNumber: async (key) => {
        try {
            const result = await AsyncStorage.getItem(key);
            if (result == null) {
                return "-1";
            }
            return result
        } catch (error) {
            return "-1";
        }
    }, 
    setNumber: async (key, value) => {
        try {
            await AsyncStorage.setItem(key, String(value));
        } catch (error) {
            return false;
        }
    },
}

export default storageUtls;