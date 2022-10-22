<template>
  <!-- <router-view></router-view> -->
  <v-app>
    <Navbar />
    <!-- <v-content class="ma-4">
      <router-view></router-view>
    </v-content> -->
    <v-main class="ma-4" >
      <router-view></router-view>
    </v-main>
    <!-- <Footer /> -->
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
// import Footer from '@/components/Footer'

import AdminSideServices from '@/services/API/AdminSideAPI/AdminSideServices';

export default {
  name: 'AdminSide',
  components: {
    Navbar,
    // Footer
  },
  async created() {
    await this._getStartAdmin()
  },
  methods: {
    async _getStartAdmin() {
      const response = await AdminSideServices.getStartAdmin();
      console.log('response',response);
      if(!response){
          this.$router.push('/admin/login')
      } else if(response == -1){
        alert('Some thing wrong! Call Fail')
      }
      else {
          console.log(response.data)
          //Use Vuex set Data
          this.$store.commit("setStartDataAdmin", response.data)
      }
    },
  }
};
</script>

<style>

</style>