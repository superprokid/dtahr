<script src="./Input.js"></script>
<style src="./Input.css"></style>

<template>
  <md-field md-clearable class="md-userName">
    <label>{{ inputTitle }}</label>
    <md-input
      :id="inputID"
      v-model="inputContents"
      @input="onInput"
      :disabled="disable"
      :type="inputType"
    ></md-input>
  </md-field>
</template>
