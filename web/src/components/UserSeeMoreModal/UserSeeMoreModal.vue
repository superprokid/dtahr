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
                            <v-tabs background-color="transparent">

                                <v-tab key="personalinfo">
                                    Personal Information
                                </v-tab>
                                <v-tab-item key="personalinfo">
                                    <v-card flat color="#FFFBE6">
                                        <v-card-text>
                                            <!-- PERSONAL INFO -->
                                            <v-row no-gutters>
                                                <v-col cols="12" sm="6" class="pa-2">
                                                    <v-text-field label="First Name" type="text"
                                                        v-model="userDetailInfo.first_name">
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" class="pa-2">
                                                    <v-text-field label="Last Name" type="text"
                                                        v-model="userDetailInfo.last_name">
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" class="pa-2">
                                                    <v-menu v-model="dobPicker" :close-on-content-click="false"
                                                        :nudge-right="40" transition="scale-transition" offset-y
                                                        min-width="auto">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field v-model="dob"
                                                                label="Date of birth"
                                                                prepend-icon="mdi-calendar" readonly v-bind="attrs"
                                                                v-on="on">
                                                            </v-text-field>
                                                        </template>
                                                        <v-date-picker v-model="dob"
                                                            @input="onSelectDob">
                                                        </v-date-picker>
                                                    </v-menu>
                                                </v-col>
                                                <v-col cols="12" sm="6" class="pa-2">
                                                    <v-autocomplete class="pt-4" v-model="userDetailInfo.gender"
                                                        :items="genderItems" dense label="Gender"
                                                        item-text="gender_text" item-value="gender_value">
                                                    </v-autocomplete>
                                                </v-col>
                                                <v-col cols="12" sm="6" class="pa-2">
                                                    <v-text-field label="Address" type="text"
                                                        v-model="userDetailInfo.address">
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" class="pa-2">
                                                    <v-text-field label="Phone" type="text"
                                                        v-model="userDetailInfo.phone">
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" class="pa-2">
                                                    <v-text-field label="Email" type="text" v-model="emailEdit">
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" class="pa-2">
                                                    <v-text-field label="Bank name" type="text"
                                                        v-model="userDetailInfo.bank_name">
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" class="pa-2">
                                                    <v-text-field label="Bank Account" type="text"
                                                        v-model="userDetailInfo.bank_account">
                                                    </v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-card-text>
                                    </v-card>
                                </v-tab-item>

                                <v-tab key="employeeinfo">
                                    Employee Info
                                </v-tab>
                                <v-tab-item key="employeeinfo">
                                    <v-card flat color="#FFFBE6">
                                        <v-card-text>
                                            <!-- EMPLOYEE / ER ID -->
                                            <v-row no-gutters>
                                                <v-col cols="12" sm="6" class="pa-2">
                                                    <v-text-field label="Employee Id" type="text"
                                                        v-model="userDetailInfo.employee_id">
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" class="pa-2">
                                                    <v-text-field label="Job Role" type="text"
                                                        v-model="userDetailInfo.job_role">
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" class="pa-2">
                                                    <v-text-field label="Main skill " type="text"
                                                        v-model="userDetailInfo.main_skill">
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" class="pa-2">
                                                    <v-text-field label="Sub skill " type="text"
                                                        v-model="userDetailInfo.sub_skill">
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" class="pa-2">
                                                    <v-text-field label="Employer Id" type="text" readonly
                                                        v-model="userDetailInfo.employer_id">
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" class="pa-2">
                                                    <v-autocomplete class="pt-4" v-model="selectGroup"
                                                        :items="listGroups" dense label="Group"
                                                        item-text="group_full_name" item-value="group_id" return-object
                                                        @change="onChangeGroup">
                                                    </v-autocomplete>
                                                </v-col>
                                                <v-col cols="12" sm="6" class="pa-2">
                                                    <v-text-field label="Employer Name" type="text" readonly
                                                        v-model="employer_name">
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" class="pa-2">
                                                    <v-text-field label="Salary" type="text"
                                                        v-model="userDetailInfo.salary">
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" class="pa-2">
                                                    <v-text-field label="Join Date" type="text"
                                                        v-model="userDetailInfo.join_date">
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" class="pa-2">
                                                    <v-text-field label="Holiday Time" type="text"
                                                        v-model="userDetailInfo.holiday_time">
                                                    </v-text-field>
                                                </v-col>

                                            </v-row>
                                        </v-card-text>
                                    </v-card>
                                </v-tab-item>
                                <v-tab key="relativeinfo">
                                    Relative Info
                                </v-tab>
                                <v-tab-item key="relativeinfo">
                                    <v-card flat color="#FFFBE6">
                                        <v-card-text>
                                            <v-row no-gutters>
                                                <v-col cols="12" sm="6" class="pa-2">
                                                    <v-text-field label="Relative Name" type="text"
                                                        v-model="userDetailInfo.relative_name">
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" class="pa-2">
                                                    <v-text-field label="Relationship" type="text"
                                                        v-model="userDetailInfo.relationship">
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" class="pa-2">
                                                    <v-autocomplete class="pt-4"
                                                        v-model="userDetailInfo.relative_gender" :items="genderItems"
                                                        dense label="Gender" item-text="gender_text"
                                                        item-value="gender_value">
                                                    </v-autocomplete>
                                                </v-col>
                                                <v-col cols="12" sm="6" class="pa-2">
                                                    <v-menu v-model="relativeDobPicker" :close-on-content-click="false"
                                                        :nudge-right="40" transition="scale-transition" offset-y
                                                        min-width="auto">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field v-model="relativeDob"
                                                                label="Date of birth"
                                                                prepend-icon="mdi-calendar" readonly v-bind="attrs"
                                                                v-on="on">
                                                            </v-text-field>
                                                        </template>
                                                        <v-date-picker v-model="relativeDob"
                                                            @input="onSelectRelativeDob">
                                                        </v-date-picker>
                                                    </v-menu>
                                                </v-col>
                                                <v-col cols="12" sm="6" class="pa-2">
                                                    <v-text-field label="Phone" type="text"
                                                        v-model="userDetailInfo.relative_phone">
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" class="pa-2">
                                                    <v-text-field label="Address" type="text"
                                                        v-model="userDetailInfo.relative_address">
                                                    </v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-card-text>
                                    </v-card>
                                </v-tab-item>
                            </v-tabs>
                        </v-col>
                        <v-col cols="12" md="4" class="d-flex align-center">
                            <v-card flat color="#FFFBE6">
                                <v-card-text>
                                    <img :src="getAvatar()" alt="" style="width: 100%; height: 100%; object-fit: cover">
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
                <small>*indicates required field</small>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="onSaveUserSeeMore">
                Save
            </v-btn>
            <v-btn color="blue darken-1" text @click="onClose">
                Close
            </v-btn>
        </v-card-actions>
    </div>
</template>
    
<script src="./UserSeeMoreModal.js">
</script>
