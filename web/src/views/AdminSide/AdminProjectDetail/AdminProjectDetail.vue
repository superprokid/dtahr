<template>
    <div>
        project detail {{ this.$route.params.projectId }}
        <div class="pa-4" style="height: 90vh; overflow-y: auto;">
            <v-card outlined color="#eee">
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-row no-gutters>
                            <v-col cols="12" md="6" class="text-h6 font-weight-bold">
                                Project Information
                            </v-col>
                            <v-col cols="12" md="6">
                                <span class="text-h6 font-weight-bold">
                                    Status
                                </span>
                            </v-col>
                        </v-row>
                        <!-- project info / status project -->
                        <v-row no-gutters>
                            <v-col cols="12" md="6">
                                <v-card class="mr-6">

                                    <v-card-text>
                                        <v-row no-gutters>
                                            <v-row no-gutters>
                                                <v-col cols="12" md="6">
                                                    <div>
                                                        <span
                                                            class="text-overline blue--text text--lighten-1 mr-2">Project:</span>
                                                        <span class="subtitle-2">{{ projectDetailInfo.project_id }}
                                                        </span>
                                                    </div>
                                                </v-col>
                                                <v-col cols="12" md="6">
                                                    <div>
                                                        <span
                                                            class="text-overline blue--text text--lighten-1 mr-2">Project
                                                            Name:</span>
                                                        <span class="subtitle-2">{{ projectDetailInfo.project_name
                                                        }}</span>
                                                    </div>
                                                </v-col>
                                            </v-row>
                                            <v-row no-gutters>
                                                <v-col cols="12" md="6">
                                                    <div>
                                                        <span
                                                            class="text-overline blue--text text--lighten-1 mr-2">Client
                                                            Name:</span>
                                                        <span class="subtitle-2">{{ projectDetailInfo.client_id
                                                        }}</span>
                                                    </div>
                                                </v-col>
                                                <v-col cols="12" md="6">
                                                    <div>
                                                        <span
                                                            class="text-overline blue--text text--lighten-1 mr-2">Number
                                                            of People:</span>
                                                        <span class="subtitle-2">{{ projectDetailInfo.number }}</span>
                                                    </div>
                                                </v-col>
                                            </v-row>
                                            <v-row no-gutters>
                                                <v-col cols="12" md="12">
                                                    <div>
                                                        <span
                                                            class="text-overline blue--text text--lighten-1 mr-2">Project
                                                            Manager:</span>
                                                        <v-avatar left>
                                                            <v-img :src="getAvatar(projectDetailInfo.manager_avt)"
                                                                alt="" max-height="25" max-width="25"
                                                                style="display: inline-block"></v-img>

                                                        </v-avatar>
                                                        <span class="subtitle-2">{{
                                                                projectDetailInfo.manager_full_name
                                                        }}</span>
                                                    </div>
                                                </v-col>
                                            </v-row>
                                            <v-row no-gutters>
                                                <v-col cols="12" md="12">
                                                    <div>
                                                        <span
                                                            class="text-overline blue--text text--lighten-1 mr-2">Manager
                                                            Assigned Date:</span>
                                                        <span class="subtitle-2">{{
                                                                projectDetailInfo.project_manager_assigned_date
                                                        }}</span>
                                                    </div>
                                                </v-col>
                                            </v-row>

                                        </v-row>

                                    </v-card-text>

                                </v-card>
                            </v-col>
                            <!-- STATUS PROJECT -->
                            <v-col cols="12" md="6">
                                <v-card style="height: 100%">
                                    <v-card-text style="height: 100%" class="d-flex flex-column">

                                        <div>
                                            <div class="elevation-4" :style="`width: ${percentageOpen}%!important`"
                                                v-if="(percentageOpen > 0)" style="display:inline-block">
                                                <v-progress-linear height="15" value="100" color="#ed8077" />
                                            </div>
                                            <div class="elevation-4" v-if="Number(percentageInProgress) > 0"
                                                :style="`width: ${percentageInProgress}%!important`"
                                                style="display:inline-block">
                                                <v-progress-linear height="15" value="100" color="#4488c5" />
                                            </div>
                                            <div class="elevation-4" :style="`width: ${percentageResolved}%!important`"
                                                v-if="(percentageResolved > 0)" style="display:inline-block">
                                                <v-progress-linear height="15" value="100" color="#5eb5a6" />
                                            </div>
                                            <div class="elevation-4" :style="`width: ${percentageClosed}%!important`"
                                                v-if="(percentageClosed > 0)" style="display:inline-block">
                                                <v-progress-linear height="15" value="100" color="#a1af2f" />
                                            </div>
                                        </div>
                                        <v-row no-gutters>
                                            <v-col cols="12" md="12" class="d-flex justify-end text-subtitle-2">
                                                {{ percentageClosed }}% Closed
                                            </v-col>
                                        </v-row>
                                        <v-row no-gutters :align="'end'">
                                            <v-col cols="12" md="3">
                                                <div class="d-flex justify-center text-subtitle-2">
                                                    Open
                                                </div>
                                                <div class="pa-1 text-center  text-no-wrap rounded-xl white--text mr-4"
                                                    style="background-color: #ed8077;">
                                                    {{ projectStatusInfo.open }}
                                                </div>
                                            </v-col>
                                            <v-col cols="12" md="3">
                                                <div class="d-flex justify-center text-subtitle-2">
                                                    In Progress
                                                </div>
                                                <div class="pa-1 text-center  text-no-wrap rounded-xl white--text mr-4"
                                                    style="background-color: #4488c5;">
                                                    {{ projectStatusInfo.inprogress }}
                                                </div>
                                            </v-col>
                                            <v-col cols="12" md="3">
                                                <div class="d-flex justify-center text-subtitle-2">
                                                    Resolved
                                                </div>
                                                <div class="pa-1 text-center  text-no-wrap rounded-xl white--text mr-4"
                                                    style="background-color: #5eb5a6;">
                                                    {{ projectStatusInfo.resolved }}
                                                </div>
                                            </v-col>
                                            <v-col cols="12" md="3">
                                                <div class="d-flex justify-center text-subtitle-2">
                                                    Closed
                                                </div>
                                                <div class="pa-1 text-center  text-no-wrap rounded-xl white--text mr-4"
                                                    style="background-color: #a1af2f;">
                                                    {{ projectStatusInfo.closed }}
                                                </div>
                                            </v-col>

                                        </v-row>

                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>

                        <!-- table project's employee -->
                        <v-row>
                            <v-col cols="12" md="12" class="text-h6 font-weight-bold">
                                Project Employee
                            </v-col>
                        </v-row>

                        <v-row no-gutters class="mt-2">
                            <v-col cols="12">
                                <v-menu offset-y>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn color="primary" dark v-bind="attrs" v-on="on">
                                            Actions
                                            <v-icon>mdi-menu-down</v-icon>
                                        </v-btn>

                                    </template>
                                    <v-list>
                                        <v-list-item>
                                            <v-btn text @click="onClickAddEmployeeToProject">
                                                <v-icon style="margin-right: 10px">
                                                    mdi-account-multiple-plus-outline
                                                </v-icon>
                                                Add Employee To Project
                                            </v-btn>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-btn text @click="onClickRemoveEmployeeOutProject"
                                                :disabled="projectEmployeeSelected.length >= 2 || projectEmployeeSelected.length == 0">
                                                <v-icon style="margin-right: 10px">
                                                    mdi-trash-can-outline
                                                </v-icon>
                                                Remove Employee
                                            </v-btn>
                                        </v-list-item>
                                        <!-- <v-list-item>
                                            <v-btn text @click="onClickChangeRoleUser"
                                                :disabled="userSelected.length >= 2 || userSelected.length == 0">
                                                <v-icon style="margin-right: 10px">
                                                    mdi-account-arrow-up-outline
                                                </v-icon>
                                                Change Role
                                            </v-btn>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-btn text @click="onClickChangeGroupUser"
                                                :disabled="userSelected.length >= 2 || userSelected.length == 0">
                                                <v-icon style="margin-right: 10px">
                                                    mdi-account-cog-outline
                                                </v-icon>
                                                Change Group
                                            </v-btn>
                                        </v-list-item> -->

                                    </v-list>
                                </v-menu>
                                <v-data-table v-model="projectEmployeeSelected" :headers="projectEmployeeHeaders"
                                    :items="listProjectEmployee" item-key="employee_id" :item-class="setItemRowCLass"
                                    class="elevation-4" :search="employeeSearch" show-select
                                    :single-select="singleSelectProjectEmployee" :custom-filter="filterOnlyCapsText">
                                    <template v-slot:top>
                                        <v-switch v-model="singleSelectProjectEmployee" label="Single select"
                                            class="pa-3">
                                        </v-switch>
                                        <v-text-field v-model="employeeSearch" label="Search"
                                            class="mx-4"></v-text-field>
                                    </template>
                                    <template v-slot:item.is_deleted="{ item }">
                                        <div class="grey--text" v-if="item.is_deleted">
                                            Disable
                                        </div>
                                        <div class="green--text" v-else>
                                            Active
                                        </div>
                                    </template>
                                    <template v-slot:item.full_name="{ item }">
                                        <div class="assignee-container">
                                            <v-avatar left>
                                                <v-img :src="getAvatar(item.avt)" max-height="25"
                                                    max-width="25"></v-img>
                                            </v-avatar>
                                            {{ item.full_name }}
                                        </div>
                                    </template>
                                </v-data-table>
                            </v-col>

                        </v-row>
                    </v-form>
                </v-card-text>
            </v-card>
        </div>
        <!-- CREATE USER DIALOG -->
        <v-dialog v-model="AddEmployeeToProjectDialogShowed" v-if="AddEmployeeToProjectDialogShowed" persistent max-width="800px"
            transition="dialog-top-transition">
            <v-card>
                <AddEmployeeToProjectModal @on-close="onClose"  @on-add-employee-to-project="onAddEmployeeToProject" :projectIdProp="projectIdProp"/>
            </v-card>
        </v-dialog>
        <!-- CONFIRM DELETE EMPLOYEE OUT PROJECT DIALOG -->
        <v-dialog v-model="DeleteEmployeeOutProjectDialogShowed"  persistent max-width="800px"
            transition="dialog-top-transition">
            <v-card>
                <DeleteEmployeeOutProjectModal @on-close="onClose"  @on-delete-employee-out-project="onDeleteEmployeeOutProject" :confirmDeleteInfo="confirmDeleteEmployeeOutProjectInfo"/>
            </v-card>
        </v-dialog>
    </div>
</template>

<script src="./AdminProjectDetail.js"></script>