<template>
    <div class="pa-4 mt-3" style="height: 90vh; overflow-y: auto;">
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

            </v-list>
        </v-menu>
        <v-data-table v-model="selected" :headers="headers" :items="listUsersOfSpecificGroup" item-key="employee_id" :item-class="setItemRowCLass" show-select
            class="elevation-1" :search="search" :custom-filter="filterOnlyCapsText">
            <template v-slot:top>
                <v-text-field v-model="search" label="Search" class="mx-4"></v-text-field>
            </template>
        </v-data-table>
        
        <!-- CREATE USER DIALOG --> 
        <v-dialog v-model="CreateUserDialogShowed"  persistent max-width="800px" transition="dialog-top-transition">
            <v-card>
                <CreateUserModal @on-close="onClose" :groupRowSelected="groupRowSelected" />
            </v-card>
        </v-dialog>
    </div>
</template>

<script src="./AdminEmployeeManagement.js"></script>

<style>
.item-row {
    cursor: pointer;
}
</style>

<style scoped >
  table > tbody > tr > td:nth-child(1),
  table > thead > tr > th:nth-child(1) {
    position: sticky !important;
    position: -webkit-sticky !important;
    left: 0;
    z-index: 1;
    background: white;
  }
  table > thead > tr > th:nth-child(1) {
    z-index: 2;
  }
  
</style>

