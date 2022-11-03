import moment from "moment";
import AdminHolidayService from "../../services/API/AdminHolidayAPI/AdminHoliday.service";
export default {
  name: 'AddHolidayDate',
  data() {
    return {
      date: undefined,
      description: undefined,
      saving: false,
    }
  },

  methods: {
    onClose() {
      this.$emit('on-close');
    },
    async onSave() {

      this.saving = true;
      if (!this.date || !this.description) return
  
      let data = {
        date: moment(this.date).format('YYYY-MM-DD'),
        description: this.description,
      }

      const response = await AdminHolidayService.createHoliday(data);
      console.log(response)
      if (!response) {
        this.$router.push('/admin/login')
      }
      else {
        this.$emit('on-save');
      }
    }
  }
}