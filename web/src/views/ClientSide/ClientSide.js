/* eslint-disable */
import Drawer from '../../components/Drawer/Drawer.vue';
import Header from '../../components/Header/Header.vue';

import MyPageServices from '@/services/API/MyPageAPI/MyPageServices';
import SessionUtls from '@/services/SessionUtls';
import CookieUtls from '../../services/CookieUtls';

export default {
  name: 'ClientSide',
  components: { Drawer, Header },
  async created() {
    await this._getStartUser()
  },
  methods: {
    async _getStartUser() {
      const response = await MyPageServices.getStartUser();
      if(!response){
          this.$router.push('/user/login')
      } else {
          console.log(response.data)
          //Use Vuex set Data
          this.$store.commit("setStartDataUser", response.data)
          CookieUtls.setCookie(CookieUtls.role, response.data.role);
          CookieUtls.setCookie(CookieUtls.employeeId, response.data.employee_id);
      }
    },
  }
};
