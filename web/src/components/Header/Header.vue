<template>
    <div id="header" class="d-flex flex-row justify-content-between">
        <div class="d-flex flex-row align-center ">
            <v-app class="item-container" >
                <v-list-item class="item-account">
                    <v-icon medium color="white" @click="toggleDrawerMini">
                        mdi-menu
                    </v-icon>
                    <v-list-item-content>
                        <v-list-item-title class="site-title">HRM</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-app>
        </div>
        <div class="d-flex flex-row align-center ">
            <v-app class="item-container">
                <v-list-item class="item-account">
                    <v-icon large color="white">
                        mdi-account-circle
                    </v-icon>
                    <md-menu md-size="medium" md-align-trigger>
                        <md-button md-menu-trigger class="user-name">{{startDataUser.first_name + " "
                        +startDataUser.last_name}}</md-button>
                        <md-menu-content>
                            <md-menu-item @click="redirect('mypage')">Setting profile</md-menu-item>
                            <md-menu-item @click="redirect('mypage')">Change password</md-menu-item>
                            <md-menu-item @click="logout">Log out</md-menu-item>
                        </md-menu-content>
                    </md-menu>
                </v-list-item>
            </v-app>
        </div>

    </div>
</template>

<script src="./Header.js"></script>

<style src="./Header.css" scoped>

</style>