<!-- eslint-disable -->
<template>
    <div>
        <v-toolbar class="text-h5 text-center" color="success" dark>Create User Success</v-toolbar>
        <!-- <v-card-title > -->
            <p class="text-h5 text-center mb-0 pa-3">
                User Information
            </p>
        <!-- </v-card-title> -->

        <v-card-text  class="pb-0">
            <v-row no-gutters>
                <v-col cols="12" md="6" offset-md="2">
                    <span class="text-overline blue--text text--lighten-1">Full Name:</span>
                </v-col>
                <v-col cols="12" md="3" class="d-flex align-center">
                    <span class="subtitle-2 text-center">{{createUserSuccessInfo.firstName}} {{createUserSuccessInfo.lastName}}</span>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col cols="12" md="6" offset-md="2">
                    <span class="text-overline blue--text text--lighten-1">Dob:</span>
                </v-col>
                <v-col cols="12" md="3" class="d-flex align-center">
                    <span class="subtitle-2 text-center">{{createUserSuccessInfo.dob}}</span>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col cols="12" md="6" offset-md="2">
                    <span class="text-overline blue--text text--lighten-1">Gender:</span>
                </v-col>
                <v-col cols="12" md="3" class="d-flex align-center">
                    <span class="subtitle-2 text-center">{{createUserSuccessInfo.gender == 0 ? 'Male' : createUserSuccessInfo.gender == 1 ? 'Female' : 'Other'}}</span>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col cols="12" md="6" offset-md="2">
                    <span class="text-overline blue--text text--lighten-1">TEL:</span>
                </v-col>
                <v-col cols="12" md="3" class="d-flex align-center">
                    <span class="subtitle-2 text-center">{{createUserSuccessInfo.phone}}</span>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col cols="12" md="6" offset-md="2">
                    <span class="text-overline blue--text text--lighten-1">Email Address:</span>
                </v-col>
                <v-col cols="12" md="3" class="d-flex align-center">
                    <span class="subtitle-2 text-center">{{createUserSuccessInfo.email}}</span>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col cols="12" md="6" offset-md="2">
                    <span class="text-overline blue--text text--lighten-1">Initial Password:</span>
                </v-col>
                <v-col cols="12" md="3" class="d-flex align-center">
                    <span style="color: #D87742" class="text-h6 text-center font-weight-bold ">{{createUserSuccessInfo.password}}</span>
                </v-col>
            </v-row>
            <v-divider color="red"></v-divider>

            <p class="text-h5 text-center mb-0 pa-3">
                Group Information
            </p>
            <v-row no-gutters>
                <v-col cols="12" md="6" offset-md="2">
                    <span class="text-overline blue--text text--lighten-1">Group ID:</span>
                </v-col>
                <v-col cols="12" md="3" class="d-flex align-center">
                    <span class="subtitle-2 text-center">{{createUserSuccessInfo.group_id}}</span>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col cols="12" md="6" offset-md="2">
                    <span class="text-overline blue--text text--lighten-1">Group Full Name:</span>
                </v-col>
                <v-col cols="12" md="3" class="d-flex align-center">
                    <span class="subtitle-2 text-center">{{createUserSuccessInfo.group_full_name}}</span>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col cols="12" md="6" offset-md="2">
                    <span class="text-overline blue--text text--lighten-1">Manager ID:</span>
                </v-col>
                <v-col cols="12" md="3" class="d-flex align-center">
                    <span class="subtitle-2 text-center">{{createUserSuccessInfo.manager_id}}</span>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col cols="12" md="6" offset-md="2">
                    <span class="text-overline blue--text text--lighten-1">Manager Name:</span>
                </v-col>
                <v-col cols="12" md="3" class="d-flex align-center">
                    <span class="subtitle-2 text-center">{{createUserSuccessInfo.manager_name}}</span>
                </v-col>
            </v-row>
            <!-- <v-row no-gutters>
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
            </v-row> -->
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="onClose">
                Close
            </v-btn>
        </v-card-actions>
    </div>
</template>

<script src="./CreateUserSuccessModal.js"></script>