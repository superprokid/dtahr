<template>
  <md-field class="dropdown-layout">
    <label>{{ dropDownTitle }}</label>
    <md-select v-model="selectedObject" @input="onChange">
      <md-option
        v-for="(option, index) in selectedOptions"
        :value="option.value"
        :key="index"
        :disabled="disable"
        >{{ option.title }}</md-option
      >
    </md-select>
  </md-field>
</template>

<script src="./DropDown.js"></script>
<style src = "./DropDown.css"></style>