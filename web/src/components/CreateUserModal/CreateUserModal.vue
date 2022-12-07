<!-- eslint-disable -->
<template>
    <div>
        <v-toolbar class="text-h5" color="primary" dark>Create User</v-toolbar>
        <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                    <v-tabs background-color="transparent">

                        <v-tab key="BasicInfo">
                            Basic Information
                        </v-tab>
                        <v-tab-item key="BasicInfo">
                            <v-card flat>
                                <v-card-text>
                                    <v-row>
                                        <v-col cols="12" md="6">
                                            <div>
                                                <span>Group ID:</span>
                                                <span class="ml-4 black--text font-weight-medium">{{
                                                        groupRowSelected.group_id
                                                }}</span>
                                            </div>
                                        </v-col>

                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" md="6">
                                            <div>
                                                <span>Group Short Name:</span>
                                                <span class="ml-4 black--text font-weight-medium">{{
                                                        groupRowSelected.group_name
                                                }}</span>
                                            </div>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <div>
                                                <span>Group Full Name:</span>
                                                <span class="ml-4 black--text font-weight-medium">{{
                                                        groupRowSelected.group_full_name
                                                }}</span>
                                            </div>
                                        </v-col>

                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" md="6">
                                            <div>
                                                <span>Manager ID:</span>
                                                <span class="ml-4 black--text font-weight-medium">{{
                                                        groupRowSelected.manager_id
                                                }}</span>
                                            </div>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <div>
                                                <span>Manager Name:</span>
                                                <span class="ml-4 black--text font-weight-medium">{{
                                                        groupRowSelected.manager_name
                                                }}</span>
                                            </div>
                                        </v-col>
                                    </v-row>
                                    <v-row no-gutters>
                                        <v-col cols="12" md="5">
                                            <v-text-field label="First Name*" v-model="firstName"
                                                :rules="firstNameRules" required>
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="1">
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-text-field class="pl-3" label="Last Name*" v-model="lastName"
                                                :rules="lastNameRules" required></v-text-field>
                                        </v-col>
                                    </v-row>

                                    <v-row no-gutters>
                                        <v-col cols="12" md="5">
                                            <v-dialog ref="dobDialog" v-model="dobModalShowed" :return-value.sync="dob"
                                                persistent width="290px">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field v-model="dob" label="DOB*" prepend-icon="mdi-calendar"
                                                        :rules="dobRules" readonly v-bind="attrs" v-on="on">
                                                    </v-text-field>
                                                </template>
                                                <v-date-picker v-model="dob" scrollable>
                                                    <v-spacer></v-spacer>
                                                    <v-btn text color="primary" @click="dobModalShowed = false">
                                                        Cancel
                                                    </v-btn>
                                                    <v-btn text color="primary" @click="$refs.dobDialog.save(dob)">
                                                        OK
                                                    </v-btn>
                                                </v-date-picker>
                                            </v-dialog>
                                        </v-col>
                                        <v-col cols="12" md="1">
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-text-field class="pl-3" label="Address" v-model="address"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row no-gutters>
                                        <v-col cols="12" md="5">
                                            <v-autocomplete class="pt-4" v-model="gender" :rules="genderRules"
                                                :items="genderItems" dense label="Gender*" item-text="gender_text"
                                                item-value="gender_value">
                                            </v-autocomplete>
                                        </v-col>
                                        <v-col cols="12" md="1">
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-text-field class="pl-3" v-model="email" :rules="emailRules"
                                                label="E-mail*" required>
                                            </v-text-field>

                                        </v-col>
                                    </v-row>
                                    <v-row no-gutters>
                                        <v-col cols="12" md="5">
                                            <v-text-field label="Phone" v-model="phone"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="1">
                                        </v-col>
                                        <v-col cols="12" md="6">
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>

                        <v-tab key="AdvancedInfo">
                            Advanced Information
                        </v-tab>
                        <v-tab-item key="AdvancedInfo">
                            <v-card flat>
                                <v-card-text>
                                    <v-row>
                                        <v-col cols="12" md="6">
                                            <div>
                                                <span>Group ID:</span>
                                                <span class="ml-4 black--text font-weight-medium">{{
                                                        groupRowSelected.group_id
                                                }}</span>
                                            </div>
                                        </v-col>

                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" md="6">
                                            <div>
                                                <span>Group Short Name:</span>
                                                <span class="ml-4 black--text font-weight-medium">{{
                                                        groupRowSelected.group_name
                                                }}</span>
                                            </div>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <div>
                                                <span>Group Full Name:</span>
                                                <span class="ml-4 black--text font-weight-medium">{{
                                                        groupRowSelected.group_full_name
                                                }}</span>
                                            </div>
                                        </v-col>

                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" md="6">
                                            <div>
                                                <span>Manager ID:</span>
                                                <span class="ml-4 black--text font-weight-medium">{{
                                                        groupRowSelected.manager_id
                                                }}</span>
                                            </div>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <div>
                                                <span>Manager Name:</span>
                                                <span class="ml-4 black--text font-weight-medium">{{
                                                        groupRowSelected.manager_name
                                                }}</span>
                                            </div>
                                        </v-col>
                                    </v-row>
                                    <!-- MAIN SKILL / JOB ROLE / SALARY-->
                                    <v-row no-gutters>
                                        <v-col cols="12" md="4">
                                            <v-text-field label="Main Skill" v-model="mainSkill">
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="4" class="pl-4 pr-4">
                                            <v-text-field label="Job Role" v-model="jobRole">
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="4">
                                            <v-text-field label="Salary" v-model="salary">
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                    <!-- BANK ACCOUNT / BANK NAME -->
                                    <v-row no-gutters>
                                        <v-col cols="12" md="5">
                                            <v-text-field label="Bank Name" v-model="bankName">
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="1">
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-text-field label="Bank Account" v-model="bankAccount">
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                    <!-- RELATIVE NAME / RELATIVE DOB -->
                                    <v-row no-gutters>
                                        <v-col cols="12" md="5">
                                            <v-text-field label="Relative Name" v-model="relativeName">
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="1">
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-text-field label="Relationship" v-model="relationShip">
                                            </v-text-field>
                                        </v-col>

                                    </v-row>
                                    <!-- RELATIVE GENDER / RELATIVE PHONE -->
                                    <v-row no-gutters>
                                        <v-col cols="12" md="5">
                                            <v-autocomplete class="pt-4" v-model="relativeGender" :items="genderItems"
                                                dense label="Relative Gender" item-text="gender_text"
                                                item-value="gender_value">
                                            </v-autocomplete>
                                        </v-col>
                                        <v-col cols="12" md="1">
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-dialog ref="relativeDobDialog" v-model="relativeDobModalShowed"
                                                :return-value.sync="relativeDob" persistent width="290px">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field v-model="relativeDob" label="Relative Date of birth"
                                                        prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on">
                                                    </v-text-field>
                                                </template>
                                                <v-date-picker v-model="relativeDob" scrollable>
                                                    <v-spacer></v-spacer>
                                                    <v-btn text color="primary" @click="relativeDobModalShowed = false">
                                                        Cancel
                                                    </v-btn>
                                                    <v-btn text color="primary"
                                                        @click="$refs.relativeDobDialog.save(relativeDob)">
                                                        OK
                                                    </v-btn>
                                                </v-date-picker>
                                            </v-dialog>
                                        </v-col>
                                    </v-row>

                                    <!-- RELATIVE PHONE / ADDRESS -->
                                    <v-row no-gutters>
                                        <v-col cols="12" md="5">
                                            <v-text-field label="Relative Phone" v-model="relativePhone"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="1">
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-text-field label="Relative Address" v-model="relativeAddress">
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                    </v-tabs>



                    {{ groupRowSelected }}

                    <!-- <v-select v-model="select" :items="items" :rules="[v => !!v || 'Item is required']" label="Item"
                        required>
                    </v-select> -->
                    <div class="mt-4">
                        <v-btn :disabled="!valid" color="success" class="mr-4" @click="onClickCreateUser" :loading="loading">
                            Create User
                        </v-btn>

                        <v-btn color="error" class="mr-4" @click="reset">
                            Reset Form
                        </v-btn>

                        <!-- <v-btn color="warning" @click="resetValidation">
                            Reset Validation
                        </v-btn> -->
                    </div>

                </v-container>
                <small>*indicates required field</small>
            </v-form>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="onClose">
                Close
            </v-btn>
            <!-- <v-btn color="blue darken-1" text @click="onClickCreateUser">
                Save
            </v-btn> -->
        </v-card-actions>
    </div>
</template>

<script src="./CreateUserModal.js"></script>

