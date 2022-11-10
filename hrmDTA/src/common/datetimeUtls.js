import moment from 'moment';

export const YYYY_MM_DD = 'YYYY-MM-DD';
export const MM_DD_YYYY = 'MM/DD/YYYY';
export const MMM_YYYY = 'MMM YYYY';
export const HH_MM = "HH:MM"

export function getDateString(date = new Date(), format) {
    return moment(date).format(format)
}

export function getStartAndEndOfMonth(date) {
    const startDate = moment(date).startOf('month').format('YYYY-MM-DD');
    const endDate = moment(date).endOf('month').format('YYYY-MM-DD');
    return { startDate, endDate }
}