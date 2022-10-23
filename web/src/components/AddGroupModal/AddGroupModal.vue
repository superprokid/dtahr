<!-- eslint-disable -->
<template>
    <div>
        <v-toolbar class="text-h5" color="primary" dark>Add Group</v-toolbar>
        <!-- <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12" sm="6" md="6">
                        <v-row>
                            <v-col cols="12">
                                <v-text-field label="Name" :value="username" type="text" readonly>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Total Time" :v-model="total" type="number"
                                    @click:append-outer="increment" @click:prepend="decrement"
                                    hint="Total working time">
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                        <v-date-picker v-model="date" :allowed-dates="allowedDates" no-title @input="menu2 = false">
                        </v-date-picker>
                    </v-col>
                    <v-col cols="12">
                        <v-textarea filled name="input-7-4" label="Reason *" v-model="description"></v-textarea>
                    </v-col>
                </v-row>
            </v-container>
            <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="onClose">
                Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="onSave">
                Save
            </v-btn>
        </v-card-actions> -->

        <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                    <v-row>
                        <v-col cols="12" md="6">

                            <v-row>
                                <v-col cols="12">
                                    <v-text-field v-model="groupName" :counter="10" :rules="groupNameRules"
                                        label="Group Short Name" required>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field v-model="groupFullName" :rules="groupFullNameRules"
                                        label="Group Full Name" required></v-text-field>
                                </v-col>

                                <v-col cols="12">
                                    <v-combobox v-model="managerSelect" :items="listFreeManager" item-text="full_name" item-value="employee_id" chips clearable :rules="[required]"
                                        label="Choose Manager" multiple prepend-icon="mdi-account-plus-outline" solo>
                                        <template v-slot:selection="{ attrs, item, select, selected }">
                                            <v-chip v-bind="attrs" :input-value="selected" close @click="select"
                                                @click:close="remove(item)">
                                                <strong>{{ item.full_name }}</strong>&nbsp;
                                                <!-- <span>(interest)</span> -->
                                            </v-chip>
                                        </template>
                                    </v-combobox>
                                </v-col>
                            </v-row>
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-date-picker v-model="managerStartDate" no-title>
                            </v-date-picker>
                        </v-col>
                    </v-row>

                    <!-- <v-select v-model="select" :items="items" :rules="[v => !!v || 'Item is required']" label="Item"
                        required>
                    </v-select> -->
                    <div class="mt-4">
                        <v-btn :disabled="!valid" color="success" class="mr-4" @click="onClickCreateGroup">
                        Create Group
                    </v-btn>

                    <v-btn color="error" class="mr-4" @click="reset">
                        Reset Form
                    </v-btn>

                    <!-- <v-btn color="warning" @click="resetValidation">
                        Reset Validation
                    </v-btn> -->
                    </div>
                    
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

<script src="./AddGroupModal.js"></script>

<style src="./AddGroupModal.css">

</style>