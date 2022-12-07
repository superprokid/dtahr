<template>
    <!-- @click:outside="close", if dialog's "persistent" prop isn't used,
     there's no need to handle outside click to close the dialog -->

    <div>
        <v-dialog v-model="show" persistent width="80vw">
        <v-toolbar class="text-h5" color="#154C79" dark>
            Employee Information
            <v-spacer></v-spacer>
            <!-- <v-btn dark text @click="openCamera">
                Change Face Recognition
            </v-btn> -->
            <v-btn dark text @click="close">
                CLOSE
            </v-btn>
        </v-toolbar>

        <v-card class="py-4">
            <v-card-text>
                <!-- <v-select :items="['Basic', 'Standard', 'Premium']" label="Package*" required v-model="selectPackage">
                </v-select> -->
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="6" md="6">
                            <v-card class="mx-auto" max-width="45vw" outlined>
                                <v-list-item three-line>
                                    <v-list-item-content>
                                        <div class=" text-h6 mb-4">
                                            PERSONAL INFORMATION
                                        </div>
                                        <v-row>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field label="Full Name" :value="propPackage.full_name"
                                                    type="text" readonly>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field label="Date of birth" :value="propPackage.dob" type="text"
                                                    readonly>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field label="Gender"
                                                    :value="propPackage.gender == 0 ? 'Male' : 'Female'" type="text"
                                                    readonly>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field label="Address" :value="propPackage.address" type="text"
                                                    readonly>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field label="Email" :value="propPackage.email" type="text"
                                                    readonly>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field label="Phone" :value="propPackage.phone" type="text"
                                                    readonly>
                                                </v-text-field>
                                            </v-col>

                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field label="Bank Name" :value="propPackage.bank_name"
                                                    type="text" readonly>
                                                </v-text-field>
                                            </v-col>

                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field label="Bank Account" :value="propPackage.bank_account"
                                                    type="text" readonly>
                                                </v-text-field>
                                            </v-col>

                                        </v-row>

                                    </v-list-item-content>

                                </v-list-item>
                            </v-card>
                        </v-col>
                        <v-col class="d-flex justify-center align-center" cols="12" md="4" offset-md="1">
                            <v-card class="mx-auto" outlined>
                                <v-img contain height="100%" width="100%" :src="avtBaseUrl + '/' + propPackage.avt"
                                    v-if="propPackage.avt != null"></v-img>
                                <v-img contain lazy-src="https://picsum.photos/id/11/10/6" height="100%" width="100%"
                                    src="https://www.bootdey.com/app/webroot/img/Content/avatar/avatar1.png" v-else></v-img>
                            </v-card>
                        </v-col>
                        <!-- <v-col cols="12" md="4" class="d-flex align-center">
                            <v-card flat color="#FFFBE6">
                                <v-card-text>
                                    <img :src="getAvatar()" alt="" style="width: 100%; height: 100%; object-fit: cover">
                                </v-card-text>
                            </v-card>
                        </v-col> -->

                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="6" md="6">
                            <v-card class="mx-auto" max-width="45vw" outlined>
                                <v-list-item three-line>
                                    <v-list-item-content>
                                        <div class="text-h6 mb-4">
                                            JOB INFORMATION
                                        </div>
                                        <v-row>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field label="Employee ID" :value="propPackage.employee_id"
                                                    type="text" readonly>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field label="Employer ID" :value="propPackage.employer_id"
                                                    type="text" readonly>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field label="Main Skill" :value="propPackage.main_skill"
                                                    type="text" readonly>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field label="Sub Skill" :value="propPackage.sub_skill"
                                                    type="text" readonly>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field label="Job Role" :value="propPackage.job_role" type="text"
                                                    readonly>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field label="Group ID" :value="propPackage.group_id" type="text"
                                                    readonly>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field label="Salary" :value="propPackage.salary" type="text"
                                                    readonly>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field label="Join Company Date" :value="propPackage.join_date"
                                                    type="text" readonly>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field label="Holiday" :value="propPackage.holiday_time"
                                                    type="text" readonly>
                                                </v-text-field>
                                            </v-col>

                                        </v-row>
                                    </v-list-item-content>

                                </v-list-item>
                            </v-card>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-card style="height: 100%" class="mx-auto" max-width="45vw" outlined>
                                <v-list-item three-line>
                                    <v-list-item-content>
                                        <div class="text-h6 mb-4">
                                            RELATIVE INFO
                                        </div>
                                        <v-row>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field label="Relationship" :value="propPackage.relationship"
                                                    type="text" readonly>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field label="Relative Gender"
                                                    :value="propPackage.relative_gender" type="text" readonly>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field label="Relative Name" :value="propPackage.relative_name"
                                                    type="text" readonly>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field label="Relative Phone" :value="propPackage.relative_phone"
                                                    type="text" readonly>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field label="Relative dob" :value="propPackage.relative_dob"
                                                    type="text" readonly>
                                                </v-text-field>
                                            </v-col>

                                        </v-row>
                                    </v-list-item-content>

                                </v-list-item>
                            </v-card>
                        </v-col>

                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <!-- <v-btn @click="close"> Close </v-btn> -->
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog v-model="cameraShow" persistent width="80vw">
        <video autoplay = true id="camera">
        </video>
    </v-dialog>
    </div>

</template>
  
<script src="./EmployeeModal.js"></script>
