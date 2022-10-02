/* eslint-disable */
import AbsentServices from '@/services/API/MyAbsentAPI/AbsentServices';
import { getDateString, getTimeString } from '@/services/utilities';
import Button from '@/components/Button/Button.vue';

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
					text: 'Absent Time',
					value: 'absentTime',
				},
				{
					text: 'Leave Type',
					value: 'type',
				},
				{
					text: 'Reason',
					value: 'reason',
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
		this._getListAbsentHistory();
		this.$root.$on('AbsentRegister', () => {
			this._getListAbsentHistory();
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

		async _getListAbsentHistory() {
			this.$eventBus.$emit('show-spinner', true);
			const response = await AbsentServices.getUserAbsent();
			this.$eventBus.$emit('show-spinner', false);
			if (!response) {
				this.$router.push('/user/login');
				return;
			}
			this.listOvertimeTicket = response.data.reverse().map((item) => {
				return {
					...item,
					absentTime:
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

		async deleteAbsentTicket(absent_id) {
			const params = {
				leaveId: absent_id,
			};
			this.$eventBus.$emit('show-spinner', true);
			const response = await AbsentServices.deleteAbsent(params);
			this.$eventBus.$emit('show-spinner', false);
			if (!response) {
				this.$router.push('/user/login');
				return;
			}
			await this._getListOvertimeTicket();
		},
	},
};
