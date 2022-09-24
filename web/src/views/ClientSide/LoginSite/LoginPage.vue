<script src="./LoginPage.js"></script>
<style src="./LoginPage.css"></style>

<template>
  <div class="login-page-container">
    <div class="notification-modal">
      <Notification
        :notiHeaderBgColor="notiHeaderBgColor"
        :notiTitle="notiTitle"
        :notiBody="notiBody"
        :okButtonOnly="true"
        :onClickOkButton="onClickOkButton"
        :isModalShowed="isUserConfirmModelShowed"
      />
    </div>
    <span />
    <div class="login-page-contents">
      <Login
        :logoPath="logoPath"
        @login="login"
        :isLoginDataEmpty="isLoginDataEmpty"
      />
    </div>
  </div>
</template>
