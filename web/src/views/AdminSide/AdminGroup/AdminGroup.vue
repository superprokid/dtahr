<!-- eslint-disable -->
<template>
    <div>
        <!-- MOT CACH KHAC DE DESTROY DIALOG -->
        <!-- <v-btn @click="showDialog = true">Show Dialog</v-btn>
        <v-dialog v-if="showDialog" v-model="showDialog" max-width="800px">
            <v-card>
                <AddGroupModal @on-close="onClose" />
            </v-card>
        </v-dialog> -->
        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on">
                    Tương Tác
                    <v-icon>mdi-menu-down</v-icon>
                </v-btn>

            </template>
            <v-list>
                <v-list-item>
                    <v-btn @click="AddGroupDialogShowed = true" text>
                        <v-icon style="margin-right: 10px" >
                            mdi-receipt-text-plus-outline
                        </v-icon>
                        Add Group
                    </v-btn>
                </v-list-item>

                <!-- <v-list-item @click="() => {onClickEditGroup()}">
                    <v-icon style="margin-right: 10px">mdi-text-box-edit-outline</v-icon>
                    <v-list-item-title>Edit</v-list-item-title>
                </v-list-item> -->
                <v-list-item>
                    <v-btn @click="onClickEditGroup" text :disabled="selected.length >= 2 || selected.length == 0">
                        <v-icon style="margin-right: 10px" >
                            mdi-text-box-edit-outline
                        </v-icon>
                        Edit Group
                    </v-btn>
                </v-list-item>
                <v-list-item @click="() => {onClickDeleteGroup()}">
                    <v-icon style="margin-right: 10px">mdi-trash-can-outline</v-icon>
                    <v-list-item-title>Delete</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>

        <!-- ADD GROUP DIALOG -->
        <v-dialog v-model="AddGroupDialogShowed" v-if="AddGroupDialogShowed" persistent max-width="800px">
            <!-- <template v-slot:activator="{ on, attrs }">
                <v-icon style="margin-right: 10px" v-bind="attrs" v-on="on">mdi-text-box-edit-outline
                </v-icon>
                <v-list-item-title v-bind="attrs" v-on="on">Add</v-list-item-title>
            </template> -->
            <v-card>
                <AddGroupModal  @on-close="onClose" @on-create-group="onCreateGroup" />
            </v-card>
        </v-dialog>

        <!-- EDIT GROUP DIALOG -->
        <v-dialog v-model="EditGroupDialogShowed" v-if="EditGroupDialogShowed" persistent max-width="800px">
            <v-card>
                <EditGroupModal  @on-close="onClose" :editDialogProp="editDialogProp" @on-edit-group="onEditGroup"/>
            </v-card>
        </v-dialog>

        <!-- TABLE OF GROUP -->
        <v-data-table v-model="selected" :headers="headers" :items="listGroup" :single-select="singleSelect"
            :search="search" :custom-filter="filterOnlyCapsText" item-key="group_id" show-select class="elevation-1">
            <template v-slot:top>
                <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch>
                <v-text-field v-model="search" label="Search" class="mx-4"></v-text-field>
            </template>
        </v-data-table>

        <p>Selected:</p>
        {{ selected }}
    </div>
</template>

<script src="./AdminGroup.js"></script>

<style src="./AdminGroup.css">

</style>