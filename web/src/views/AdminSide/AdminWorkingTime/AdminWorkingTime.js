import Input from '@/components/Input/Input.vue';
import SessionUtls from "../../../services/SessionUtls"
import tabName from '../../../config/tabname';

import AdminWorkTimeService from '../../../services/API/AdminWorkTimeAPI/worktime.service';

import moment from 'moment';
export default {
	name: 'AdminWorkingTime',
	components: {
		Input,
	},
	data() {
		return {
			workTimeList: [],
			search: '',

      startTimeAdd: '',
      endTimeAdd: '',
      lunchStartTimeAdd: '',
      lunchEndTimeAdd: '',

			startTimeMenuAdd: false,
			endTimeMenuAdd: false,
			lunchStartTimeMenuAdd: false,
			lunchEndTimeMenuAdd: false,
      approveDate: moment().format('YYYY-MM-DD'),

			selected: {},
			showUpdateDialog: false,

      showAddDialog: false,

			startTimeMenu: false,
			endTimeMenu: false,
			lunchStartTimeMenu: false,
			lunchEndTimeMenu: false,

			workTimeHeaders: [
				{
					text: 'Work Time Id',
					align: 'start',
					value: 'worktime_id',
				},
				{
					text: 'Approved Date',
					value: 'approve_date',
				},
				{
					text: 'Working Hour',
					value: 'working_hour',
				},
				{
					text: 'Lunch Hour',
					value: 'lunch_hour',
				},
				{
					text: 'Actions',
					value: 'actions',
				},
			],
		};
	},
	filters: {
		formatDate(date) {
			return moment(date).format('DD/MM/YYYY');
		},
		filterTime(value) {
			if (!value && value != 0) return '';
			if (value.toString().length == 1) {
				return '0' + value;
			}
			return value;
		},
	},
	computed: {
		noFutureWorkTime() {
			let today = moment();
			let check = false;
			for (let i = 0; i < this.workTimeList.length; i++) {
				if (moment(this.workTimeList[i].approve_date) > today) {
					check = true;
				}
			}
			return check;
		},
		startTime: {
			get() {
				return (
					this.selected.hour_start +
					':' +
					this.$options.filters.filterTime(this.selected.min_start)
				);
			},
			set(value) {
				let time = value.split(':');
				this.selected.hour_start = parseInt(time[0]);
				this.selected.min_start = parseInt(time[1]);
			},
		},
		endTime: {
			get() {
				return (
					this.selected.hour_end +
					':' +
					this.$options.filters.filterTime(this.selected.min_end)
				);
			},
			set(value) {
				let time = value.split(':');
				this.selected.hour_end = parseInt(time[0]);
				this.selected.min_end = parseInt(time[1]);
			},
		},
		lunchStartTime: {
			get() {
				return (
					this.selected.lunch_hour_start +
					':' +
					this.$options.filters.filterTime(
						this.selected.lunch_min_start
					)
				);
			},
			set(value) {
				let time = value.split(':');
				this.selected.lunch_hour_start = parseInt(time[0]);
				this.selected.lunch_min_start = parseInt(time[1]);
			},
		},
		lunchEndTime: {
			get() {
				return (
					this.selected.lunch_hour_end +
					':' +
					this.$options.filters.filterTime(this.selected.lunch_min_end)
				);
			},
			set(value) {
				let time = value.split(':');
				this.selected.lunch_hour_end = parseInt(time[0]);
				this.selected.lunch_min_end = parseInt(time[1]);
			},
    },
    selectedApproveDate: {
      get() {
        return moment(this.selected.approve_date).format('YYYY-MM-DD');
      },
      set(value) {
        this.selected.approve_date = value;
      }
    }
	},
	methods: {
		isBeforeToday(date) {
			let today = new Date();
			return new Date(date) < today && !this.isActive({approve_date: date});
		},
		isAfterToday(date) {
			let today = new Date();
			return new Date(date) >= today && !this.isActive({approve_date: date});
		},
		onCloseEditModal() {
			this.showUpdateDialog = false;
    },
    onCloseAddModal() {
      this.startTimeAdd = '',
      this.endTimeAdd = '',
      this.lunchStartTimeAdd = '',
      this.lunchEndTimeAdd = '',
      this.approveDate = moment().format('YYYY-MM-DD'),  
      this.showAddDialog = false;
    },
		isActive(time) {
			let today = new Date();
			let approveDate = new Date(time.approve_date);
			// Check if this.workTimeList approve date is before today
      if (approveDate > today) {
        return false;
      }
      for (let i = 0; i < this.workTimeList.length; i++) {
        let date = new Date(this.workTimeList[i].approve_date);
				if (
          date < today &&
          date > approveDate
				) {
					return false;
        }
			}
			return true;
		},
		async getAllWorkTime() {
			let response = await AdminWorkTimeService.getAllWorkTime();
			if (!response) {
				this.$router.push({ name: 'AdminLogin' });
			}
			this.workTimeList = response.data;
		},
		updateWorkTime(worktime) {
			this.selected = worktime;
			this.showUpdateDialog = true;
			document.activeElement.blur();
    },
    onClickCreateWorkingTime() {
      this.showAddDialog = true;
    },
    async onSaveEdit() {
      let params = {
        workTimeId: this.selected.worktime_id,
        approveDate: this.selected.approve_date,
        hourStart: this.selected.hour_start,
        minStart: this.selected.min_start,
        hourEnd: this.selected.hour_end,
        minEnd: this.selected.min_end,
        lunchHourStart: this.selected.lunch_hour_start,
        lunchMinStart: this.selected.lunch_min_start,
        lunchHourEnd: this.selected.lunch_hour_end,
        lunchMinEnd: this.selected.lunch_min_end,
      }
      let response = await AdminWorkTimeService.updateWorkTime(params);
      if (!response) {
        this.$router.push({ name: 'AdminLogin' });
      }
      this.showUpdateDialog = false;
      this.getAllWorkTime();
    },
    async onSaveAdd() {
      let params = {
        approveDate: this.approveDate,
        hourStart: parseInt(this.startTimeAdd.split(':')[0]),
        minStart: parseInt(this.startTimeAdd.split(':')[1]),
        hourEnd: parseInt(this.endTimeAdd.split(':')[0]),
        minEnd: parseInt(this.endTimeAdd.split(':')[1]),
        lunchHourStart: parseInt(this.lunchStartTimeAdd.split(':')[0]),
        lunchMinStart: parseInt(this.lunchStartTimeAdd.split(':')[1]),
        lunchHourEnd: parseInt(this.lunchEndTimeAdd.split(':')[0]),
        lunchMinEnd: parseInt(this.lunchEndTimeAdd.split(':')[1]),
      }
      let reponse = await AdminWorkTimeService.createWorkTime(params);
      if (!reponse) {
        this.$router.push({ name: 'AdminLogin' });
      }
      this.onCloseAddModal();
      this.getAllWorkTime();
    },
		async deleteWorkTime(worktime_id) {
      let response = await AdminWorkTimeService.deleteWorkTime({
        workTimeId: worktime_id
      });
      if (!response) {
        this.$router.push({ name: 'AdminLogin' });
      }
      this.getAllWorkTime();
		},
	},
	mounted() {
		this.getAllWorkTime();
	},

	beforeCreate() {
		SessionUtls.setItem(SessionUtls.tabNameKey, tabName.workingTimeAdmin);
	},
};
