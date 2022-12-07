<template>
  <div>
    <div class="admin-project-title-static">
        COMPANY WORKING TIME
    </div>
    <v-data-table :headers="workTimeHeaders" :items="workTimeList"
      item-class="item-row" :search="search"
       item-key="project_id" class="elevation-1">
      <template v-slot:top>
         <v-btn
            depressed
            color="primary"
            @click="onClickCreateWorkingTime"
          >
            Add Working Time
          </v-btn>
          <v-text-field v-model="search" label="Search" class="mx-4"></v-text-field>
      </template>
      <template v-slot:item.approve_date="{ item }"> 
        {{ item.approve_date | formatDate }}
      </template>
      <template v-slot:item.working_hour="{ item }"> 
        {{ item.hour_start | filterTime }}:{{ item.min_start | filterTime }} - 
        {{ item.hour_end | filterTime}}:{{ item.min_end | filterTime}}
      </template>
      <template v-slot:item.lunch_hour="{ item }"> 
        {{ item.lunch_hour_start | filterTime }}:{{ item.lunch_min_start | filterTime }} 
        - {{ item.lunch_hour_end | filterTime}}:{{ item.lunch_min_end | filterTime}}
      </template>
      <template v-slot:item.actions="{ item }">
        <div class="d-flex">
          <v-tooltip bottom v-if="isAfterToday(item.approve_date)" >
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  color="green"
                  small
                  class="mr-2"
                  v-bind="attrs"
                  v-on="on"
                  @click="updateWorkTime(item)"
                >
                  mdi-pencil
                </v-icon>
              </template>
              <span>Edit</span>
            </v-tooltip>
            <v-tooltip bottom v-if="isAfterToday(item.approve_date)">
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  color="red"
                  small
                  v-bind="attrs"
                  class="mr-2"
                  v-on="on"
                  @click="deleteWorkTime(item.worktime_id)"
                >
                  mdi-delete
                </v-icon>
              </template>
              <span>Delete</span>
            </v-tooltip>
            <div v-if="isActive(item)">
              ACTIVE
            </div>
        </div>    
      </template>
    </v-data-table>
    <v-dialog v-model="showUpdateDialog" persistent max-width="800px">
      <v-card>
        <v-toolbar class="text-h5" color="primary" dark>Update Working Time</v-toolbar>
        <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" lg="6">
                  <v-menu
                    ref="startTimeMenu"
                    v-model="startTimeMenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="startTime"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="startTime"
                        label="Start Time"
                        prepend-icon="mdi-clock-time-four-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="startTimeMenu"
                      v-model="startTime"
                      full-width
                      @click:minute="$refs.startTimeMenu.save(startTime)"
                    ></v-time-picker>
                  </v-menu>
                  <v-menu
                    ref="endTimeMenu"
                    v-model="endTimeMenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="endTime"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="endTime"
                        label="End Time"
                        prepend-icon="mdi-clock-time-four-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="endTimeMenu"
                      v-model="endTime"
                      full-width
                      @click:minute="$refs.endTimeMenu.save(endTime)"
                    ></v-time-picker>
                  </v-menu>
                  <v-menu
                    ref="lunchStartTimeMenu"
                    v-model="lunchStartTimeMenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="lunchStartTime"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="lunchStartTime"
                        label="Lunch Start Time"
                        prepend-icon="mdi-clock-time-four-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="lunchStartTimeMenu"
                      v-model="lunchStartTime"
                      full-width
                      @click:minute="$refs.lunchStartTimeMenu.save(lunchStartTime)"
                    ></v-time-picker>
                  </v-menu>
                  <v-menu
                    ref="lunchEndTimeMenu"
                    v-model="lunchEndTimeMenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="lunchEndTime"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="lunchEndTime"
                        label="Lunch End Time"
                        prepend-icon="mdi-clock-time-four-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="lunchEndTimeMenu"
                      v-model="lunchEndTime"
                      full-width
                      @click:minute="$refs.lunchEndTimeMenu.save(lunchEndTime)"
                    ></v-time-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" lg="6">
                  <v-date-picker v-model="selectedApproveDate"></v-date-picker>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="onCloseEditModal">
                Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="onSaveEdit">
                Save
            </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showAddDialog" persistent max-width="800px">
      <v-card>
        <v-toolbar class="text-h5" color="primary" dark>Add Working Time</v-toolbar>
        <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" lg="6">
                  <v-menu
                    ref="startTimeMenuAdd"
                    v-model="startTimeMenuAdd"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="startTimeAdd"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="startTimeAdd"
                        label="Start Time"
                        prepend-icon="mdi-clock-time-four-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="startTimeMenuAdd"
                      v-model="startTimeAdd"
                      full-width
                      @click:minute="$refs.startTimeMenuAdd.save(startTimeAdd)"
                    ></v-time-picker>
                  </v-menu>
                  <v-menu
                    ref="endTimeMenuAdd"
                    v-model="endTimeMenuAdd"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="endTimeAdd"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="endTimeAdd"
                        label="End Time"
                        prepend-icon="mdi-clock-time-four-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="endTimeMenuAdd"
                      v-model="endTimeAdd"
                      full-width
                      @click:minute="$refs.endTimeMenuAdd.save(endTimeAdd)"
                    ></v-time-picker>
                  </v-menu>
                  <v-menu
                    ref="lunchStartTimeMenuAdd"
                    v-model="lunchStartTimeMenuAdd"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="lunchStartTimeAdd"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="lunchStartTimeAdd"
                        label="Lunch Start Time"
                        prepend-icon="mdi-clock-time-four-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="lunchStartTimeMenuAdd"
                      v-model="lunchStartTimeAdd"
                      full-width
                      @click:minute="$refs.lunchStartTimeMenuAdd.save(lunchStartTimeAdd)"
                    ></v-time-picker>
                  </v-menu>
                  <v-menu
                    ref="lunchEndTimeMenuAdd"
                    v-model="lunchEndTimeMenuAdd"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="lunchEndTimeAdd"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="lunchEndTimeAdd"
                        label="Lunch End Time"
                        prepend-icon="mdi-clock-time-four-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="lunchEndTimeMenuAdd"
                      v-model="lunchEndTimeAdd"
                      full-width
                      @click:minute="$refs.lunchEndTimeMenuAdd.save(lunchEndTimeAdd)"
                    ></v-time-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" lg="6">
                  <v-date-picker v-model="approveDate"></v-date-picker>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="onCloseAddModal">
                Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="onSaveAdd">
                Save
            </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script src="./AdminWorkingTime.js">
</script>

<style>

</style>