<template>
    <div>
        <v-toolbar class="text-h5 text-center" color="teal" dark>Import Employee </v-toolbar>
        <!-- <p class="text-h5 text-center mt-5 mb-0">
            Are you sure you want to delete Group?
        </p> -->
        <v-card-text class="pb-0">
            <v-form ref="form" lazy-validation>
                <v-container class="pb-0">
                    <v-row no-gutters>
                        <v-col cols="3" offset-md="7" class="black--text font-weight-medium">
                            Download Example File Format:
                        </v-col>
                        <v-col cols="2">
                            <v-icon small color="teal darken-2">
                                mdi-microsoft-excel
                            </v-icon>
                            <a class="font-weight-medium" :href="ADMIN_DOWNLOAD_IMPORT_EMPLOYEE_SAMPLE">
                                Sample Download
                            </a>
                        </v-col>
                    </v-row>
                    <v-row no-gutters class="mt-3">
                        <v-col cols="12" md="12" class="d-flex align-center">
                            <FormulateForm @submit="sendData">
                                <FormulateInput type="file" name="file" label="Select your documents to import"
                                    upload-behavior="delayed" v-model="document" style="min-width: 945px" @file-removed="onRemove"
                                    help="Select one or more files to upload" />

                                <FormulateInput type="submit" label="Import Employee" style="display: inline-block"/>
                                <div v-if="messageImportFail" class="ml-5 red--text text-lighten-3" style="display: inline-block">
                                    {{messageImportFail}}
                                </div>
                            </FormulateForm>

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

<script src="./ImportEmployeeModal.js"></script>