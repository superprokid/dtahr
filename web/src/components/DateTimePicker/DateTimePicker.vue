<template>
  <md-datepicker
    v-model="selectedDate"
    class="layout"
    md-immediately
  >
    <label>{{ dateTimePickerTitle }}</label>
  </md-datepicker>
</template>

<script src="./DateTimePicker.js"></script>
<style src="./DateTimePicker.css"></style>
