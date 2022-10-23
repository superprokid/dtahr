<template>

<div id="realtimecheck">
  <v-container class="main-page">
    <md-toolbar class="mb-3" md-elevation="0">
      <h3 class="md-title">Realtime Check</h3>
    </md-toolbar>
    <v-row class="mb-3">
      <v-col cols="3" class="d-flex align-items-center">
          <DateTimePicker :selectDate="startDate" @select-date="onInputStartDate" :dateTimePickerTitle="'From'" ></DateTimePicker>
      </v-col>
      <v-col cols="3" class="d-flex align-items-center">
          <DateTimePicker :selectDate="endDate" @select-date="onInputEndDate" :dateTimePickerTitle="'To'" ></DateTimePicker>
      </v-col>
    </v-row>
    <v-app>
      <v-data-table
        :headers="headers"
        :items="listEmployee"
        item-key="employee_id"
        class="elevation-1 realtimecheck-table"
      >
        <template v-slot:item.work_status="{ item }">
          {{ employeeStatus(item.work_status) }}
        </template>
      </v-data-table>
    </v-app>
  </v-container>
</div>
  
</template>

<script src="./RealTimeCheck.js">
</script>

<style src="./RealTimeCheck.css">
</style>