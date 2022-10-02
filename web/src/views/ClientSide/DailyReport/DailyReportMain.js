import TabNav from '@/components/TabNav/TabNav.vue';
import DailyReportRegister from '@/views/ClientSide/DailyReport/DailyReportRegister/DailyReportRegister.vue';
import MyReport from '@/views/ClientSide/DailyReport/MyReport/MyReport.vue';
import ReportReceive from '@/views/ClientSide/DailyReport/ReportReceive/ReportReceive.vue';
import io from "socket.io-client";

export default {
    name: 'DalyReport',
    data() {
      return {
        tabData: {},
      };
    },
  
    components: {
      TabNav,
    },

    mounted() {
      io('http://localhost:3000');
    },
  
    async created() {
      this.tabItems = [
        {
          tabName:  'Daily Report Register',
          tabContent: DailyReportRegister,
        },
        {
          tabName: 'My Report',
          tabContent: MyReport,
        },
        {
          tabName: 'Daily Report Receive',
          tabContent: ReportReceive,
        }
      ]
    },
  
    methods: {
      join() {
        console.log("hahahihis");
      }
    },
  };