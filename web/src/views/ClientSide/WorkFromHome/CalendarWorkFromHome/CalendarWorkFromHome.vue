<!-- eslint-disable -->
<template>
    <v-app>
        <v-main>
            <v-container class="pa-6">
                <v-row class="fill-height">
                    <v-col>
                        <v-sheet height="64">
                            <!-- <v-toolbar flat> -->
                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
                                        Today
                                    </v-btn>
                                    <v-btn fab text small color="grey darken-2" @click="prev">
                                        <v-icon small>
                                            mdi-chevron-left
                                        </v-icon>
                                    </v-btn>
                                    <v-btn fab text small color="grey darken-2" @click="next">
                                        <v-icon small>
                                            mdi-chevron-right
                                        </v-icon>
                                    </v-btn>
                                    <span v-if="$refs.calendar">
                                        {{ $refs.calendar.title }}
                                    </span>
                                </v-col>

                                <v-col cols="12" md="1">

                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-autocomplete v-model="employeeSelected" :items="listEmployee"
                                        item-text="employeeNameGive" item-value="employeeIdResponse" dense
                                        label="Employee" @change="onChangeEmployeeToSeeSchedule" v-if="isManager">
                                    </v-autocomplete>
                                </v-col>
                                <v-col cols="12" md="2" class="d-flex justify-end">

                                    <v-menu>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                                                <span>{{ typeToLabel[type] }}</span>
                                                <v-icon>
                                                    mdi-menu-down
                                                </v-icon>
                                            </v-btn>
                                        </template>
                                        <v-list>
                                            <v-list-item @click="type = 'day'">
                                                <v-list-item-title>Day</v-list-item-title>
                                            </v-list-item>
                                            <v-list-item @click="type = 'week'">
                                                <v-list-item-title>Week</v-list-item-title>
                                            </v-list-item>
                                            <v-list-item @click="type = 'month'">
                                                <v-list-item-title>Month</v-list-item-title>
                                            </v-list-item>
                                            <v-list-item @click="type = '4day'">
                                                <v-list-item-title>4 days</v-list-item-title>
                                            </v-list-item>
                                        </v-list>
                                    </v-menu>

                                </v-col>
                            </v-row>




                            <!-- </v-toolbar> -->
                        </v-sheet>
                        <v-sheet height="650">
                            <v-calendar ref="calendar" v-model="focus" color="primary" :events="events"
                                :event-color="getEventColor" :type="type" @click:event="showEvent" @click:more="viewDay"
                                @click:date="viewDay" @change="updateRange">
                            </v-calendar>
                            <v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement"
                                max-width="400px" offset-x>
                                <v-card color="grey lighten-4" flat>
                                    <v-toolbar :color="selectedEvent.color" dark>
                                        <v-tooltip bottom v-if="selectedEvent.status == 0 && isEdit">
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn icon v-bind="attrs" v-on="on"
                                                    @click="onClickDeleteWfhTicket(selectedEvent.date)">
                                                    <v-icon>mdi-delete</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>Delete</span>
                                        </v-tooltip>

                                        <v-toolbar-title style="width: 500px" v-html="selectedEvent.name">
                                        </v-toolbar-title>

                                    </v-toolbar>
                                    <v-card-text>
                                        <span v-html="selectedEvent.description"></span>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-btn text color="secondary" @click="selectedOpen = false">
                                            Cancel
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-menu>
                        </v-sheet>

                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script src="./CalendarWorkFromHome.js"></script>