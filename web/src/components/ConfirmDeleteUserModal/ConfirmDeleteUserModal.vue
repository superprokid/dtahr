<template>
    <div>
        <v-toolbar class="text-h5 text-center" color="primary" dark>Delete User Confirm</v-toolbar>
        <!-- <p class="text-h5 text-center mt-5 mb-0">
            Are you sure you want to delete Group?
        </p> -->
        <v-card-text class="pb-0">
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-container class="pb-0">
                    <v-row no-gutters>
                        <v-col cols="12" md="5" offset-md="2">
                            <span class="text-overline blue--text text--lighten-1">Employee Id:</span>
                        </v-col>
                        <v-col cols="12" md="5" class="d-flex align-center">
                            <span class="subtitle-2 text-center">{{ confirmDeleteInfo.employee_id }}</span>
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col cols="12" md="5" offset-md="2">
                            <span class="text-overline blue--text text--lighten-1">Full Name:</span>
                        </v-col>
                        <v-col cols="12" md="5" class="d-flex align-center">
                            <span class="subtitle-2 text-center">{{ confirmDeleteInfo.first_name }}
                                {{ confirmDeleteInfo.last_name }}</span>
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col cols="12" md="5" offset-md="2">
                            <span class="text-overline blue--text text--lighten-1">Gender:</span>
                        </v-col>
                        <v-col cols="12" md="5" class="d-flex align-center">
                            <span class="subtitle-2 text-center">{{ confirmDeleteInfo.gender }}</span>
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col cols="12" md="5" offset-md="2">
                            <span class="text-overline blue--text text--lighten-1">TEL:</span>
                        </v-col>
                        <v-col cols="12" md="5" class="d-flex align-center">
                            <span class="subtitle-2 text-center">{{ confirmDeleteInfo.phone }}</span>
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col cols="12" md="5" offset-md="2">
                            <span class="text-overline blue--text text--lighten-1">Email Address:</span>
                        </v-col>
                        <v-col cols="12" md="5" class="d-flex align-center">
                            <span class="subtitle-2 text-center">{{ confirmDeleteInfo.email }}</span>
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col cols="12" md="10" offset-md="2">
                            <v-checkbox v-model="checkbox" :rules="[v => !!v || 'You must agree to continue!']"
                                label="Are you sure you want to delete User?" required></v-checkbox>
                        </v-col>
                    </v-row>

                </v-container>

            </v-form>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="onConfirmDelete">
                Delete
            </v-btn>

            <v-btn color="blue darken-1" text @click="onClose">
                Close
            </v-btn>
        </v-card-actions>
    </div>
</template>
 
<script src="./ConfirmDeleteUserModal.js"></script>