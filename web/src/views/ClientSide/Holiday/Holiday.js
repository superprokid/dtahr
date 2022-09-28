import HolidayService from "../../../services/API/HolidayAPI/HolidayServices";
import { getDateString } from "../../../services/utilities";

export default {
    data() {
        return {
            search: '',
            calories: '',
            listHolidays: [],
        }
    },
    computed: {
        headers() {
            return [
                {
                    text: 'Date',
                    align: 'start',
                    value: 'date',
                    width: 300,
                },
                {
                    text: 'Description',
                    value: 'description',
                }
            ]
        },
    },
    mounted() {
        this._getListHoliday();
    },
    methods: {
        filterOnlyCapsText(value, search, item) {
            item - 1;
            return value != null &&
                search != null &&
                typeof value === 'string' &&
                value.toString().toLocaleUpperCase().indexOf(search.toLocaleUpperCase()) !== -1
        },

        async _getListHoliday() {
            const response = await HolidayService.getHolidays();
            if (!response) {
                this.$router.push('/user/login');
                return;
            }
            this.listHolidays = response.data.map(item => {
                return {...item, date: getDateString(item.date)}
            })
        }
    },
}