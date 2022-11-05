<template>
  <div id="task-board">
    <div class="d-flex justify-center">
      <div class="d-flex">
        <div
          v-for="(column, idx) in data"
          :key="column.title"
          class="card_container column-width"
        >
          <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">{{columnTitles[idx]}}</p>
          <!-- Draggable component comes from vuedraggable. It provides drag & drop functionality -->
          <draggable :list="column.tasks" :animation="200" ghost-class="ghost-card" group="tasks" class="card_holder"
          @click.native="onClickTask(column)"
          @change="onChangeColumn($event, idx)"
          >
            <!-- Each element from here will be draggable and animated. Note :key is very important here to be unique both for draggable and animations to be smooth & consistent. -->
            <task-card
              v-for="(task) in column.tasks"
              :key="task.task_id"
              :task="task"
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