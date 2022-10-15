<template>

  <!-- <router-view></router-view> -->
  <v-app>
  <Navbar/>
    <v-content class="ma-4">
      <router-view></router-view>
    </v-content>
     <Footer/>
  </v-app>
</template>


<script>

import Navbar from '@/components/Navbar'

export default {
  name: 'AdminSide',
  components: {
   Navbar,
  },
};
</script>

<style>
</style>