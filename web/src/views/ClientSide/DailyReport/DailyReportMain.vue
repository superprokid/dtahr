<template>
    <div class="daily-report-main-container">
        <v-app>
            <TabNav v-if="tabItems" :tabItems="tabItems" :tabData="tabData" />
        </v-app>
    </div>
</template>
  
<script src="./DailyReportMain.js">
</script>
  
<style src="./DailyReportMain.css">

</style>