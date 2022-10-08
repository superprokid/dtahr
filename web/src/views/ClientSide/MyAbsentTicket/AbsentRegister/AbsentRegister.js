/*eslint-disable*/
import DateTimePicker from '@/components/DateTimePicker/DateTimePicker.vue';
import Input from '@/components/Input/Input.vue';
import Button from '@/components/Button/Button.vue';

import AbsentService from '@/services/API/MyAbsentAPI/AbsentServices';
import moment from 'moment';

const DATE_TIME_FORMAT = 'YYYY-MM-DD hh:mm:ss';
const DATE_FORMAT = 'YYYY-MM-DD';
const TIME_FORMAT = 'hh:mm:ss';

export default {
	name: 'AbsentRegister',
	components: {
		DateTimePicker,
		Input,
		Button,
	},
	data() {
		return {
			statusSelected: undefined,
			listStatus: [
				{
					status: 'OFF',
					value: 0,
				},
				{
					status: 'LATE',
					value: 1,
				},
			],
			startDate: undefined,
			endDate: undefined,

			startTime: '',
			endTime: '',

			reasonInputValue: '',

			isProjectNameEmpty: true,
			isStartDateEmpty: true,
			isEndDateEmpty: true,
			isStartTimeEmpty: true,
			isEndTimeEmpty: true,
			isReasonEmpty: true,
			isRegistering: false,
			isStartDateBeforeEndDate: false,

			rules: [(value) => value.length > 0 || 'Required.'],
		};
	},

	watch: {
		startTime(newstartTime, oldstartTime) {
			console.log('newstartTime ', newstartTime);
			console.log('oldstartTime ', oldstartTime);
		},
		startDate: {
			immediate: true,
			deep: true,
			handler(newValue) {
				this.startDate = newValue;
				console.log(newValue);
			},
		},
	},
	mounted() {
		this.$eventBus.$emit('show-spinner', true);
		this.$eventBus.$emit('show-spinner', false);
	},
	methods: {
		onInputStartDate(params) {
			if (params === '' || params === null || params === undefined) {
				this.isStartDateEmpty = true;
			} else {
				this.isStartDateEmpty = false;
				this.startDate = moment(params).format(DATE_FORMAT);
			}
		},
		onInputEndDate(params) {
			if (params === '' || params === null || params === undefined) {
				this.isEndDateEmpty = true;
			} else {
				this.isEndDateEmpty = false;
				this.endDate = moment(params).format(DATE_FORMAT);
			}
		},
		onInputStartTime(params) {
			if (params === '' || params === null || params === undefined) {
				this.isStartTimeEmpty = true;
			} else {
				this.isStartTimeEmpty = false;
				this.startTime = params;
			}
		},
		onInputEndTime(params) {
			if (params === '' || params === null || params === undefined) {
				this.isEndTimeEmpty = true;
			} else {
				this.isEndTimeEmpty = false;
				this.endTime = params;
			}
		},
		onInputReason(params) {
			this.reasonInputValue = params;
			console.log(this.reasonInputValue);
			if (
				this.reasonInputValue === '' ||
				this.reasonInputValue === null ||
				this.reasonInputValue === undefined
			) {
				this.isReasonEmpty = true;
			} else {
				this.isReasonEmpty = false;
			}
		},
		async onClickRegisterButton() {
			this.isRegistering = true;
			this.isStartDateBeforeEndDate = false;
			const params = {
				type: this.statusSelected,
				startDate: this.startDate + ' ' + this.startTime,
				endDate: this.endDate + ' ' + this.endTime,
				reason: this.reasonInputValue,
			};
			let startTime = moment(params.startDate, DATE_TIME_FORMAT);
			let endTime = moment(params.endDate, DATE_TIME_FORMAT);
			if (startTime.isAfter(endTime)) {
				this.isStartDateBeforeEndDate = true
			}
			if (
				(!this.statusSelected && this.statusSelected != 0) ||
				this.isStartDateEmpty ||
				this.isEndDateEmpty ||
				this.isStartTimeEmpty ||
				this.isEndTimeEmpty ||
				!params.reason || this.isStartDateBeforeEndDate
			) {
				console.log('1 trong cac field bi thieu');
			} else {
				console.log('params', params);
				this.$eventBus.$emit('show-spinner', true);
				const response = await AbsentService.registerAbsent(params);
				if (!response) {
					this.$router.push('/user/login');
				} else {
					console.log(response);
					alert('Success');
				}
				this.$root.$emit('AbsentRegister');
				this.$eventBus.$emit('show-spinner', false);
			}
		},
		onClickResetButton() {
			this.isRegistering = false
			this.isStartDateBeforeEndDate = false
			this.statusSelected = undefined;
			this.reasonInputValue = '';
			const listItem = document.getElementsByClassName(
				'md-button md-icon-button md-dense md-input-action md-clear md-theme-default'
			);
			for (let index = 0; index < listItem.length; index++) {
				listItem[index].click();
			}
		},

		formatDate(date) {
			if (!date) return null;

			const [year, month, day] = date.split('-');
			return `${month}/${day}/${year}`;
		},
		parseDate(date) {
			if (!date) return null;

			const [month, day, year] = date.split('/');
			return `${year}-${month.padStart(2, '0')}-${day.padStart(
				2,
				'0'
			)}`;
		},
	},
};
