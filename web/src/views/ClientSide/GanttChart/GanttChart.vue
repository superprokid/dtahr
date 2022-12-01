<template>
  <div id="gantt-chart-page" class="px-3">
    <v-app style="background-color: whitesmoke !important">
      <v-container>
        <v-row>
          <div class="tasks-title">Search tasks</div>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-menu v-model="startDateMenu" :close-on-content-click="true" :nudge-right="40"
              transition="scale-transition" offset-y min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="selectedStartDate" readonly solo
                  v-bind="attrs" v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="selectedStartDate"></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6" lg="5" xl="3" class="pr-10">
            <v-row>
              Category
            </v-row>
            <v-row>
              <v-autocomplete v-model="categorySelected" clearable solo :items="listCategories"
                item-text="category_name" item-value="category_id">
              </v-autocomplete>
            </v-row>
          </v-col>
          <v-col cols="12" md="6" lg="5" xl="3" class="pr-10">
            <v-row>
              Assignee
            </v-row>
            <v-row>
              <v-autocomplete v-model="employeeSelected" clearable solo :items="listUsers" item-text="name"
                item-value="employee_id">
                <template v-slot:selection="data">
                  <div style="min-width: 80%" v-bind="data.attrs" :input-value="data.selected" close
                    @click="data.select">
                    <v-avatar left>
                      <v-img max-height="30" max-width="30" :src="getAvatar(data.item.avt)"></v-img>
                    </v-avatar>
                    {{ data.item.name }}
                  </div>
                </template>
                <template v-slot:item="data">
                  <template>
                    <v-list-item-avatar>
                      <v-img max-height="35" max-width="35" :src="getAvatar(data.item.avt)"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title v-html="data.item.name">
                      </v-list-item-title>
                      <v-list-item-subtitle v-html="data.item.group">
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>
            </v-row>
          </v-col>
          <v-col cols="10" md="6" lg="5" xl="3" class="pr-10">
            <v-row>
              Keyword
            </v-row>
            <v-row>
              <v-text-field v-model="keyword" label="Enter Keyword" solo clearable></v-text-field>
            </v-row>
          </v-col>
          <v-col cols="2" md="2" lg="2" xl="3" class=" d-flex align-center">
            <v-btn class="mx-2" fab dark small color="primary" @click="() => { searchTasks() }">
              <v-icon dark>
                mdi-magnify
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
    <div ref="ganttContainer" style="height: 80%"></div>
  </div>
</template>

<style scoped>
@import "~dhtmlx-gantt/codebase/dhtmlxgantt.css";
</style>
<style>
.gantt_tree_content {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.v-menu__content {
  max-width: none;
}

.gantt_link_point, .gantt_task_progress_drag {
  display: none !important;
}
</style>
<script src="./GanttChart.js"></script>
<style scoped>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

.left-container {
  overflow: hidden;
  position: relative;
  height: 100%;
}

.right-container {
  border-right: 1px solid #cecece;
  float: right;
  height: 100%;
  width: 340px;
  box-shadow: 0 0 5px 2px #aaa;
  position: relative;
  z-index: 2;
}

.gantt-messages {
  list-style-type: none;
  height: 50%;
  margin: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding-left: 5px;
}

.gantt-messages>.gantt-message {
  background-color: #f4f4f4;
  box-shadow: inset 5px 0 #d69000;
  font-family: Geneva, Arial, Helvetica, sans-serif;
  font-size: 14px;
  margin: 5px 0;
  padding: 8px 0 8px 10px;
}

.gantt-selected-info {
  border-bottom: 1px solid #cecece;
  box-sizing: border-box;
  font-family: Geneva, Arial, Helvetica, sans-serif;
  height: 50%;
  line-height: 28px;
  padding: 10px;
}

.gantt-selected-info h2 {
  border-bottom: 1px solid #cecece;
}

.select-task-prompt h2 {
  color: #d9d9d9;
}

#gantt-chart-page {
  height: 100vh;
  width: 100%;
  overflow: auto;
  background-color: whitesmoke;
}

.tasks-title {
  font-size: large;
  color: #448aff;
  font-weight: bold;
  margin: 10px 0px;
}
</style>
  