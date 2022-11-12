/* eslint-disable */
import HistoryTrackingServices from '@/services/API/MyPageAPI/HistoryTrackingServices';
import moment from 'moment';
import { mapState } from 'vuex'
import DateTimePicker from '@/components/DateTimePicker/DateTimePicker.vue'
import Button from '@/components/Button/Button.vue'
import { TIME_TRACKING_SCREEN } from '../../../../config/screenName';

const DATE_FORMAT = 'YYYY/MM/DD';

export default {
    name: 'HistoryTracking',
    components: {
        DateTimePicker,
        Button
    },
    data: () => ({
        events: [],
        input: null,
        nonce: 0,
        userTrackingHistory: {},
        startDate: undefined,
        endDate: undefined,
    }),
    props: ['tabData'],
    computed: {
        timeline() {
            return this.events.slice().reverse()
        },
    },
    filters: {
        holidayDisplay(value) {
            return value ? value.toFixed(3) : 0 
        }
    },
    created() {
        let date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        this.startDate = firstDay;
        let lastDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        this.endDate = lastDate;
    },

    mounted() {
        this.$eventBus.$emit("show-spinner", true);
        this._getUserHistoryTracking();

        // Re call api when checkin/checkout
        this.$root.$on(TIME_TRACKING_SCREEN, (msg) => {
            if (msg == this.startDataUser.employee_id) {
                this._getUserHistoryTracking();            
            }
        })
        this.$eventBus.$emit("show-spinner", false);
    },
    computed: {
        ...mapState(["startDataUser"])
    },

    methods: {
        async _getUserHistoryTracking() {
            const response = await HistoryTrackingServices.getHistoryTrackingOfUser();
            if (!response) {
                this.$router.push('/user/login')
            } else {
                this.userTrackingHistory = this._groupArrayByDateKey(response.data.reverse(), "work_date")
                console.log("this.userTrackingHistory",this.userTrackingHistory);
            }
        },
        _groupArrayByDateKey(arr, dateKey) {
            return arr.reduce(function (previousResult, item) {
                const key = moment(item[dateKey]).format('YYYY-MM-DD');
                previousResult[key] = previousResult[key] || [];
                previousResult[key].push(item);
                return previousResult;
            }, {});
        },

        async onInputStartDate(params) {
            this.startDate = new Date(params)
            let param = {
                startDate: moment(this.startDate).format('YYYY-MM-DD'),
                endDate: moment(this.endDate).format('YYYY-MM-DD')
            }
            this.$eventBus.$emit("show-spinner", true);
            let response = await HistoryTrackingServices.getHistoryTrackingWithFilter(param)
            if (!response) {
                this.$router.push('/user/login')
            } else {
                this.userTrackingHistory = this._groupArrayByDateKey(response.data.reverse(), "work_date")
            }
            this.$eventBus.$emit("show-spinner", false);
        },

        async onInputEndDate(params) {
            this.endDate = new Date(params)
            let param = {
                startDate: moment(this.startDate).format('YYYY-MM-DD'),
                endDate: moment(this.endDate).format('YYYY-MM-DD')
            }
            this.$eventBus.$emit("show-spinner", true);
            let response = await HistoryTrackingServices.getHistoryTrackingWithFilter(param)
            if (!response) {
                this.$router.push('/user/login')
            } else {
                console.log(response)
                this.userTrackingHistory = this._groupArrayByDateKey(response.data.reverse(), "work_date")
            }
            this.$eventBus.$emit("show-spinner", false);
        },

        /**
         *
         * @param {string} date: date string
         * @param {string} format: format string
         * @returns {string} date string formatted
         */
        _getFormattedDate(date, format) {
            let formattedDate = moment(new Date(date)).format(format);
            return formattedDate;
        },

        /**
         * Get Date string in Zulu Time UTC format
         * @param {object} date: Date object
         * @returns {string} zuluTimeUTC: format 'YYYY-MM-DDTHH:mm:ssZ'
         */
        _getConvertTimeString(date) {
            let zuluTimeUTC = moment(date).utc().format(DATE_FORMAT) + 'Z';
            return zuluTimeUTC;
        },

        /**
         * Get End time of day
         * @param date : All date format
         * @returns {number}
         */
        _getEndTimeOfDay(date) {
            let endTime = new Date(date).setHours(23, 59, 59, 0);
            return endTime;
        },
    },
};
