import moment from "moment";

const YYYY_MM_DD = "YYYY-MM-DD"
const HH_MM_SS = "hh:mm:ss"

export function getDateString(date) {
    return moment(date).format(YYYY_MM_DD);
}

export function getTimeString(time) {
    return moment(time).format(HH_MM_SS);
}