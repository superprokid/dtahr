<template>
  <div id="task-board">
    <v-app>
      <v-row class="bg-white-smoke">
        <div class="tasks-board-title">Task board</div>
      </v-row>
      <v-row class="bg-white-smoke">
        <v-col cols=12 md=3>
          Category
          <v-autocomplete v-model="selectedCategory"
            :items="categoryList" solo color="blue-grey lighten-2"
            item-text="category_name" item-value="category_id"
            >
          </v-autocomplete>
        </v-col>
        <v-col cols=12 md=3>
          Assignee: 
          <v-autocomplete v-model="selectedUser"
            :items="userList" solo color="blue-grey lighten-2"
            item-text="name" item-value="employee_id"
            >
            <template v-slot:selection="data">
                <div v-bind="data.attrs" :input-value="data.selected" close
                    @click="data.select" @click:close="remove(data.item)">
                    <v-avatar left v-if="data.item.name">
                        <!-- <v-img :src="data.item.avatar"></v-img> -->
                        <!-- <v-img :src="avtBaseUrl+'/'+"></v-img> -->

                        <v-img :src="avtBaseUrl + '/' + data.item.avt"
                            v-if="data.item.avt != null" max-height="30"
                            max-width="30"></v-img>
                        <v-img max-height="30" max-width="30"
                            :src="require('@/assets/user-default.png')"
                            v-else></v-img>
                    </v-avatar>
                    {{ data.item.name }}
                </div>
            </template>
            <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                    <v-list-item-content v-text="data.item">
                    </v-list-item-content>
                </template>
                <template v-else>
                    <v-list-item-avatar>
                        <v-img 
                            :src="avtBaseUrl + '/' + data.item.avt"
                            v-if="data.item.avt != null" max-height="35"
                            max-width="35"></v-img>
                        <v-img max-height="35" max-width="35"
                            :src="require('@/assets/user-default.png')"
                            v-else></v-img>
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
        </v-col>
      </v-row>
    </v-app>
    <div class="d-flex justify-center" style="height: 85%">
      <div class="d-flex overflow-auto">
        <div
          v-for="(column, idx) in filteredData"
          :key="column.title"
          class="card_container column-width"
        >
          <p class="column_title" :style="`background-color:${statusColorArr[idx]}`">{{columnTitles[idx]}}</p>
          <!-- Draggable component comes from vuedraggable. It provides drag & drop functionality -->
          <draggable :list="column.tasks" :animation="200" ghost-class="ghost-card" group="tasks" class="card_holder"
          @change="onChangeColumn($event, idx)"
          >
            <!-- Each element from here will be draggable and animated. Note :key is very important here to be unique both for draggable and animations to be smooth & consistent. -->
            <task-card
              v-for="(task) in column.tasks"
              :key="task.task_id"
              :task="task"
              @click.native="onClickTask(task)"
            ></task-card>
            <!-- </transition-group> -->
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./TaskBoard.js">
</script>

<style src="./TaskBoard.css">
</style>