<!-- eslint-disable -->
<template>
  <v-app>
    <div style="margin-left: -1vw; margin-top: 15px">
      <v-container class="p-0">
        <md-toolbar md-elevation="0">
          <h3 class="md-title">OVERTIME FORM</h3>
        </md-toolbar>
      </v-container>
      <v-container class="border p-3">
        <div class="">

          <v-select item-text="project_name" item-value="project_id" v-model="projectSelected" :items="listProjects"
            filled label="Project Name *" persistent-hint return-object @change="onSelectProject">
          </v-select>
          <span style="
            display: block;
            margin-top: -20px;
            color: #b71c1c;
            font-size: 15px;
          " v-if="isProjectNameEmpty && isRegistering">
            Project name required!
          </span>
          <v-row>
            <v-col cols="12" lg="12">
              <DateTimePicker :selectDate="date" :dateTimePickerTitle="'Date *'" @select-date="onInputDate" />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" lg="12">
              <span style="display: block; color: #b71c1c; font-size: 15px" v-if="isDateEmpty && isRegistering">
                End Date required!
              </span>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" lg="6">
              <Input :startTimeSetup="startTime" @on-input="onInputStartTime" :inputType="'time'"/>
            </v-col>
            <v-col cols="12" lg="6">
              <Input :startTimeSetup="endTime" @on-input="onInputEndTime" :inputType="'time'"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" lg="6">
              <span style="display: block; color: #b71c1c; font-size: 15px" v-if="isStartTimeEmpty && isRegistering">
                Start time required!
              </span>
            </v-col>
            <v-col cols="12" lg="6">
              <span style="display: block; color: #b71c1c; font-size: 15px" v-if="isEndTimeEmpty && isRegistering">
                End time required!
              </span>
              <span style="display: block; color: #b71c1c; font-size: 15px"
                v-if="isStartDateBeforeEndDate && isRegistering">
                End date need to be after start date!
              </span>
            </v-col>
          </v-row>

          <div class="mt-10">
            <v-textarea filled name="input-7-4" label="Reason *" v-model="reasonInputValue" @input="onInputReason">
            </v-textarea>
          </div>
          <span style="
            display: block;
            margin-top: -20px;
            color: #b71c1c;
            font-size: 15px;
          " v-if="isReasonEmpty && isRegistering">
            Reason required!
          </span>

          <v-row class="justify-end">
            <v-col cols="2">
              <Button :buttonClass="'md-raised md-primary button-layout'" :buttonTitle="'Register'"
                @on-click="onClickRegisterButton" style="width: 100%" />
            </v-col>
            <v-col cols="2">
              <Button :buttonClass="'md-raised md-primary button-layout'" :buttonTitle="'Reset'"
                @on-click="onClickResetButton" style="width: 100%" />
            </v-col>
          </v-row>
        </div>
      </v-container>
    </div>
  </v-app>
</template>


<script src="./OvertimeRegister.js">
<style scoped src="./OvertimeRegister.css"></style>;
