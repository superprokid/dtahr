<template>
  <md-datepicker
    v-model="selectedDate"
    @input="onChange"
    class="layout"
    md-immediately
  >
    <label>{{ dateTimePickerTitle }}</label>
  </md-datepicker>
</template>

<script src="./DateTimePicker.js"></script>
<style src="./DateTimePicker.css"></style>
