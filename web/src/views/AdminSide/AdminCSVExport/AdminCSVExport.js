/* eslint-disable */
import SessionUtls from "../../../services/SessionUtls"
import tabName from '../../../config/tabname';


export default {
	name: 'AdminCSVExport',
	components:{
	},

	data() {
		return {
			csvSelect: 0,
			monthSelect: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
				.toISOString()
				.substr(0, 10),
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
				},
				{
					name: 'Holiday',
					value: 3,
				},
			],
		};
	},
	methods: {
		allowedMonths(value) {
			const date = new Date(value);
			return date <= new Date();
		},
		exportCSV() { },
	},

	beforeCreate() { 
		SessionUtls.setItem(SessionUtls.tabNameKey, tabName.csvAdmin);
	},
};
