<template>
    <div>
        <div class="ml-4 project-detail-title" v-if="isProjectDetailShowed">
            PROJECT DETAIL {{ this.$route.params.projectId }}
        </div>
        <div class="ml-4 project-task-title" v-if="isProjectTaskShowed" @click="goBackProjectDetail">
            <v-icon medium color="blue darken-2">mdi-keyboard-return</v-icon>
            PROJECT TASKS
        </div>

        <div class="pa-4 mt-3" style="height: 90vh; overflow-y: auto;">
            <v-card outlined color="#eee">
                <v-card-text>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <div v-if="isProjectTaskShowed">
                            <v-row no-gutters>
                                <v-col cols="12">
                                    <span class="text-subtitle-2">Status: </span>
                                    <div class="ml-4" style="display: inline-block">
                                        <v-radio-group row class="my-radio-group-container">
                                            <input v-model="selectedStatus" class="my-radio-input" type="radio"
                                                id="status5" name="jeff" value="5">
                                            <label class="my-radio-label" for="status5">All</label>
                                            <input v-model="selectedStatus" class="my-radio-input" type="radio"
                                                id="status0" name="jeff" value="0">
                                            <label class="my-radio-label" for="status0">Open</label>
                                            <input v-model="selectedStatus" class="my-radio-input" type="radio"
                                                id="status1" name="jeff" value="1">
                                            <label class="my-radio-label" for="status1">In Progress</label>
                                            <input v-model="selectedStatus" class="my-radio-input" type="radio"
                                                id="status2" name="jeff" value="2">
                                            <label class="my-radio-label" for="status2">Resolve</label>
                                            <input v-model="selectedStatus" class="my-radio-input" type="radio"
                                                id="status3" name="jeff" value="3">
                                            <label class="my-radio-label" for="status3">Closed</label>
                                            <input v-model="selectedStatus" class="my-radio-input" type="radio"
                                                id="status4" name="jeff" value="4">
                                            <label class="my-radio-label" for="status4">Not Closed</label>
                                        </v-radio-group>
                                    </div>
                                </v-col>
                            </v-row>
                            <v-row no-gutters class="mt-4">
                                <v-col cols="12" md="6" lg="5" xl="3" class="pr-10 pt-0">
                                    <v-row no-gutters class="text-subtitle-2">
                                        Category
                                    </v-row>
                                    <v-row no-gutters>
                                        <v-autocomplete v-model="categorySelected" clearable solo
                                            :items="listCategories" item-text="category_name" item-value="category_id">
                                        </v-autocomplete>
                                    </v-row>
                                </v-col>
                                <v-col cols="12" md="6" lg="5" xl="3" class="pr-10 pt-0">
                                    <v-row class="text-subtitle-2">
                                        Assignee
                                    </v-row>
                                    <v-row>
                                        <v-autocomplete v-model="employeeSelected" clearable solo :items="listUsers"
                                            item-text="name" item-value="employee_id">
                                            <template v-slot:selection="data">
                                                <div style="min-width: 80%" v-bind="data.attrs"
                                                    :input-value="data.selected" close @click="data.select">
                                                    <v-avatar left>
                                                        <v-img max-height="30" max-width="30"
                                                            :src="getAvatar(data.item.avt)"></v-img>
                                                    </v-avatar>
                                                    {{ data.item.name }}
                                                </div>
                                            </template>
                                            <template v-slot:item="data">
                                                <template>
                                                    <v-list-item-avatar>
                                                        <v-img max-height="35" max-width="35"
                                                            :src="getAvatar(data.item.avt)"></v-img>
                                                    </v-list-item-avatar>
                                                    <v-list-item-content>
                                                        <v-list-item-title v-html="data.item.name">
                                                        </v-list-item-title>
                                                        <v-list-item-subtitle v-html="data.item.group">
                                                        </v-list-item-subtitle>
                                                    </v-list-item-content>
                                                </template>
                                            </template>
                                        </v-autocomplete>
                                    </v-row>
                                </v-col>
                                <v-col cols="10" md="6" lg="5" xl="3" class="pr-10 pt-0">
                                    <v-row class="text-subtitle-2">
                                        Keyword
                                    </v-row>
                                    <v-row>
                                        <v-text-field v-model="keyword" label="Enter Keyword" solo></v-text-field>
                                    </v-row>
                                </v-col>
                                <v-col cols="2" md="2" lg="2" xl="3" class=" d-flex align-center">
                                    <v-btn class="mx-2" fab dark small color="primary" @click="() => { searchTasks() }">
                                        <v-icon dark>
                                            mdi-magnify
                                        </v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>

                            <v-row no-gutters class="mt-2">
                                <v-data-table :headers="headers" :items="listFiltered" class="elevation-1"
                                    style="min-width: 900px" :item-class="setItemRowCLass">
                                    <template v-slot:item.task_id="{ item }">
                                        <a class="task-key">{{ item.task_number }}</a>
                                    </template>
                                    <template v-slot:item.category_name="{ item }">
                                        <v-chip small :color="item.category_color" dark>
                                            {{ item.category_name }}
                                        </v-chip>
                                    </template>
                                    <template v-slot:item.assignee="{ item }">
                                        <div class="assignee-container">
                                            <v-avatar left>
                                                <v-img :src="getAvatar(item.avt)" max-height="25" max-width="25"></v-img>
                                            </v-avatar>
                                            {{ item.assignee }}
                                        </div>
                                    </template>
                                    <template v-slot:item.status="{ item }">
                                        <div>
                                            <v-chip small :color="getStatus(item.status).color" dark>
                                                {{ getStatus(item.status).text }}
                                            </v-chip>
                                        </div>
                                    </template>
                                    <template v-slot:item.priority="{ item }">
                                        <v-icon :color="priorityColorArr[item.priority]">
                                            {{ priorityIconArr[item.priority] }}
                                        </v-icon>
                                    </template>
                                    <template v-slot:item.end_date="{ item }">
                                        <div v-if="item.isLate" style="color: red">
                                            {{ item.end_date }}
                                            <v-icon color="red">
                                                mdi-fire
                                            </v-icon>
                                        </div>
                                        <div v-else>{{ item.end_date }}</div>
                                    </template>
                                </v-data-table>
                            </v-row>
                        </div>
                        <div v-if="isProjectDetailShowed">
                            <v-row no-gutters>
                                <v-col cols="12" md="6" class="text-h6 font-weight-bold">
                                    Project Information
                                </v-col>
                                <v-col cols="12" md="3">
                                    <span class="text-h6 font-weight-bold">
                                        Status
                                    </span>
                                </v-col>
                                <v-col cols="12" md="3" class="d-flex justify-end">
                                    <v-btn @click="onClickSeeProjectTask" color="primary">
                                        Project Tasks
                                    </v-btn>
                                </v-col>
                            </v-row>
                            <!-- project info / status project -->
                            <v-row no-gutters class="mt-3">
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
                                                            <span class="subtitle-2">{{ projectDetailInfo.number
                                                            }}</span>
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
                                                <div class="elevation-4"
                                                    v-if="(!percentageOpen && !percentageInProgress && !percentageResolved && !percentageClosed)"
                                                    :style="`width: ${100}%!important`" style="display:inline-block">
                                                    <v-progress-linear height="15" value="100" color="grey" />
                                                </div>
                                                <div class="elevation-4" :style="`width: ${percentageOpen}%!important`"
                                                    style="display:inline-block">
                                                    <v-progress-linear height="15" value="100" color="#ed8077" />
                                                </div>
                                                <div class="elevation-4"
                                                    :style="`width: ${percentageInProgress}%!important`"
                                                    style="display:inline-block">
                                                    <v-progress-linear height="15" value="100" color="#4488c5" />
                                                </div>
                                                <div class="elevation-4"
                                                    :style="`width: ${percentageResolved}%!important`"
                                                    style="display:inline-block">
                                                    <v-progress-linear height="15" value="100" color="#5eb5a6" />
                                                </div>
                                                <div class="elevation-4"
                                                    :style="`width: ${percentageClosed}%!important`"
                                                    style="display:inline-block">
                                                    <v-progress-linear height="15" value="100" color="#a1af2f" />
                                                </div>
                                            </div>

                                            <v-row no-gutters>
                                                <v-col cols="12" md="12" class="d-flex justify-end text-subtitle-2">
                                                    {{ isNaN(percentageClosed) ? 0 : percentageClosed }}% Closed

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

                            <!-- project employee table title -->
                            <v-row>
                                <v-col cols="12" md="12" class="text-h6 font-weight-bold">
                                    Project Employee
                                </v-col>
                            </v-row>
                            <!-- assignment employee project table -->
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
                                        :items="listProjectEmployee" item-key="employee_id"
                                        :item-class="setItemRowCLass" class="elevation-4" :search="employeeSearch"
                                        show-select :single-select="singleSelectProjectEmployee"
                                        :custom-filter="filterOnlyCapsText">
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
                        </div>

                    </v-form>
                </v-card-text>
            </v-card>
        </div>
        <!-- CREATE USER DIALOG -->
        <v-dialog v-model="AddEmployeeToProjectDialogShowed" v-if="AddEmployeeToProjectDialogShowed" persistent
            max-width="800px" transition="dialog-top-transition">
            <v-card>
                <AddEmployeeToProjectModal @on-close="onClose" @on-add-employee-to-project="onAddEmployeeToProject"
                    :projectIdProp="projectIdProp" />
            </v-card>
        </v-dialog>
        <!-- CONFIRM DELETE EMPLOYEE OUT PROJECT DIALOG -->
        <v-dialog v-model="DeleteEmployeeOutProjectDialogShowed" persistent max-width="800px"
            transition="dialog-top-transition">
            <v-card>
                <DeleteEmployeeOutProjectModal @on-close="onClose"
                    @on-delete-employee-out-project="onDeleteEmployeeOutProject"
                    :confirmDeleteInfo="confirmDeleteEmployeeOutProjectInfo" />
            </v-card>
        </v-dialog>
    </div>
</template>

<script src="./AdminProjectDetail.js"></script>

<style scoped>
.project-detail-title {
    font-size: large;
    color: #448aff;
    font-weight: bold;
}

.project-task-title {
    font-size: large;
    color: #448aff;
    font-weight: bold;
}

.project-task-title:hover {
    color: #0a47b1;
    display: inline;
    cursor: pointer;
}

.my-radio-group-container {
    margin-top: 0px;
    color: 'red'
}

.my-radio-label {
    display: inline-block;
    border: solid 2px none;
    padding: 3px 10px;
}

.my-radio-label:hover {
    cursor: pointer;
}

.my-radio-input[type="radio"] {
    display: none;
}

.my-radio-input[type="radio"]:checked+label {
    background: #154c79;
    border-radius: 20px;
    color: white
}
</style>