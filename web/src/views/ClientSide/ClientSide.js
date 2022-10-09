/* eslint-disable */
import Drawer from '../../components/Drawer/Drawer.vue';
import Header from '../../components/Header/Header.vue';

import MyPageServices from '@/services/API/MyPageAPI/MyPageServices';
import SessionUtls from '@/services/SessionUtls';

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
          SessionUtls.setItem(SessionUtls.role,response.data.role)
      }
    },
  }
};
