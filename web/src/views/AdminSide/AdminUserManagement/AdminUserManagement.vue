<template>
    <div class="pa-4" style="height: 90vh; overflow-y: auto;">
        <div class="user-detail-title-static">
            <!-- <v-icon medium color="blue darken-2">mdi-keyboard-return</v-icon> -->
            EMPLOYEE MANAGEMENT
        </div>
        <div class="mt-5">
            <v-data-table :headers="headers" :items="listUsers" item-key="name" :item-class="setItemRowCLass"
                class="elevation-1 usermanagement-table" :search="search" :custom-filter="filterOnlyCapsText"
                @click:row="clickOnUser">
                <template v-slot:top>
                    <v-text-field v-model="search" label="Search" class="mx-4"></v-text-field>
                </template>
            </v-data-table>
        </div>
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
</style>