<template>
    <div id="report-receiver-page">
        <v-container>
            <v-data-table v-if="!isEdit" :headers="reportHeader" :items="listMyReport" item-key="dailyreport_id"
                class="elevation-1 report-receiver-table">
                <template v-slot:top>
                    <v-toolbar flat>
                        <v-toolbar-title>My Report</v-toolbar-title>
                    </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-icon @click="editMyReport(item)" medium class="mr-3" style="color: #0080FF">
                        mdi-pencil
                    </v-icon>
                    <v-icon @click="deleteMyReport(item)" medium style="color: red">
                        mdi-delete
                    </v-icon>
                </template>
            </v-data-table>
            <div v-if="isEdit">
                <div class="page-edit-report-title" @click="toggleIsEdit">
                    <v-icon medium color="blue darken-2">mdi-keyboard-return</v-icon>
                    EDIT MY REPORT
                </div>
                <v-row class="mb-3 mt-5">
                    <div>
                        TO:
                        <v-btn small @click="onToggleListUser" id="buttonOpenListUserCardEdit">
                            <v-icon medium color="green darken-2">
                                mdi-account-multiple-plus
                            </v-icon>
                        </v-btn>
                        <v-card v-if="isShowListUser" max-width="300px" id="listUserCardEdit">
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
                                    <img src="../../../../assets/user-default.png" alt="" class="user-image-circle">
                                    <div class="ml-3">{{user.name}}</div>
                                </v-list-item>
                            </v-list>
                        </v-card>
                    </div>
                    <div>
                        <template v-for="(item, i) in listUsers">
                            <v-chip v-if="item.ischecked" :key="i" class="ma-2" close color="primary" label
                                @click:close="item.ischecked = false">
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

                <!-- PROJECT -->
                <v-select class="mt-3" item-text="project_name" item-value="project_id" v-model="projectSelected"
                    :items="listProjects" filled label="Project Name *" persistent-hint return-object
                    @change="onSelectProject">
                </v-select>
                <span class="daily-report-error-label" v-if="isProjectNameEmpty && isShowError">
                    Project name required!
                </span>

                <!-- TODAY TASKS -->
                <div class="mt-3">
                    <v-textarea auto-grow filled rows="3" row-height="35" label="Today tasks *" v-model="tasksValue"
                        @input="onInputTasks">
                    </v-textarea>
                </div>
                <span class="daily-report-error-label" v-if="isTaskEmpty && isShowError">
                    Today task is required!
                </span>

                <!-- PROBLEMS -->
                <div class="mt-3">
                    <v-textarea auto-grow filled rows="2" row-height="35" label="Problems *" v-model="problemsValue"
                        @input="onInputProblems">
                    </v-textarea>
                </div>
                <span class="daily-report-error-label" v-if="isProblemsEmpty && isShowError">
                    Problems is required!
                </span>

                <!-- NEXT PLAN -->
                <div class="mt-3">
                    <v-textarea auto-grow filled rows="2" row-height="35" label="Next day plan *" v-model="nextDayPlan"
                        @input="onInputNextDayPlan">
                    </v-textarea>
                </div>
                <span class="daily-report-error-label" v-if="isNextDayPlanEmpty && isShowError">
                    Next day plan is required!
                </span>

                <!-- STATUS -->
                <v-select v-model="processStatusSelected" :items="processStatusList" filled label="Process status *"
                    persistent-hint return-object @change="onSelectProcessStatus">
                </v-select>
                <span class="daily-report-error-label" v-if="isProcessStatusEmpty && isShowError">
                    Process status is required!
                </span>

                <!-- BUTTON -->
                <v-row class="justify-end">
                    <v-col cols="2">
                        <Button :buttonClass="'md-raised md-primary button-layout'" :buttonTitle="'Save'"
                            @on-click="onSaveMyReport" style="width:100%;" />
                    </v-col>
                </v-row>
            </div>
        </v-container>
    </div>
</template>

<script src="./MyReport.js">
</script>
  
<style src="./MyReport.css" scoped>

</style>