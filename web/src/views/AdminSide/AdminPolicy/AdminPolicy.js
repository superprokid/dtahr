import AdminPolicyService from "../../../services/API/PolicyAPI/PolicyAPI.service"

export default {
  name: 'AdminPolicy',
  data() {
    return {
      policy: {},
      editMode: 0,
    }
  },
  methods: {
    formatAllowance(value) {
      // Add , every 3 number
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    async getPolicy() {
      let response = await AdminPolicyService.getPolicy()
      if (!response) {
        this.$router.push({ name: "AdminLoginPage" })
      }
      this.policy = response.data
    },
    async onUpdatePolicy() {
      let param = {}
      if (this.editMode == 1) {
        param = {
          type: this.editMode,
          data: {
            ot_payment_daily_day: this.policy.otPayment.ot_payment_daily_day,
            ot_payment_daily_night: this.policy.otPayment.ot_payment_daily_night,
            ot_payment_holiday: this.policy.otPayment.ot_payment_holiday,
            ot_payment_weekend: this.policy.otPayment.ot_payment_weekend,
          }
        }
      }
      else if (this.editMode == 2) {
        param = {
          type: this.editMode,
          data: {
            house: this.policy.allowance.house,
            internet: this.policy.allowance.internet,
            phone: this.policy.allowance.phone,
            lunch: this.policy.allowance.lunch,
            transport: this.policy.allowance.transport,
            tax: this.policy.allowance.tax,
            insurance: this.policy.allowance.insurance,
          }
        }
      }
      else if (this.editMode == 3) {
        param = {
          type: this.editMode,
          data: {
            increase_paid_leave_month: this.policy.increase_paid_leave_month,
          }
        }
      }
      let response = await AdminPolicyService.updatePolicy(param)
      if (!response) {
        this.$router.push({ name: "AdminLoginPage" })
      }
      this.$toast.open({
        message: "Success Update Policy",
        type: "success",
        duration: 2000,
        dismissible: true,
        position: "top-right",
      })
      this.editMode = 0
      this.getPolicy()
    },
  },
  mounted() {
    this.getPolicy()
  }
}