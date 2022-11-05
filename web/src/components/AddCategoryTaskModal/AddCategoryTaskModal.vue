<!-- eslint-disable -->
<template>
    <div>
        <v-toolbar class="text-h5" color="primary" dark>Add Category Task</v-toolbar>

        <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                    <v-row :align="'center'">
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

                    </v-row>
                    <!-- <div class="mt-10">
                        {{ picker }}
                    </div> -->

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

<script src="./AddCategoryTaskModal.js"></script>


