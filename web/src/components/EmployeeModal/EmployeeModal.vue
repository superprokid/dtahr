<template>
    <!-- @click:outside="close", if dialog's "persistent" prop isn't used,
     there's no need to handle outside click to close the dialog -->

    <v-dialog v-model="show" persistent width="80vw">
        <v-toolbar class="text-h5" color="primary" dark>Employee Information</v-toolbar>

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
                                        <div class="text-overline mb-4">
                                            INFO
                                        </div>
                                        <v-row>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field label="Full Name" :value="propPackage.full_name" type="text" readonly>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field label="Date of birth" :value="propPackage.dob" type="text" readonly>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field label="Gender" :value="propPackage.gender == 0 ? 'Male' : 'Female' " type="text" readonly>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field label="Address" :value="propPackage.address" type="text" readonly>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field label="Email" :value="propPackage.email" type="text" readonly>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field label="Phone" :value="propPackage.phone" type="text" readonly>
                                                </v-text-field>
                                            </v-col>

                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field label="Bank Name" :value="propPackage.bank_name" type="text" readonly>
                                                </v-text-field>
                                            </v-col>

                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field label="Bank Account" :value="propPackage.bank_account" type="text" readonly>
                                                </v-text-field>
                                            </v-col>
                                            
                                        </v-row>
                                                     
                                    </v-list-item-content>

                                </v-list-item>
                            </v-card>
                        </v-col>
                        <v-col class="d-flex justify-center" cols="12" sm="6" md="6">
                            <v-list-item-avatar class="rounded-circle" tile size="80" color="grey">
                                <img src="@/assets/user-default.png" alt="">
                            </v-list-item-avatar>
                        </v-col>

                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="6" md="6">
                            <v-card class="mx-auto" max-width="45vw" outlined>
                                <v-list-item three-line>
                                    <v-list-item-content>
                                        <div class="text-overline mb-4">
                                            JOB
                                        </div>
                                        <v-row>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field label="Employee ID" :value="propPackage.employee_id" type="text" readonly>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field label="Employer ID" :value="propPackage.employer_id" type="text" readonly>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field label="Main Skill" :value="propPackage.main_skill" type="text" readonly>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field label="Sub Skill" :value="propPackage.sub_skill" type="text" readonly>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field label="Job Role" :value="propPackage.job_role" type="text" readonly>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field label="Group ID" :value="propPackage.group_id" type="text" readonly>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field label="Salary" :value="propPackage.salary" type="text" readonly>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field label="Join Company Date" :value="propPackage.join_date" type="text" readonly>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field label="Holiday" :value="propPackage.holiday_time" type="text" readonly>
                                                </v-text-field>
                                            </v-col>
                                            
                                        </v-row>
                                    </v-list-item-content>

                                </v-list-item>
                            </v-card>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" >
                            <v-card style="height: 100%" class="mx-auto" max-width="45vw" outlined>
                                <v-list-item three-line>
                                    <v-list-item-content>
                                        <div class="text-overline mb-4">
                                            RELATIVE INFO
                                        </div>
                                        <v-row>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field label="Relationship" :value="propPackage.relationship" type="text" readonly>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field label="Relative Gender" :value="propPackage.relative_gender" type="text" readonly>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field label="Relative Name" :value="propPackage.relative_name" type="text" readonly>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field label="Relative Phone" :value="propPackage.relative_phone" type="text" readonly>
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="6">
                                                <v-text-field label="Relative dob" :value="propPackage.relative_dob" type="text" readonly>
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
                <v-btn @click="close"> Close </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- <v-row justify="start" class="mb-2">
        <v-dialog v-model="show" persistent max-width="800px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn class="ml-3" max-width="170px" color="primary" dark v-bind="attrs" v-on="on">
                    Change Worklog
                </v-btn>
            </template>
            <v-card>

                <v-toolbar class="text-h5" color="primary" dark>User Profile</v-toolbar>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <DateTimePicker :selectDate="date" @select-date="onInputDate" dateTimePickerTitle="Date" ></DateTimePicker>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field label="Total Time"
                                type = "number"
                                @click:append-outer="increment" @click:prepend="decrement"
                                 hint="Total working time">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea filled name="input-7-4" label="Reason *" v-model="reasonInputValue" @input="onInputReason"></v-textarea>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row> -->
</template>
  
<script src="./EmployeeModal.js"></script>
