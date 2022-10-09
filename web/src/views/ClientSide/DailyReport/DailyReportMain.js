import TabNav from '@/components/TabNav/TabNav.vue';
import DailyReportRegister from '@/views/ClientSide/DailyReport/DailyReportRegister/DailyReportRegister.vue';
import MyReport from '@/views/ClientSide/DailyReport/MyReport/MyReport.vue';
import ReportReceive from '@/views/ClientSide/DailyReport/ReportReceive/ReportReceive.vue';

export default {
    name: 'DalyReport',
    data() {
      return {
        tabData: {},
        socket: null,
      };
    },
  
    components: {
      TabNav,
    },

    mounted() {

    },
    beforeDestroy() {
      
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
      sendMessage() {
        this.socket.emit('report','test message');
      }
    },
  };