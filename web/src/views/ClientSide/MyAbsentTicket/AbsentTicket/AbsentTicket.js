/* eslint-disable */
import AbsentServices from '@/services/API/MyAbsentAPI/AbsentServices';
import { getDateString, getTimeString } from '@/services/utilities';
import SessionUtls from '@/services/SessionUtls';
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
					text: 'Information',
					value: 'information',
				},
				{
					text: 'Created At',
					value: 'createdat',
				},
				{
					text: 'Status',
					value: 'status',
				},
			],
		};
	},
	mounted() {
		this._getListAbsentTicket();
		if (SessionUtls.getItem(SessionUtls.role) == 1) {
			this.headers.push({
				text: 'Actions',
				value: 'actions',
				sortable: false,
			});
		}
		this.$root.$on('AbsentRegister', () => {
			this._getListAbsentTicket();
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

		async _getListAbsentTicket() {
			this.$eventBus.$emit('show-spinner', true);
			const response = await AbsentServices.getGroupAbsent();
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
		async updateStatusAbsentTicket(absent_id, status) {
			const params = {
				leaveId: absent_id,
				status: status,
			};
			this.$eventBus.$emit('show-spinner', true);
			const response = await AbsentServices.updateAbsent(params);
			this.$eventBus.$emit('show-spinner', false);
			if (!response) {
				this.$router.push('/user/login');
				return;
			}
			await this._getListAbsentTicket();
		},
	},
};
