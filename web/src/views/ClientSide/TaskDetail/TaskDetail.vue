<!-- eslint-disable -->
<template>
    <v-app id="task-detail">
        <v-main style="padding: 1.5%">
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
                <!-- Edit button -->
                <v-row :align="'center'">
                    <v-col cols="12" md="6">
                        <span class="text-md-h6">
                            {{ taskDetailData.task_title }}
                        </span>
                    </v-col>
                    <v-col cols="12" md="6" class="d-flex justify-end align-center">
                        <v-chip class="ma-2" outlined @click="onClickEditTaskDetail">
                            <v-icon left>
                                mdi-pencil
                            </v-icon>
                            <span class="text-subtitle-2">
                                Edit
                            </span>
                        </v-chip>
                        <!-- <v-btn class="mx-2" fab dark x-small outlined color="primary">
                            <v-icon dark>
                                mdi-format-list-bulleted-square
                            </v-icon>
                        </v-btn> -->
                    </v-col>
                </v-row>
                <!-- TASK -->
                <v-card elevation="2" max-width="100%">
                    <v-card-text>
                        <!-- Avatar of task -->
                        <v-row no-gutters class="mb-4">
                            <v-col cols="12" md="12">
                                <v-list-item class="pl-0">
                                    <v-list-item-avatar>
                                        <v-img :src="avtBaseUrl + '/' + taskDetailData.creator_avt"
                                            v-if="taskDetailData.creator_avt != null"></v-img>
                                        <v-img :src="require('@/assets/user-default.png')" v-else></v-img>
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
                                                <v-img :src="avtBaseUrl + '/' + taskDetailData.assignee_avt"
                                                    max-height="30" max-width="30"
                                                    v-if="taskDetailData.assignee_avt != null"></v-img>
                                                <v-img max-height="30" max-width="30"
                                                    :src="require('@/assets/user-default.png')" v-else></v-img>
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
                                                <v-icon small @click="onClickRemoveAttachment(item.attachment_id)">
                                                    mdi-close-thick
                                                </v-icon>
                                            </div>
                                        </v-col>
                                        <v-col cols="12" md="4" class="d-flex justify-end">
                                            <!-- <FormulateInput type="file" name="file"
                                                label="Select your documents to upload"
                                                help="Select one or more Files to upload"
                                                multiple /> -->

                                            <v-btn rounded outlined color="primary" dar
                                                @click="onClickAttachFileButton">
                                                <v-icon>
                                                    mdi-plus
                                                </v-icon>
                                                Attach File
                                            </v-btn>
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
                                    <v-data-table :headers="childTaskHeader" :items="taskDetailData.childTasks" :item-class="setItemRowCLass" @click:row="openTaskDetails"
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
                                        <v-img :src="avtBaseUrl + '/' + item.avt" v-if="item.avt != null"></v-img>
                                        <v-img :src="require('@/assets/user-default.png')" v-else></v-img>
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
                            <v-col cols="12" md="2" class="d-flex justify-end">
                                <!-- <v-btn icon color="primary">
                                    <v-icon>mdi-format-list-bulleted</v-icon>
                                </v-btn> -->
                                <v-menu offset-y v-if="item.employee_id === currentLoginedEmployeeId && item.is_edit">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon color="primary" v-bind="attrs" v-on="on">
                                            <v-icon>mdi-format-list-bulleted</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-list>
                                        <v-list-item>
                                            <v-btn text color="primary" @click="onClickEditComment(item)" width="100%">
                                                <v-icon class="mr-2">
                                                    mdi-pencil
                                                </v-icon>
                                                Edit
                                            </v-btn>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-btn text color="error" width="100%" @click="onClickDeleteComment(item)">
                                                <v-icon class="mr-2">
                                                    mdi-delete
                                                </v-icon>
                                                Delete
                                            </v-btn>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                            </v-col>
                            <v-row class="mt-2 task-detail-comment">
                                <v-col cols=12 md="12" v-html="item.content" class="black--text ">

                                </v-col>
                            </v-row>
                        </v-row>
                    </v-card-text>
                </v-card>


                <v-row v-if="reveal" style="height: 400px">

                </v-row>
                <v-row v-else style="height: 80px">

                </v-row>
            </v-container>

        </v-main>
        <v-card class=" comment-area" style="height: 80px">
            <v-card-text>
                <v-row no-gutters>
                    <v-col cols="12" md="1" class="d-flex justify-center">
                        <v-btn class="ma-2" outlined fab x-small @click="onClickAddAttachmentShortIcon">
                            <v-icon>mdi-paperclip-plus</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col cols="12" md="9">
                        <v-text-field placeholder="Write a comment..." outlined
                            @click="reveal = true"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="2" class="d-flex justify-center mt-2">
                        <v-btn tile text @click="reveal = true">
                            <v-icon left>
                                mdi-pencil
                            </v-icon>
                            Change Status
                        </v-btn>
                    </v-col>
                </v-row>

            </v-card-text>

            <!-- reveal card -->
            <v-expand-transition>
                <v-card v-if="reveal && isUpdateComment == false"
                    class="transition-fast-in-fast-out v-card--reveal elevation-8" style="height: 400px;">
                    <v-card-text class="pb-0">
                        <v-row>
                            <v-col cols="12" md="1" class="d-flex justify-center align-center">
                                <v-btn outlined fab x-small>
                                    <v-icon>mdi-paperclip-plus</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col cols="12" md="8">
                                <v-row>
                                    <quill-editor ref="myQuillEditor" v-model="content" :options="editorOption"
                                        style=" height: 240px" @blur="onEditorBlur($event)"
                                        @focus="onEditorFocus($event)" @ready="onEditorReady($event)" />
                                </v-row>
                                <!-- <v-row>
                                    <v-col>
                                        <v-text-field placeholder="Notify comment to:" style="margin-top: 70px" outlined
                                            dense></v-text-field>
                                    </v-col>
                                </v-row> -->
                            </v-col>
                            <!-- CHANGE STATUS -->
                            <v-col cols="12" md="3">
                                <v-row no-gutters>
                                    Status
                                    <v-col cols="12">
                                        <v-autocomplete v-model="selectedProgress" :items="statusList" dense outlined
                                            item-text="statusTitle" item-value="statusValue">
                                        </v-autocomplete>
                                    </v-col>
                                </v-row>
                                <v-row no-gutters>
                                    Assignee
                                    <v-col cols="12">
                                        <v-autocomplete v-model="selectedUser" :items="userList" solo
                                            color="blue-grey lighten-2" item-text="name" item-value="employee_id">
                                            <template v-slot:selection="data">
                                                <div v-bind="data.attrs" :input-value="data.selected" close
                                                    @click="data.select">
                                                    <v-avatar left v-if="data.item.name">

                                                        <v-img :src="avtBaseUrl + '/' + data.item.avt"
                                                            v-if="data.item.avt != null" max-height="30" max-width="30">
                                                        </v-img>
                                                        <v-img max-height="30" max-width="30"
                                                            :src="require('@/assets/user-default.png')" v-else></v-img>
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
                                                        <v-img :src="avtBaseUrl + '/' + data.item.avt"
                                                            v-if="data.item.avt != null" max-height="35" max-width="35">
                                                        </v-img>
                                                        <v-img max-height="35" max-width="35"
                                                            :src="require('@/assets/user-default.png')" v-else></v-img>
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
                                <!-- start date -->
                                <v-row no-gutters>
                                    <v-dialog ref="startDateDialog" v-model="startDateModalShowed"
                                        :return-value.sync="startDate" persistent width="290px">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field v-model="startDate" label="Start Date"
                                                prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on">
                                            </v-text-field>
                                        </template>
                                        <v-date-picker v-model="startDate" scrollable>
                                            <v-spacer></v-spacer>
                                            <v-btn text color="primary" @click="startDateModalShowed = false">
                                                Cancel
                                            </v-btn>
                                            <v-btn text color="primary" @click="$refs.startDateDialog.save(startDate)">
                                                OK
                                            </v-btn>
                                        </v-date-picker>
                                    </v-dialog>
                                </v-row>
                                <!-- end date -->
                                <v-row no-gutters>
                                    <v-dialog ref="endDateDialog" v-model="endDateModalShowed"
                                        :return-value.sync="endDate" persistent width="290px">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field v-model="endDate" label="End Date" prepend-icon="mdi-calendar"
                                                readonly v-bind="attrs" v-on="on"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="endDate" scrollable>
                                            <v-spacer></v-spacer>
                                            <v-btn text color="primary" @click="endDateModalShowed = false">
                                                Cancel
                                            </v-btn>
                                            <v-btn text color="primary" @click="$refs.endDateDialog.save(endDate)">
                                                OK
                                            </v-btn>
                                        </v-date-picker>
                                    </v-dialog>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions class="pt-0 d-flex justify-center">
                        <v-btn text color="teal accent-4" @click="onClickCloseComment">
                            Close
                        </v-btn>
                        <v-btn text color="teal accent-4" class="ml-10" @click="onclickSubmitComment">
                            Submit
                        </v-btn>
                    </v-card-actions>

                </v-card>

                <v-card v-if="reveal && isUpdateComment == true"
                    class="transition-fast-in-fast-out v-card--reveal elevation-8" style="height: 400px;">
                    <v-card-text class="pb-0">
                        <v-row>
                            <v-col cols="12" md="1" class="d-flex justify-center align-center">
                                <v-btn outlined fab x-small>
                                    <v-icon>mdi-paperclip-plus</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col cols="12" md="10">
                                <v-row>
                                    <quill-editor ref="myQuillEditor" v-model="content" :options="editorOption"
                                        style=" height: 240px" @blur="onEditorBlur($event)"
                                        @focus="onEditorFocus($event)" @ready="onEditorReady($event)" />
                                </v-row>
                                <!-- <v-row>
                                    <v-col>
                                        <v-text-field placeholder="Notify comment to:" style="margin-top: 70px" outlined
                                            dense></v-text-field>
                                    </v-col>
                                </v-row> -->
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions class="pt-0 d-flex justify-center " style="margin-top: 80px">
                        <v-btn text color="teal accent-4" @click="onClickCloseComment">
                            Close
                        </v-btn>
                        <v-btn text color="teal accent-4" class="ml-10" @click="onclickSubmitComment">
                            Update
                        </v-btn>
                    </v-card-actions>

                </v-card>
            </v-expand-transition>
        </v-card>
        <!-- NOTIFICITION BEFORE DELETE DIALOG -->
        <v-dialog v-model="ConfirmDeleteCommentDialogShowed" v-if="ConfirmDeleteCommentDialogShowed" persistent
            max-width="600px" transition="dialog-top-transition">
            <v-card>
                <ConfirmDeleteCommentModal @on-close="onClose" @on-confirm-delete="onConfirmDeleteComment"
                    :confirmDeleteInfo="confirmDeleteInfo" />
            </v-card>
        </v-dialog>

        <!-- ADD ATTACHMENT MODAL -->
        <v-dialog v-model="AddAttachmentModalShowed" persistent max-width="1000px" transition="dialog-top-transition">
            <v-card>
                <AddAttachmentModal @on-close="onClose" @on-confirm-upload-attachment="onClickUploadAttachment" />
            </v-card>
        </v-dialog>

        <v-dialog v-model="imgDialog" width="700">
            <v-card>
                <img :src="mySrc" />
            </v-card>
        </v-dialog>
    </v-app>
</template>

<script src="./TaskDetail.js"></script>

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