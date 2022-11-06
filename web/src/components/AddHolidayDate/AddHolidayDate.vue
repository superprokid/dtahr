<template>
  <div>
    <v-toolbar class="text-h5" color="primary" dark>Add Holiday</v-toolbar>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="6">
              <v-textarea rows=8 filled name="input-7-4" label="Description *" v-model="description"></v-textarea>
              <span style="display: block; color: #b71c1c; font-size: 15px" v-if="!description && saving">
                  Description required!
              </span>
          </v-col>
          <v-col cols="12" sm="6" md="6">
              <v-date-picker
                  v-model="date"
                  no-title
              ></v-date-picker>
              <span style="display: block; color: #b71c1c; font-size: 15px" v-if="!date && saving">
                  Date required!
              </span>
          </v-col>
        </v-row>
      </v-container>
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

<script src="./AddHolidayDate.js">
</script>

<style src="./AddHolidayDate.css">
</style>