<template>
  <div id="gantt-chart-page" class="px-3">
    <v-app style="background-color: whitesmoke !important">
      <v-container>
        <v-row>
          <div class="tasks-title">Search tasks</div>
        </v-row>
        <v-row>
          <v-col cols="7" md="5" lg="4" xl="2" class="pr-10 pt-0">
            <v-row>
              Start Date:
            </v-row>
            <v-row>
              <v-menu v-model="startDateMenu" :close-on-content-click="true" :nudge-right="40"
                transition="scale-transition" offset-y min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field v-model="selectedStartDate" readonly solo v-bind="attrs" v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="selectedStartDate"></v-date-picker>
              </v-menu>
            </v-row>
          </v-col>
          <v-col cols="5" md="5" lg="4" xl="2" class="pr-10 pt-0">
            <v-row>
              Span:
            </v-row>
            <v-row>
              <v-select v-model="monthRange" solo :items="listMonthSpan"
                item-text="text" item-value="value">
              </v-select>
            </v-row>
          </v-col>
          <v-col cols="12" xl="8" class="d-flex align-start pt-5">
            <span class="mt-3 ml-3 mr-3">Status: </span>
            <v-radio-group row class="my-radio-group-container">
              <input v-model="selectedStatus" class="my-radio-input" type="radio" id="status5" name="jeff" value="5">
              <label class="my-radio-label" for="status5">All</label>
              <input v-model="selectedStatus" class="my-radio-input" type="radio" id="status0" name="jeff" value="0">
              <label class="my-radio-label" for="status0">Open</label>
              <input v-model="selectedStatus" class="my-radio-input" type="radio" id="status1" name="jeff" value="1">
              <label class="my-radio-label" for="status1">In Progress</label>
              <input v-model="selectedStatus" class="my-radio-input" type="radio" id="status2" name="jeff" value="2">
              <label class="my-radio-label" for="status2">Resolve</label>
              <input v-model="selectedStatus" class="my-radio-input" type="radio" id="status3" name="jeff" value="3">
              <label class="my-radio-label" for="status3">Closed</label>
              <input v-model="selectedStatus" class="my-radio-input" type="radio" id="status4" name="jeff" value="4">
              <label class="my-radio-label" for="status4">Not Closed</label>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6" lg="5" xl="3" class="pr-10 pt-0">
            <v-row>
              Category
            </v-row>
            <v-row>
              <v-autocomplete v-model="categorySelected" clearable solo :items="listCategories"
                item-text="category_name" item-value="category_id">
              </v-autocomplete>
            </v-row>
          </v-col>
          <v-col cols="12" md="6" lg="5" xl="3" class="pr-10 pt-0">
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
          <v-col cols="10" md="6" lg="5" xl="3" class="pr-10 pt-0">
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
    <div ref="ganttContainer" style="height: 73%"></div>
  </div>
</template>

<style scoped>
@import "~dhtmlx-gantt/codebase/dhtmlxgantt.css";
</style>
<style >
.gantt_tree_content {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.v-menu__content {
  max-width: none;
}

.gantt_link_point,
.gantt_task_progress_drag {
  display: none !important;
}

</style>
<script src="./GanttChart.js"></script>
<style scoped>
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

.my-radio-group-container {
  margin-top: 0px;
  color: 'red'
}

.my-radio-label {
  display: inline-block;
  border: solid 2px none;
  padding: 3px 10px;
}

.my-radio-label:hover {
  cursor: pointer;
}

.my-radio-input[type="radio"] {
  display: none;
}

.my-radio-input[type="radio"]:checked+label {
  background: #154c79;
  border-radius: 20px;
  color: white
}

</style>
  