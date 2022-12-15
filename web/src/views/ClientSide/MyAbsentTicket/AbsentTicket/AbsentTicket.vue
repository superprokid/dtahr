<!-- eslint-disable -->
<template>
  <div id="absentticket">
    <v-container class="main-page">
      <md-toolbar class="mb-3" md-elevation="0">
        <h3 class="md-title">Leave Ticket</h3>
      </md-toolbar>

      <div>
        <v-data-table
          :headers="headers"
          :items="listOvertimeTicket"
          item-key="createdat"
          class="elevation-1 absentticket-table"
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
          <template v-slot:item.information="{ item }">
            <div class="py-2">
              {{ item.name }} registered a
              {{ item.type == 0 ? "Off" : "Late" }} application
            </div>
            <div>{{ item.absentTime }}</div>
          </template>
          <template v-slot:item.type="{ item }">
            <div v-if="item.type == 0">OFF</div>
            <div v-else>LATE</div>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-tooltip bottom v-if="item.status == 'PENDING'">
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  color="green"
                  small
                  class="mr-2"
                  v-bind="attrs"
                  v-on="on"
                  @click="updateStatusAbsentTicket(item.leave_id, 1)"
                >
                  mdi-check
                </v-icon>
              </template>
              <span>Approve</span>
            </v-tooltip>
            <v-tooltip bottom v-if="item.status == 'PENDING'">
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  color="red"
                  small
                  v-bind="attrs"
                  v-on="on"
                  @click="updateStatusAbsentTicket(item.leave_id, 2)"
                >
                  mdi-close
                </v-icon>
              </template>
              <span>Reject</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </div>
    </v-container>
  </div>
</template>

<script src="./AbsentTicket.js">
<style scoped src="./AbsentTicket.css"></style>;
