<template>
    <v-app>
        <v-container class="border p-3">
            <div class="">
                <md-toolbar class="mb-3" md-elevation="0">
                    <h3 class="md-title">Daily Report Form</h3>
                </md-toolbar>
                <v-select item-text="project_name" item-value="project_id" v-model="projectSelected"
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

                <v-select v-model="processStatusSelected" :items="processStatusList" filled label="Project Name *"
                    persistent-hint return-object @change="onSelectProcessStatus">
                </v-select>

                <span class="daily-report-error-label" v-if="isProcessStatusEmpty && isShowError">
                    Process status is required!
                </span>
                <v-row>
                    <v-card class="mx-auto">
                        <v-toolbar flat color="transparent">
                            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search News" single-line>
                            </v-text-field>
                        </v-toolbar>
                        <v-list three-line class="list-search-user-container">
                            <v-list-item v-for="(item, i) in searching" :key="i" ripple @click="() => {}">
                                <v-checkbox v-model="selected" value="John">
                                </v-checkbox>
                                <img src="../../../../assets/user-default.png" alt="" class="user-image-circle">
                                <p>Thang Le Duc</p>
                            </v-list-item>
                        </v-list>
                    </v-card>
                </v-row>
                <v-row>
                    abc
                </v-row>
                <v-row class="justify-end">
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