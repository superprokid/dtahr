<template>
    <div>
        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on">
                    Tương Tác
                    <v-icon>mdi-menu-down</v-icon>
                </v-btn>

            </template>
            <v-list>
                <v-list-item>
                    <v-dialog v-model="AddHolidayDialog" persistent max-width="800px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon style="margin-right: 10px" v-bind="attrs" v-on="on">mdi-text-box-edit-outline</v-icon>
                            <v-list-item-title v-bind="attrs" v-on="on">Add</v-list-item-title>
                        </template>
                        <v-card>
                            <AddHoliday  @on-close="onClose"  />
                        </v-card>
                    </v-dialog>
                </v-list-item>
                <!-- <v-list-item @click="() => {onClickAddGroup()}">
                    <v-icon style="margin-right: 10px">mdi-receipt-text-plus-outline</v-icon>
                    <v-list-item-title>Add</v-list-item-title>
                </v-list-item> -->
                <v-list-item @click="() => {onClickEditGroup()}">
                    <v-icon style="margin-right: 10px">mdi-text-box-edit-outline</v-icon>
                    <v-list-item-title>Edit</v-list-item-title>
                </v-list-item>
                <v-list-item @click="() => {onClickDeleteGroup()}">
                    <v-icon style="margin-right: 10px">mdi-trash-can-outline</v-icon>
                    <v-list-item-title>Delete</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>



        <!-- <v-data-table v-model="selected" :headers="headers" :items="listGroup" :single-select="singleSelect"
            item-key="name" show-select class="elevation-1" @item-selected="onSelectGroup">
            <template v-slot:top>
                <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch>
            </template>
        </v-data-table> -->


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