/* eslint-disable */ 
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
                    alert("register failed");
                } else {
                    alert("register success");         
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
