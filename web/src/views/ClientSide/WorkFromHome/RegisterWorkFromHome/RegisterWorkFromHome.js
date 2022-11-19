/* eslint-disable */ 
import moment from "moment";
import { WFH_CHANNEL } from "../../../../config/channel";
import WorkFromHomeServices from "../../../../services/API/WorkFromHomeAPI/WorkFromHomeServices";

export default {
  name: 'RegisterWorkFromHome',
  data() {
    return {
        dates: [],
        menu: false,


        startTime: null,
        startTimeMenu: false,

        endTime: null,
        endTimeMenu: false,

        valid: true,

        titleWorkFromHome: '',
        titleWorkFromHomeRules: [
            v => !!v || 'Title is required',
            v => (v && v.length <= 100) || 'Group Name must be less than 100 characters',
        ],  
        description: '',

    };
  },
  components: {
  },
  async created() {
    
  },

  methods: {
    allowedDates(date) {
        const currDate = new Date(date);
        if((currDate.getDay() == 0 || currDate.getDay() == 6) || moment().isSameOrAfter(currDate)){
            return false
        }
        return true
    },
    async onClickRegisterWorkFromHome(){
        if(this.$refs.form.validate()){
            const params = {
                title: this.titleWorkFromHome,
                date: this.dates,
                startTime: this.startTime,
                endTime: this.endTime
            }
            if(this.description !== ''){
                params.description = this.description
            }
            console.log('params', params);
            this.$eventBus.$emit("show-spinner", true);
            const response = await WorkFromHomeServices.registerWorkFromHome(params);
            this.$eventBus.$emit("show-spinner", false);
            if (!response) {
                this.$router.push('/user/login');
            } else {
                if (response == -1) {
                    this.$toast.open({
                        message: "Something went wrong, please try later",
                        type: "error",
                        duration: 2000,
                        dismissible: true,
                        position: "top-right",
                    })
                } else {
                    this.$toast.open({
                        message: "Register success",
                        type: "success",
                        duration: 2000,
                        dismissible: true,
                        position: "top-right",
                    })   
                    this.$mySocket.emit(WFH_CHANNEL, 0);
                }
            }
        }
    },
    reset () {
        this.$refs.form.reset()
    },
    requiredDate(value) {
        if (value instanceof Array && value.length == 0) {
          return 'Date is Required.';
        }
        return !!value || 'Date is Required.';
    },
    requiredStartTime(value){
        return !!value || 'Start Time is Required.';
    },
    requiredEndTime(value){
        return !!value || 'End Time is Required.';
    }
  },

};
