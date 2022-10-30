<template>
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
                    <v-btn text>
                        <v-icon style="margin-right: 10px">
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
                    <v-btn text>
                        <v-icon style="margin-right: 10px">
                            mdi-text-box-edit-outline
                        </v-icon>
                        Edit Group
                    </v-btn>
                </v-list-item>
                <v-list-item>
                    <v-btn text>
                        <v-icon style="margin-right: 10px">
                            mdi-trash-can-outline
                        </v-icon>
                        Delete Group
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
    </div>
</template>

<script src="./AdminEmployeeManagement.js"></script>

<style>
.item-row {
    cursor: pointer;
}
</style>

<style >
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

