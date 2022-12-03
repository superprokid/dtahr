<!-- eslint-disable -->
<template>
    <div>
        <v-toolbar class="text-h5" color="#3C836E">
            <v-toolbar-title class="white--text">Add Existing Parent</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon class="white--text">mdi-magnify</v-icon>
            </v-btn>

            <v-text-field v-model="projectSearch" solo dense class="mt-6" @keydown.enter.prevent="onSearchProject"
                clearable></v-text-field>

        </v-toolbar>

        <v-card-text style="max-height: 400px; overflow:auto">
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                    <!-- <v-row :align="'center'">
                        <v-col cols="12" md="8">
                            <v-text-field v-model="categoryName" :rules="categoryNameRules" label="Category Name"
                                required>
                            </v-text-field>
                        </v-col>

                        <v-col cols="12" md="4">
                            <v-btn :disabled="!valid" color="primary" class="mr-4" @click="onClickCreateCategoryTask">
                                Add
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-row >
                        <v-col cols="12" md="6">
                            <v-text-field v-model="picker" label="Category Color" readonly required>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-color-picker dot-size="22" hide-canvas hide-inputs hide-mode-switch hide-sliders
                                mode="hexa" show-swatches swatches-max-height="250" v-model="picker"></v-color-picker>
                        </v-col>

                    </v-row> -->

                    <v-list flat>
                        <v-list-item-group v-model="selectedItem" color="primary">
                            <template v-for="(item, i) in listParentTask">
                                <v-list-item @click="onSelectParentTask(item)">
                                    <v-list-item-icon>
                                        <!-- <v-icon v-text="item.icon"></v-icon> -->
                                        {{ item.task_number }}
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="item.task_title"></v-list-item-title>
                                    </v-list-item-content>
                                    <v-list-item-action>
                                        <v-chip small :color="statusColorArr[item.status]" dark>
                                            {{statusTextArr[item.status]}}
                                        </v-chip>
                                    </v-list-item-action>

                                </v-list-item>
                                <v-divider color="black"></v-divider>
                            </template>


                        </v-list-item-group>
                    </v-list>

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

<script src="./AddParentTaskModal.js"></script>


