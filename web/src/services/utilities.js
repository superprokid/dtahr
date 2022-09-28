import moment from "moment";

const YYYY_MM_DD = "YYYY-MM-DD"

export function getDateString(date) {
    return moment(date).format(YYYY_MM_DD);
}