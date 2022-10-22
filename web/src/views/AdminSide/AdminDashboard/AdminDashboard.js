
import SessionUtls from '../../../services/SessionUtls';
import tabName from '../../../config/tabname';

export default {
  name: 'AdminDashboard',
  data() {
    return {
      
    };
  },

  components: {

  },

  async created() {

  },

  methods: {
    
  },

  beforeCreate() {
    SessionUtls.setItem(SessionUtls.tabNameKey, tabName.homeAdmin);
  },
};
