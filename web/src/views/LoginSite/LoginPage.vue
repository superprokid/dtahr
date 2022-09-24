<script src="./LoginPage.js"></script>
<style src="./LoginPage.css"></style>

<template>
  <div class="login-page-container">
    <span />
    <div class="login-page-contents">
      <Login
        :logoPath="logoPath"
        @login="login"
      />
    </div>
  </div>
</template>
