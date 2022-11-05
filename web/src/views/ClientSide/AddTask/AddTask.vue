<template>
    <div id="add-task-id">
        <v-app style="background-color: whitesmoke !important">
            <v-main>
                <v-form ref="form" v-model="valid" lazy-validation>

                    <v-container>
                        <div class="add-task-title">
                            Add Task
                        </div>
                        <!-- Add Button -->
                        <v-row class="mb-2">

                            <v-col cols="12" md="4" offset-md="8" class="d-flex justify-end">
                                <v-btn color="primary" width="150px" :disabled="!valid" @click="onClickAddTask">
                                    Add
                                </v-btn>
                            </v-col>

                        </v-row>
                        <!-- Subject -->
                        <v-row no-gutters>
                            <v-col cols="12">
                                <v-text-field label="Subject" placeholder="Subject" solo v-model="taskTitle" :rules="taskTitleRules" required></v-text-field>
                            </v-col>
                        </v-row>
                        <div class="add-task-title">
                            Task Description
                        </div>
                        <!-- Task Description -->
                        <v-row no-gutters class="mb-5" >
                            <v-card elevation="2" max-width="100%" >
                                <v-card-text >
                                    <v-row style="min-height: 500px">
                                        <quill-editor ref="myQuillEditor" v-model="content" :options="editorOption" 
                                            style="margin-bottom: 60px" @blur="onEditorBlur($event)"
                                            @focus="onEditorFocus($event)" @ready="onEditorReady($event)"  />

                                    </v-row>

                                </v-card-text>
                            </v-card>

                        </v-row>
                        <v-row no-gutters>
                            <v-card elevation="2" max-width="100%">

                                <v-card-text>
                                    <v-row>
                                        <v-col cols=12 md="5">
                                            <v-row class="container-top-divider ">
                                                <v-col cols="12" md="5" class="d-flex align-center">
                                                    Status
                                                </v-col>
                                                <v-col cols="12" md="7"
                                                    class="black--text font-weight-bold d-flex align-center">
                                                    Open
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                        <v-col cols=12 md="2">

                                        </v-col>
                                        <v-col cols=12 md="5">
                                            <v-row class="container-top-divider" :align="'center'">
                                                <v-col cols="12" md="5">
                                                    Assignee
                                                </v-col>
                                                <v-col cols="12" md="7" class="black--text font-weight-bold mt-8">
                                                    <v-autocomplete v-model="assignee" :disabled="isUpdating"
                                                        :items="employeeList" dense filled color="blue-grey lighten-2"
                                                        item-text="name" item-value="employee_id" required :rules="assigneeRules">
                                                        <template v-slot:selection="data">
                                                            <div v-bind="data.attrs" :input-value="data.selected" close
                                                                @click="data.select" @click:close="remove(data.item)">
                                                                <v-avatar left>
                                                                    <!-- <v-img :src="data.item.avatar"></v-img> -->
                                                                    <!-- <v-img :src="avtBaseUrl+'/'+"></v-img> -->

                                                                    <v-img :src="avtBaseUrl + '/' + data.item.avt"
                                                                        v-if="data.item.avt != null" max-height="30"
                                                                        max-width="30"></v-img>
                                                                    <v-img max-height="30" max-width="30"
                                                                        src="https://www.bootdey.com/app/webroot/img/Content/avatar/avatar1.png"
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
                                                                    <v-img :src="avtBaseUrl + '/' + data.item.avt"
                                                                        v-if="data.item.avt != null" max-height="35"
                                                                        max-width="35"></v-img>
                                                                    <v-img max-height="35" max-width="35"
                                                                        src="https://www.bootdey.com/app/webroot/img/Content/avatar/avatar1.png"
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
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols=12 md="5">
                                            <v-row class="container-top-divider" :align="'center'">
                                                <v-col cols="12" md="5">
                                                    Priority
                                                </v-col>
                                                <v-col cols="12" md="7" class=" mt-8">
                                                    <v-autocomplete v-model="prioritySelectValue" :items="priorityList"
                                                        dense outlined item-text="priority_text"
                                                        item-value="priority_value">
                                                    </v-autocomplete>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                        <v-col cols=12 md="2">

                                        </v-col>
                                        <v-col cols=12 md="5">
                                            <v-row class="container-top-divider" :align="'center'">
                                                <v-col cols="12" md="5">
                                                    Category Task
                                                </v-col>
                                                <v-col cols="12" md="5" class=" mt-8">
                                                    <v-autocomplete v-model="categorySelectValue"
                                                        :items="categoryTaskList" dense outlined
                                                        item-text="category_name" item-value="category_id" :rules="categoryTaskRules">
                                                    </v-autocomplete>
                                                </v-col>
                                                <v-col cols="12" md="2">
                                                    <!-- <v-btn  small outlined  color="teal" >
                                                    <v-icon>mdi-plus-circle-outline</v-icon>
                                                </v-btn> -->
                                                    <v-btn class="mx-2" fab dark outlined color="teal" x-small
                                                        @click="onClickAddCategoryTask">
                                                        <v-icon dark>
                                                            mdi-plus
                                                        </v-icon>
                                                    </v-btn>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols=12 md="5">
                                            <v-row class="container-top-divider " :align="'center'">
                                                <v-col cols="12" md="5">
                                                    Start Date
                                                </v-col>
                                                <v-col cols="12" md="7" class="black--text font-weight-bold ">
                                                    <v-dialog ref="startDateDialog" v-model="startDateModalShowed"
                                                        :return-value.sync="startDate" persistent width="290px">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field v-model="startDate" label="Start Date"
                                                                prepend-icon="mdi-calendar" readonly v-bind="attrs"
                                                                v-on="on"></v-text-field>
                                                        </template>
                                                        <v-date-picker v-model="startDate" scrollable>
                                                            <v-spacer></v-spacer>
                                                            <v-btn text color="primary"
                                                                @click="startDateModalShowed = false">
                                                                Cancel
                                                            </v-btn>
                                                            <v-btn text color="primary"
                                                                @click="$refs.startDateDialog.save(startDate)">
                                                                OK
                                                            </v-btn>
                                                        </v-date-picker>
                                                    </v-dialog>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                        <v-col cols=12 md="2">

                                        </v-col>
                                        <v-col cols=12 md="5">
                                            <v-row class="container-top-divider" :align="'center'">
                                                <v-col cols="12" md="5">
                                                    End Date
                                                </v-col>
                                                <v-col cols="12" md="7" class="black--text font-weight-bold ">
                                                    <v-dialog ref="endDateDialog" v-model="endDateModalShowed"
                                                        :return-value.sync="endDate" persistent width="290px">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field v-model="endDate" label="End Date"
                                                                prepend-icon="mdi-calendar" readonly v-bind="attrs"
                                                                v-on="on"></v-text-field>
                                                        </template>
                                                        <v-date-picker v-model="endDate" scrollable>
                                                            <v-spacer></v-spacer>
                                                            <v-btn text color="primary"
                                                                @click="endDateModalShowed = false">
                                                                Cancel
                                                            </v-btn>
                                                            <v-btn text color="primary"
                                                                @click="$refs.endDateDialog.save(endDate)">
                                                                OK
                                                            </v-btn>
                                                        </v-date-picker>
                                                    </v-dialog>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols=12 md="5">
                                            <v-row class="container-top-divider " :align="'center'">
                                                <v-col cols="12" md="5">
                                                    Estimated Hours
                                                </v-col>
                                                <v-col cols="12" md="7" class="mt-4">
                                                    <v-text-field outlined dense placeholder="Placeholder" v-model="estimatedHours" type="number">
                                                    </v-text-field>
                                                    <p class="text-caption mb-0">Estimated Hours for this issue</p>
                                                    <p class="text-caption mb-0">E.g 1, 0.25, 36</p>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                        <v-col cols=12 md="2">

                                        </v-col>
                                        <v-col cols=12 md="5">
                                            <v-row class="container-top-divider" :align="'center'">
                                                <v-col cols="12" md="5">
                                                    Actual Hours
                                                </v-col>
                                                <v-col cols="12" md="7" class="mt-4 ">
                                                    <v-text-field outlined dense placeholder="Placeholder" v-model="actualHours" type="number">
                                                    </v-text-field>
                                                    <p class="text-caption mb-0">Actual Hours for this issue</p>
                                                    <p class="text-caption mb-0">E.g 1, 0.25, 36</p>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                    </v-row>
                                </v-card-text>

                            </v-card>
                        </v-row>
                    </v-container>
                </v-form>
            </v-main>

            <!-- ADD CATEGORY TASK DIALOG -->
            <v-dialog v-model="addCategoryTaskDialogShowed" v-if="addCategoryTaskDialogShowed" persistent
                max-width="600px">
                <v-card>
                    <AddCategoryTaskModal @on-close="onClose" @on-create-category-task="onCreateCategoryTask" />
                </v-card>
            </v-dialog>

        </v-app>
    </div>
</template>

<script src="./AddTask.js"></script>

<style>
.add-task-container {
    width: 100%;
    background-color: #F5F5F5;
}

.add-task-title {
    font-size: large;
    color: #448aff;
    font-weight: bold;
}

#add-task-id {
    background-color: whitesmoke;
    padding: 1.5%;
    height: 100vh;
    width: 100vw;
    overflow-y: auto;
}

#add-task-id img {
    width: 300px;
}

.my-divider {
    width: 100%;
    height: 1px;
    background-color: black;
    margin: 10px 0px;
}

.container-top-divider {
    border-top: 1px solid gray;
    height: 100%;
}

.container-bottom-divider {
    border-bottom: 1px solid gray;
}

.my-button:focus {
    outline: none;
}
</style>