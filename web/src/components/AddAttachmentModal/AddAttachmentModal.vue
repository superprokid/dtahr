<template>
    <div>
        <v-toolbar class="text-h5 text-center" color="teal" dark>Add Attachment</v-toolbar>
        <!-- <p class="text-h5 text-center mt-5 mb-0">
            Are you sure you want to delete Group?
        </p> -->
        <v-card-text class="pb-0">
            <v-form ref="form" lazy-validation>
                <v-container class="pb-0">
                    <v-row no-gutters>
                        <v-col cols="12" md="12" class="d-flex align-center">
                            <FormulateForm @submit="sendData">
                                <FormulateInput type="file" name="file" label="Select your documents to upload" upload-behavior="delayed" v-model="document"
                                style="min-width: 945px" help="Select one or more files to upload" multiple />

                                <FormulateInput type="submit" label="Upload Attachment" />
                            </FormulateForm>

                            <!-- <FormulateInput type="file" name="file" label="Select your documents to upload" :uploader="sendData"
                                upload-url="/your/upload/directory" style="min-width: 945px"
                                help="Select one or more files to upload" multiple /> -->
                            <!-- <a @click.prevent="uploadFile">
                                Upload the file
                            </a> -->

                        </v-col>
                    </v-row>

                </v-container>
                <!-- <v-row no-gutters>
                    <v-col cols="12" md="12" class="pl-2">
                        <v-checkbox v-model="checkbox" :rules="[v => !!v || 'You must agree to continue!']"
                            label="Are you sure you want to upload these Files?" required></v-checkbox>
                    </v-col>
                </v-row> -->
            </v-form>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <!-- <v-btn color="blue darken-1" text @click="onClickUploadAttachment">
                Upload
            </v-btn> -->

            <v-btn color="blue darken-1" text @click="onClose">
                Close
            </v-btn>
        </v-card-actions>
    </div>
</template>

<script src="./AddAttachmentModal.js"></script>