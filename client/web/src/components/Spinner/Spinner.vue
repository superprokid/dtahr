
<script src="./Spinner.js"></script>
<style src="./Spinner.css"></style>

<template>
  <div class="spinner" v-show="isSpinnerShow">
    <md-progress-spinner
      :md-diameter="80"
      :md-stroke="8"
      md-mode="indeterminate"
    ></md-progress-spinner>
  </div>
</template>
