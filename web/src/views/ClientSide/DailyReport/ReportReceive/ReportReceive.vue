<template>
    <div id="report-receiver-page">
        <v-data-table :headers="dessertHeaders" :items="desserts" :single-expand="true" :expanded.sync="expanded"
            item-key="name" show-expand class="elevation-1">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>My Report</v-toolbar-title>
                </v-toolbar>
            </template>
            <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                    More info about {{ item.name }}
                </td>
            </template>
        </v-data-table>
    </div>
</template>

<script src="./ReportReceive.js">
</script>
  
<!-- <style src="./MyReport.css">

</style> -->