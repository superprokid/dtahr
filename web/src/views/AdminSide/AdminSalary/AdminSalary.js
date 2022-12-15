/* eslint-disable */
import SessionUtls from '../../../services/SessionUtls';
import tabName from '../../../config/tabname';

import { getDateString, getTimeString, getAvatar, getDateStringWithTask, isPastDate, getDateStringWithFormat, getMoneyFromString } from "../../../services/utilities";
import SalaryAdminServices from "../../../services/API/SalaryAdminAPI/SalaryAdminServices"
import AdminUserDetailServices from "../../../services/API/AdminUserDetailAPI/AdminUserDetailServices"
import AdminCSVServices from '../../../services/API/CSVExportAPI/CSVExport.services';
import { ADMIN_DASHBOARD_SCREEN } from '../../../config/screenName';

import moment from 'moment';

const TODAY = new Date()

export default {
    name: 'AdminSalary',
    components: {
    },
    data() {
        return {
            monthPicker: false,
            monthSelect: getDateStringWithFormat(moment().add(-1, 'M'), 'YYYY-MM'),

            search: '',
            userSelected: [],
            headers: [
                {
                    text: 'Employee ID',
                    align: 'start',
                    value: 'employee_id',
                    width: 120,
                },
                {
                    text: 'Full Name',
                    value: 'full_name',
                    width: 250,
                },
                {
                    text: 'Group',
                    value: 'group_name',
                    width: 120,
                },
                {
                    text: "Total Salary",
                    value: 'salary_total',
                    width: 120,
                },
                {
                    text: "Salary (hour)",
                    value: 'salary_hour',
                    width: 120,
                },
                {
                    text: "Total Working Time (hour)",
                    value: 'work_total_hours',
                    width: 120,
                },
                {
                    text: "Basic Salary",
                    value: 'salary_basic',
                    width: 120,
                },
                {
                    text: "House Support",
                    value: 'house_support',
                    width: 120,
                },
                {
                    text: "Lunch Support",
                    value: 'lunch_support',
                    width: 120,
                },
                {
                    text: "Transport Support",
                    value: 'transport_support',
                    width: 120,
                },
                {
                    text: "Internet Support",
                    value: 'internet_support',
                    width: 120,
                },
                {
                    text: "Phone Support",
                    value: 'phone_support',
                    width: 120,
                },
                {
                    text: "Insurance",
                    value: 'insurance',
                    width: 120,
                },
                {
                    text: "Tax",
                    value: 'tax',
                    width: 120,
                },
                {
                    text: "Overtime Payment",
                    value: 'overtime_payment_total',
                    width: 120,
                },
                {
                    text: "Bonus Reward",
                    value: 'bonus_reward',
                    width: 120,
                },
                {
                    text: "Current Salary (hour)",
                    value: 'current_salary',
                    width: 120,
                },
                {
                    text: "Bank name",
                    value: 'bank_name',
                    width: 200,
                },
                {
                    text: "Bank account",
                    value: 'bank_account',
                    width: 250,
                },
            ],
            listUser: [],
            singleSelect: false,

            salaryDialogShowed: false,
            validSalary: true,
            overtimePayment: 0,
            bonusReward: 0,

            salaryInfoDialogShowed: false,
            validSalaryInfo: true,
            bankName: '',
            bankAccount: '',
            salaryPerHour: 0,


        };
    },
    computed: {

    },
    async mounted() {
        this.$eventBus.$emit('show-spinner', true);
        await this.getSalary()
        this.$eventBus.$emit('show-spinner', false);
    },

    methods: {
        getAvatar,
        setItemRowCLass() {
            return 'item-row'
        },
        filterOnlyCapsText(value, search, item) {
            item - 1;
            return value != null &&
                search != null &&
                typeof value === 'string' &&
                value.toString().toLocaleUpperCase().indexOf(search.toLocaleUpperCase()) !== -1
        },
        allowedMonths(value) {
            let date = new Date(value);
            date = date.setMonth(date.getMonth() + 1);
            return date <= new Date();
        },

        async onSelectMonth(value) {
            await this.getSalary()
        },

        async getSalary() {
            const arrays = this.monthSelect.split("-")
            const params = {
                month: arrays[1],
                year: arrays[0]
            }
            const response = await SalaryAdminServices.adminGetSalaryByMonth(params)
            if (!response) {
                this.$router.push('/admin/login')
                return
            } else if (response == -1) {
                this.$toast.open({
                    message: "Get Salary Fail",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })
                return
            }

            this.listUser = response.data.map((item) => {
                return item
            })
            return this.listUser
        },

        onClickEditSalary() {
            this.overtimePayment = getMoneyFromString(this.userSelected[0].overtime_payment_total)
            this.bonusReward = getMoneyFromString(this.userSelected[0].bonus_reward)
            this.salaryDialogShowed = true
        },

        async onChangeSalary() {
            if (this.$refs.formSalary.validate()) {
                const monthArray = this.monthSelect.split("-")
                const params = {
                    employeeId: this.userSelected[0].employee_id,
                    month: monthArray[1],
                    year: monthArray[0],
                    bonusReward: Number(this.bonusReward),
                    overtimePayment: Number(this.overtimePayment)
                }
                const response = await SalaryAdminServices.adminChangeSalary(params)
                this.userSelected = []
                if (!response) {
                    this.$router.push('/admin/login');
                    return;
                } else if (response == -1) {
                    this.$toast.open({
                        message: "Change Salary Fail",
                        type: "error",
                        duration: 2000,
                        dismissible: true,
                        position: "top-right",
                    })
                    return
                }
                this.$toast.open({
                    message: "Change Salary Success",
                    type: "success",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })
                await this.getSalary()
                this.salaryDialogShowed = false
            }
        },

        onClickSalaryInfo() {
            this.bankName = this.userSelected[0].bank_name
            this.bankAccount = this.userSelected[0].bank_account
            this.salaryPerHour = getMoneyFromString(this.userSelected[0].current_salary)
            this.salaryInfoDialogShowed = true
        },

        async onChangeSalaryInfo() {
            const params = {
                employeeId: this.userSelected[0].employee_id,
                salary: this.salaryPerHour,
                bankAccount: this.bankAccount,
                bankName: this.bankName,
            }
            const response = await AdminUserDetailServices.adminUpdatePersonalUserInfo(params)
            this.userSelected = []
            if (!response) {
                this.$router.push('/admin/login');
                return;
            } else if (response == -1) {
                this.$toast.open({
                    message: "Change Salary Fail",
                    type: "error",
                    duration: 2000,
                    dismissible: true,
                    position: "top-right",
                })
                return
            }
            this.$toast.open({
                message: "Change Salary Success",
                type: "success",
                duration: 2000,
                dismissible: true,
                position: "top-right",
            })
            await this.getSalary()
            this.salaryInfoDialogShowed = false
        },

        async downloadSalary() {
            this.$eventBus.$emit('show-spinner', true);
            const monthArray = this.monthSelect.split("-")
            const response = await AdminCSVServices.exportSalaryCSV({
                month: monthArray[1],
                year: monthArray[0],
            });
            this.$eventBus.$emit('show-spinner', false);
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
            };
            let name = `Salary-${this.monthSelect}.xlsx`;
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
        }

    },

    beforeCreate() {
        SessionUtls.setItem(SessionUtls.tabNameKey, tabName.salaryAdmin);
    },
};
