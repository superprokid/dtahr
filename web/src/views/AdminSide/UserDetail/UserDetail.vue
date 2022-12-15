<template>
    <div class="pa-4" style="height: 90vh; overflow-y: auto;">
        <div id="user-detail-feature" v-if="userDetailFeatureShowed">
            <div class="user-detail-title-static d-flex justify-space-between">
                <!-- <v-icon medium color="blue darken-2">mdi-keyboard-return</v-icon> -->
                USER DETAIL
                <v-spacer></v-spacer>
                <v-btn color="success" class="mr-4" @click="onClickActiveUser" v-if="userDetailInfo.is_deleted === 1">
                    Active Account
                </v-btn>
                <v-btn color="primary" @click="onClickChangePassword">
                    Change Password
                </v-btn>
            </div>

            <div class="mt-5">
                <v-row>
                    <!-- user information -->
                    <v-col cols="12" md="4">
                        <v-card style="height: 100%">
                            <v-card-text>
                                <v-row no-gutters :align="'center'">
                                    <v-col cols="6">
                                        <div class="text_style">Personal Information </div>
                                    </v-col>
                                    <v-col cols="6" class="d-flex justify-end">
                                        <v-btn text color="primary" @click="onClickUserInfoSeeMore">
                                            See More
                                        </v-btn>
                                    </v-col>
                                </v-row>

                                <hr>
                                <v-list-item three-line>
                                    <v-list-item-content>

                                        <div class=" ">
                                            <span class="text-overline blue--text text--lighten-1">Employee ID:</span>
                                            <span class="subtitle-2">{{ userDetailInfo.employee_id }}</span>
                                        </div>
                                        <div class=" ">
                                            <span class="text-overline blue--text text--lighten-1">Full Name:</span>
                                            <span class="subtitle-2">{{ userDetailInfo.full_name }}</span>
                                        </div>
                                        <div class=" ">
                                            <span class="text-overline blue--text text--lighten-1">Email:</span>
                                            <span class="subtitle-2">{{ userDetailInfo.email }}</span>
                                        </div>
                                        <div class=" ">
                                            <span class="text-overline blue--text text--lighten-1">Main Skill:</span>
                                            <span class="subtitle-2">{{ userDetailInfo.main_skill }}</span>
                                        </div>
                                        <div class=" ">
                                            <span class="text-overline blue--text text--lighten-1">Salary:</span>
                                            <span class="subtitle-2">{{ userDetailInfo.salary }}</span>
                                        </div>
                                        <div class=" ">
                                            <span class="text-overline blue--text text--lighten-1">Join Date:</span>
                                            <span class="subtitle-2">{{ getDateString(userDetailInfo.join_date)
                                            }}</span>
                                        </div>



                                    </v-list-item-content>

                                    <v-list-item-avatar class="rounded-circle" tile size="80" color="grey">
                                        <img :src="getAvatar()" alt="">

                                    </v-list-item-avatar>

                                </v-list-item>
                            </v-card-text>
                        </v-card>
                    </v-col>

                    <!-- working project -->
                    <v-col cols="12" md="4">
                        <v-card style="height: 100%">
                            <v-card-text>
                                <v-row no-gutters>
                                    <v-col cols="6">
                                        <div class="text_style">Working Project</div>
                                    </v-col>
                                </v-row>
                                <hr>
                                <v-list-item three-line>
                                    <v-list-item-content>
                                        <div class=" ">
                                            <span class="text-overline blue--text text--lighten-1">Project ID:</span>
                                            <span class="subtitle-2">{{ userDetailInfo.project_id }}</span>

                                        </div>
                                        <div class=" ">
                                            <span class="text-overline blue--text text--lighten-1">Project Name:</span>
                                            <span class="subtitle-2">{{ userDetailInfo.project?.project_name }}</span>
                                        </div>
                                        <div class=" ">
                                            <span class="text-overline blue--text text--lighten-1">Project Manager
                                                Name:</span>
                                            <span class="subtitle-2">{{ userDetailInfo.project?.project_manager_name
                                            }}</span>
                                        </div>
                                        <div class=" ">
                                            <span class="text-overline blue--text text--lighten-1">Client Name:</span>
                                            <span class="subtitle-2">{{ userDetailInfo.project?.client_id }}</span>
                                        </div>
                                        <div class=" ">
                                            <span class="text-overline blue--text text--lighten-1">Number People:</span>
                                            <span class="subtitle-2">{{ userDetailInfo.project?.number }}</span>

                                        </div>
                                        <div class=" ">
                                            <span class="text-overline blue--text text--lighten-1">Employee Join
                                                Date:</span>
                                            <span class="subtitle-2">{{
                                                    getDateString(userDetailInfo.project?.assigned_date)
                                            }}</span>

                                        </div>
                                        <div class=" ">
                                            <span class="text-overline blue--text text--lighten-1"> Manager Join
                                                Date:</span>
                                            <span class="subtitle-2">{{
                                                    getDateString(userDetailInfo.project?.project_manager_assigned_date)
                                            }}</span>
                                        </div>

                                    </v-list-item-content>

                                </v-list-item>
                            </v-card-text>
                        </v-card>
                    </v-col>

                    <!-- worklog -->
                    <v-col cols="12" md="4">
                        <v-card style="height: 100%">
                            <v-card-text>
                                <v-row no-gutters :align="'center'">
                                    <v-col cols="6">
                                        <div class="text_style">Worklog</div>
                                    </v-col>
                                    <v-col cols="6" class="d-flex justify-end">
                                        <v-btn text color="primary" @click="onClickWorklogSeeMore">
                                            See More
                                        </v-btn>
                                    </v-col>
                                </v-row>
                                <hr>
                                <v-list-item three-line>
                                    <v-list-item-content>
                                        <div class=" ">
                                            <span class="text-overline blue--text text--lighten-1"> Work Date:</span>
                                            <span class="subtitle-2">{{ todayWorklog.work_date }}</span>
                                        </div>
                                        <div class=" ">
                                            <span class="text-overline blue--text text--lighten-1">Checkin At:</span>
                                            <span class="subtitle-2">{{ todayWorklog.checkin_at }} </span>
                                        </div>
                                        <div class=" ">
                                            <span class="text-overline blue--text text--lighten-1">Status:</span>
                                            <span class="subtitle-2">{{ todayWorklog.work_status }}</span>
                                        </div>
                                        <div class=" ">
                                            <span class="text-overline blue--text text--lighten-1">Work Total:</span>
                                            <span class="subtitle-2"> {{ todayWorklog.work_total }}</span>
                                        </div>

                                    </v-list-item-content>
                                </v-list-item>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>

                <!-- History Tracking of employee -->
                <v-row>
                    <v-col cols="12">
                        <div>
                            <v-card outlined>
                                <v-card-text>
                                    <v-row no-gutters :align="'center'">
                                        <v-col cols="12" md="4">
                                            <h4 class="d-inline-block ">Current Annual Holiday: </h4>
                                            <h4 class="d-inline-block red--text ml-1">
                                                {{ userDetailInfo.holiday_time?.toFixed(2) }}</h4>
                                        </v-col>
                                        <v-col cols="12" md="6" offset-md="2">
                                            <v-row no-gutters>
                                                <v-col cols="12" md="5">
                                                    <v-menu v-model="startDatePicker" :close-on-content-click="false"
                                                        :nudge-right="40" transition="scale-transition" offset-y
                                                        min-width="auto">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field v-model="startDate" label="Start Date"
                                                                prepend-icon="mdi-calendar" readonly v-bind="attrs"
                                                                v-on="on">
                                                            </v-text-field>
                                                        </template>
                                                        <v-date-picker v-model="startDate"
                                                            @input="onSelectStartTrackingDate">
                                                        </v-date-picker>
                                                    </v-menu>
                                                </v-col>
                                                <v-col cols="12" md="5" offset-md="1">
                                                    <v-menu v-model="endDatePicker" :close-on-content-click="false"
                                                        :nudge-right="40" transition="scale-transition" offset-y
                                                        min-width="auto">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field v-model="endDate" label="End Date"
                                                                prepend-icon="mdi-calendar" readonly v-bind="attrs"
                                                                v-on="on">
                                                            </v-text-field>
                                                        </template>
                                                        <v-date-picker v-model="endDate"
                                                            @input="onSelectEndTrackingDate">
                                                        </v-date-picker>
                                                    </v-menu>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                    </v-row>
                                    <v-row no-gutters>
                                        <v-btn max-width="170px" color="primary" dark @click="onClickEditWorklog">
                                            Edit Worklog
                                        </v-btn>
                                        <v-btn class="ml-3" max-width="170px" color="primary" dark
                                            @click="onClickAddHoliday">
                                            Add Holiday
                                        </v-btn>
                                        <v-btn class="ml-3" max-width="170px" color="primary" dark
                                            @click="onClickFaceRecognition">
                                            Register Face
                                        </v-btn>
                                    </v-row>
                                    <hr>
                                    <div style="height: 650px; overflow-y: auto; padding: 0 20px;">
                                        <v-timeline dense clipped style="padding-top: 0; margin-top: 10px;">
                                            <div v-for="(value, index) in Object.keys(userHistoryTracking)"
                                                :key="index">
                                                <v-timeline-item fill-dot
                                                    class="black--text mb-6 d-flex align-items-center"
                                                    color="orange lighten-2" large icon="mdi-check-all">

                                                    <p class="title-timeline">End activities {{ value }}</p>
                                                </v-timeline-item>

                                                <v-timeline-item v-for="(item, index) in userHistoryTracking[value]"
                                                    :key="index" class="mb-4" v-bind:color="
                                                        item.workhistory_status == 0
                                                            ? 'green'
                                                            : item.workhistory_status == 1
                                                                ? 'blue'
                                                                : item.workhistory_status == 2
                                                                    ? 'purple'
                                                                    : item.workhistory_status == 3
                                                                        ? 'red'
                                                                        : 'grey'
                                                    " v-bind:icon="
    item.workhistory_status == 0
        ? 'mdi-map-marker-check'
        : item.workhistory_status == 1
            ? 'mdi-clock-remove'
            : item.workhistory_status == 2
                ? 'mdi-clock-remove'
                : item.workhistory_status == 3
                    ? 'mdi-alert'
                    : 'mdi-cog'
" icon-color="grey lighten-2" fill-dot small>
                                                    <v-row justify="space-between">
                                                        <v-col class="description-timeline" cols="7">{{
                                                                item.workhistory_description
                                                        }} </v-col>
                                                        <v-col class="text-right" cols="5">
                                                            {{ new Date(item.work_date).toLocaleDateString() }}
                                                        </v-col>
                                                    </v-row>
                                                </v-timeline-item>


                                                <v-timeline-item fill-dot
                                                    class="black--text mb-12 d-flex align-items-center" color="teal"
                                                    large icon="mdi-check">
                                                    <p class="title-timeline">Start activities {{ value }}</p>
                                                </v-timeline-item>
                                                <v-timeline-item class="mb-4" hide-dot
                                                    v-if="index < Object.keys(userHistoryTracking).length - 1">
                                                </v-timeline-item>
                                            </div>
                                        </v-timeline>
                                    </div>
                                </v-card-text>
                            </v-card>
                        </div>
                    </v-col>
                </v-row>
            </div>
        </div>

        <div id="user-detail-worklog" v-if="userDetailWorklogShowed">
            <div class="user-detail-title" @click="goBackUserDetailFeature">
                <v-icon medium color="blue darken-2">mdi-keyboard-return</v-icon>
                USER'S WORKLOG
            </div>
            <div class="mt-5">
                <v-row>
                    <v-col cols="12" md="3" class="mr-4">
                        <v-menu v-model="startDateWorklogPicker" :close-on-content-click="false" :nudge-right="40"
                            transition="scale-transition" offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="startDateWorklog" label="From" prepend-icon="mdi-calendar"
                                    readonly v-bind="attrs" v-on="on">
                                </v-text-field>
                            </template>
                            <v-date-picker v-model="startDateWorklog" @input="onSelectStartDateWorklog">
                            </v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-col cols="12" md="3">
                        <v-menu v-model="endDateWorklogPicker" :close-on-content-click="false" :nudge-right="40"
                            transition="scale-transition" offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="endDateWorklog" label="To" prepend-icon="mdi-calendar" readonly
                                    v-bind="attrs" v-on="on">
                                </v-text-field>
                            </template>
                            <v-date-picker v-model="endDateWorklog" @input="onSelectEndDateWorklog">
                            </v-date-picker>
                        </v-menu>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-data-table :headers="worklogHeaders" :items="listUserWorklogs" item-key="name"
                            class="elevation-3 usermanagement-table" :search="searchWorklog"
                            :custom-filter="filterOnlyCapsText">
                            <template v-slot:top>
                                <v-text-field v-model="searchWorklog" label="Search" class="mx-4"></v-text-field>
                            </template>
                        </v-data-table>
                    </v-col>
                </v-row>
            </div>
        </div>


        <!-- ADD HOLIDAY DIALOG -->
        <v-dialog v-model="addHolidayModalShowed" persistent max-width="800px" transition="dialog-top-transition">
            <v-card>
                <AddHolidayModal @on-close="onClose" @on-add-holiday="onAddHoliday" :addHolidayInfo="addHolidayInfo" />
            </v-card>
        </v-dialog>
        <!-- EDIT WORKLOG DIALOG -->
        <v-dialog v-model="editWorklogModalShowed" persistent max-width="800px" transition="dialog-top-transition">
            <v-card>
                <EditWorklogModal @on-close="onClose" @on-edit-worklog="onEditWorklog"
                    :editWorklogInfo="editWorklogInfo" />
            </v-card>
        </v-dialog>
        <!-- USER INFO SEEMORE DIALOG -->
        <v-dialog v-model="userSeeMoreModalShowed" v-if="userSeeMoreModalShowed" persistent max-width="1200px"
            transition="dialog-top-transition">
            <v-card color="#FFFBE6">
                <UserSeeMoreModal @on-close="onClose" @on-save-user-see-more="onSaveUserSeeMore"
                    :userDetailInfo="userDetailInfoProp" />
            </v-card>
        </v-dialog>
        <!-- FaceDiaLog SEEMORE DIALOG -->
        <v-dialog v-model="faceRecognitionModalShowed" persistent max-width="1200px" transition="dialog-top-transition">
            <v-card color="#FFFBE6">
                <FaceRegister @on-close="onClose" />
            </v-card>
        </v-dialog>

        <!-- CHANGE PASSWORD DIALOG -->
        <v-dialog v-model="changePasswordDialogShowed" v-if="changePasswordDialogShowed" persistent max-width="800px"
            transition="dialog-top-transition">
            <v-card>
                <v-toolbar class="text-h5" color="primary" dark>Change Password</v-toolbar>
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>

                        <v-container>
                            <v-text-field label="New Password *" :rules="[() => !!newPasswrd || 'This field is required',
                            () => newPasswrd.length >= 6 || 'Password must be at least 6 characters']"
                                v-model="newPasswrd" type="password" hint="Your new password">
                            </v-text-field>
                            <v-text-field label="Confirm Password *" :rules="[() => !!confirmPasswrd || 'This field is required',
                            () => confirmPasswrd === newPasswrd || 'Password does not match']" v-model="confirmPasswrd"
                                type="password" hint="Confirm your new password">
                            </v-text-field>
                        </v-container>
                        <small>*indicates required field</small>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text
                        @click="() => { changePasswordDialogShowed = false; newPasswrd = ''; confirmPasswrd = '' }">
                        Close
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="onChangePassword"> Save </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- ACTIVE ACCOUNT DIALOG -->
        <v-dialog v-model="activeAccountDialogShowed" v-if="activeAccountDialogShowed" persistent max-width="800px"
            transition="dialog-top-transition">
            <v-card>
                <v-toolbar class="text-h5" color="primary" dark>Active Account</v-toolbar>
                <v-card-text>
                    <v-form ref="formActiveAccount" v-model="validActiveAccount" lazy-validation>

                        <v-container>
                            <v-row no-gutters>
                                <v-col cols="12" md="5" offset-md="2">
                                    <span class="text-overline blue--text text--lighten-1">Employee Id:</span>
                                </v-col>
                                <v-col cols="12" md="5" class="d-flex align-center">
                                    <span class="subtitle-2 text-center">{{ userDetailInfo.employee_id }}</span>
                                </v-col>
                            </v-row>
                            <v-row no-gutters>
                                <v-col cols="12" md="5" offset-md="2">
                                    <span class="text-overline blue--text text--lighten-1">Full Name:</span>
                                </v-col>
                                <v-col cols="12" md="5" class="d-flex align-center">
                                    <span class="subtitle-2 text-center">{{ userDetailInfo.first_name }}
                                        {{ userDetailInfo.last_name }}</span>
                                </v-col>
                            </v-row>
                            <v-row no-gutters>
                                <v-col cols="12" md="5" offset-md="2">
                                    <span class="text-overline blue--text text--lighten-1">Gender:</span>
                                </v-col>
                                <v-col cols="12" md="5" class="d-flex align-center">
                                    <span class="subtitle-2 text-center">{{ genderArray[userDetailInfo.gender] }}</span>
                                </v-col>
                            </v-row>
                            <v-row no-gutters>
                                <v-col cols="12" md="5" offset-md="2">
                                    <span class="text-overline blue--text text--lighten-1">TEL:</span>
                                </v-col>
                                <v-col cols="12" md="5" class="d-flex align-center">
                                    <span class="subtitle-2 text-center">{{ userDetailInfo.phone }}</span>
                                </v-col>
                            </v-row>
                            <v-row no-gutters>
                                <v-col cols="12" md="5" offset-md="2">
                                    <span class="text-overline blue--text text--lighten-1">Email Address:</span>
                                </v-col>
                                <v-col cols="12" md="5" class="d-flex align-center">
                                    <span class="subtitle-2 text-center">{{ userDetailInfo.email }}</span>
                                </v-col>
                            </v-row>
                            <v-row no-gutters>
                                <v-col cols="12" md="10" offset-md="2">
                                    <v-checkbox v-model="checkboxActiveAccount" :rules="[v => !!v || 'You must agree to continue!']"
                                        label="Are you sure you want to active this User?" required></v-checkbox>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="() => { activeAccountDialogShowed = false; }">
                        Close
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="onActiveAccount"> Save </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script src="./UserDetail.js"></script>

<style>
.user-detail-title-static {
    font-size: large;
    color: #448aff;
    font-weight: bold;
    display: inline;
}

.user-detail-title {
    font-size: large;
    color: #448aff;
    font-weight: bold;
    display: inline;
}

.user-detail-title:hover {
    color: #0a47b1;
    display: inline;
    cursor: pointer;
}

.text_style {
    font-size: 1rem !important;
    font-family: Roboto, sans-serif !important;
    font-weight: 500;
}


.title-timeline {
    font-size: 20px;
    font-weight: 400;
}

.description-timeline {
    font-size: 18px;
}
</style>