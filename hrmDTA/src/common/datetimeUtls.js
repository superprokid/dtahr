import moment from 'moment';

export const YYYY_MM_DD = 'YYYY-MM-DD';
export const MM_DD_YYYY = 'MM/DD/YYYY';
export const MMM_YYYY = 'MMM YYYY';
export const HH_MM = "HH:MM";
export const MM_DD_YYYY_HH_MM= 'MM/DD/YYYY HH:MM';
export const DD_MMM_YYYY_HH_MM = 'DD MMM YYYY HH:MM';

export function getDateString(date = new Date(), format) {
    return moment(date).format(format)
}

export function getTimeString(date = new Date()) {
    const targetDate = new Date(date);
    let hours = targetDate.getHours();
    if (hours < 10) hours = '0' + hours;
    let mins = targetDate.getMinutes();
    if (mins < 10) mins = '0' + mins;
    return `${hours}:${mins}`
}

export function getStartAndEndOfMonth(date) {
    const startDate = moment(date).startOf('month').format('YYYY-MM-DD');
    const endDate = moment(date).endOf('month').format('YYYY-MM-DD');
    return { startDate, endDate }
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