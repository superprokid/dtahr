<template>
    
    <div class="employee-site-container">
    <v-app>
        <TabNav v-if="tabItems" :tabItems="tabItems" :tabData="tabData"/>
    </v-app>
    
    <Notification
      :notiHeaderBgColor="notiType"
      :notiTitle="logOutNotiTitle"
      :notiBody="logOutNotiBody"
      :okButtonOnly="false"
      :onClickOkButton="onClickOkButton"
      :onClickCancelButton="onClickCancelButton"
      :isModalShowed="isLogOutModalShowed"
    />
  </div>

</template>

<script src="./MyOvertime.js"></script>
<style scoped src="./MyOvertime.css"></style>