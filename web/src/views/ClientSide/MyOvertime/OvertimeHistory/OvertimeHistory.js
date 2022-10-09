/* eslint-disable */
import OvertimeHistoryServices from '@/services/API/MyOvertimeAPI/OvertimeHistoryServices';
import { getDateString, getTimeString } from '@/services/utilities';
import Button from '@/components/Button/Button.vue';
import { OT_REGISTER_SCREEN } from '../../../../config/screenName';

export default {
	name: 'AbsentHistory',
	components: {
		Button,
	},
	data() {
		return {
			search: '',
			listOvertimeTicket: [],
			headers: [
				{
					text: 'Payment',
					value: 'payment',
				},
				{
					text: 'Project',
					value: 'project_name',
				},
				{
					text: 'OT Time',
					value: 'ottime',
				},
				{
					text: 'Created At',
					value: 'createdat',
				},
				{
					text: 'Status',
					value: 'status',
				},
				{
					text: 'Actions',
					value: 'actions',
					sortable: false,
				},
			],
		};
	},
	computed: {},
	mounted() {
		this._getListOvertimeHistory();
		this.$root.$on(OT_REGISTER_SCREEN, () => {
			this._getListOvertimeHistory();
		});
	},
	methods: {
		filterOnlyCapsText(value, search, item) {
			item - 1;
			return (
				value != null &&
				search != null &&
				typeof value === 'string' &&
				value
					.toString()
					.toLocaleUpperCase()
					.indexOf(search.toLocaleUpperCase()) !== -1
			);
		},

		async _getListOvertimeHistory() {
			this.$eventBus.$emit('show-spinner', true);
			const response =
				await OvertimeHistoryServices.getOvertimeTickets();
			this.$eventBus.$emit('show-spinner', false);
			if (!response) {
				this.$router.push('/user/login');
				return;
			}
			this.listOvertimeTicket = response.data.reverse().map((item) => {
				return {
					...item,
					ottime:
						this._formatDateTime(item.start_date) +
						' --> ' +
						this._formatDateTime(item.end_date),
					createdat: this._formatDateTime(item.create_at),
					status:
						item.status === 0
							? 'PENDING'
							: item.status === 1
							? 'APPROVED'
							: 'REJECTED',
				};
			});
		},
		_formatDateTime(date) {
			return (
				getDateString(new Date(date)) +
				' ' +
				new Date(date).toLocaleTimeString()
			);
		},

		async deleteOTTicket(overtime_id) {
			const params = {
				overtimeId: overtime_id,
			};
			this.$eventBus.$emit('show-spinner', true);
			const response =
				await OvertimeHistoryServices.deleteOverTimeTicket(params);
			this.$eventBus.$emit('show-spinner', false);
			if (!response) {
				this.$router.push('/user/login');
				return;
			}
			await this._getListOvertimeHistory();
		},
	},
};
