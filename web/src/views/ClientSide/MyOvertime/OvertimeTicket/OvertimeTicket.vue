<!-- eslint-disable -->
<template>
  <div style="margin-left: -1vw" id="otticket">
    <v-container class="main-page">
      <!-- <div class="page-title">OVERTIME TICKET</div> -->
      <md-toolbar class="mb-3" md-elevation="0">
        <h3 class="md-title">OVERTIME TICKET</h3>
      </md-toolbar>
      <div>
        <v-data-table
          :headers="headers"
          :items="listOvertimeTicket"
          item-key="createdat"
          class="elevation-1 otticket-table"
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

          <template v-slot:item.actions="{ item }">
            <v-icon
              v-if="item.status == 'PENDING'"
              small
              class="mr-2"
              @click="updateStatusOTTicket(item.overtime_id, 1)"
            >
              mdi-check
            </v-icon>
            <v-icon
              v-if="item.status == 'PENDING'"
              small
              @click="updateStatusOTTicket(item.overtime_id, 2)"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </div>
    </v-container>
  </div>
</template>

<script src="./OvertimeTicket.js">
<style scoped src="./OvertimeTicket.css"></style>;
