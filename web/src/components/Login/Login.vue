<script src="./Login.js"></script>
<style src="./Login.css"></style>

<template>
  <div class="login-container">
    <DTALogo />
    <md-field md-clearable v-if="usernameText">
      <label>Username</label>
      <md-input id="username" v-model="userName"></md-input>
    </md-field>
    <md-field md-clearable v-else>
      <label>Email</label>
      <md-input id="username" v-model="userName"></md-input>
    </md-field>

    <md-field>
      <label>Password</label>
      <md-input id="password" v-model="password" type="password"></md-input>
    </md-field>

    <div class="error-label">
      <span v-show="isLoginDataEmpty">
        *User Name or Password must not be empty
      </span>
    </div>
    <div class="button-login d-flex justify-content-center ">
      <md-button class="md-raised md-primary" @click="login">
        Login
      </md-button>
    </div>
  </div>
</template>
