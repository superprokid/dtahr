<!-- eslint-disable -->
<template>
  <div id="absenthistory">
    <v-container class="main-page">
      <md-toolbar class="mb-3" md-elevation="0">
        <h3 class="md-title">Leave History</h3>
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
            <v-tooltip bottom v-if="item.status == 'PENDING'">
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  color="red"
                  small
                  v-bind="attrs"
                  v-on="on"
                  @click="deleteAbsentTicket(item.leave_id)"
                  
                >
                  mdi-delete
                </v-icon>
              </template>
              <span>Delete</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </div>
    </v-container>
  </div>
</template>

<script src="./AbsentHistory.js">
<style scoped src="./AbsentHistory.css"></style>;
