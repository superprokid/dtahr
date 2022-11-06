<!-- eslint-disable -->
<template>
    <div>
        <v-toolbar class="text-h5 text-center" color="success" dark>Add Group Success</v-toolbar>
        <!-- <v-card-title > -->
            <p class="text-h5 text-center mb-0 pa-3">
                You have successfully created a group!
            </p>
        <!-- </v-card-title> -->

        <v-card-text  class="pb-0">
            <v-row no-gutters>
                <v-col cols="12" md="6" offset-md="2">
                    <span class="text-overline blue--text text--lighten-1">Group Short Name:</span>
                </v-col>
                <v-col cols="12" md="3" class="d-flex align-center">
                    <span class="subtitle-2 text-center">{{ addGroupSuccessInfo.groupName }}</span>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col cols="12" md="6" offset-md="2">
                    <span class="text-overline blue--text text--lighten-1">Group Full Name:</span>
                </v-col>
                <v-col cols="12" md="3" class="d-flex align-center">
                    <span class="subtitle-2">{{ addGroupSuccessInfo.groupFullName }}</span>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col cols="12" md="6" offset-md="2">
                    <span class="text-overline blue--text text--lighten-1">Manager Id:</span>
                </v-col>
                <v-col cols="12" md="3" class="d-flex align-center">
                    <span class="subtitle-2">{{ addGroupSuccessInfo.managerId }}</span>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col cols="12" md="6" offset-md="2">
                    <span class="text-overline blue--text text--lighten-1">Manager Name:</span>
                </v-col>
                <v-col cols="12" md="3" class="d-flex align-center">
                    <span class="subtitle-2">{{ addGroupSuccessInfo.managerAddGroupSelected.full_name }}</span>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col cols="12" md="6" offset-md="2">
                    <span class="text-overline blue--text text--lighten-1">Manager Start Assigned Date:</span>
                </v-col>
                <v-col cols="12" md="3" class="d-flex align-center">
                    <span class="subtitle-2">{{ addGroupSuccessInfo.managerStartDate }}</span>
                </v-col>
            </v-row>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="onClose">
                Close
            </v-btn>
        </v-card-actions>
    </div>
</template>

<script src="./AddGroupSuccessModal.js"></script>