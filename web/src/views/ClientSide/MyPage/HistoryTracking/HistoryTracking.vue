<!-- eslint-disable  -->
<template>
  <v-app>
    <v-container class="pt-0" id="history-tracking">
      <v-row class="mb-2 ">
        <v-col
            class="d-flex align-end"
        >
        <h4 class="d-inline-block ">Current Annual Holiday: </h4>
		<h4 class="d-inline-block red--text ml-1"> {{startDataUser.holiday_time | holidayDisplay }}</h4>

        </v-col>
        <v-col cols="3" class="d-flex align-items-center">
            <DateTimePicker v-if="startDate" :selectDate="startDate" @select-date="onInputStartDate" :dateTimePickerTitle="'From'" ></DateTimePicker>
        </v-col>
        <v-col cols="3" class="d-flex align-items-center">
            <DateTimePicker v-if="endDate" :selectDate="endDate" @select-date="onInputEndDate" :dateTimePickerTitle="'To'" ></DateTimePicker>
        </v-col>
        <!-- <v-col cols="2" class="d-flex align-end" >
            <Button
            :buttonClass="'md-raised md-primary button-layout'"
            :buttonTitle="$t('employeeSite.btnSearch')"
            @on-click="onSearchClick"
          />
        </v-col> -->
        

      </v-row>
      <div>
      </div>
      <hr>
      <v-timeline dense clipped style="padding-top: 0; margin-top: 10px;">
        <div
          v-for="(value, index) in Object.keys(userTrackingHistory)"
          :key="index"
        >
          <v-timeline-item
            fill-dot
            class="black--text mb-6 d-flex align-items-center"
            color="orange lighten-2"
            large
            icon="mdi-check-all"
          >
  
            <p class="title-timeline">End activities {{ value }}</p>
          </v-timeline-item>

          <v-timeline-item
            v-for="(item, index) in userTrackingHistory[value]"
            :key="index"
            class="mb-4"
            v-bind:color="
              item.workhistory_status == 0
                ? 'green'
                : item.workhistory_status == 1
                ? 'blue'
                : item.workhistory_status == 2
                ? 'purple'
                : item.workhistory_status == 3
                ? 'red'
                : 'grey'
            "
            v-bind:icon="
              item.workhistory_status == 0
                ? 'mdi-map-marker-check'
                : item.workhistory_status == 1
                ? 'mdi-clock-remove'
                : item.workhistory_status == 2
                ? 'mdi-clock-remove'
                : item.workhistory_status == 3
                ? 'mdi-alert'
                : 'mdi-cog'
            "
            icon-color="grey lighten-2"
            fill-dot
            small
          >
            <v-row justify="space-between">
              <v-col class="description-timeline">{{ item.workhistory_description }} </v-col>
              <v-col class="text-right" cols="3">
                {{ new Date(item.work_date).toLocaleDateString() }}
              </v-col>
            </v-row>
          </v-timeline-item>

          <v-timeline-item
            fill-dot
            class="black--text mb-12 d-flex align-items-center"
            color="teal"
            large
            icon="mdi-check"
          >
            <p class="title-timeline">Start activities {{ value }}</p>
          </v-timeline-item>
          <v-timeline-item class="mb-4" hide-dot v-if="index < Object.keys(userTrackingHistory).length - 1 ">
          </v-timeline-item>
        </div>
      </v-timeline>
    </v-container>
  </v-app>
</template>

<script src="./HistoryTracking.js"></script>
<style scoped src="./HistoryTracking.css"></style>
