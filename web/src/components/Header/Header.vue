<template>
    <div id="header" class="d-flex flex-row justify-content-between">
        <div>
            <h3>HRM</h3>
        </div>
        <div class="d-flex flex-row align-center ">
            <v-icon large color="green darken-2">
                mdi-account-circle
            </v-icon>
            <md-menu md-size="medium" md-align-trigger>
                <md-button md-menu-trigger class="user-name">{{startDataUser.first_name + " " +startDataUser.last_name}}</md-button>
                <md-menu-content>
                    <md-menu-item @click="redirect('mypage')">Setting profile</md-menu-item>
                    <md-menu-item @click="redirect('mypage')">Change password</md-menu-item>
                    <md-menu-item @click="logout">Log out</md-menu-item>
                </md-menu-content>
            </md-menu>
        </div>

    </div>
</template>

<script src="./Header.js"></script>

<style src="./Header.css" scoped>

</style>