<template>
    <div id="report-receiver-page">
        <v-container>
            <v-data-table :headers="reportHeader" :items="listReports" :single-expand="true" :expanded.sync="expanded"
                item-key="project_id" show-expand class="elevation-1">
                <template v-slot:top>
                    <v-toolbar flat>
                        <v-toolbar-title>My Report</v-toolbar-title>
                    </v-toolbar>
                </template>
                <template v-slot:expanded-item="{ headers, item }">
                    <td :colspan="headers.length">
                        <v-container class="daily-report-container">
                            <v-row class="daily-report-header">Today task</v-row>
                            <v-row>
                                <p class="daily-report-desc">{{item.tasks}}</p>
                            </v-row>
                            <v-row class="daily-report-header">Problems</v-row>
                            <v-row>
                                <p class="daily-report-desc">{{item.problems}}</p>
                            </v-row>
                            <v-row class="daily-report-header">Next day plans</v-row>
                            <v-row>
                                <p class="daily-report-desc">{{item.next_date_plan}}</p>
                            </v-row>
                            <v-row class="daily-report-header">Process status</v-row>
                            <v-row>
                                <p class="daily-report-desc">{{item.process_status}}</p>
                            </v-row>
                            <!-- <v-row>{{item}}</v-row> -->
                        </v-container>
                    </td>
                </template>
            </v-data-table>
        </v-container>
    </div>
</template>

<script src="./ReportReceive.js">
</script>
  
<style src="./ReportReceive.css">

</style>