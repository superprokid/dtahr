<template>
   <div>
        <v-toolbar class="text-h5 text-center" color="success" dark>Delete Group Success</v-toolbar>
        <!-- <v-card-title > -->
            <p class="text-h5 text-center mt-10">
                You have successfully deleted a group!
            </p>
        <!-- </v-card-title> -->


        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="onClose">
                Close
            </v-btn>
        </v-card-actions>
    </div>
</template>

<script src="./DeleteGroupSuccessModal.js"></script>