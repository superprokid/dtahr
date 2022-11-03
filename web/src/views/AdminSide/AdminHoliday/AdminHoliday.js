import AddHolidayDate from "../../../components/AddHolidayDate/AddHolidayDate.vue";

import AdminHolidayService from "../../../services/API/AdminHolidayAPI/AdminHoliday.service"

import moment from "moment";

export default {
  name: 'AdminHoliday',

  components: {
    AddHolidayDate
  },

  data() {
    return {
        headers:[
          {
              text: 'Description',
              align: 'start',
              value: 'description',
              // width: 120,
          },
          {
              text: 'Date',
              value: 'date',
              // width: 120,
          },
          {
            text: 'Action',
            value: 'action',
          }
        ],

      holiday: undefined,
      search: '',

      addHolidayModal: false,
    }
  },

  mounted() {
    this.getHoliday();
  },

  filters: {
    formatDate(value) {
      if (value) {
        return moment(value).format('DD/MM/YYYY')
      }
    }
  },

  methods: {

    onCloseModal() {
      this.addHolidayModal = false;
    },

    async getHoliday() {
      const response = await AdminHolidayService.getHoliday();
      if (!response) {
        this.$router.push('/admin/login')
      }
      else {
        this.holiday = response.data;
      }
    },

    async onClickDeleteHoliday(item) { 
      let data = {
        holidayId : item.holiday_id
      };
      const response = await AdminHolidayService.deleteHoliday(data);
      if (!response) {
        this.$router.push('/admin/login')
      }
      else {
        this.getHoliday();
      }
    },

    onSave() {
      this.addHolidayModal = false;
      this.getHoliday();
    }
  }
}