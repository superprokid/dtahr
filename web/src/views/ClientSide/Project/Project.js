/* eslint-disable */
import SessionUtls from '@/services/SessionUtls';
import { TAB_TYPE } from '@/config/constant';
import ProjectServices from '../../../services/API/ProjectAPI/ProjectServices';
import tabName from '../../../config/tabname';

export default {
  name: 'TaskSide',
  data() {
    return {
      listProjects: [],
    }
  },
  methods: {
    async getListProjects () {
      const response = await ProjectServices.getListProjects();
      if (!response) {
        this.$router.push('/user/login')
        return;
      }
      if (response == -1) {
        this.$toast.open({
          message: "Something went wrong, please try again",
          type: "error",
          duration: 2000,
          dismissible: true,
          position: "top-right",
        })
        return
      }
      this.listProjects = response.data;
    },
    redirect(item) {
      this.$router.push(`/user/taskside/tasks/${item.project_id}`);
    }
  },
  async mounted() {
    await this.getListProjects();
  },
  //   beforeMount() {
  //     SessionUtls.setItem(SessionUtls.tabTypeKey, TAB_TYPE.TASK);
  //   },
  //   beforeDestroy() {
  //     SessionUtls.setItem(SessionUtls.tabTypeKey, TAB_TYPE.USER);
  //   },
  beforeCreate() {
    SessionUtls.setItem(SessionUtls.tabNameKey, tabName.projectUser);
},
};
