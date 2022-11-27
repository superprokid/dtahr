<!-- eslint-disable -->
<template>
    <div>
        <v-toolbar class="text-h5" color="primary" dark>Edit Project</v-toolbar>

        <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                    <v-row no-gutters>
                        <v-col cols="12" md="6">
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field v-model="projectName" :rules="projectNameRules" label="Project Name"
                                        required>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" class="pt-0">
                                    <v-text-field v-model="clientName" :rules="clientNameRules" label="Client Name"
                                        required>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" class="pt-0">
                                    <v-autocomplete v-model="manager" :disabled="isUpdating" :items="employeeList" dense
                                        prepend-icon="mdi-account-plus-outline" placeholder="Choose Manager" filled
                                        color="blue-grey lighten-2" item-text="full_name" item-value="employee_id"
                                        required :rules="managerRules">
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
                                    <v-btn :disabled="!valid" color="success" class="mr-4" @click="onClickEditProject">
                                        Edit Project
                                    </v-btn>

                                    <v-btn color="error" class="mr-4" @click="reset">
                                        Reset Form
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12" md="6" class="d-flex justify-center">
                            <v-date-picker v-model="projectCreationDate" no-title>
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
        </v-card-actions>
    </div>
</template>

<script src="./EditProjectModal.js"></script>

<style>

</style>