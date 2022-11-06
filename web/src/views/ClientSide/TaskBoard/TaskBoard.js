import TaskCard from "../../../components/TaskCard/TaskCard"
import draggable from "vuedraggable"

import TaskBoardServices from "../../../services/API/TaskBoard/TaskBoardService";
import ReportService from "../../../services/API/ReportAPI/ReportServices";

import { USER_GET_IMAGE } from "../../../config/constant"; 
export default {
  name: 'TaskBoard',
  components: {
    TaskCard,
    draggable
  },
  data() {
    return {
      columnTitles: [
        'Open',
        'In Progress',
        'Resolved',
        'Closed'
      ],
      statusColorArr: ['#ed8077', '#4488c5', '#5eb5a6', '#a1af2f'],
      categoryList: [],
      userList: [],

      selectedCategory: '',
      selectedUser: '',

      taskData: [],
      filteredData: [],

      avtBaseUrl: USER_GET_IMAGE,
    };
  },
  watch: {
    selectedCategory(newValue) {
      this.filteredData = []
      if (newValue == '') {
        if (this.selectedUser != '') {
          for (let i = 0; i < this.taskData.length; i++) {
            let tasks = []
            for (let j = 0; j < this.taskData[i].tasks.length; j++) {
              if (this.taskData[i].tasks[j].assignee_id === this.selectedUser) {
                tasks.push(this.taskData[i].tasks[j])
              }
            }
            this.filteredData.push({
              title: this.taskData[i].title,
              tasks: tasks
            })
          }
        }
        else {
          this.filteredData = this.taskData
        }
      }
      else {
        for (let i = 0; i < this.taskData.length; i++) {
          let tasks = []
          for (let j = 0; j < this.taskData[i].tasks.length; j++) {
            if (this.taskData[i].tasks[j].category_id === newValue) {
              if (this.selectedUser == '') {
                tasks.push(this.taskData[i].tasks[j])
              }
              else {
                if (this.taskData[i].tasks[j].assignee_id === this.selectedUser) {
                  tasks.push(this.taskData[i].tasks[j])
                }
              }
            }
          }
          this.filteredData.push({
            title: this.taskData[i].title,
            tasks: tasks
          })
        }
      }
    },

    selectedUser(newValue) {
      this.filteredData = []
      if (newValue == '') {
        
        if (this.selectedCategory != '') {
          for (let i = 0; i < this.taskData.length; i++) {
            let tasks = []
            for (let j = 0; j < this.taskData[i].tasks.length; j++) {
              if (this.taskData[i].tasks[j].category_id === this.selectedCategory) {
                tasks.push(this.taskData[i].tasks[j])
              }
            }
            this.filteredData.push({
              title: this.taskData[i].title,
              tasks: tasks
            })
          }
        }
        else {
          this.filteredData = this.taskData
        }
      }
      else {
        for (let i = 0; i < this.taskData.length; i++) {
          let tasks = []
          for (let j = 0; j < this.taskData[i].tasks.length; j++) {
            if (this.taskData[i].tasks[j].assignee_id === newValue) {
              if (this.selectedCategory == '') {
                tasks.push(this.taskData[i].tasks[j])
              }
              else {
                if (this.taskData[i].tasks[j].category_id === this.selectedCategory) {
                  tasks.push(this.taskData[i].tasks[j])
                }
              }
            }
          }
          this.filteredData.push({
            title: this.taskData[i].title,
            tasks: tasks
          })
        }
      }
    }
  },
  methods: {
    async getAllTask() {
      const response = await TaskBoardServices.getAllTask();
      if (!response) {
        this.$router.push("/user/login");
      }
      else {
        for (const [key, value] of Object.entries(response.data)) {
          this.taskData.push({
            title: key,
            tasks: value
          })
        }
      }
      this.filteredData = this.taskData
    },

    async getAllCategory() {
      const response = await TaskBoardServices.getAllCategory();
      if (!response) {
        this.$router.push("/user/login");
      }
      else {
        this.categoryList = ['',...response.data];
      }
    },

    async getAllUser() {
      const response = await ReportService.getAllUser();
      if (!response) {
        this.$router.push("/user/login");
      }
      else {
        console.log(response.data)
        this.userList = ['',...response.data];
      }
    },

    onClickTask(task) {
      console.log(task)
    },

    async onChangeColumn(event, column_id) {
      if (event.added) {
        let task = event.added.element;
        let param = {
          taskId: task.task_id,
          status: column_id
        }
        await TaskBoardServices.updateTask(param);
      }
    }
  },

  created() {
    this.getAllUser();
    this.getAllCategory()
    this.getAllTask();
  }
};