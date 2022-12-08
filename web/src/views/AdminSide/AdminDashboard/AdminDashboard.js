/* eslint-disable */
import SessionUtls from '../../../services/SessionUtls';
import tabName from '../../../config/tabname';

import { getDateString, getTimeString, getAvatar, getDateStringWithTask, isPastDate } from "../../../services/utilities";
import AdminDashboardServices from "../../../services/API/AdminDashboardAPI/AdminDashboardServices"
import AdminCSVServices from '../../../services/API/CSVExportAPI/CSVExport.services';
import { ADMIN_DASHBOARD_SCREEN } from '../../../config/screenName';

export default {
	name: 'AdminDashboard',
	components: {
	},
	data() {
		return {
			value: 60,

			activities: [
				{
					avt: '',
					title: 'Le Duc Thang',
					subtitle: 'Developer',
					time: '',
				},
				{
					avt: '',
					title: 'Le Duc Thang',
					subtitle: 'Manager',
					time: '',
				},
				{
					avt: '',
					title: 'Le Duc Thang',
					subtitle: 'Tester',
					time: '',
				},
			],

			checkinPercentage: 0,
			checkoutPercentage: 0,
			notworkingPercentage: 0,

			workingStatus: {
				checkin: 0,
				checkout: 0,
				notWorking: 0,
				total: 1,
			},

			workingActivities: [],
			activityStatus: ['Checkin at', 'Checkout at'],

			workingTimeAndHoliday: {},

			workingTime: {},
			holiday: [],
			projectStatus: [],

			csvSelect: 0,
			monthSelect: new Date(
				Date.now() - new Date().getTimezoneOffset() * 60000
			)
				.toISOString()
				.substr(0, 10).slice(0, 7),
			csvOption: [
				{
					name: 'Salary',
					value: 0,
				},
				{
					name: 'Overtime',
					value: 1,
				},
				{
					name: 'Absent',
					value: 2,
				}
			],
			loading: false,
		};
	},
	computed: {
		isDateValid() {
			let date = new Date(this.monthSelect);
			if (this.csvSelect != 0) {
				return date <= new Date();
			} else {
				date = date.setMonth(date.getMonth() + 1);
				return date <= new Date();
			}
		}
	},
	async mounted() {
		this.$eventBus.$emit('show-spinner', true);
		const workingStatus = await this.getWorkingStatus()

		this.checkinPercentage = Math.floor((workingStatus?.checkin / workingStatus?.total)*100)
		this.checkoutPercentage = Math.floor((workingStatus?.checkout / workingStatus?.total)*100)
		this.notworkingPercentage = Math.floor((workingStatus?.notWorking / workingStatus?.total)*100)

		await this.getWorkingActivity()
		await this.getWorkingTimeAndHoliday()
		await this.getProjectStatus()
		this.$eventBus.$emit('show-spinner', false);

		this.$root.$on(ADMIN_DASHBOARD_SCREEN, async () => {
			this.$eventBus.$emit('show-spinner', true);
			const workingStatus = await this.getWorkingStatus();
			this.checkinPercentage = Math.floor((workingStatus?.checkin / workingStatus?.total) * 100)
			this.checkoutPercentage = Math.floor((workingStatus?.checkout / workingStatus?.total) * 100)
			this.notworkingPercentage = Math.floor((workingStatus?.notWorking / workingStatus?.total) * 100)
			await this.getWorkingActivity()
			this.$eventBus.$emit('show-spinner', false);
        })
	},

	methods: {
		getAvatar,
		async getWorkingStatus(){
			const response = await AdminDashboardServices.adminGetWorkingStatus()
            if (!response) {
                this.$router.push('/admin/login');
                return;
            }else if(response == -1){
                this.$toast.open({
                    message: "Get Working Status Fail",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })
                return
            }
			this.workingStatus = response.data
			return this.workingStatus
		},
		async getWorkingActivity(){
			const response = await AdminDashboardServices.adminGetWorkingActivity()
            if (!response) {
                this.$router.push('/admin/login');
                return;
            }else if(response == -1){
                this.$toast.open({
                    message: "Get Working Activity Fail",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })
                return
            }
			this.workingActivities = response.data.map((item) => {
				return {...item,  time: this.activityStatus[item.work_status] + ' ' + getTimeString(item.update_at) }
			})
			return this.workingActivities
		},
		async getWorkingTimeAndHoliday(){
			const response = await AdminDashboardServices.adminGetWorkingTimeAndHoliday()
            if (!response) {
                this.$router.push('/admin/login');
                return;
            }else if(response == -1){
                this.$toast.open({
                    message: "Get Working Time and Holiday Fail",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })
                return
            }
			this.holiday = response.data.holiday
			this.workingTime = response.data.workingTime
		},
		formatTime(hour, minute){
			const a = '00' + hour
			const b = '00' + minute
			return `${a.slice(-2)}:${b.slice(-2)}`
		},
		getDateString,

		async getProjectStatus(){
			const response = await AdminDashboardServices.adminGetProjectStatus()
            if (!response) {
                this.$router.push('/admin/login');
                return;
            }else if(response == -1){
                this.$toast.open({
                    message: "Get Project Status Fail",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })
                return
            }
			this.projectStatus = response.data.map((item) => {
				let openPercentage = Math.floor((item.open/item.total)*100)
				let inProgressPercentage = Math.floor((item.inProgress/item.total)*100)
				let resolvedPercentage = Math.floor((item.resolved/item.total)*100)
				let closedPercentage = Math.floor((item.closed/item.total)*100)
				if(openPercentage && !isNaN(openPercentage)){
					openPercentage = 100 - (inProgressPercentage + resolvedPercentage + closedPercentage)
				}else if(inProgressPercentage && !isNaN(inProgressPercentage)){
					inProgressPercentage = 100 - (openPercentage + resolvedPercentage + closedPercentage)
				}else if(resolvedPercentage && !isNaN(resolvedPercentage)){
					resolvedPercentage = 100 - (openPercentage + inProgressPercentage + closedPercentage)
				}else if(closedPercentage && !isNaN(closedPercentage)){
					closedPercentage = 100 - (openPercentage + resolvedPercentage + inProgressPercentage)
				}

				return {...item, openPercentage, inProgressPercentage, resolvedPercentage, closedPercentage}
			})


			return response.data
		},

		onClickProjectStatus(item){
			this.$router.push(`/admin/projectdetail/${item.project_id}`)
		},

		allowedMonths(value) {
			let date = new Date(value);
			if (this.csvSelect != 0) {
				return date <= new Date();
			} else {
				date = date.setMonth(date.getMonth() + 1);
				return date <= new Date();
			}
		},
		async exportCSV() {
			this.loading = true;
			let response = {};
			if (this.csvSelect == 0 && this.allowedMonths(this.monthSelect)) {
				response = await AdminCSVServices.exportSalaryCSV({
					month: this.monthSelect.split('-')[1],
					year: this.monthSelect.split('-')[0],
				});
				if (response == -1) {
					this.$toast.open({
						message: 'No salary in this month',
						type: 'error',
						duration: 2000,
						dismissible: true,
						position: 'top-right',
					});
					this.loading = false;
					return
				}
			}
			else if (this.csvSelect == 1) {
				response = await AdminCSVServices.exportOvertimeCSV({
					date: this.monthSelect + '-01',
				});
				if (response == -1) {
					this.$toast.open({
						message: 'No overtime this month',
						type: 'error',
						duration: 2000,
						dismissible: true,
						position: 'top-right',
					});
					this.loading = false;
					return
				}
			}
			else {
				response = await AdminCSVServices.exportLeaveCSV({
					date: this.monthSelect + '-01',
				});
				if (response == -1) {
					this.$toast.open({
						message: 'No absent this month',
						type: 'error',
						duration: 2000,
						dismissible: true,
						position: 'top-right',
					});
					this.loading = false;
					return
				}
			}
			if (!response) {
				this.$router.push('/admin/login');
			}
			let name = `${this.csvOption[this.csvSelect].name
				}-${this.monthSelect}.xlsx`;
			if (window.navigator.msSaveBlob) {
				window.navigator.msSaveBlob(response.data, name);
			} else {
				let url = window.URL.createObjectURL(response.data);
				let a = document.createElement('a');
				a.href = url;
				a.download = name;
				a.target = '_blank';
				a.click();
			}
			this.loading = false;
		},

	},

	beforeCreate() {
		SessionUtls.setItem(SessionUtls.tabNameKey, tabName.homeAdmin);
	},
};
