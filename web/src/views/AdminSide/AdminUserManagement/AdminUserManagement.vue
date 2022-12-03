<template>
    <div class="pa-4" style="height: 90vh; overflow-y: auto;">


        <div id="employee-search-condition" v-if="employeeSearchShowed">
            <v-container>
                <div class="user-detail-title-static">
                    EMPLOYEE MANAGEMENT
                </div>

                <div class="mt-5">
                    <v-toolbar class="text-h5" color="secondary" dark>
                        <v-toolbar-title>Search Area</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn class="ma-2" text @click="expand = !expand">
                            <v-icon>
                                mdi-menu-swap
                            </v-icon>
                        </v-btn>

                    </v-toolbar>
                    <v-expand-transition>
                        <v-card outlined color="#eee" v-show="expand">
                            <v-card-text>
                                <v-form ref="form" v-model="valid" lazy-validation>
                                    <v-row no-gutters :align="'center'" justify="center">
                                        <v-col cols="12" md="4">
                                            <v-autocomplete class="pt-4" v-model="selectGroup" :items="listGroups" dense
                                                label="Group Name" clearable item-text="group_full_name"
                                                item-value="group_id" return-object @change="onChangeGroup">
                                            </v-autocomplete>
                                        </v-col>

                                        <v-col cols="12" md="4" class="pt-4" offset-md="1">
                                            <v-text-field dense v-model="emailSearch" clearable
                                                label="Email"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row no-gutters :align="'center'" justify="center">
                                        <v-col cols="12" md="4">
                                            <v-text-field dense v-model="fullnameSearch" clearable
                                                label="Full Name"></v-text-field>
                                        </v-col>

                                        <v-col cols="12" md="4" offset-md="1">
                                            <v-autocomplete class="" v-model="genderSearch" clearable label="Gender"
                                                :items="genderItems" dense item-text="gender_text"
                                                item-value="gender_value">
                                            </v-autocomplete>
                                        </v-col>
                                    </v-row>

                                    <v-row no-gutters :align="'center'" justify="center">
                                        <v-col cols="12" md="4">
                                            <v-text-field dense v-model="phoneSearch" clearable
                                                label="Phone"></v-text-field>

                                        </v-col>

                                        <v-col cols="12" md="4" offset-md="1">
                                            <v-text-field dense v-model="mainSkillSearch" clearable
                                                label="Main Skill"></v-text-field>

                                        </v-col>
                                    </v-row>
                                    <v-row no-gutters :align="'center'" justify="center">
                                        <v-col cols="12" md="4">
                                            <v-text-field dense v-model="jobRoleSearch" clearable
                                                label="Position"></v-text-field>

                                        </v-col>

                                        <v-col cols="12" md="4" offset-md="1">

                                        </v-col>
                                    </v-row>
                                
                                    <v-row justify="center" class="mb-4">
                                        <v-btn :disabled="!valid" color="success" max-width="170px" dark class="mr-4"
                                            @click="onClickSearchEmployee">
                                            Search
                                        </v-btn>

                                        <v-btn color="error" class="mr-4" max-width="170px" dark @click="reset">
                                            Clear
                                        </v-btn>

                                    </v-row>

                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-expand-transition>
                </div>

                <div class="mt-5">
                    <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn color="primary" dark v-bind="attrs" v-on="on">
                                Actions
                                <v-icon>mdi-menu-down</v-icon>
                            </v-btn>

                        </template>
                        <v-list>
                            <v-list-item>
                                <v-btn text @click="onClickCreateUser">
                                    <v-icon style="margin-right: 10px">
                                        mdi-account-multiple-plus-outline
                                    </v-icon>
                                    Create User
                                </v-btn>
                            </v-list-item>
                            <v-list-item>
                                <v-btn text @click="onClickDeleteUser"
                                    :disabled="userSelected.length >= 2 || userSelected.length == 0">
                                    <v-icon style="margin-right: 10px">
                                        mdi-trash-can-outline
                                    </v-icon>
                                    Disable User
                                </v-btn>
                            </v-list-item>
                            <v-list-item>
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
                            </v-list-item>
                            <v-list-item>
                                <v-btn text @click="onClickExportEmployee" :disabled="userSelected.length == 0">
                                    <v-icon style="margin-right: 10px">
                                        mdi-file-export-outline
                                    </v-icon>
                                    Export Employee
                                </v-btn>
                            </v-list-item>
                            <v-list-item>
                                <v-btn text @click="onClickExportWorklog" :disabled="userSelected.length == 0">
                                    <v-icon style="margin-right: 10px">
                                        mdi-file-export-outline
                                    </v-icon>
                                    Export Employee Worklog
                                </v-btn>
                            </v-list-item>

                        </v-list>
                    </v-menu>
                    <v-data-table v-model="userSelected" :headers="AdminEmployeeManagementHeaders" :items="listFiltered"
                        item-key="employee_id" :item-class="setItemRowCLass" class="elevation-4 usermanagement-table"
                        :search="search" show-select :single-select="singleSelectEmployeeManagement"
                        :custom-filter="filterOnlyCapsText" @click:row="clickOnUser">
                        <template v-slot:top>
                            <v-switch v-model="singleSelectEmployeeManagement" label="Single select" class="pa-3">
                            </v-switch>
                            <v-text-field v-model="search" label="Search" class="mx-4"></v-text-field>
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
                                    <v-img :src="getAvatar(item.avt)" max-height="25" max-width="25"></v-img>
                                </v-avatar>
                                {{ item.full_name }}
                            </div>
                        </template>
                    </v-data-table>
                </div>
            </v-container>

        </div>

        <!-- CREATE USER DIALOG -->
        <v-dialog v-model="CreateUserDialogShowed" v-if="CreateUserDialogShowed" persistent max-width="800px"
            transition="dialog-top-transition">
            <v-card>
                <AddNewUserModal @on-close="onClose" @on-create-user="onCreateUser" />
            </v-card>
        </v-dialog>

        <!-- NOTIFICATION CREATE USER SUCCESS -->
        <v-dialog v-model="CreateUserDialogSuccessShowed" persistent max-width="800px"
            transition="dialog-top-transition">
            <v-card>
                <CreateUserSuccessModal @on-close="onClose" :createUserSuccessInfo="createUserSuccessInfo" />
            </v-card>
        </v-dialog>

        <!-- CONFIRM DELETE USER DIALOG -->
        <v-dialog v-model="ConfirmDeleteUserDialogShowed" persistent max-width="800px"
            transition="dialog-top-transition">
            <v-card>
                <ConfirmDeleteUserModal @on-close="onClose" :confirmDeleteInfo="confirmDeleteUserInfo"
                    @on-confirm-delete-user="onConfirmDeleteUser" />
            </v-card>
        </v-dialog>

        <!-- CHANGE USER ROLE DIALOG -->
        <v-dialog v-model="ChangeUserRoleDialogShowed" v-if="ChangeUserRoleDialogShowed" persistent max-width="600px"
            transition="dialog-top-transition">
            <v-card>
                <ChangeUserRoleModal @on-close="onClose" @on-change-user-role="onChangeUserRole"
                    :changeUserRoleInfo="changeUserRoleInfo" />
            </v-card>
        </v-dialog>

        <!-- CHANGE USER GROUP DIALOG -->
        <v-dialog v-model="ChangeUserGroupDialogShowed" v-if="ChangeUserGroupDialogShowed" persistent max-width="600px"
            transition="dialog-top-transition">
            <v-card>
                <ChangeUserGroupModal @on-close="onClose" @on-change-user-group="onChangeUserGroup"
                    :changeUserGroupInfo="changeUserGroupInfo" />
            </v-card>
        </v-dialog>

        <!-- EXPORT EMPLOYEE WORKLOG DIALOG -->
        <v-dialog v-model="ExportWorklogDialogShowed" persistent max-width="600px" transition="dialog-top-transition">
            <v-card>
                <ExportEmployeeWorklogModal @on-close="onClose" @on-export-worklog-employee="onExportWorklogEmployee" />
            </v-card>
        </v-dialog>
    </div>

</template>

<script src="./AdminUserManagement.js"></script>

<style>
.item-row {
    cursor: pointer;
}

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
</style>