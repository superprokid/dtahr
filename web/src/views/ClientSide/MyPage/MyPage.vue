<template>
  <div class="employee-site-container">
    <TabNav :tabItems="tabItems" />
    <!--<div class="user-menu-container">
       <label class="user-layout">{{ currentUserName }}</label>
      <div class="user-menu-items">
        <Button
          :buttonTitle="'LOG OUT'"
          :buttonClass="'md-raised md-accent log-out-button'"
          @on-click="onClickLogOutButton"
        />
      </div>
    </div> -->
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

<script src="./MyPage.js">
</script>

<style src="./MyPage.css">
</style>