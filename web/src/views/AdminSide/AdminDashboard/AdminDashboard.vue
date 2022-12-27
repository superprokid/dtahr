<!-- eslint-disable -->
<template>
    <!-- <div class="d-flex justify-center " style="width: 100%; height: 100%; ">
        <v-container>
            <v-progress-circular :rotate="-90" :size="100" :width="15" :value="value" color="primary">
                {{ value }}
            </v-progress-circular>
        </v-container>

    </div> -->
    <div class="pa-4 mt-3" style="height: 90vh; overflow-y: auto;">
        <v-card outlined color="#eee">
            <v-card-text>
                <!-- WORKING STATUS / ACTIVITY HISTORY -->
                <v-row no-gutters>
                    <!-- WORKING STATUS -->
                    <v-col cols="12" md="7">
                        <v-card class="mr-6" style="height: 100%">
                            <v-card-text>
                                <v-row no-gutters class="dashboard-title">
                                    WORKING STATUS
                                </v-row>
                                <v-row no-gutters>
                                    <v-col cols="12" md="4" class="d-flex justify-center pt-4">
                                        <div class="d-flex flex-column">
                                            <v-progress-circular :rotate="-90" :size="100" :width="15"
                                                :value="checkinPercentage" color="success">
                                                {{ workingStatus.checkin }}
                                            </v-progress-circular>
                                            <div class="d-flex justify-center text-h5 font-weight-bold black--text">
                                                Check in
                                            </div>
                                        </div>

                                    </v-col>
                                    <v-col cols="12" md="4" class="d-flex justify-center pt-4">
                                        <div class="d-flex flex-column">
                                            <v-progress-circular :rotate="-90" :size="100" :width="15"
                                                :value="checkoutPercentage" color="pink">
                                                {{ workingStatus.checkout }}
                                            </v-progress-circular>
                                            <div class="d-flex justify-center text-h5 font-weight-bold black--text">
                                                Check out
                                            </div>
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="4" class="d-flex justify-center pt-4">
                                        <div class="d-flex flex-column">
                                            <v-progress-circular :rotate="-90" :size="100" :width="15"
                                                :value="notworkingPercentage" color="error">
                                                {{ workingStatus.notWorking }}
                                            </v-progress-circular>
                                            <div class="d-flex justify-center text-h5 font-weight-bold black--text">
                                                Not Working
                                            </div>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <!-- ACTIVITY HISTORY -->
                    <v-col cols="12" md="5">
                        <v-card>
                            <v-card-text>
                                <v-row no-gutters class="dashboard-title">
                                    ACTIVITY STATUS
                                </v-row>
                                <v-row no-gutters>
                                    <v-list subheader two-line style="overflow:auto; height: 200px"
                                        v-if="(workingActivities.length > 0)">
                                        <v-list-item v-for="(item, index) in workingActivities" :key="index">
                                            <v-list-item-avatar>
                                                <v-avatar left>
                                                    <v-img :src="getAvatar(item.avt)" max-height="40" max-width="40">
                                                    </v-img>
                                                </v-avatar>
                                            </v-list-item-avatar>

                                            <v-list-item-content>
                                                <v-list-item-title v-text="item.full_name"></v-list-item-title>

                                                <v-list-item-subtitle v-text="item.job_role"></v-list-item-subtitle>
                                            </v-list-item-content>

                                            <v-list-item-action>
                                                <v-list-item-title v-text="item.time"></v-list-item-title>
                                            </v-list-item-action>
                                        </v-list-item>

                                        <!-- <v-divider inset></v-divider> -->
                                    </v-list>
                                    <v-col v-else
                                        class="d-flex justify-center align-center font-weight-bold black--text"
                                        style="height: 200px; font-size: 20px;">No Activity</v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>

                <!-- WOKING TIME / UPCOMMING HOLIDAY / EXPORT EXCEL -->
                <v-row no-gutters>

                    <v-col cols="12 mt-4" md="12" lg="8">
                        <v-row no-gutters class="mr-4">
                            <v-col cols="6">
                                <v-card class="mr-6">
                                    <v-card-text>
                                        <v-row no-gutters class="dashboard-title">
                                            WORKING TIME
                                        </v-row>
                                        <v-row class="mt-4">
                                            <v-col cols="5">
                                                <span class="font-weight-bold blue--text text--lighten-1">Start
                                                    Working:</span>
                                            </v-col>
                                            <v-col cols="7">
                                                <span class="subtitle-2 black--text">{{formatTime(workingTime.hour_start,workingTime.min_start)}}</span>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="5">
                                                <span class="font-weight-bold blue--text text--lighten-1">Lunch
                                                    Time:</span>
                                            </v-col>
                                            <v-col cols="7">
                                                <span class="subtitle-2 black--text">{{formatTime(workingTime.lunch_hour_start,workingTime.lunch_min_start)}} - {{ formatTime(workingTime.lunch_hour_end,workingTime.lunch_min_end) }}</span>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="5">
                                                <span class="font-weight-bold blue--text text--lighten-1">End
                                                    Working:</span>
                                            </v-col>
                                            <v-col cols="7">
                                                <span class="subtitle-2 black--text">{{ formatTime(workingTime.hour_end,workingTime.min_end)}}</span>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                            <v-col cols="6">
                                <v-card style="height: 100%">
                                    <v-card-text>
                                        <v-row no-gutters class="dashboard-title">
                                            UPCOMING HOLIDAY
                                        </v-row>
                                        <v-row v-for="(item, index) in holiday " :key="index">
                                            <v-col cols="5">
                                                <span class="font-weight-bold blue--text text--lighten-1">{{item.description}}:</span>
                                            </v-col>
                                            <v-col cols="7">
                                                <span class="subtitle-2 black--text">{{ getDateString(item.date)}}</span>
                                            </v-col>
                                        </v-row>

                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                        <v-row no-gutters class="mt-5 mr-5">
                            <v-card>
                                <v-card-text>
                                    <v-row no-gutters class="dashboard-title">
                                        <v-col cols="12" md="6" class="d-flex align-items-center">
                                            PROJECT STATUS
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-row no-gutters>
                                                <v-col cols="12" md="3">

                                                    <div class="pa-1 text-center  text-no-wrap rounded-xl white--text mr-4"
                                                        style="background-color: #ed8077; font-size: 13px;">
                                                        Open
                                                    </div>
                                                </v-col>
                                                <v-col cols="12" md="3">

                                                    <div class="pa-1 text-center  text-no-wrap rounded-xl white--text mr-4"
                                                        style="background-color: #4488c5; font-size: 13px;">
                                                        In Progress
                                                    </div>
                                                </v-col>
                                                <v-col cols="12" md="3">

                                                    <div class="pa-1 text-center  text-no-wrap rounded-xl white--text mr-4"
                                                        style="background-color: #5eb5a6; font-size: 13px;">
                                                        Resolved
                                                    </div>
                                                </v-col>
                                                <v-col cols="12" md="3">

                                                    <div class="pa-1 text-center  text-no-wrap rounded-xl white--text mr-4"
                                                        style="background-color: #a1af2f; font-size: 13px;">
                                                        Closed
                                                    </div>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                    </v-row>

                                    <v-row>
                                        <v-list flat style="height: 350px; overflow: auto">
                                            <v-list-item-group color="primary">
                                                <v-list-item v-for="(item, i) in projectStatus" :key="i"
                                                    @click="onClickProjectStatus(item)">
                                                    <v-row>
                                                        <v-col cols="2" class="black--text" style="font-weight: 600">
                                                            {{ item.project_name }}
                                                        </v-col>
                                                        <v-col col="10">
                                                            <div>
                                                                <div class="elevation-4"
                                                                    v-if="(!item.open && !item.inProgress && !item.resolved && !item.closed)"
                                                                    :style="`width: ${100}%!important`"
                                                                    style="display:inline-block">
                                                                    <v-progress-linear height="15" value="100"
                                                                        color="grey" />
                                                                </div>
                                                                <div class="elevation-4"
                                                                    :style="`width: ${item.openPercentage}%!important`"
                                                                    style="display:inline-block">
                                                                    <v-progress-linear height="15" value="100"
                                                                        color="#ed8077" />
                                                                </div>
                                                                <div class="elevation-4"
                                                                    :style="`width: ${item.inProgressPercentage}%!important`"
                                                                    style="display:inline-block">
                                                                    <v-progress-linear height="15" value="100"
                                                                        color="#4488c5" />
                                                                </div>
                                                                <div class="elevation-4"
                                                                    :style="`width: ${item.resolvedPercentage}%!important`"
                                                                    style="display:inline-block">
                                                                    <v-progress-linear height="15" value="100"
                                                                        color="#5eb5a6" />
                                                                </div>
                                                                <div class="elevation-4"
                                                                    :style="`width: ${item.closedPercentage}%!important`"
                                                                    style="display:inline-block">
                                                                    <v-progress-linear height="15" value="100"
                                                                        color="#a1af2f" />
                                                                </div>
                                                            </div>

                                                            <v-row no-gutters>
                                                                <v-col cols="12" md="12"
                                                                    class="d-flex justify-end text-subtitle-2">
                                                                    {{ isNaN(item.closedPercentage) ? 0 :
                                                                            item.closedPercentage
                                                                    }}% Closed

                                                                </v-col>
                                                            </v-row>
                                                        </v-col>
                                                    </v-row>
                                                </v-list-item>
                                            </v-list-item-group>
                                        </v-list>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-row>
                    </v-col>
                    <v-col cols="12 mt-4" md="12" lg="4">
                        <v-card style="height: 100%">
                            <v-card-text>
                                <v-row no-gutters>
                                    <v-row no-gutters class="dashboard-title">
                                        EXPORT EXCEL
                                    </v-row>
                                    <v-row no-gutters>
                                        <v-col cols="12" class="d-flex justify-center">
                                            <v-radio-group v-model="csvSelect" row>
                                                <v-radio v-for="option in csvOption" :key="option.value"
                                                    :label="option.name" :value="option.value"></v-radio>
                                            </v-radio-group>
                                        </v-col>
                                    </v-row>
                                    <v-row no-gutters>
                                        <v-col cols="12" class="d-flex justify-center">
                                            <v-date-picker v-model="monthSelect" type="month" elevation="5"
                                                :allowed-dates="allowedMonths">
                                            </v-date-picker>
                                        </v-col>
                                    </v-row>
                                    <v-row no-gutters class="mt-5">
                                        <v-col cols="12" class="d-flex justify-center">
                                            <v-btn :loading="loading" :disabled="loading || !isDateValid" color="blue"
                                                class="ma-2 white--text" @click="exportCSV">
                                                Download
                                                <v-icon right dark> mdi-download-circle-outline </v-icon>
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-row>

                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </div>


</template>

<script src="./AdminDashboard.js"></script>

<style scoped>
.v-progress-circular {
    margin: 1rem;
}

.dashboard-title {
    font-size: large;
    color: #448aff;
    font-weight: bold;
}
</style>