<template>
    <v-app id="task-detail">
        <v-main style="padding: 1.5%">
            <v-container>
                <v-row :align="'center'">
                    <v-col cols="12" md="3" class="d-flex  align-center">
                        <v-chip small :color="taskDetailData.category_color" dark class="mr-3">
                            {{ taskDetailData.category_name }}
                        </v-chip>
                        {{ taskDetailData.task_id }}
                    </v-col>

                    <v-col cols="12" md="9" class="d-flex justify-end align-center">
                        <span class="text-caption mb-0 mr-2">Start Date</span>
                        <span class="text-subtitle-2 mr-4">{{ taskDetailData.start_date }}</span>
                        <span class="text-caption mb-0 mr-2 red--text lighten-1">Due Date</span>
                        <span class="text-subtitle-2 mr-2 red--text lighten-1">{{ taskDetailData.start_date
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
                        <v-btn class="mx-2" fab dark x-small outlined color="primary">
                            <v-icon dark>
                                mdi-format-list-bulleted-square
                            </v-icon>
                        </v-btn>
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
                                        <v-img :src="avtBaseUrl + '/' + taskDetailData.assignee_avt"
                                            v-if="taskDetailData.assignee_avt != null"></v-img>
                                        <v-img src="https://www.bootdey.com/app/webroot/img/Content/avatar/avatar1.png"
                                            v-else></v-img>
                                    </v-list-item-avatar>

                                    <v-list-item-content>
                                        <v-list-item-title class="text-subtitle-2">{{ taskDetailData.assignee }}
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
                        <v-row no-gutters class="mb-4">
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
                                                    src="https://www.bootdey.com/app/webroot/img/Content/avatar/avatar1.png"
                                                    v-else></v-img>
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
                <!-- COMMENTS(123456) -->
                <v-row :align="'center'">
                    <v-col cols="12" md="12">
                        <span class="text-md-h6">
                            Comments(4)
                        </span>
                    </v-col>
                </v-row>
                <!-- COMMENT -->
                <v-card elevation="2">
                    <v-card-text>
                        <v-row>
                            fewjeiowjoi
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate fuga illum voluptatum
                            tenetur veritatis porro rerum de
                            lectus quos natus modi, eligendi inventore sint, expedita cupiditate explicabo sunt
                            repellat
                            praesentium nobis!
                            fewjeiowjoi
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate fuga illum voluptatum
                            tenetur veritatis porro rerum de
                            lectus quos natus modi, eligendi inventore sint, expedita cupiditate explicabo sunt
                            repellat
                            praesentium nobis!
                            fewjeiowjoi
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate fuga illum voluptatum
                            tenetur veritatis porro rerum de
                            lectus quos natus modi, eligendi inventore sint, expedita cupiditate explicabo sunt
                            repellat
                            praesentium nobis!
                            fewjeiowjoi
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate fuga illum voluptatum
                            tenetur veritatis porro rerum de
                            lectus quos natus modi, eligendi inventore sint, expedita cupiditate explicabo sunt
                            repellat
                            praesentium nobis!
                            fewjeiowjoi
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate fuga illum voluptatum
                            tenetur veritatis porro rerum de
                            lectus quos natus modi, eligendi inventore sint, expedita cupiditate explicabo sunt
                            repellat
                            praesentium nobis!
                            enetur veritatis porro rerum de
                            lectus quos natus modi, eligendi inventore sint, expedita cupiditate explicabo sunt
                            repellat
                            praesentium nobis!
                            fewjeiowjoi
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate fuga illum voluptatum
                            tenetur veritatis porro rerum de
                            lectus quos natus modi, eligendi inventore sint, expedita cupiditate explicabo sunt
                            repellat
                            praesentium nobis!
                            fewjeiowjoi
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate fuga illum voluptatum
                            tenetur veritatis porro rerum de
                            lectus quos natus modi, eligendi inventore sint, expedita cupiditate explicabo sunt
                            repellat
                            praesentium nobis!
                            enetur veritatis porro rerum de
                            lectus quos natus modi, eligendi inventore sint, expedita cupiditate explicabo sunt
                            repellat
                            praesentium nobis!
                            fewjeiowjoi
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate fuga illum voluptatum
                            tenetur veritatis porro rerum de
                            lectus quos natus modi, eligendi inventore sint, expedita cupiditate explicabo sunt
                            repellat
                            praesentium nobis!
                            fewjeiowjoi
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate fuga illum voluptatum
                            tenetur veritatis porro rerum de
                            lectus quos natus modi, eligendi inventore sint, expedita cupiditate explicabo sunt
                            repellat
                            praesentium nobis!
                        </v-row>
                    </v-card-text>
                </v-card>
                <v-row v-if="reveal" style="height: 300px">

                </v-row>
                <v-row v-else style="height: 80px">

                </v-row>
            </v-container>

        </v-main>
        <v-card class=" comment-area" style="height: 80px">
            <v-card-text>
                <v-row no-gutters>
                    <v-col cols="12" md="1">
                        <v-btn class="ma-2" outlined fab x-small>
                            <v-icon>mdi-paperclip-plus</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col cols="12" md="9">
                        <v-text-field placeholder="Write a comment, use @mention to notify a colleague..." outlined
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


            <v-expand-transition>
                <v-card v-if="reveal" class="transition-fast-in-fast-out v-card--reveal elevation-8"
                    style="height: 400px;">
                    <v-card-text class="pb-0">
                        <v-row>
                            <v-col cols="12" md="1">
                                <v-btn outlined fab x-small>
                                    <v-icon>mdi-paperclip-plus</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col cols="12" md="8">
                                <v-row>
                                    <quill-editor ref="myQuillEditor" v-model="content" :options="editorOption"
                                        style=" height: 180px" @blur="onEditorBlur($event)"
                                        @focus="onEditorFocus($event)" @ready="onEditorReady($event)" />
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-text-field placeholder="Notify comment to:" style="margin-top: 70px"
                                        outlined dense></v-text-field>
                                    </v-col>
                                    
                                </v-row>
                            </v-col>
                            <v-col cols="12" md="3">
                                change status
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions class="pt-0">
                        <v-btn text color="teal accent-4" @click="reveal = false">
                            Close
                        </v-btn>
                    </v-card-actions>

                </v-card>
            </v-expand-transition>
        </v-card>
    </v-app>


</template>

<script src="./TaskDetail.js"></script>

<style>
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
</style>