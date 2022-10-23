import { REPORT_RECEIVER_SCREEN } from "../../../../config/screenName";
import ReportService from "../../../../services/API/ReportAPI/ReportServices"
import { getDateString } from "../../../../services/utilities";

export default {
    data() {
        return {
            expanded: [],
            singleExpand: false,
            listReports: [],
            reportHeader: [
                {
                    text: 'Project',
                    align: 'start',
                    value: 'project_name',
                },
                { text: 'Sender', value: 'sender' },
                { text: 'Date', value: 'date' },
                { text: '', value: 'data-table-expand' },
            ],
            testText: "- Create login screen\n- API login for user and admin\n- Fixbug abc",
        }
    },
    async mounted() {
        this.$eventBus.$emit('show-spinner', true);
        await this._getReportReceive();
        this.$eventBus.$emit('show-spinner', false);
        this.$root.$on(REPORT_RECEIVER_SCREEN, () => {
            this._getReportReceive();
        })
    },
    methods: {
        async _getReportReceive() {
            this.$eventBus.$emit('show-spinner', true);
            const response = await ReportService.getReportReceive();
            this.$eventBus.$emit('show-spinner', false);
            if (!response) {
                this.$router.push('/user/login');
            } else {
                this.listReports = response.data.map((item) => {
                    return { ...item, date: getDateString(item.dailyreport_date) }
                })
            }
        }
    },
}