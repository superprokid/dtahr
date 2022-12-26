import moment from "moment";
import { USER_GET_IMAGE } from "../config/constant";

const YYYY_MM_DD = "YYYY-MM-DD"
const HH_MM_SS = "hh:mm:ss"

export function getDateString(date) {
    return moment(date).format(YYYY_MM_DD);
}

export function getDateStringWithFormat(date, format) {
    return moment(date).format(format);
}

export function getStringFromNow(date) {
    const dateMoment = moment(date);
    if (moment().isSame(dateMoment, 'date')) {
        return dateMoment.fromNow();
    } else {
        return `${getDateString(date, YYYY_MM_DD)} ${getTimeStringOther(date)}`
    }
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

export function getTimeStringOther(time) {
    let d = new Date(time),
        h = (d.getHours() < 10 ? '0' : '') + d.getHours(),
        m = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    return h + ':' + m;
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

export function getMoneyFromString(money){
    if (!money) {
        return 0;
    }
    return parseFloat(money.replace(/,/g, ''));
}

export function compareTwoTimeGreaterOrEqual(hours1, min1, hours2, min2) {
    if (hours1 > hours2) {
        return true;
    } else if (hours1 < hours2) {
        return false;
    } else {
        if (min1 >= min2) {
            return true;
        } else {
            return false;
        }
    }
}