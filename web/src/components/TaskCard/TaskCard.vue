<template>
  <div class="task_card bg-white border-white shadow">
    <div class="d-flex justify-content-between">
      <p class="task_title">{{task.task_title}}</p>

      <img
        class="task_user"
        :src="getAvt(task.avt)"
        alt="Avatar"
      >
    </div>
    <div class="d-flex justify-content-between align-items-center">
      <span class="task_date">{{task.end_date | formatDate}}</span>
      <task-badge v-if="task.category_name" :color="task.category_color">{{task.category_name}}</task-badge>
    </div>
  </div>
</template>

<script>
import TaskBadge from "../TaskBadge/TaskBadge.vue";

import {USER_GET_IMAGE} from '@/config/constant'

import moment from "moment";

export default {
  components: {
    TaskBadge
  },
  data(){
    return {
      avtBaseURL: USER_GET_IMAGE
    }
  },
  props: {
    task: {
      type: Object,
      default: () => ({})
    }
  },
  filters: {
    formatDate(value) {
      if (value) {
        return moment(value).format('DD/MM/YYYY')
      }
    }
  },
  methods: {
    getAvt(avt) {
      if (avt) {
        return USER_GET_IMAGE + '/' + avt
      }
      else {
        return require("@/assets/user-default.png")
      }
    }
  }
};
</script>

<style scoped>
.task_card{
    padding-bottom: 1.25rem;
    padding-top: 0.75rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    margin-top: 0.75rem;
    cursor: pointer;
    border-width: 1px;
    border-radius: 0.25rem;
}

.task_title{
  font-weight: 600;
  letter-spacing: .025em;
  font-size: .875rem;
  color: rgba(74,85,104,1);
  font-family: system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
}

.task_user{
  width: 1.5rem;
  height: 1.5rem;
  margin-left: 0.75rem;
  border-radius: 9999px;
  max-width: 100%;
  vertical-align: middle;
}

.task_date{
  color: rgba(113,128,150,1);
  font-size: .875rem;
}
</style>
