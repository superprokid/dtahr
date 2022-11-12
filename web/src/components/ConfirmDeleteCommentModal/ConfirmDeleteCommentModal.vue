<template>
    <div>
        <v-toolbar class="text-h5 text-center" color="primary" dark>Delete Comment Confirm</v-toolbar>
        <!-- <p class="text-h5 text-center mt-5 mb-0">
            Are you sure you want to delete Group?
        </p> -->
        <v-card-text class="pb-0">
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-container class="pb-0" style="border: 1px solid grey; border-radius: 5px;">
                    <v-row no-gutters>
                        <v-col cols="12" md="12" class="d-flex align-center">
                            <span class="subtitle-2 " v-html="confirmDeleteInfo.content"></span>

                        </v-col>
                    </v-row>



                </v-container>
                <v-row no-gutters>
                    <v-col cols="12" md="10" offset-md="2">
                        <v-checkbox v-model="checkbox" :rules="[v => !!v || 'You must agree to continue!']"
                            label="Are you sure you want to delete this Comment?" required></v-checkbox>
                    </v-col>
                </v-row>
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
 
<script src="./ConfirmDeleteCommentModal.js"></script>