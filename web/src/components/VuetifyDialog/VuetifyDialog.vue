<template>
    <v-row justify="start" class="mb-2">
        <v-dialog v-model="EditWorklogDialog" persistent max-width="800px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn class="ml-3" max-width="170px" color="primary" dark v-bind="attrs" v-on="on">
                    Edit Worklog
                </v-btn>
            </template>
            <v-card>
                <EditWorklog :username="username" :id="id" @on-close="onClose" @on-save="onSaveEditWorklog"/>
            </v-card>
        </v-dialog>
        <v-dialog v-model="AddHolidayDialog" persistent max-width="800px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn class="ml-3" max-width="170px" color="primary" dark v-bind="attrs" v-on="on">
                    Add Holiday
                </v-btn>
            </template>
            <v-card>
                <AddHoliday :username="username" :id="id" @on-close="onClose" @on-save="onSaveAddHoliday"/>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script src="./VuetifyDialog.js"></script>
<style scoped src="./VuetifyDialog.css" >

</style>