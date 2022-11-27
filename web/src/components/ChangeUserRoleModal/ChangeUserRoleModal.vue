<!-- eslint-disable -->
<template>
    <div>
        <v-toolbar class="text-h5" color="primary" dark>Change User Role</v-toolbar>

        <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                    <v-row no-gutters>
                        <span class="subtitle-2">EMPLOYEE INFO</span>
                    </v-row>
                    <v-row no-gutters>
                        <div class="d-flex justify-center align-center">
                            <span class="text-overline blue--text text--lighten-1 mr-4">Employee Id:</span>
                            <span class="subtitle-2">{{ changeUserRoleInfo.employee_id }}</span>
                        </div>
                    </v-row>
                    <v-row no-gutters>
                        <div class="d-flex justify-center align-center">
                            <span class="text-overline blue--text text--lighten-1 mr-4">Employee Name:</span>
                            <span class="subtitle-2">{{ changeUserRoleInfo.full_name }}</span>
                        </div>
                    </v-row>
                    <v-row no-gutters>
                        <div class="d-flex justify-center align-center">
                            <span class="text-overline blue--text text--lighten-1 mr-4">Group Name:</span>
                            <span class="subtitle-2">{{ changeUserRoleInfo.group_name }}</span>
                        </div>
                    </v-row>
                    <v-row no-gutters>
                        <span class="subtitle-2">CHANGE POSITION</span>
                    </v-row>
                    <v-row no-gutters >
                        <v-col cols="12" md="5" class="d-flex justify-end align-center">
                            <span class="text-overline blue--text text--lighten-1 mr-4">Role:</span>
                        </v-col>
                        <v-col cols="12" md="5">
                            <v-select :items="roles" item-text="text" item-value="value" v-model="roleChange"></v-select>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="onChangeUserRole">
                Save
            </v-btn>
            <v-btn color="blue darken-1" text @click="onClose">
                Close
            </v-btn>
        </v-card-actions>
    </div>
</template>

<script src="./ChangeUserRoleModal.js"></script>

<style>

</style>