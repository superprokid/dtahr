<template>
  <div>
    <v-radio-group
      v-model="csvSelect"
      row
    >
      <v-radio
        v-for="(option) in csvOption"
        :key="option.value"
        :label="option.name"
        :value="option.value"
      ></v-radio>
    </v-radio-group>
    <v-date-picker
      v-model="monthSelect"
      type="month"
      :allowed-dates="allowedMonths"
    ></v-date-picker>
    <v-btn
      :loading="loading"
      :disabled="loading || !isDateValid"
      color="blue"
      class="ma-2 white--text"
      @click="exportCSV"
    >
      Download
      <v-icon
        right
        dark
      >
        mdi-download-circle-outline
      </v-icon>
    </v-btn>
  </div>
</template>

<script src="./AdminCSVExport.js">
</script>

<style src="./AdminCSVExport.css">
</style>