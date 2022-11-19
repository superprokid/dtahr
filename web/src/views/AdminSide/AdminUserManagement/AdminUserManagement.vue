<template>
    <div id="usermanagement">
        <v-container class="main-page ml-0">
            <div class="page-title" v-if="!isUserManagementLayoutShowed && !isUserWorklogSeeMoreShowed"> USER MANAGEMENT </div>

            <!-- show table users to select -->
            <div v-if="isTableUserShowed">
                <v-app id="usermanagement-table-container">
                    <v-data-table :headers="headers" :items="listUsers" item-key="name" :item-class="setItemRowCLass"
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
                <div class="page-edit-report-title" @click="toggleIsUserManagement">
                    <v-icon medium color="blue darken-2">mdi-keyboard-return</v-icon>
                    EMPLOYEE MANAGEMENT
                </div>
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
                                        <!-- <div class="text-overline ">
                                            Employee ID:
                                             
                                        </div>
                                        <div class="text-overline ">
                                            Full Name: 
                                        </div>
                                        <div class="text-overline ">
                                            Email: 
                                        </div>
                                        <div class="text-overline ">
                                            DOB: {{userSelected.dob}}
                                        </div>
                                        <div class="text-overline ">
                                            Gender: {{userSelected.gender}}
                                        </div>
                                        <div class="text-overline ">
                                            Phone: {{userSelected.phone}}
                                        </div>
                                        <div class="text-overline ">
                                            Main Skill: 
                                        </div>
                                        <div class="text-overline ">
                                            Salary: {{userSelected.salary}}
                                        </div>
                                        <div class="text-overline ">
                                            Join Date: {{userSelected.join_date}}
                                        </div>
                                        <div class="text-overline ">
                                            Working in Project: {{userSelected.project_name}}
                                        </div> -->

                                        <div class=" ">
                                            <span class="text-overline blue--text text--lighten-1">Employee ID:</span>
                                            <span class="subtitle-2">{{userSelected.employee_id}}</span> 
                                        </div>
                                        <div class=" ">
                                            <span class="text-overline blue--text text--lighten-1">Full Name:</span>
                                            <span class="subtitle-2">{{userSelected.full_name}}</span> 
                                        </div>
                                        <div class=" ">
                                            <span class="text-overline blue--text text--lighten-1">Email:</span>
                                            <span class="subtitle-2">{{userSelected.email}}</span> 
                                        </div>
                                        <div class=" ">
                                            <span class="text-overline blue--text text--lighten-1">Main Skill:</span>
                                            <span class="subtitle-2">{{userSelected.main_skill}}</span> 
                                        </div>
                                        <div class=" ">
                                            <span class="text-overline blue--text text--lighten-1">Salary:</span>
                                            <span class="subtitle-2">{{userSelected.salary}}</span> 
                                        </div>
                                        <div class=" ">
                                            <span class="text-overline blue--text text--lighten-1">Join Date:</span>
                                            <span class="subtitle-2">{{userSelected.join_date}}</span> 
                                        </div>
                                        

                                        
                                    </v-list-item-content>

                                    <v-list-item-avatar class="rounded-circle" tile size="80" color="grey">
                                        <img :src="avtBaseUrl+'/'+informationOfUserClicked.avt" alt="" v-if="informationOfUserClicked.avt != null">
                                        <img src="@/assets/user-default.png" alt="" v-else>
                                    </v-list-item-avatar>

                                </v-list-item>
                            </v-app>

                        </v-card>
                    </v-col>

                    <v-col cols="4" class="">
                        <v-card style="padding: 10px; height: 100%;" class="pa-2" outlined>
                            <v-row class="d-flex flex-row justify-space-between">
                                <v-col cols="6">
                                    <div class="text_style">Working Project</div>
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
                                        <div class=" ">
                                            <span class="text-overline blue--text text--lighten-1">Project ID:</span>
                                            <span class="subtitle-2">{{projectUserJoined.project_id}}</span>
                                             
                                        </div>
                                        <div class=" ">
                                            <span class="text-overline blue--text text--lighten-1">Project Name:</span>
                                            <span class="subtitle-2" style="font-size: 0.75rem">{{projectUserJoined.project_name}}</span>
                                        </div>
                                        <!-- <div class=" ">
                                            Project Manager ID: {{projectUserJoined.project_manager_id}}
                                        </div> -->
                                        <div class=" ">
                                            <span class="text-overline blue--text text--lighten-1">Project Manager Name:</span>
                                            <span class="subtitle-2">{{projectUserJoined.project_manager_name}}</span>
                                        </div>
                                        <div class=" ">
                                            <span class="text-overline blue--text text--lighten-1">Client Name:</span>
                                            <span class="subtitle-2">{{projectUserJoined.client_id}}</span>
                                        </div>
                                        <div class=" ">
                                            <span class="text-overline blue--text text--lighten-1">Number People:</span>
                                            <span class="subtitle-2">{{projectUserJoined.number}}</span>
                                             
                                        </div>
                                        <div class=" ">
                                            <span class="text-overline blue--text text--lighten-1">Employee Join Date:</span>
                                            <span class="subtitle-2">{{projectUserJoined.assigned_date | dateFormatDisplay}}</span>
                                             
                                        </div>
                                        <div class=" ">
                                            <span class="text-overline blue--text text--lighten-1"> Manager Join Date:</span>
                                            <span class="subtitle-2">{{projectUserJoined.project_manager_assigned_date | dateFormatDisplay}}</span>
                                            
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
                                        <div class=" ">
                                            <span class="text-overline blue--text text--lighten-1" >Employee ID:</span>
                                            <span class="subtitle-2">{{userSelected.employee_id}}</span> 
                                        </div>
                                        <div class=" ">
                                            <span class="text-overline blue--text text--lighten-1">Full Name:</span>
                                            <span class="subtitle-2">{{userSelected.full_name}}</span> 
                                        </div>
                                        <div class=" ">
                                            <span class="text-overline blue--text text--lighten-1"> Work Date:</span>
                                            <span class="subtitle-2">{{singleUserWorklog.work_date}}</span> 
                                        </div>
                                        <div class=" ">
                                            <span class="text-overline blue--text text--lighten-1">Checkin At:</span>
                                            <span class="subtitle-2">{{singleUserWorklog.create_at}}</span> 
                                        </div>
                                        <div class=" ">
                                            <span class="text-overline blue--text text--lighten-1">Recent Activity:</span>
                                            <span class="subtitle-2">{{singleUserWorklog.update_at}}</span> 
                                        </div>
                                        <div class=" ">
                                            <span class="text-overline blue--text text--lighten-1">Status:</span>
                                            <span class="subtitle-2">{{singleUserWorklog.work_status}}</span> 
                                        </div>
                                        <div class=" ">
                                            <span class="text-overline blue--text text--lighten-1">Work Total:</span>
                                            <span class="subtitle-2"> {{singleUserWorklog.work_total}}</span> 
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
                                                {{informationOfUserClicked.holiday_time | holidayDisplay}}</h4>

                                        </v-col>
                                        <v-col cols="3" class="d-flex align-items-center">
                                            <DateTimePicker v-if="startActivityDate" :selectDate="startActivityDate"
                                                @select-date="onInputStartActivityDate" :dateTimePickerTitle="'From'">
                                            </DateTimePicker>
                                        </v-col>
                                        <v-col cols="3" class="d-flex align-items-center">
                                            <DateTimePicker v-if="endActivityDate" :selectDate="endActivityDate"
                                                @select-date="onInputEndActivityDate" :dateTimePickerTitle="'To'">
                                            </DateTimePicker>
                                        </v-col>


                                    </v-row>
                                    <VuetifyDialog :isAdminEdit="true" :username="userSelected.full_name" :id="userSelected.employee_id"
                                    @on-update-worklog="onUpdateWorklog"/>
                                    <div>
                                    </div>
                                    <hr>
                                    <div style="height: 600px; overflow-y: auto; padding: 0 20px;">
                                        <v-timeline dense clipped style="padding-top: 0; margin-top: 10px;">
                                            <div v-for="(value, index) in Object.keys(specificHistoryOfUser)"
                                                :key="index">
                                                <v-timeline-item fill-dot
                                                    class="black--text mb-6 d-flex align-items-center"
                                                    color="orange lighten-2" large icon="mdi-check-all">

                                                    <p class="title-timeline">End activities {{ value }}</p>
                                                </v-timeline-item>

                                                <v-timeline-item v-for="(item, index) in specificHistoryOfUser[value]"
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
                                                    v-if="index < Object.keys(specificHistoryOfUser).length - 1 ">
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
                <div class="page-edit-report-title" @click="toggleIsManagementFeature">
                    <v-icon medium color="blue darken-2">mdi-keyboard-return</v-icon>
                    MANAGEMENT FEATURE
                </div>
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
                <EmployeeModal v-model="openDialog" :propPackage="propPackage" :isAdminEdit="true"/>
                <!-- <v-row>
                    <v-col class="d-flex justify-center">
                        <v-btn @click="bookDialog('Standard')" color="primary">Show dialog</v-btn>
                    </v-col>
                </v-row> -->
            </v-app>

        </v-container>


    </div>
</template>

<script src="./AdminUserManagement.js"></script>
<style scoped src="./AdminUserManagement.css">

</style>

<style>
.item-row {
    cursor: pointer;
}
</style>