<!-- eslint-disable -->
<template>
    <div class="pa-4 mt-3" style="height: 90vh; overflow-y: auto;">
        <!-- MOT CACH KHAC DE DESTROY DIALOG -->
        <!-- <v-btn @click="showDialog = true">Show Dialog</v-btn>
        <v-dialog v-if="showDialog" v-model="showDialog" max-width="800px">
            <v-card>
                <AddGroupModal @on-close="onClose" />
            </v-card>
        </v-dialog> -->

        <!-- GROUP MANAGEMENT LAYOUT -->
        <div v-if="isAdminGroupManagementShowed">
            <div class="group-management-title">
                GROUP MANAGEMENT
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
                            <v-btn @click="AddGroupDialogShowed = true" text>
                                <v-icon style="margin-right: 10px">
                                    mdi-receipt-text-plus-outline
                                </v-icon>
                                Add Group
                            </v-btn>
                        </v-list-item>
                        <v-list-item>
                            <v-btn @click="onClickEditGroup" text
                                :disabled="selected.length >= 2 || selected.length == 0">
                                <v-icon style="margin-right: 10px">
                                    mdi-text-box-edit-outline
                                </v-icon>
                                Edit Group
                            </v-btn>
                        </v-list-item>
                        <v-list-item>
                            <v-btn @click="onClickDeleteGroup" text
                                :disabled="selected.length == 0 || selected.length >= 2">
                                <v-icon style="margin-right: 10px">
                                    mdi-trash-can-outline
                                </v-icon>
                                Delete Group
                            </v-btn>
                        </v-list-item>
                        <v-list-item>
                            <v-btn @click="onClickExportGroup" text
                                :disabled="selected.length == 0">
                                <v-icon style="margin-right: 10px">
                                    mdi-file-export-outline
                                </v-icon>
                                Export Group
                            </v-btn>
                        </v-list-item>
                        <v-list-item>
                            <v-btn @click="onClickImportEmployee" text
                                :disabled="(selected.length == 0 || selected.length >= 2)">
                                <v-icon style="margin-right: 10px">
                                    mdi-file-import-outline
                                </v-icon>
                                Import Employee
                            </v-btn>
                        </v-list-item>
                    </v-list>
                </v-menu>

                <!-- TABLE OF GROUP -->
                <v-data-table v-model="selected" :headers="headers" :items="listGroup" :item-class="setItemRowCLass"
                    :single-select="singleSelect" :search="search" :custom-filter="filterOnlyCapsText"
                    item-key="group_id" show-select class="elevation-1" @click:row="onClickGroupRow">
                    <template v-slot:top>
                        <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch>
                        <v-text-field v-model="search" label="Search" class="mx-4"></v-text-field>
                    </template>
                    <template v-slot:item.manager_name="{ item }">
                        <div class="assignee-container">
                            <v-avatar left>
                                <v-img :src="getAvatar(item.avt)" max-height="25" max-width="25"></v-img>
                            </v-avatar>
                            {{ item.manager_name }}
                        </div>
                    </template>
                </v-data-table>
<!-- 
                <p>Selected:</p>
                {{ selected }} -->
            </div>
        </div>

        <!-- EMPLOYEE MANAGEMENT LAYOUT -->
        <div v-if="isAdminEmployeeManagementShowed">
            <div class="admin-employee-management-title" @click="goBackGroupManagementLayout">
                <v-icon medium color="blue darken-2">mdi-keyboard-return</v-icon>
                EMPLOYEE MANAGEMENT
            </div>

            <!-- <AdminEmployeeManagement :groupRowSelected="groupRowSelectedProp" :testmethod="testmethod"/> -->
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
                                :disabled="AdminEmployeeManagementSelected.length >= 2 || AdminEmployeeManagementSelected.length == 0">
                                <v-icon style="margin-right: 10px">
                                    mdi-trash-can-outline
                                </v-icon>
                                Disable User
                            </v-btn>
                        </v-list-item>
                        <v-list-item>
                            <v-btn text @click="onClickChangeRoleUser"
                                :disabled="AdminEmployeeManagementSelected.length >= 2 || AdminEmployeeManagementSelected.length == 0">
                                <v-icon style="margin-right: 10px">
                                    mdi-account-arrow-up-outline
                                </v-icon>
                                Change Role
                            </v-btn>
                        </v-list-item>
                        <v-list-item>
                            <v-btn text @click="onClickChangeGroupUser"
                                :disabled="AdminEmployeeManagementSelected.length >= 2 || AdminEmployeeManagementSelected.length == 0">
                                <v-icon style="margin-right: 10px">
                                    mdi-account-cog-outline
                                </v-icon>
                                Change Group
                            </v-btn>
                        </v-list-item>
                        <v-list-item>
                            <v-btn text @click="onClickExportEmployee"
                                :disabled="AdminEmployeeManagementSelected.length == 0">
                                <v-icon style="margin-right: 10px">
                                    mdi-file-export-outline
                                </v-icon>
                                Export Employee Infor
                            </v-btn>
                        </v-list-item>
                        <v-list-item>
                            <v-btn text @click="onClickExportWorklog"
                                :disabled="AdminEmployeeManagementSelected.length == 0">
                                <v-icon style="margin-right: 10px">
                                    mdi-file-export-outline
                                </v-icon>
                                Export Employee Worklog
                            </v-btn>
                        </v-list-item>

                    </v-list>
                </v-menu>
                <v-data-table v-model="AdminEmployeeManagementSelected" :headers="AdminEmployeeManagementHeaders"
                    :items="listUsersOfSpecificGroup" item-key="employee_id" :item-class="setItemRowCLass" show-select
                    :single-select="singleSelectEmployeeManagement" class="elevation-1" :search="search"
                    @click:row="onClickUserRow" :custom-filter="filterOnlyCapsText">
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

        </div>

        <!-- CREATE USER DIALOG -->
        <v-dialog v-model="CreateUserDialogShowed" v-if="CreateUserDialogShowed" persistent max-width="800px"
            transition="dialog-top-transition">
            <v-card>
                <CreateUserModal @on-close="onClose" :groupRowSelected="groupRowSelectedProp"
                    @on-create-user="onCreateUser" />
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

        <!-- ADD GROUP DIALOG -->
        <v-dialog v-model="AddGroupDialogShowed" v-if="AddGroupDialogShowed" persistent max-width="800px">
            <!-- <template v-slot:activator="{ on, attrs }">
                <v-icon style="margin-right: 10px" v-bind="attrs" v-on="on">mdi-text-box-edit-outline
                </v-icon>
                <v-list-item-title v-bind="attrs" v-on="on">Add</v-list-item-title>
            </template> -->
            <v-card>
                <AddGroupModal @on-close="onClose" @on-create-group="onCreateGroup" />
            </v-card>
        </v-dialog>

        <!-- EDIT GROUP DIALOG -->
        <v-dialog v-model="EditGroupDialogShowed" v-if="EditGroupDialogShowed" persistent max-width="800px">
            <v-card>
                <EditGroupModal @on-close="onClose" :editDialogProp="editDialogProp" @on-edit-group="onEditGroup" />
            </v-card>
        </v-dialog>


        <!-- NOTIFICITION ADD SUCCESS DIALOG -->
        <v-dialog v-model="AddGroupSuccessDialogShowed" persistent max-width="600px" transition="dialog-top-transition">
            <v-card>
                <AddGroupSuccessModal @on-close="onClose" :addGroupSuccessInfo="addGroupSuccessInfo" />
            </v-card>
        </v-dialog>

        <!-- NOTIFICITION DELETE SUCCESS DIALOG -->
        <v-dialog v-model="DeleteGroupSuccessDialogShowed" persistent max-width="600px"
            transition="dialog-top-transition">
            <v-card>
                <DeleteGroupSuccessModal @on-close="onClose" />
            </v-card>
        </v-dialog>

        <!-- NOTIFICITION BEFORE DELETE DIALOG -->
        <v-dialog v-model="ConfirmDeleteGroupDialogShowed" v-if="ConfirmDeleteGroupDialogShowed" persistent
            max-width="600px" transition="dialog-top-transition">
            <v-card>
                <ConfirmDeleteGroupModal @on-close="onClose" @on-confirm-delete="onConfirmDeleteGroup"
                    :confirmDeleteInfo="confirmDeleteInfo" />
            </v-card>
        </v-dialog>

        <!-- NOTIFICATION AFTER EDIT SUCCESS -->
        <v-dialog v-model="EditGroupSuccessDialogShowed" persistent max-width="600px"
            transition="dialog-top-transition">
            <v-card>
                <EditGroupSuccessModal @on-close="onClose" :editGroupSuccessInfo="editGroupSuccessInfo" />
            </v-card>
        </v-dialog>

        <!-- CHANGE USER ROLE DIALOG -->
        <v-dialog v-model="ChangeUserRoleDialogShowed" v-if="ChangeUserRoleDialogShowed" persistent max-width="600px"
            transition="dialog-top-transition">
            <v-card>
                <ChangeUserRoleModal @on-close="onClose" @on-change-user-role="onChangeUserRole" :changeUserRoleInfo="changeUserRoleInfo"/>
            </v-card>
        </v-dialog>

        <!-- CHANGE USER GROUP DIALOG -->
        <v-dialog v-model="ChangeUserGroupDialogShowed" v-if="ChangeUserGroupDialogShowed" persistent max-width="600px"
            transition="dialog-top-transition">
            <v-card>
                <ChangeUserGroupModal @on-close="onClose" @on-change-user-group="onChangeUserGroup" :changeUserGroupInfo="changeUserGroupInfo"/>
            </v-card>
        </v-dialog>

        <!-- EXPORT EMPLOYEE WORKLOG DIALOG -->
        <v-dialog v-model="ExportWorklogDialogShowed"  persistent max-width="600px"
            transition="dialog-top-transition">
            <v-card>
                <ExportEmployeeWorklogModal @on-close="onClose" @on-export-worklog-employee="onExportWorklogEmployee"/>
            </v-card>
        </v-dialog>

        <!-- IMPORT EMPLOYEE DIALOG -->
        <v-dialog v-model="importEmployeeDialogShowed" v-if="importEmployeeDialogShowed" persistent max-width="1000px"
            transition="dialog-top-transition">
            <v-card>
                <ImportEmployeeModal @on-close="onClose" :groupPropInfo="groupPropInfo" :messageImportFail="messageImportFail" @on-import-employee="onImportEmployee"/>
            </v-card>
        </v-dialog>
        
    </div>
</template>

<script src="./AdminGroup.js"></script>

<style scoped src="./AdminGroup.css">

</style>