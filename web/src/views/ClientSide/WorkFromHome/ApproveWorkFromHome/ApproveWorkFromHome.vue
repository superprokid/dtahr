<template>
    <v-app>
        <v-main>
            <v-container class="pa-6">
                <v-toolbar class="text-h5" color="#154C79" dark>Approve Work From Home</v-toolbar>
                <v-card outlined>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-container>

                            <div class="d-flex justify-end">
                                <v-btn color="primary" class="mr-4" @click="onClickApproveAllWfhTicket">
                                    Approve Selected
                                </v-btn>

                                <v-btn color="error" class="" @click="onClickRejectAllWfhTicket">
                                    Reject Selected
                                </v-btn>
                            </div>
                            <v-data-table v-model="selected" :headers="headers" :items="listWfhTicket"
                                :single-select="singleSelect" :search="search" :custom-filter="filterOnlyCapsText" 
                                item-key="id" show-select class="elevation-1">
                                <template v-slot:top>
                                    <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch>
                                    <v-text-field v-model="search" label="Search" class="mx-4"></v-text-field>
                                </template>
                                <template v-slot:item.actions="{ item }">
                                    <v-tooltip bottom v-if="item.status == 'PENDING'">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon color="green" small class="mr-2" v-bind="attrs" v-on="on"
                                                @click="updateStatusWfhTicket(item.employee_id, item.wfh_date, 1)">
                                                mdi-check
                                            </v-icon>
                                        </template>
                                        <span>Approve</span>
                                    </v-tooltip>
                                    <v-tooltip bottom v-if="item.status == 'PENDING'">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-icon color="red" small v-bind="attrs" v-on="on"
                                                @click="updateStatusWfhTicket(item.employee_id, item.wfh_date, 2)">
                                                mdi-close
                                            </v-icon>
                                        </template>
                                        <span>Reject</span>
                                    </v-tooltip>
                                </template>
                                
                            </v-data-table>

                        </v-container>
                    </v-form>

                </v-card>

            </v-container>
        </v-main>
    </v-app>
</template>

<script src="./ApproveWorkFromHome.js"></script>