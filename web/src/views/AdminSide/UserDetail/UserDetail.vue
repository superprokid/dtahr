<template>
    <div>
        <div class="user-detail-title-static">
            <!-- <v-icon medium color="blue darken-2">mdi-keyboard-return</v-icon> -->
            USER DETAIL
        </div>
        <div class="mt-5">
            {{ this.$route.params.employeeId }}
            <v-row>
                <!-- user information -->
                <v-col cols="12" md="4">
                    <v-card>
                        <v-card-text>
                            <v-row no-gutters :align="'center'">
                                <v-col cols="6">
                                    <div class="text_style">Personal Information </div>
                                </v-col>
                                <v-col cols="6" class="d-flex justify-end">
                                    <v-btn text color="primary">
                                        See More
                                    </v-btn>
                                </v-col>
                            </v-row>

                            <hr>
                            <v-list-item three-line>
                                <v-list-item-content>

                                    <div class=" ">
                                        <span class="text-overline blue--text text--lighten-1">Employee ID:</span>
                                        <span class="subtitle-2">{{ userDetailInfo.employee_id }}</span>
                                    </div>
                                    <div class=" ">
                                        <span class="text-overline blue--text text--lighten-1">Full Name:</span>
                                        <span class="subtitle-2">{{ userDetailInfo.full_name }}</span>
                                    </div>
                                    <div class=" ">
                                        <span class="text-overline blue--text text--lighten-1">Email:</span>
                                        <span class="subtitle-2">{{ userDetailInfo.email }}</span>
                                    </div>
                                    <div class=" ">
                                        <span class="text-overline blue--text text--lighten-1">Main Skill:</span>
                                        <span class="subtitle-2">{{ userDetailInfo.main_skill }}</span>
                                    </div>
                                    <div class=" ">
                                        <span class="text-overline blue--text text--lighten-1">Salary:</span>
                                        <span class="subtitle-2">{{ userDetailInfo.salary }}</span>
                                    </div>
                                    <div class=" ">
                                        <span class="text-overline blue--text text--lighten-1">Join Date:</span>
                                        <span class="subtitle-2">{{ getDateString(userDetailInfo.join_date) }}</span>
                                    </div>



                                </v-list-item-content>

                                <v-list-item-avatar class="rounded-circle" tile size="80" color="grey">
                                    <img :src="getAvatar()" alt="">
                                    
                                </v-list-item-avatar>

                            </v-list-item>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script src="./UserDetail.js"></script>

<style>
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

.text_style {
    font-size: 1rem !important;
    font-family: Roboto, sans-serif !important;
    font-weight: 500;
}
</style>