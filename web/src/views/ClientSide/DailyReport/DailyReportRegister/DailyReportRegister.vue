<template>
    <v-app>
        <v-container class="border p-3">
            <div class="">
                <md-toolbar class="mb-3" md-elevation="0">
                    <h3 class="md-title">Daily Report Form</h3>
                </md-toolbar>
                <v-row class="mb-3">
                    <div>
                        TO:
                        <v-btn small @click="onToggleListUser" id="buttonOpenListUserCard" >
                            <v-icon medium color="green darken-2">
                                mdi-account-multiple-plus
                            </v-icon>
                        </v-btn>
                        <v-card v-if="isShowListUser" max-width="300px" id="listUserCard">
                            <v-toolbar flat color="transparent">
                                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search News"
                                    single-line>
                                </v-text-field>
                            </v-toolbar>
                            <v-list three-line class="list-search-user-container">
                                <v-list-item v-for="(user, i) in searching" :key="i" ripple @click="() => {}">
                                    <v-checkbox v-model="user.ischecked">
                                    </v-checkbox>
                                    <!-- <img :src="user.avt ? user.avt : '../../../../assets/user-default.png'" alt=""
                                        class="user-image-circle"> -->
                                    <img :src="getAvt(user.avt)" alt="" class="user-image-circle">
                                    <div class="ml-3">{{user.name}}</div>
                                </v-list-item>
                            </v-list>
                        </v-card>
                    </div>
                    <div>
                        <template v-for="(item, i) in listUsers">
                            <v-chip v-if="item.ischecked" :key="i" class="ma-2" close color="primary" label @click:close="item.ischecked = false" >
                                <v-icon left>
                                    mdi-account-circle-outline
                                </v-icon>
                                {{item.name}}
                            </v-chip>
                        </template>
                    </div>
                </v-row>
                <span class="daily-report-error-label mt-3" v-if="isListSelectedUserEmpty && isShowError">
                    You must select receiver!
                </span>
                <v-select class="mt-3" item-text="project_name" item-value="project_id" v-model="projectSelected"
                    :items="listProjects" filled label="Project Name *" persistent-hint return-object
                    @change="onSelectProject">
                </v-select>
                <span class="daily-report-error-label" v-if="isProjectNameEmpty && isShowError">
                    Project name required!
                </span>

                <div class="mt-3">
                    <v-textarea auto-grow filled rows="3" row-height="35" label="Today tasks *" v-model="tasksValue"
                        @input="onInputTasks">
                    </v-textarea>
                </div>
                <span class="daily-report-error-label" v-if="isTaskEmpty && isShowError">
                    Today task is required!
                </span>

                <div class="mt-3">
                    <v-textarea auto-grow filled rows="2" row-height="35" label="Problems *" v-model="problemsValue"
                        @input="onInputProblems">
                    </v-textarea>
                </div>
                <span class="daily-report-error-label" v-if="isProblemsEmpty && isShowError">
                    Problems is required!
                </span>

                <div class="mt-3">
                    <v-textarea auto-grow filled rows="2" row-height="35" label="Next day plan *" v-model="nextDayPlan"
                        @input="onInputNextDayPlan">
                    </v-textarea>
                </div>
                <span class="daily-report-error-label" v-if="isNextDayPlanEmpty && isShowError">
                    Next day plan is required!
                </span>

                <v-select v-model="processStatusSelected" :items="processStatusList" filled label="Process status *"
                    persistent-hint return-object @change="onSelectProcessStatus">
                </v-select>

                <span class="daily-report-error-label" v-if="isProcessStatusEmpty && isShowError">
                    Process status is required!
                </span>
                <v-row class="justify-end pb-5">
                    <v-col cols="2">
                        <Button :buttonClass="'md-raised md-primary button-layout'" :buttonTitle="'Register'"
                            @on-click="onClickRegisterButton" style="width:100%" />
                    </v-col>
                    <v-col cols="2">
                        <Button :buttonClass="'md-raised md-primary button-layout'" :buttonTitle="'Reset'"
                            @on-click="onClickResetButton" style="width:100%;" />
                    </v-col>
                </v-row>

            </div>
        </v-container>
    </v-app>
</template>

<script src="./DailyReportRegister.js"></script>

<style src="./DailyReportRegister.css" scoped>

</style>