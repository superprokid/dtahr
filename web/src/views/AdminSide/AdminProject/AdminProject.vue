<template>
    <div class="pa-4 mt-3" style="height: 90vh; overflow-y: auto;">
        <div class="admin-project-title-static">
            PROJECT MANAGEMENT
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
                        <v-btn @click="AddProjectDialogShowed = true" text>
                            <v-icon style="margin-right: 10px">
                                mdi-receipt-text-plus-outline
                            </v-icon>
                            Add Project
                        </v-btn>
                    </v-list-item>
                    <v-list-item>
                        <v-btn @click="onClickEditProject" text
                            :disabled="selected.length >= 2 || selected.length == 0">
                            <v-icon style="margin-right: 10px">
                                mdi-text-box-edit-outline
                            </v-icon>
                            Edit Project
                        </v-btn>
                    </v-list-item>
                    <v-list-item>
                        <v-btn @click="onClickDeleteProject" text
                            :disabled="selected.length == 0 || selected.length >= 2">
                            <v-icon style="margin-right: 10px">
                                mdi-trash-can-outline
                            </v-icon>
                            Delete Project
                        </v-btn>
                    </v-list-item>
                    <v-list-item>
                        <v-btn @click="onClickExportProject" text :disabled="selected.length == 0">
                            <v-icon style="margin-right: 10px">
                                mdi-file-export-outline
                            </v-icon>
                            Export Project
                        </v-btn>
                    </v-list-item>
                </v-list>
            </v-menu>

            <!-- TABLE OF PROJECT -->
            <v-data-table v-model="selected" :headers="projectHeaders" :items="listProjects"
                :item-class="setItemRowCLass" :single-select="singleSelect" :search="search"
                :custom-filter="filterOnlyCapsText" item-key="project_id" show-select class="elevation-1"
                @click:row="onClickProjectRow">
                <template v-slot:top>
                    <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch>
                    <v-text-field v-model="search" label="Search" class="mx-4"></v-text-field>
                </template>
                <template v-slot:item.manager_full_name="{ item }">
                    <div class="assignee-container">
                        <v-avatar left>
                            <v-img :src="getAvatar(item.manager_avt)" max-height="25" max-width="25"></v-img>
                        </v-avatar>
                        {{ item.manager_full_name }}
                    </div>
                </template>
            </v-data-table>

            <!-- <p>Selected:</p>
            {{ selected }} -->
        </div>

        <!-- ADD PROJECT DIALOG -->
        <v-dialog v-model="AddProjectDialogShowed" v-if="AddProjectDialogShowed" persistent max-width="800px">
            <v-card>
                <AddProjectModal @on-close="onClose" @on-create-project="onCreateProject" />
            </v-card>
        </v-dialog>
        <!-- EDIT PROJECT DIALOG -->
        <v-dialog v-model="EditProjectDialogShowed" v-if="EditProjectDialogShowed" persistent max-width="800px">
            <v-card>
                <EditProjectModal @on-close="onClose" :editProjectInfo="editProjectInfo"
                    @on-edit-project="onEditProject" />
            </v-card>
        </v-dialog>
        <!-- DELETE PROJECT DIALOG -->
        <v-dialog v-model="DeleteProjectDialogShowed" v-if="DeleteProjectDialogShowed" persistent max-width="800px">
            <v-card>
                <DeleteProjectModal @on-close="onClose" :deleteProjectInfo="deleteProjectInfo"
                    @on-delete-project="onDeleteProject" />
            </v-card>
        </v-dialog>

    </div>
</template>

<script src="./AdminProject.js"></script>

<style>
.item-row {
    cursor: pointer;
}

.admin-project-title-static {
    font-size: large;
    color: #448aff;
    font-weight: bold;
    display: inline;
}

.admin-project-title {
    font-size: large;
    color: #448aff;
    font-weight: bold;
    display: inline;
}

.admin-project-title:hover {
    color: #0a47b1;
    display: inline;
    cursor: pointer;
}
</style>