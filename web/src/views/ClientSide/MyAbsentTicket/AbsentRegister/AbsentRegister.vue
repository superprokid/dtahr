<!-- eslint-disable -->
<template>
  <v-app>
    <v-container class="border p-3">
      <div class="">
        <md-toolbar class="mb-3" md-elevation="0">
          <h3 class="md-title">Leave Form</h3>
        </md-toolbar>
        <v-select
          item-text="status"
          item-value="value"
          v-model="statusSelected"
          :items="listStatus"
          filled
          label="Leave type *"
          persistent-hint
        >
        </v-select>
        <span
          style="
            display: block;
            margin-top: -20px;
            color: #b71c1c;
            font-size: 15px;
          "
          v-if="!statusSelected && statusSelected != 0 && isRegistering"
        >
          Please choose leave type!
        </span>
        <v-row>
          <v-col cols="12" lg="12">
            <DateTimePicker
              :selectDate="date"
              :dateTimePickerTitle="'End Date *'"
              @select-date="onInputDate"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" lg="12">
            <span
              style="display: block; color: #b71c1c; font-size: 15px"
              v-if="isDateEmpty && isRegistering"
            >
              End Date required!
            </span>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" lg="6">
            <Input
              :startTimeSetup="startTime"
              @on-input="onInputStartTime"
              :inputType="'time'"
            />
          </v-col>
          <v-col cols="12" lg="6">
            <Input
              :startTimeSetup="endTime"
              @on-input="onInputEndTime"
              :inputType="'time'"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="6">
            <span
              style="display: block; color: #b71c1c; font-size: 15px"
              v-if="isStartTimeEmpty && isRegistering"
            >
              Start time required!
            </span>
          </v-col>
          <v-col cols="12" lg="6">
            <span
              style="display: block; color: #b71c1c; font-size: 15px"
              v-if="isEndTimeEmpty && isRegistering"
            >
              End time required!
            </span>
            <span
              style="display: block; color: #b71c1c; font-size: 15px"
              v-if="isStartDateBeforeEndDate && isRegistering"
            >
              End date need to be after start date!
            </span>
          </v-col>
        </v-row>

        <div class="mt-10">
          <v-textarea
            filled
            name="input-7-4"
            label="Reason *"
            v-model="reasonInputValue"
            @input="onInputReason"
          >
          </v-textarea>
        </div>
        <span
          style="
            display: block;
            margin-top: -20px;
            color: #b71c1c;
            font-size: 15px;
          "
          v-if="isReasonEmpty && isRegistering"
        >
          Reason required!
        </span>

        <v-row class="justify-end">
          <v-col cols="2">
            <Button
              :buttonClass="'md-raised md-primary button-layout'"
              :buttonTitle="'Register'"
              @on-click="onClickRegisterButton"
              style="width: 100%"
            />
          </v-col>
          <v-col cols="2">
            <Button
              :buttonClass="'md-raised md-primary button-layout'"
              :buttonTitle="'Reset'"
              @on-click="onClickResetButton"
              style="width: 100%"
            />
          </v-col>
        </v-row>
      </div>
    </v-container>
  </v-app>
</template>


<script src="./AbsentRegister.js">
<style scoped src="./AbsentRegister.css"></style>;
