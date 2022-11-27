import AdminCSVServices from '../../../services/API/CSVExportAPI/CSVExport.services';

export default {
	name: 'AdminCSVExport',
	data() {
		return {
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
  computed:{
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
	methods: {
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
          date: this.monthSelect+'-01',
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
          date: this.monthSelect+'-01',
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
      let name = `${
        this.csvOption[this.csvSelect].name
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
};
