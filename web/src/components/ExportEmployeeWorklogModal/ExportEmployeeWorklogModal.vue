<!-- eslint-disable -->
<template>
    <div>
        <v-toolbar class="text-h5" color="primary" dark>Export Employee Worklog</v-toolbar>

        <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                    <v-row no-gutters>
                        <v-col cols="12" md="6">
                            <v-menu v-model="startDateWorklogPicker" :close-on-content-click="false" :nudge-right="40"
                                transition="scale-transition" offset-y min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="startDateWorklog" label="From" prepend-icon="mdi-calendar"
                                        readonly v-bind="attrs" v-on="on">
                                    </v-text-field>
                                </template>
                                <v-date-picker v-model="startDateWorklog" @input="onSelectStartDateWorklog">
                                </v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-menu v-model="endDateWorklogPicker" :close-on-content-click="false" :nudge-right="40"
                                transition="scale-transition" offset-y min-width="auto">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field v-model="endDateWorklog" label="To" prepend-icon="mdi-calendar"
                                        readonly v-bind="attrs" v-on="on">
                                    </v-text-field>
                                </template>
                                <v-date-picker v-model="endDateWorklog" @input="onSelectEndDateWorklog">
                                </v-date-picker>
                            </v-menu>
                        </v-col>
                    </v-row>

                </v-container>

            </v-form>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="onConfirmExport">
                Export
            </v-btn>
            <v-btn color="blue darken-1" text @click="onClose">
                Close
            </v-btn>
        </v-card-actions>
    </div>
</template>

<script src="./ExportEmployeeWorklogModal.js"></script>

<style>

</style>