/*eslint-disable*/
import DateTimePicker from '@/components/DateTimePicker/DateTimePicker.vue';
import Input from '@/components/Input/Input.vue';
import Button from '@/components/Button/Button.vue';

import OvertimeRegisterServices from '@/services/API/MyOvertimeAPI/OvertimeRegisterServices';
import moment from 'moment';
import { OT_HISTORY_SCREEN, OT_REGISTER_SCREEN } from '../../../../config/screenName';
import { OVERTIME_CHANNEL } from '../../../../config/channel';

const DATE_TIME_FORMAT = 'YYYY-MM-DD hh:mm:ss';
const DATE_FORMAT = 'YYYY-MM-DD';
const TIME_FORMAT = 'hh:mm:ss';

export default {
	name: 'OvertimeRegister',
	components: {
		DateTimePicker,
		Input,
		Button,
	},
	data() {
		return {
			projectSelected: '',
			listProjects: [],

			date: undefined,

			startTime: '',
			endTime: '',

			reasonInputValue: '',

			isProjectNameEmpty: true,
			isDateEmpty: true,
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
	},
	mounted() {
		this.$eventBus.$emit('show-spinner', true);
		this._getProjects();
		this.$eventBus.$emit('show-spinner', false);
	},
	methods: {
		onSelectProject(params) {
			console.log('params', params);
			if (params === '' || params === null || params === undefined) {
				this.isProjectNameEmpty = true;
			} else {
				this.isProjectNameEmpty = false;
				this.projectSelected = params.project_id;
			}
		},
		onInputDate(params) {
			if (params === '' || params === null || params === undefined) {
				this.isDateEmpty = true;
			} else {
				this.isDateEmpty = false;
				this.date = moment(params).format(DATE_FORMAT);
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
				projectId: this.projectSelected,
				startDate: this.date + ' ' + this.startTime,
				endDate: this.date + ' ' + this.endTime,
				reason: this.reasonInputValue,
			};
			let startTime = moment(params.startDate, DATE_TIME_FORMAT);
			let endTime = moment(params.endDate, DATE_TIME_FORMAT);
			if (startTime.isAfter(endTime)) {
				this.isStartDateBeforeEndDate = true
			}
			if (
				!params.projectId ||
				this.isDateEmpty ||
				this.isStartTimeEmpty ||
				this.isEndTimeEmpty ||
				!params.reason || this.isStartDateBeforeEndDate
			) {
				console.log('1 trong cac field bi thieu');
			} else {
				console.log('params', params);
				this.$eventBus.$emit('show-spinner', true);
				const response =
					await OvertimeRegisterServices.registerOvertime(params);
				if (!response) {
					this.$router.push('/user/login');
				} else {
					console.log(response);
					this.$toast.open({
						message: "Success",
						type: "success",
						duration: 2000,
						dismissible: true,
						position: "top-right",
					})
					this.onClickResetButton();
					this.$root.$emit(OT_HISTORY_SCREEN);
					this.$mySocket.emit(OVERTIME_CHANNEL, 2);
				}
				this.$eventBus.$emit('show-spinner', false);
			}
		},
		onClickResetButton() {
			this.isRegistering = false
			this.isStartDateBeforeEndDate = false
			this.projectSelected = null;
			this.reasonInputValue = '';
			const listItem = document.getElementsByClassName(
				'md-button md-icon-button md-dense md-input-action md-clear md-theme-default'
			);
			for (let index = 0; index < listItem.length; index++) {
				listItem[index].click();
			}
		},

		async _getProjects() {
			const response = await OvertimeRegisterServices.getProjects();
			if (!response) {
				this.$router.push('/user/login');
			} else {
				// console.log('response',response.data);
				this.listProjects.push(...response.data);
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
