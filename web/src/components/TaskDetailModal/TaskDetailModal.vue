<!-- eslint-disable -->
<template>
    <div>
        <v-toolbar class="text-h5" color="primary" dark>
            Task Detail
            <v-spacer></v-spacer>
            <v-btn text dark @click="onClose">
                Close
            </v-btn>
        </v-toolbar>

        <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                    <!-- status task -->
                    <v-row :align="'center'">
                        <v-col cols="12" md="3" class="d-flex  align-center" style="font-weight: 500">
                            <v-chip small :color="taskDetailData.category_color" dark class="mr-3">
                                {{ taskDetailData.category_name }}
                            </v-chip>
                            {{ taskDetailData.project_name }} - {{ taskDetailData.task_number }}
                        </v-col>

                        <v-col cols="12" md="9" class="d-flex justify-end align-center">
                            <span class="text-caption mb-0 mr-2">Start Date</span>
                            <span class="text-subtitle-2 mr-4">{{ taskDetailData.start_date }}</span>
                            <span class="text-caption mb-0 mr-2  lighten-1" style="color: #E16304">Due Date</span>


                            <span class="text-subtitle-2 mr-2 red--text lighten-1" v-if="taskDetailData.isLate">
                                {{ taskDetailData.end_date }}
                                <v-icon color="red">
                                    mdi-fire
                                </v-icon>
                            </span>
                            <span class="text-subtitle-2 mr-2 lighten-1" style="color: #E16304" v-else>{{
                                    taskDetailData.end_date
                            }}</span>


                            <v-chip small :color="getStatus(taskDetailData.status).color" dark>
                                <!-- color="red" text-color="white" -->
                                {{ getStatus(taskDetailData.status).text }}
                            </v-chip>

                        </v-col>
                    </v-row>
                    <!-- delete button -->
                    <v-row :align="'center'">
                        <v-col cols="12" md="6">
                            <span class="text-md-h6">
                                {{ taskDetailData.task_title }}
                            </span>
                        </v-col>
                        <v-col cols="12" md="6" class="d-flex justify-end align-center">
                            <v-btn class="mx-2" color="primary" max-width="150px" @click="onClickDeleteTask">
                                <v-icon dark>
                                    mdi-trash-can-outline
                                </v-icon>
                                DELETE TASK
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-row no-gutters v-if="confirmDeleteCheckboxShowed" >
                        <v-col cols="12" md="12"  >
                            <v-checkbox v-model="checkbox" :rules="[v => !!v || 'You must agree to continue!']"
                                label="All attachments and subtasks will be deleted! Are you sure you want to delete this task?  " required></v-checkbox>
                        </v-col>
                    </v-row>

                    <!-- TASK -->
                    <v-card elevation="2" max-width="100%" class="mt-5">
                        <v-card-text>
                            <!-- Avatar of task -->
                            <v-row no-gutters class="mb-4">
                                <v-col cols="12" md="12">
                                    <v-list-item class="pl-0">
                                        <v-list-item-avatar>
                                            <v-img :src="getAvatar(taskDetailData.creator_avt)"></v-img>
                                        </v-list-item-avatar>

                                        <v-list-item-content>
                                            <v-list-item-title class="text-subtitle-2">{{ taskDetailData.creator }}
                                            </v-list-item-title>
                                            <!-- v-text="file.title" -->
                                            <v-list-item-subtitle>Created {{ taskDetailData.create_at }}
                                            </v-list-item-subtitle>
                                            <!-- v-text="file.subtitle" -->
                                        </v-list-item-content>

                                    </v-list-item>
                                </v-col>
                            </v-row>
                            <!-- Task Description -->
                            <v-row no-gutters class="mb-4" id="task-detail-description">
                                <v-col cols=12 md="12" v-html="taskDetailData.task_description">

                                </v-col>
                            </v-row>
                            <!-- Priority | Assignee -->
                            <v-row>
                                <v-col cols=12 md="5">
                                    <v-row class="container-top-divider " :align="'center'">
                                        <v-col cols="12" md="5">
                                            Priority
                                        </v-col>
                                        <v-col cols="12" md="7" class="black--text font-weight-bold ">
                                            {{ getPriorityName(taskDetailData.priority) }}
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-col cols=12 md="2"></v-col>
                                <v-col cols=12 md="5">
                                    <v-row class="container-top-divider " :align="'center'">
                                        <v-col cols="12" md="5">
                                            Assignee
                                        </v-col>
                                        <v-col cols="12" md="7" class="black--text font-weight-bold ">
                                            <v-list-item class="pl-0">
                                                <v-list-item-avatar>
                                                    <v-img max-height="30" max-width="30"
                                                        :src="getAvatar(taskDetailData.assignee_avt)"></v-img>
                                                </v-list-item-avatar>

                                                <v-list-item-content>
                                                    <v-list-item-title class="text-subtitle-2">
                                                        {{ taskDetailData.assignee }}
                                                    </v-list-item-title>
                                                </v-list-item-content>

                                            </v-list-item>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                            <!-- Estimated | Actual -->
                            <v-row>
                                <v-col cols=12 md="5">
                                    <v-row class="container-top-divider " :align="'center'">
                                        <v-col cols="12" md="5">
                                            Estimated Hours
                                        </v-col>
                                        <v-col cols="12" md="7" class="black--text font-weight-bold ">
                                            {{ taskDetailData.estimated_hours }}
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-col cols=12 md="2"></v-col>
                                <v-col cols=12 md="5">
                                    <v-row class="container-top-divider " :align="'center'">
                                        <v-col cols="12" md="5">
                                            Actual Hours
                                        </v-col>
                                        <v-col cols="12" md="7" class="black--text font-weight-bold ">
                                            {{ taskDetailData.actual_hours }}
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>

                    <!-- ATTACH FILE -->
                    <v-card class="mt-8">
                        <v-tabs background-color="transparent">

                            <v-tab key="attachment">
                                Attachment({{ numberOfAttachment }})
                            </v-tab>
                            <v-tab-item key="attachment">
                                <v-card flat>
                                    <v-card-text>
                                        <v-row>
                                            <v-col cols="12" md="8">
                                                <div v-for="item in listAttachment" :key="item.attachment_id">
                                                    <v-icon small color="teal darken-2">
                                                        mdi-file-document
                                                    </v-icon>
                                                    <a :href="item.href">
                                                        {{ item.file_name }}
                                                    </a>
                                                    <!-- <v-icon small @click="onClickRemoveAttachment(item.attachment_id)">
                                                        mdi-close-thick
                                                    </v-icon> -->
                                                </div>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            </v-tab-item>

                            <v-tab key="subtasking" v-if="(taskDetailData.childTasks?.length > 0)">
                                Substasking({{ taskDetailData.childTasks?.length }})
                            </v-tab>
                            <v-tab-item key="subtasking" v-if="(taskDetailData.childTasks?.length > 0)">
                                <v-card flat>
                                    <v-card-text>
                                        <v-data-table :headers="childTaskHeader" :items="taskDetailData.childTasks"
                                            :item-class="setItemRowCLass"
                                            class="elevation-4" :hide-default-footer="true"
                                            style="max-height: 400px; overflow:auto">
                                            <template v-slot:item.status="{ item }">
                                                <div>
                                                    <v-chip small :color="getStatus(item.status).color" dark>
                                                        {{ getStatus(item.status).text }}
                                                    </v-chip>
                                                </div>
                                            </template>
                                        </v-data-table>
                                    </v-card-text>
                                </v-card>
                            </v-tab-item>
                        </v-tabs>

                    </v-card>

                    <!-- COMMENTS(123456) -->
                    <v-row :align="'center'" class="mt-2">
                        <v-col cols="12" md="12">
                            <span class="text-md-h6">
                                Comments({{ numberOfComments }})
                            </span>
                        </v-col>
                    </v-row>
                    <!-- COMMENT LIST-->
                    <v-card elevation="2">
                        <v-card-text>
                            <v-row no-gutters class="container-bottom-divider" v-for="item in listComments"
                                :key="item.taskcomment_id">
                                <a :href="`#${item.taskcomment_id}`"></a>
                                <v-col cols="12" md="10" :id="item.taskcomment_id">
                                    <v-list-item class="pl-0">
                                        <v-list-item-avatar>                                        
                                            <v-img :src="getAvatar(item.avt)"></v-img>
                                        </v-list-item-avatar>

                                        <v-list-item-content>
                                            <v-list-item-title class="text-subtitle-2">{{ item.creator }}
                                            </v-list-item-title>
                                            <!-- v-text="file.title" -->
                                            <v-list-item-subtitle>Created {{ item.create_at }}
                                            </v-list-item-subtitle>
                                            <!-- v-text="file.subtitle" -->
                                        </v-list-item-content>

                                    </v-list-item>
                                </v-col>
                                <!-- <v-col cols="12" md="2" class="d-flex justify-end">
                                    <v-menu offset-y
                                        v-if="item.employee_id === currentLoginedEmployeeId && item.is_edit">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn icon color="primary" v-bind="attrs" v-on="on">
                                                <v-icon>mdi-format-list-bulleted</v-icon>
                                            </v-btn>
                                        </template>
                                        <v-list>
                                            <v-list-item>
                                                <v-btn text color="primary" @click="onClickEditComment(item)"
                                                    width="100%">
                                                    <v-icon class="mr-2">
                                                        mdi-pencil
                                                    </v-icon>
                                                    Edit
                                                </v-btn>
                                            </v-list-item>
                                            <v-list-item>
                                                <v-btn text color="error" width="100%"
                                                    @click="onClickDeleteComment(item)">
                                                    <v-icon class="mr-2">
                                                        mdi-delete
                                                    </v-icon>
                                                    Delete
                                                </v-btn>
                                            </v-list-item>
                                        </v-list>
                                    </v-menu>
                                </v-col> -->
                                <v-row class="mt-2 task-detail-comment">
                                    <v-col cols=12 md="12" v-html="item.content" class="black--text ">

                                    </v-col>
                                </v-row>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-container>
                <!-- {{ taskDetailPropInfo }} -->
            </v-form>
        </v-card-text>

        <!-- <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="onClose">
                Close
            </v-btn>
        </v-card-actions> -->
    </div>
</template>

<script src="./TaskDetailModal.js"></script>

<style scoped>
#task-detail {
    /* background-color: whitesmoke; */
    /* padding: 1.5%; */
    height: 100vh;
    width: 100vw;
    overflow-y: auto;
    background-color: whitesmoke !important;
}

.container-top-divider {
    border-top: 1px solid gray;
    height: 100%;
}

.container-bottom-divider {
    border-bottom: 1px solid gray;
    height: 100%;
}

.v-card--reveal {
    bottom: 0;
    opacity: 1 !important;
    position: absolute;
    width: 100%;
}

.comment-area {
    position: fixed;
    bottom: 0;
    /* left: 0; */
    /* width: 100%; */
    width: -webkit-fill-available;
}

.task-detail-comment p {
    margin-bottom: 0;
}

.task-detail-comment {
    padding-bottom: 20px;
}

/* Helper classes */
.basil {
    background-color: #FFFBE6 !important;
}

.basil--text {
    color: #356859 !important;
}
</style>
<style>
#task-detail img {
    height: 200px;
}

#task-detail img:hover {
    cursor: pointer;
}
.item-row{
    cursor: pointer;
}
</style>
