<template>
    <div class="pa-4 mt-3" style="height: 90vh; overflow-y: auto;">
        <div class="admin-salary-title">
            SALARY MANAGEMENT
        </div>

        <div class="mt-5">
            <v-row no-gutters>
                <v-col cols="3">
                    <v-menu v-model="monthPicker" :close-on-content-click="false" :nudge-right="40"
                        transition="scale-transition" offset-y min-width="auto">
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field v-model="monthSelect" label="Month" prepend-icon="mdi-calendar" readonly
                                v-bind="attrs" v-on="on">
                            </v-text-field>
                        </template>
                        <v-date-picker v-model="monthSelect" @input="onSelectMonth" type="month"
                            :allowed-dates="allowedMonths">
                        </v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="6" offset-md="3" class="d-flex justify-end">
                    <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn color="primary" dark v-bind="attrs" v-on="on">
                                Actions
                                <v-icon>mdi-menu-down</v-icon>
                            </v-btn>

                        </template>
                        <v-list>
                            <v-list-item>
                                <v-btn color="primary" text width="100%" :disabled="userSelected.length == 0"
                                    @click="onClickEditSalary">
                                    <v-icon style="margin-right: 10px">
                                        mdi-pencil
                                    </v-icon>
                                    Modify
                                </v-btn>
                            </v-list-item>

                            <v-list-item>
                                <v-btn color="primary" text :disabled="userSelected.length == 0"
                                    @click="onClickSalaryInfo">
                                    <v-icon style="margin-right: 10px">
                                        mdi-pencil
                                    </v-icon>
                                    Salary Info
                                </v-btn>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                    <v-btn color="success" class="ml-3" dark v-bind="attrs" v-on="on" @click="downloadSalary">
                        Download
                        <v-icon>mdi-download</v-icon>
                    </v-btn>
                </v-col>
            </v-row>

            <!-- <v-card class="elevation-4"> -->
            <!-- <v-card-text> -->
            <v-row no-gutters>
                <v-col cols="12">
                    <v-data-table v-model="userSelected" :headers="headers" :items="listUser" item-key="employee_id"
                        :item-class="setItemRowCLass" show-select :single-select="true" class="elevation-4"
                        :search="search" :custom-filter="filterOnlyCapsText">
                        <template v-slot:top>
                            <v-text-field v-model="search" label="Search" class="mx-4"></v-text-field>
                        </template>
                        <template v-slot:item.full_name="{ item }">
                            <div>
                                <v-avatar left>
                                    <v-img :src="getAvatar(item.avt)" max-height="25" max-width="25"></v-img>
                                </v-avatar>
                                {{ item.full_name }}
                            </div>
                        </template>
                    </v-data-table>
                </v-col>
            </v-row>
            <!-- </v-card-text> -->
            <!-- </v-card> -->
        </div>

        <!-- SALARY DIALOG -->
        <v-dialog v-model="salaryDialogShowed" v-if="salaryDialogShowed" persistent max-width="600px"
            transition="dialog-top-transition">
            <v-card>
                <v-toolbar class="text-h5" color="primary" dark>Add Bonus</v-toolbar>
                <v-card-text>
                    <v-form ref="formSalary" v-model="validSalary" lazy-validation>
                        <v-row no-gutters class="mt-4">
                            <v-col cols="12" md="5" offset-md="2">
                                <span class="text-overline blue--text text--lighten-1">Employee Id:</span>
                            </v-col>
                            <v-col cols="12" md="5" class="d-flex align-center">
                                <span class="subtitle-2 text-center">{{ this.userSelected[0]?.employee_id }}</span>
                            </v-col>
                        </v-row>
                        <v-row no-gutters class="">
                            <v-col cols="12" md="5" offset-md="2">
                                <span class="text-overline blue--text text--lighten-1">Full Name:</span>
                            </v-col>
                            <v-col cols="12" md="5" class="d-flex align-center">
                                <v-avatar v-if="this.userSelected[0]">
                                    <v-img :src="getAvatar(this.userSelected[0]?.avt)" max-width="25px"
                                        max-height="25px" class="mr-2"></v-img>
                                </v-avatar>
                                <span class="subtitle-2">{{ this.userSelected[0]?.full_name }}</span>
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols="12" md="5" offset-md="2">
                                <span class="text-overline blue--text text--lighten-1">Overtime Payment:</span>
                            </v-col>
                            <v-col cols="12" md="5" class="d-flex align-center">
                                <v-text-field v-model="overtimePayment" class="mt-0 pt-0" type="number">

                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols="12" md="5" offset-md="2">
                                <span class="text-overline blue--text text--lighten-1">Bonus Reward:</span>
                            </v-col>
                            <v-col cols="12" md="5" class="d-flex align-center">
                                <v-text-field v-model="bonusReward" class="mt-0 pt-0" type="number">

                                </v-text-field>
                            </v-col>
                        </v-row>

                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="() => { salaryDialogShowed = false; }">
                        Close
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="onChangeSalary"> Save </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- SALARY INFO -->
        <v-dialog v-model="salaryInfoDialogShowed" v-if="salaryInfoDialogShowed" persistent max-width="600px"
            transition="dialog-top-transition">
            <v-card>
                <v-toolbar class="text-h5" color="primary" dark>Edit Salary</v-toolbar>
                <v-card-text>
                    <v-form ref="formSalaryInfo" v-model="validSalaryInfo" lazy-validation>
                        <v-row no-gutters class="mt-4">
                            <v-col cols="12" md="5" offset-md="2">
                                <span class="text-overline blue--text text--lighten-1">Employee Id:</span>
                            </v-col>
                            <v-col cols="12" md="5" class="d-flex align-center">
                                <span class="subtitle-2 text-center">{{ this.userSelected[0]?.employee_id }}</span>
                            </v-col>
                        </v-row>
                        <v-row no-gutters class="">
                            <v-col cols="12" md="5" offset-md="2">
                                <span class="text-overline blue--text text--lighten-1">Full Name:</span>
                            </v-col>
                            <v-col cols="12" md="5" class="d-flex align-center">
                                <v-avatar v-if="this.userSelected[0]">
                                    <v-img :src="getAvatar(this.userSelected[0]?.avt)" max-width="25px"
                                        max-height="25px" class="mr-2"></v-img>
                                </v-avatar>
                                <span class="subtitle-2">{{ this.userSelected[0]?.full_name }}</span>
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols="12" md="5" offset-md="2">
                                <span class="text-overline blue--text text--lighten-1">Bank Name:</span>
                            </v-col>
                            <v-col cols="12" md="5" class="d-flex align-center">
                                <v-text-field v-model="bankName" class="mt-0 pt-0" type="text">

                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols="12" md="5" offset-md="2">
                                <span class="text-overline blue--text text--lighten-1">Bank Account:</span>
                            </v-col>
                            <v-col cols="12" md="5" class="d-flex align-center">
                                <v-text-field v-model="bankAccount" class="mt-0 pt-0" type="text">

                                </v-text-field>
                            </v-col>

                        </v-row>
                        <v-row no-gutters>
                            <v-col cols="12" md="5" offset-md="2">
                                <span class="text-overline blue--text text--lighten-1">Salary per hour:</span>
                            </v-col>
                            <v-col cols="12" md="5" class="d-flex align-center">
                                <v-text-field v-model="salaryPerHour" class="mt-0 pt-0" type="number" hint="This will be applied for the next month" persistent-hint>

                                </v-text-field>
                            </v-col>

                        </v-row>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="() => { salaryInfoDialogShowed = false; }">
                        Close
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="onChangeSalaryInfo"> Save </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>
  
<script src="./AdminSalary.js">
</script>
  

<style scoped>
.admin-salary-title {
    font-size: large;
    color: #448aff;
    font-weight: bold;
}

/* .admin-salary-title:hover{
    color: #0a47b1;
    display: inline;
    cursor: pointer;
} */

.item-row {
    cursor: pointer;
}
</style>