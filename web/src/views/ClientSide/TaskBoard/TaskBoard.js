import TaskCard from "../../../components/TaskCard/TaskCard"
import draggable from "vuedraggable"

import TaskBoardServices from "../../../services/API/TaskBoard/TaskBoardService";


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
      columns: [
        {
          title: "Backlog",
          tasks: [
            {
              id: 1,
              title: "Add discount code to checkout page",
              date: "Sep 14",
              type: "Feature Request"
            },
            {
              id: 2,
              title: "Provide documentation on integrations",
              date: "Sep 12"
            },
            {
              id: 3,
              title: "Design shopping cart dropdown",
              date: "Sep 9",
              type: "Design"
            },
            {
              id: 4,
              title: "Add discount code to checkout page",
              date: "Sep 14",
              type: "Feature Request"
            },
            {
              id: 5,
              title: "Test checkout flow",
              date: "Sep 15",
              type: "QA"
            }
          ]
        },
        {
          title: "In Progress",
          tasks: [
            {
              id: 6,
              title: "Design shopping cart dropdown",
              date: "Sep 9",
              type: "Design"
            },
            {
              id: 7,
              title: "Add discount code to checkout page",
              date: "Sep 14",
              type: "Feature Request"
            },
            {
              id: 8,
              title: "Provide documentation on integrations",
              date: "Sep 12",
              type: "Backend"
            }
          ]
        },
        {
          title: "Review",
          tasks: [
            {
              id: 9,
              title: "Provide documentation on integrations",
              date: "Sep 12"
            },
            {
              id: 10,
              title: "Design shopping cart dropdown",
              date: "Sep 9",
              type: "Design"
            },
            {
              id: 11,
              title: "Add discount code to checkout page",
              date: "Sep 14",
              type: "Feature Request"
            },
            {
              id: 12,
              title: "Design shopping cart dropdown",
              date: "Sep 9",
              type: "Design"
            },
            {
              id: 13,
              title: "Add discount code to checkout page",
              date: "Sep 14",
              type: "Feature Request"
            }
          ]
        },
        {
          title: "Done",
          tasks: [
            {
              id: 14,
              title: "Add discount code to checkout page",
              date: "Sep 14",
              type: "Feature Request"
            },
            {
              id: 15,
              title: "Design shopping cart dropdown",
              date: "Sep 9",
              type: "Design"
            },
            {
              id: 16,
              title: "Add discount code to checkout page",
              date: "Sep 14",
              type: "Feature Request"
            }
          ]
        }
      ],
      data: [],
    };
  },
  methods: {
    async getAllTask() {
      const response = await TaskBoardServices.getAllTask();
      if (!response) {
        this.$router.push("/user/login");
      }
      else {
        for (const [key, value] of Object.entries(response.data)) {
          this.data.push({
            title: key,
            tasks: value
          })
        }
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
    this.getAllTask();
  }
};