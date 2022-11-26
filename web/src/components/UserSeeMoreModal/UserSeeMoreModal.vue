<template>
    <div>
        <v-toolbar class="text-h5" color="primary" dark>User Information</v-toolbar>
        <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                    <!-- <v-row>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field label="Name" :value="addHolidayInfo.fullName" type="text" readonly>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field label="Time (day)" v-model="time" type="number" @click:append-outer="increment" :rules="timeRules"
                                @click:prepend="decrement" hint="Time add/decrease">
                            </v-text-field>
                        </v-col>

                        <v-col cols="12">
                            <v-textarea filled name="input-7-4" label="Reason *" v-model="reason" :rules="reasonRules"></v-textarea>
                        </v-col>
                    </v-row> -->
                    <v-row>
                        <v-col cols="12" md="8">
                            <v-tabs background-color="transparent" >

                                <v-tab key="personalinfo">
                                    Personal Information
                                </v-tab>
                                <v-tab-item key="personalinfo">
                                    <v-card flat>
                                        <v-card-text>
                                            <v-row no-gutters>
                                                <!-- <v-col cols="12" md="8">
                                                    <div v-for="item in listAttachment" :key="item.attachment_id">
                                                        <v-icon small color="teal darken-2">
                                                            mdi-file-document
                                                        </v-icon>
                                                        <a :href="item.href">
                                                            {{ item.file_name }}
                                                        </a>
                                                        <v-icon small
                                                            @click="onClickRemoveAttachment(item.attachment_id)">
                                                            mdi-close-thick
                                                        </v-icon>
                                                    </div>
                                                </v-col>
                                                <v-col cols="12" md="4" class="d-flex justify-end">
                                                    <v-btn rounded outlined color="primary" dar
                                                        @click="onClickAttachFileButton">
                                                        <v-icon>
                                                            mdi-plus
                                                        </v-icon>
                                                        Attach File
                                                    </v-btn>
                                                </v-col> -->
                                                hmmmmm
                                            </v-row>
                                        </v-card-text>
                                    </v-card>
                                </v-tab-item>

                                <v-tab key="employeeinfo">
                                    Employee Info
                                </v-tab>
                                <v-tab-item key="employeeinfo">
                                    <v-card flat>
                                        <v-card-text>this is employeeinfo</v-card-text>
                                    </v-card>
                                </v-tab-item>
                                <v-tab key="relativeinfo">
                                    Relative Info
                                </v-tab>
                                <v-tab-item key="relativeinfo">
                                    <v-card flat>
                                        <v-card-text>this is employeeinfo</v-card-text>
                                    </v-card>
                                </v-tab-item>
                            </v-tabs>
                        </v-col>
                        <v-col cols="12" md="4">

                        </v-col>
                    </v-row>
                </v-container>
                <small>*indicates required field</small>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="onClose">
                Close
            </v-btn>
            <!-- <v-btn color="blue darken-1" text @click="onAddHoliday">
                Save
            </v-btn> -->
        </v-card-actions>
    </div>
</template>
    
<script src="./UserSeeMoreModal.js">
</script>
