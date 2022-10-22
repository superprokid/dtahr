<template>
    <div>
      <v-toolbar class="text-h5" color="primary" dark>Add Worklog</v-toolbar>
      <v-card-text>
          <v-container>
              <v-row>
                  <v-col cols="12" sm="6" md="6">
                      <v-row>
                          <v-col cols="12">
                              <v-text-field label="Name"
                              :value="username"
                              type = "text"
                              readonly
                              >
                              </v-text-field>
                          </v-col>
                          <v-col cols="12">
                              <v-text-field label="Total Time"
                              :v-model="total"
                              type = "number"
                              @click:append-outer="increment" @click:prepend="decrement"
                              hint="Total working time">
                              </v-text-field>
                          </v-col>
                      </v-row>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                      <v-date-picker
                          v-model="date"
                          :allowed-dates="allowedDates"
                          no-title
                          @input="menu2 = false"
                      ></v-date-picker>
                  </v-col>
                  <v-col cols="12">
                      <v-textarea filled name="input-7-4" label="Reason *" v-model="description"></v-textarea>
                  </v-col>
              </v-row>
          </v-container>
          <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="onClose">
              Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="onSave">
              Save
          </v-btn>
      </v-card-actions>
    </div>
  </template>

<script src="./AddGroupModal.js"></script>

<style src="./AddGroupModal.css"></style>