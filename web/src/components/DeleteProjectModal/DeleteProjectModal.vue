<!-- eslint-disable -->
<template>
    <div>
        <v-toolbar class="text-h5" color="primary" dark>Delete Project</v-toolbar>

        <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                    <v-row no-gutters>
                        <v-col cols="12" md="5" offset-md="2">
                            <span class="text-overline blue--text text--lighten-1">Project Id:</span>
                        </v-col>
                        <v-col cols="12" md="5" class="d-flex align-center">
                            <span class="subtitle-2 text-center">{{ deleteProjectInfo.project_id }}</span>
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col cols="12" md="5" offset-md="2">
                            <span class="text-overline blue--text text--lighten-1">Project Name:</span>
                        </v-col>
                        <v-col cols="12" md="5" class="d-flex align-center">
                            <span class="subtitle-2 text-center">{{ deleteProjectInfo.project_name }}</span>
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col cols="12" md="5" offset-md="2">
                            <span class="text-overline blue--text text--lighten-1">Client Name:</span>
                        </v-col>
                        <v-col cols="12" md="5" class="d-flex align-center">
                            <span class="subtitle-2 text-center">{{ deleteProjectInfo.client_id }}</span>
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col cols="12" md="5" offset-md="2">
                            <span class="text-overline blue--text text--lighten-1">Project Manager Id:</span>
                        </v-col>
                        <v-col cols="12" md="5" class="d-flex align-center">
                            <span class="subtitle-2 text-center">{{ deleteProjectInfo.project_manager_id }}</span>
                        </v-col>
                    </v-row>         
                    <v-row no-gutters>
                        <v-col cols="12" md="5" offset-md="2">
                            <span class="text-overline blue--text text--lighten-1">Project Manager Name:</span>
                        </v-col>
                        <v-col cols="12" md="5" class="d-flex align-center">
                            <v-avatar style="height: none !important">
                                <v-img :src="getAvatar(deleteProjectInfo.manager_avt)" alt="" max-height="25"
                                    max-width="25" style="display: inline-block"></v-img>

                            </v-avatar>
                            <span class="subtitle-2 text-center">{{ deleteProjectInfo.manager_full_name }}</span>
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col cols="12" md="5" offset-md="2">
                            <span class="text-overline blue--text text--lighten-1">Manager Assigned Date:</span>
                        </v-col>
                        <v-col cols="12" md="5" class="d-flex align-center">
                            <span class="subtitle-2 text-center">{{ deleteProjectInfo.project_manager_assigned_date }}</span>
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col cols="12" md="10" offset-md="2">
                            <v-checkbox v-model="checkbox" :rules="[v => !!v || 'You must agree to continue!']"
                                label="Are you sure you want to delete this project?" required></v-checkbox>
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

<script src="./DeleteProjectModal.js"></script>

<style>

</style>