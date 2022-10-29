<template>

    <v-app>
        <v-main>
            <v-container class="pa-6">
                <v-toolbar class="text-h5" color="#154C79" dark>Register Work From Home Form</v-toolbar>
                <v-card outlined>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>
                            <v-row>
                                <v-col cols="12" md="8">
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field label="Title" filled dense v-model="titleWorkFromHome"
                                                :rules="titleWorkFromHomeRules" required></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-menu ref="menu" v-model="menu" :close-on-content-click="false" 
                                                :return-value.sync="dates" transition="scale-transition" offset-y
                                                min-width="auto">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-combobox v-model="dates" multiple chips small-chips clearable :rules="[requiredDate]"
                                                        label="Multiple picker Date" prepend-icon="mdi-calendar"
                                                        readonly v-bind="attrs" v-on="on"></v-combobox>
                                                    
                                                </template>
                                            </v-menu>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-menu ref="menuStartTime" v-model="startTimeMenu"
                                                :close-on-content-click="false" :nudge-right="40"
                                                :return-value.sync="startTime" transition="scale-transition" offset-y
                                                max-width="290px" min-width="290px">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field v-model="startTime" label="Start Time" clearable :rules="[requiredStartTime]"
                                                        prepend-icon="mdi-clock-time-four-outline" readonly
                                                        v-bind="attrs" v-on="on"></v-text-field>
                                                </template>
                                                <v-time-picker v-if="startTimeMenu" v-model="startTime" full-width
                                                    @click:minute="$refs.menuStartTime.save(startTime)"></v-time-picker>
                                            </v-menu>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-menu ref="menuEndTime" v-model="endTimeMenu"
                                                :close-on-content-click="false" :nudge-right="40"
                                                :return-value.sync="endTime" transition="scale-transition" offset-y
                                                max-width="290px" min-width="290px">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field v-model="endTime" label="End Time" clearable :rules="[requiredEndTime]"
                                                        prepend-icon="mdi-clock-time-four-outline" readonly
                                                        v-bind="attrs" v-on="on"></v-text-field>
                                                </template>
                                                <v-time-picker v-if="endTimeMenu" v-model="endTime" full-width
                                                    @click:minute="$refs.menuEndTime.save(endTime)"></v-time-picker>
                                            </v-menu>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-textarea filled name="input-7-4" label="Description" v-model="description"
                                                value="">
                                            </v-textarea>
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-col cols="12" md="4" class="d-flex justify-center">
                                    <v-date-picker full-width v-model="dates" multiple :allowed-dates="allowedDates"></v-date-picker>
                                </v-col>
                            </v-row>
                            <div class="d-flex justify-end">
                                <v-btn :disabled="!valid" color="success" class="mr-4" @click="onClickRegisterWorkFromHome">
                                    Register
                                </v-btn>

                                <v-btn color="error" class="mr-4" @click="reset">
                                    Reset Form
                                </v-btn>
                            </div>

                        </v-container>
                    </v-form>

                </v-card>

            </v-container>
        </v-main>
    </v-app>
</template>

<script src="./RegisterWorkFromHome.js"></script>

<style scoped>

</style>