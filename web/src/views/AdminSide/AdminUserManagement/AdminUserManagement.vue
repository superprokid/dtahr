<template>
    <div class="pa-4" style="height: 90vh; overflow-y: auto;">


        <div id="employee-search-condition" v-if="employeeSearchShowed">
            <v-container>
                <div class="user-detail-title-static">
                    EMPLOYEE MANAGEMENT
                </div>

                <div class="mt-5">
                    <v-toolbar class="text-h5" color="secondary" dark>
                        <v-toolbar-title>Search Area</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn class="ma-2" text @click="expand = !expand">
                            <v-icon>
                                mdi-menu-swap
                            </v-icon>
                        </v-btn>

                    </v-toolbar>
                    <v-expand-transition>
                        <v-card outlined color="#eee" v-show="expand">
                            <v-card-text>
                                <v-form ref="form" v-model="valid" lazy-validation>
                                    <v-row>
                                        <v-col cols="12" md="3" class="d-flex align-center justify-end">
                                            <span class="text-overline blue--text text--lighten-1">
                                                Group Name
                                            </span>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-autocomplete class="pt-4" v-model="selectGroup" :items="listGroups" dense
                                                clearable solo item-text="group_full_name" item-value="group_id"
                                                return-object @change="onChangeGroup">
                                            </v-autocomplete>
                                        </v-col>
                                        <v-col cols="12" md="3">

                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" md="3" class="d-flex  justify-end">
                                            <span class="text-overline blue--text text--lighten-1">
                                                Email
                                            </span>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-text-field solo dense v-model="emailSearch" clearable></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="3">

                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" md="3" class="d-flex  justify-end">
                                            <span class="text-overline blue--text text--lighten-1">
                                                Full Name
                                            </span>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-text-field solo dense v-model="fullnameSearch" clearable></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="3">

                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" md="3" class="d-flex justify-end">
                                            <span class="text-overline blue--text text--lighten-1">
                                                Gender
                                            </span>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-autocomplete class="" v-model="genderSearch" solo clearable
                                                :items="genderItems" dense item-text="gender_text"
                                                item-value="gender_value">
                                            </v-autocomplete>
                                        </v-col>
                                        <v-col cols="12" md="3">

                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" md="3" class="d-flex justify-end">
                                            <span class="text-overline blue--text text--lighten-1">
                                                Phone
                                            </span>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-text-field solo dense v-model="phoneSearch" clearable></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="3">

                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" md="3" class="d-flex justify-end">
                                            <span class="text-overline blue--text text--lighten-1">
                                                Main Skill
                                            </span>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-text-field solo dense v-model="mainSkillSearch" clearable></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="3">

                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" md="3" class="d-flex justify-end">
                                            <span class="text-overline blue--text text--lighten-1">
                                                Job Role
                                            </span>
                                        </v-col>
                                        <v-col cols="12" md="6">
                                            <v-text-field solo dense v-model="jobRoleSearch" clearable></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="3">

                                        </v-col>
                                    </v-row>
                                    <v-row justify="center" class="mb-4">
                                        <v-btn :disabled="!valid" color="success" max-width="170px" dark class="mr-4"
                                            @click="onClickSearchEmployee">
                                            Search
                                        </v-btn>

                                        <v-btn color="error" class="mr-4" max-width="170px" dark @click="reset">
                                            Clear
                                        </v-btn>

                                    </v-row>

                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-expand-transition>
                </div>
                <div class="mt-5">
                    <v-data-table :headers="headers" :items="listUsers" item-key="name" :item-class="setItemRowCLass"
                        class="elevation-4 usermanagement-table" :search="search" :custom-filter="filterOnlyCapsText"
                        @click:row="clickOnUser">
                        <template v-slot:top>
                            <v-text-field v-model="search" label="Search" class="mx-4"></v-text-field>
                        </template>              
                    </v-data-table>
                </div>
            </v-container>

        </div>


        <!-- <div id="employee-result-table" v-if="employeeManagementShowed">
            <div class="user-detail-title" @click="goBackEmployeeSearch">
                <v-icon medium color="blue darken-2">mdi-keyboard-return</v-icon>
                EMPLOYEE MANAGEMENT
            </div>
            <div class="mt-5">
                <v-data-table :headers="headers" :items="listUsers" item-key="name" :item-class="setItemRowCLass"
                    class="elevation-1 usermanagement-table" :search="search" :custom-filter="filterOnlyCapsText"
                    @click:row="clickOnUser">
                    <template v-slot:top>
                        <v-text-field v-model="search" label="Search" class="mx-4"></v-text-field>
                    </template>
                </v-data-table>
            </div>
        </div> -->

    </div>

</template>

<script src="./AdminUserManagement.js"></script>

<style>
.item-row {
    cursor: pointer;
}

.user-detail-title-static {
    font-size: large;
    color: #448aff;
    font-weight: bold;
    display: inline;
}

.user-detail-title {
    font-size: large;
    color: #448aff;
    font-weight: bold;
    display: inline;
}

.user-detail-title:hover {
    color: #0a47b1;
    display: inline;
    cursor: pointer;
}
</style>