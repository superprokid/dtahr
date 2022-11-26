import { Alert } from "react-native";

export function groupArrayByKey(arr, key) {
    return arr.reduce(function (newArr, item) {
        newArr[item[key]] = newArr[item[key]] || [];
        newArr[item[key]].push(item);
        return newArr;
    }, {});
}

export function showErrorNetwork() {
    Alert.alert('Error', 'Network request failed, please check your connection!', [
        {
            text: 'OK',
            style: 'cancel'
        }
    ], { cancelable: true });
}

export function showLogout() {
    Alert.alert('Information', 'Your login session is expired, please login again', [
        {
            text: 'OK',
            style: 'cancel'
        }
    ], { cancelable: true });
}