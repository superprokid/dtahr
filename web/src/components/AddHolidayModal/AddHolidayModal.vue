<template>
    <div>
        <v-toolbar class="text-h5" color="primary" dark>Add Holiday</v-toolbar>
        <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field label="Name" :value="addHolidayInfo.fullName" type="text" readonly>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field label="Time (day)" v-model="time" type="number" @click:append-outer="increment" :rules="timeRules"
                                @click:prepend="decrement" hint="Time add/decrease">
                            </v-text-field>
                        </v-col>

                        <v-col cols="12">
                            <v-textarea filled name="input-7-4" label="Reason *" v-model="reason" :rules="reasonRules"></v-textarea>
                        </v-col>
                    </v-row>
                </v-container>
                <small>*indicates required field</small>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="onClose">
                Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="onAddHoliday">
                Save
            </v-btn>
        </v-card-actions>
    </div>
</template>
    
<script src="./AddHolidayModal.js">
</script>
