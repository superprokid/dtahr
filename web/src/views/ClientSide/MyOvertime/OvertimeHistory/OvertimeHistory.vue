<!-- eslint-disable -->
<template>
  <div style="margin-left: -4vw" id="absenthistory">
    <v-container class="main-page">
      <md-toolbar class="mb-3" md-elevation="0">
        <h3 class="md-title">OVERTIME HISTORY</h3>
      </md-toolbar>

      <div>
        <v-data-table
          :headers="headers"
          :items="listOvertimeTicket"
          item-key="createdat"
          class="elevation-1 absenthistory-table"
          :search="search"
          :custom-filter="filterOnlyCapsText"
        >
          <template v-slot:top>
            <v-text-field
              v-model="search"
              label="Search"
              class="mx-4"
            ></v-text-field>
          </template>
          <template v-slot:item.type="{ item }">
            <div v-if="item.type == 0">OFF</div>
            <div v-else>LATE</div>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon
              v-if="item.status == 'PENDING'"
              small
              @click="deleteOTTicket(item.overtime_id)"
              style="color: red"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </div>
    </v-container>
  </div>
</template>


<script src="./OvertimeHistory.js"></script>
<style scoped src="./OvertimeHistory.css"></style>