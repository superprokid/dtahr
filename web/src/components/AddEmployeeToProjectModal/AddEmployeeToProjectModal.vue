<template>
    <div>
        <v-toolbar class="text-h5" color="primary" dark>Add Employee To Project</v-toolbar>
        <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                    <v-row no-gutters>
                        <v-col cols="12" md="6">
                            <v-row no-gutters>
                                <v-col cols="12">
                                    <v-autocomplete v-model="employee" :disabled="isUpdating" :items="employeeList"
                                        dense prepend-icon="mdi-account-plus-outline" placeholder="Choose Employee"
                                        filled color="blue-grey lighten-2" item-text="full_name"
                                        item-value="employee_id" @input="onSelectEmployee" required return-object
                                        :rules="employeeRules">
                                        <!-- Hiển thị sau khi chọn -->
                                        <template v-slot:selection="data">
                                            <div v-bind="data.attrs" :input-value="data.selected" close
                                                @click="data.select" @click:close="remove(data.item)">
                                                <v-avatar left>
                                                    <v-img :src="getAvatar(data.item.avt)" max-height="35"
                                                        max-width="35">
                                                    </v-img>
                                                </v-avatar>
                                                {{ data.item.full_name }}
                                            </div>
                                        </template>
                                        <!-- Hiển thị khi mở dropdown -->
                                        <template v-slot:item="data">
                                            <template v-if="typeof data.item !== 'object'">
                                                <v-list-item-content v-text="data.item">
                                                </v-list-item-content>
                                            </template>
                                            <template v-else>
                                                <v-list-item-avatar>
                                                    <v-img :src="getAvatar(data.item.avt)" max-height="35"
                                                        max-width="35">
                                                    </v-img>
                                                </v-list-item-avatar>
                                                <v-list-item-content>
                                                    <v-list-item-title v-html="data.item.full_name">
                                                    </v-list-item-title>
                                                </v-list-item-content>
                                            </template>
                                        </template>
                                    </v-autocomplete>
                                </v-col>
                                <v-col cols="12">
                                    <div>
                                        <span class="text-overline blue--text text--lighten-1 mr-2">Full Name:</span>
                                        <span class="subtitle-2">{{ employeeSelectEventInfo.full_name }}
                                        </span>
                                    </div>
                                    <div>
                                        <span class="text-overline blue--text text--lighten-1 mr-2">Gender:</span>
                                        <span class="subtitle-2">{{ employeeSelectEventInfo.gender }}
                                        </span>
                                    </div>
                                    <div>
                                        <span class="text-overline blue--text text--lighten-1 mr-2">Job Role:</span>
                                        <span class="subtitle-2">{{ employeeSelectEventInfo.job_role }}
                                        </span>
                                    </div>
                                    <div>
                                        <span class="text-overline blue--text text--lighten-1 mr-2">Main Skill:</span>
                                        <span class="subtitle-2">{{ employeeSelectEventInfo.main_skill }}
                                        </span>
                                    </div>
                                    <div>
                                        <span class="text-overline blue--text text--lighten-1 mr-2">Status:</span>
                                        <span class="subtitle-2 grey--text" v-if="employeeSelectEventInfo.is_deleted">Disable</span>
                                        <span class="subtitle-2 green--text" v-else>Active</span>
                                    </div>
                                    <div>
                                        <span class="text-overline blue--text text--lighten-1 mr-2">Group Id:</span>
                                        <span class="subtitle-2">{{ employeeSelectEventInfo.group_id }}
                                        </span>
                                    </div>
                                    <div>
                                        <span class="text-overline blue--text text--lighten-1 mr-2">Group Name:</span>
                                        <span class="subtitle-2">{{ employeeSelectEventInfo.group_name }}
                                        </span>
                                    </div>
                                    
                                </v-col>
                                <v-col cols="12" class="mt-5">
                                    <v-btn :disabled="!valid" color="success" class="mr-4"
                                        @click="onClickAddEmployeeToProject">
                                        Add Employee
                                    </v-btn>

                                    <v-btn color="error" class="mr-4" @click="reset">
                                        Reset Form
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12" md="6" class="d-flex justify-center">
                            <v-date-picker v-model="employeeJoinedDate" no-title>
                            </v-date-picker>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="onClose">
                Close
            </v-btn>
            <!-- <v-btn color="blue darken-1" text @click="onSave">
                Save
            </v-btn> -->
        </v-card-actions>
    </div>
</template>

<script src="./AddEmployeeToProjectModal.js"></script>