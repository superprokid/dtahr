<!-- eslint-disable -->
<template>
    <div>
        <v-toolbar class="text-h5" color="primary" dark>Change User Group</v-toolbar>

        <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                    <v-row no-gutters>
                        <span class="subtitle-2">Employee Information</span>
                    </v-row>

                    <v-row no-gutters>
                        <div class="d-flex justify-center align-center">
                            <span class="text-overline blue--text text--lighten-1 mr-4">Employee Id:</span>
                            <span class="subtitle-2">{{ changeUserGroupInfo.employee_id }}</span>
                        </div>
                    </v-row>
                    <v-row no-gutters>
                        <div class="d-flex justify-center align-center">
                            <span class="text-overline blue--text text--lighten-1 mr-4">Employee Name:</span>
                            <span class="subtitle-2">{{ changeUserGroupInfo.full_name }}</span>
                        </div>
                    </v-row>

                    <v-row no-gutters>
                        <span class="subtitle-2">Change Group</span>
                    </v-row>
                    <v-row no-gutters>
                        <v-col cols="12" md="5" class="d-flex justify-end align-center">
                            <span class="text-overline blue--text text--lighten-1 mr-4">Group:</span>
                        </v-col>
                        <v-col cols="12" md="5">
                            <v-autocomplete class="pt-4" v-model="selectGroup" :items="listGroup" dense clearable outlined
                                item-text="group_full_name" item-value="group_id" return-object @change="onChangeGroup" required :rules="listGroupRules">
                            </v-autocomplete>
                        </v-col>
                    </v-row>

                    <v-row no-gutters>
                        <span class="subtitle-2">Group Information</span>
                    </v-row>
                    <v-row no-gutters>
                        <div class="d-flex justify-center align-center">
                            <span class="text-overline blue--text text--lighten-1 mr-4">Group Id:</span>
                            <span class="subtitle-2">{{ selectGroup?.group_id }}</span>
                        </div>
                    </v-row>
                    <v-row no-gutters>
                        <div class="d-flex justify-center align-center">
                            <span class="text-overline blue--text text--lighten-1 mr-4">Group Name:</span>
                            <span class="subtitle-2">{{ selectGroup?.group_name }}</span>
                        </div>
                    </v-row>
                    <v-row no-gutters>
                        <div class="d-flex justify-center align-center">
                            <span class="text-overline blue--text text--lighten-1 mr-4">Manager Name:</span>
                            <v-avatar v-if="selectGroup">
                                <v-img :src="getAvatar(selectGroup?.avt)" max-width="25px" max-height="25px" class="mr-2" ></v-img>

                            </v-avatar>
                            <span class="subtitle-2">{{ selectGroup?.manager_name}}</span>
                        </div>
                    </v-row>
                    <v-row no-gutters>
                        <div class="d-flex justify-center align-center">
                            <span class="text-overline blue--text text--lighten-1 mr-4">Manager Start Date:</span>                  
                            <span class="subtitle-2"> {{ selectGroup?.manager_start_date}}</span>
                        </div>
                    </v-row>
                    <v-row no-gutters>
                        <div class="d-flex justify-center align-center">
                            <span class="text-overline blue--text text--lighten-1 mr-4">Number Of People:</span>
                            <span class="subtitle-2">{{ selectGroup?.number}}</span>
                        </div>
                    </v-row>
                </v-container>
                
            </v-form>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="onChangeUserGroup">
                Save
            </v-btn>
            <v-btn color="blue darken-1" text @click="onClose">
                Close
            </v-btn>
        </v-card-actions>
    </div>
</template>

<script src="./ChangeUserGroupModal.js"></script>

<style>

</style>