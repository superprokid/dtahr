<template>
    <div id="holiday">
        <v-container class="main-page">
            <div class="page-title"> HOLIDAY LIST </div>

            <div>
                <v-app id="holiday-table-container">
                    <v-data-table :headers="headers" :items="listHolidays" item-key="name" class="elevation-1 holiday-table"
                        :search="search" :custom-filter="filterOnlyCapsText">
                        <template v-slot:top>
                            <v-text-field v-model="search" label="Search" class="mx-4"></v-text-field>
                        </template>
                    </v-data-table>
                </v-app>
            </div>
        </v-container>
    </div>
</template>

<script src="./Holiday.js"></script>
<style scoped src="./Holiday.css">

</style>