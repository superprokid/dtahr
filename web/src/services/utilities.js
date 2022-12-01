import moment from "moment";
import { USER_GET_IMAGE } from "../config/constant";

const YYYY_MM_DD = "YYYY-MM-DD"
const HH_MM_SS = "hh:mm:ss"

export function getDateString(date) {
    return moment(date).format(YYYY_MM_DD);
}

export function getDateStringWithTask(date) {
    return moment(date).format('MMM DD, YYYY');
}

export function isPastDate(date) {
    return moment().isAfter(moment(date), 'date');
}

export function getTimeString(time) {
    return moment(time).format(HH_MM_SS);
}

export function getAvatar(avt) {
    if(avt){
        return USER_GET_IMAGE + '/' + avt
    }else{
        return require('@/assets/user-default.png')
    }
}

export function addDays(date, number) {
    return moment(date).add(number, 'day');
}

export function addMonths(date, number) {
    return moment(date).add(number, 'month');
}