<template>
    <div id="usermanagement">
        <v-container class="main-page">
            <div class="page-title"> USER MANAGEMENT </div>

            <!-- show table users to select -->
            <div v-if="isTableUserShowed">
                <v-app id="usermanagement-table-container">
                    <v-data-table :headers="headers" :items="listUsers" item-key="name"
                        class="elevation-1 usermanagement-table" :search="search" :custom-filter="filterOnlyCapsText"
                        @click:row="clickOnUser">
                        <template v-slot:top>
                            <v-text-field v-model="search" label="Search" class="mx-4"></v-text-field>
                        </template>
                    </v-data-table>
                </v-app>
            </div>

            <!-- show usermanagement feature -->
            <div v-if="isUserManagementLayoutShowed">
                <v-row>
                    <!-- user information -->
                    <v-col cols="4">
                        <v-card style="padding: 10px; height: 100%;" class="pa-2" outlined>
                            <v-row class="d-flex flex-row justify-space-between">
                                <v-col cols="6">
                                    <div class="text_style">Personal Information </div>
                                </v-col>
                                <v-col cols="6">
                                    <v-app>
                                        <div style="text-align: end">
                                            <v-btn @click="onClickUserSeeMore" style="height: 100%; text-align: end"
                                                text color="primary">
                                                See More
                                            </v-btn>
                                        </div>
                                    </v-app>
                                </v-col>
                            </v-row>
                            <hr>

                            <v-app>
                                <v-list-item three-line>
                                    <v-list-item-content>
                                        <div class="text-overline ">
                                            Employee ID: {{userSelected.employee_id}}
                                        </div>
                                        <div class="text-overline ">
                                            Full Name: {{userSelected.full_name}}
                                        </div>
                                        <div class="text-overline ">
                                            Email: {{userSelected.email}}
                                        </div>
                                        <!-- <div class="text-overline ">
                                            DOB: {{userSelected.dob}}
                                        </div>
                                        <div class="text-overline ">
                                            Gender: {{userSelected.gender}}
                                        </div>
                                        <div class="text-overline ">
                                            Phone: {{userSelected.phone}}
                                        </div> -->
                                        <div class="text-overline ">
                                            Main Skill: {{userSelected.main_skill}}
                                        </div>
                                        <div class="text-overline ">
                                            Salary: {{userSelected.salary}}
                                        </div>
                                        <div class="text-overline ">
                                            Join Date: {{userSelected.join_date}}
                                        </div>
                                        <div class="text-overline ">
                                            Working in Project: {{userSelected.project_name}}
                                        </div>
                                        <!-- <v-list-item-title class="text-h5 mb-1">
                                            Headline 5
                                        </v-list-item-title>
                                        <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully
                                        </v-list-item-subtitle> -->
                                    </v-list-item-content>

                                    <v-list-item-avatar class="rounded-circle" tile size="80" color="grey">
                                        <img src="@/assets/user-default.png" alt="">
                                    </v-list-item-avatar>

                                </v-list-item>
                            </v-app>

                        </v-card>
                    </v-col>

                    <v-col cols="4" class="">
                        <v-card style="padding: 10px; height: 100%;" class="pa-2" outlined>
                            <v-row class="d-flex flex-row justify-space-between">
                                <v-col cols="6">
                                    <div class="text_style">Working projects</div>
                                </v-col>
                                <!-- <v-col cols="6">
                                    <v-app>
                                        <div style="text-align: end">
                                            <v-btn @click="onClickWorklogSeeMore" style="height: 100%; text-align: end"
                                                text color="primary">
                                                See More
                                            </v-btn>
                                        </div>
                                    </v-app>
                                </v-col> -->
                            </v-row>
                            <hr>

                            <v-app>
                                <v-list-item three-line>
                                    <v-list-item-content>
                                        <div class="text-overline ">
                                            Project ID: 18110072
                                        </div>
                                        <div class="text-overline ">
                                            Project Name: {{userSelected.project_name}}
                                        </div>
                                        <div class="text-overline ">
                                            Client Name: Dinh Tuan An
                                        </div>
                                        <div class="text-overline ">
                                            Manager Name: ThangLD
                                        </div>
                                        <div class="text-overline ">
                                            Number of people in the project: 5
                                        </div>
                                        <div class="text-overline ">
                                            Join Project Date: 2022-01-01
                                        </div>

                                    </v-list-item-content>

                                </v-list-item>
                            </v-app>
                        </v-card>
                    </v-col>

                    <!-- user Worklogs -->
                    <v-col cols="4">
                        <v-card style="padding: 10px; height: 100%;" class="pa-2" outlined>
                            <v-row class="d-flex flex-row justify-space-between">
                                <v-col cols="6">
                                    <div class="text_style"> Worklog </div>
                                </v-col>
                                <v-col cols="6">
                                    <v-app>
                                        <div style="text-align: end">
                                            <v-btn @click="onClickWorklogSeeMore" style="height: 100%; text-align: end"
                                                text color="primary">
                                                See More
                                            </v-btn>
                                        </div>
                                    </v-app>

                                </v-col>
                            </v-row>
                            <hr>

                            <v-app>
                                <v-list-item three-line>
                                    <v-list-item-content>
                                        <div class="text-overline ">
                                            Employee ID: {{userSelected.employee_id}}
                                        </div>
                                        <div class="text-overline ">
                                            Full Name: {{userSelected.full_name}}
                                        </div>
                                        <div class="text-overline ">
                                            Work Date: <span>{{singleUserWorklog.work_date}}</span>
                                        </div>
                                        <div class="text-overline ">
                                            Checkin At: {{singleUserWorklog.create_at}}
                                        </div>
                                        <div class="text-overline ">
                                            Recent Activity: {{singleUserWorklog.update_at}}
                                        </div>
                                        <div class="text-overline ">
                                            Status: {{singleUserWorklog.work_status}}
                                        </div>
                                        <div class="text-overline ">
                                            Work Total: {{singleUserWorklog.work_total}}
                                        </div>

                                        <!-- <v-list-item-title class="text-h5 mb-1">
                                            Headline 5
                                        </v-list-item-title>
                                        <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully
                                        </v-list-item-subtitle> -->
                                    </v-list-item-content>
                                </v-list-item>
                            </v-app>

                        </v-card>
                    </v-col>
                </v-row>


                <!-- History Tracking of employee -->
                <v-row>
                    <v-col cols="12">
                        <v-card class="pa-2" outlined>
                            <v-app>
                                <v-container class="pt-0" id="history-tracking">

                                    <v-row class="mb-2 ">
                                        <v-col class="d-flex align-end">
                                            <h4 class="d-inline-block ">Current Annual Holiday: </h4>
                                            <h4 class="d-inline-block red--text ml-1">
                                                {{startDataUser.holiday_time.toFixed(3)}}</h4>

                                        </v-col>
                                        <v-col cols="3" class="d-flex align-items-center">
                                            <DateTimePicker v-if="startDate" :selectDate="startDate"
                                                @select-date="onInputStartDate" :dateTimePickerTitle="'From'">
                                            </DateTimePicker>
                                        </v-col>
                                        <v-col cols="3" class="d-flex align-items-center">
                                            <DateTimePicker v-if="endDate" :selectDate="endDate"
                                                @select-date="onInputEndDate" :dateTimePickerTitle="'To'">
                                            </DateTimePicker>
                                        </v-col>


                                    </v-row>
                                    <VuetifyDialog :username="userSelected.full_name" :id="userSelected.employee_id"/>
                                    <div>
                                    </div>
                                    <hr>
                                    <div style="height: 600px; overflow-y: auto; padding: 0 20px;">
                                        <v-timeline dense clipped style="padding-top: 0; margin-top: 10px;">
                                            <div v-for="(value, index) in Object.keys(userTrackingHistory)"
                                                :key="index">
                                                <v-timeline-item fill-dot
                                                    class="black--text mb-6 d-flex align-items-center"
                                                    color="orange lighten-2" large icon="mdi-check-all">

                                                    <p class="title-timeline">End activities {{ value }}</p>
                                                </v-timeline-item>

                                                <v-timeline-item v-for="(item, index) in userTrackingHistory[value]"
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
                                                        item.workhistory_description }} </v-col>
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
                                                    v-if="index < Object.keys(userTrackingHistory).length - 1 ">
                                                </v-timeline-item>
                                            </div>
                                        </v-timeline>
                                    </div>

                                </v-container>
                            </v-app>
                        </v-card>
                    </v-col>

                    <!-- <v-col cols="2">
                        <v-card class="pa-2" outlined>
                            2
                        </v-card>
                    </v-col> -->

                </v-row>
            </div>

            <!-- Show worklogs of specific user -->
            <div v-if="isUserWorklogSeeMoreShowed">

                <div class="white-background">
                    <v-row>
                        <v-col cols="3" class="d-flex align-items-center">
                            <DateTimePicker :selectDate="startDate" @select-date="onInputStartDate"
                                :dateTimePickerTitle="'From'"></DateTimePicker>
                        </v-col>
                        <v-col cols="3" class="d-flex align-items-center">
                            <DateTimePicker :selectDate="endDate" @select-date="onInputEndDate"
                                :dateTimePickerTitle="'To'"></DateTimePicker>
                        </v-col>
                    </v-row>
                    <br>
                    <br>

                    <v-app>
                        <v-data-table :headers="worklogHeaders" :items="listUserWorklogs" item-key="name"
                            class="elevation-1 usermanagement-table" :search="search"
                            :custom-filter="filterOnlyCapsText">
                            <template v-slot:top>
                                <v-text-field v-model="search" label="Search" class="mx-4"></v-text-field>
                            </template>
                        </v-data-table>
                    </v-app>
                </div>


            </div>
            <v-app>
                <EmployeeModal v-model="openDialog" :propPackage="propPackage" />
                <!-- <v-row>
                    <v-col class="d-flex justify-center">
                        <v-btn @click="bookDialog('Standard')" color="primary">Show dialog</v-btn>
                    </v-col>
                </v-row> -->
            </v-app>

        </v-container>


    </div>
</template>

<script src="./UserManagement.js"></script>
<style scoped src="./UserManagement.css">

</style>