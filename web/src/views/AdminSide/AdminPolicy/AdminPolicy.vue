<template>
  <div>
    <div class="admin-project-title-static">
        Allowance
    </div>
    <v-row v-if="policy.allowance" no-gutters align="center" justify="center">
      <v-col cols="12" md="4">
        <v-text-field v-model="policy.allowance.house" type="number" label="House" :readonly="editMode != 2"></v-text-field>
        <v-text-field v-model="policy.allowance.internet" type="number" label="Internet" :readonly="editMode != 2" ></v-text-field>
        <v-text-field v-model="policy.allowance.lunch" type="number" label="Lunch" :readonly="editMode != 2" ></v-text-field>
        <v-text-field v-model="policy.allowance.phone" type="number" label="Phone" :readonly="editMode != 2" ></v-text-field>
      </v-col>
      <v-col cols="12" md="4" offset-md="1">
        <v-text-field v-model="policy.allowance.transport" type="number" label="Transport" :readonly="editMode != 2" ></v-text-field>
        <v-text-field v-model="policy.allowance.tax" type="number" label="Tax" :readonly="editMode != 2" ></v-text-field>
        <v-text-field v-model="policy.allowance.insurance" type="number" label="Insurance" :readonly="editMode != 2" ></v-text-field>
        <v-card-actions v-if="editMode == 2">
            <v-btn color="blue darken-1" text @click="editMode=0;getPolicy()">
                Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="onUpdatePolicy">
                Save
            </v-btn>
        </v-card-actions>
        <v-card-actions v-else>
          <v-btn color="blue darken-1" text @click="editMode=2">
                Edit
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
    <hr>
    <div class="admin-project-title-static">
        OverTime Payment
    </div>
    <v-row v-if="policy.otPayment" no-gutters align="center" justify="center">
      <v-col cols="12" md="4">
        <v-text-field v-model="policy.otPayment.ot_payment_daily_day" type="number" label="Day" :readonly="editMode != 1"></v-text-field>
        <v-text-field v-model="policy.otPayment.ot_payment_daily_night" type="number" label="Night" :readonly="editMode != 1" ></v-text-field>
      </v-col>
      <v-col cols="12" md="4" offset-md="1">
        <v-text-field v-model="policy.otPayment.ot_payment_holiday" type="number" label="Holiday" :readonly="editMode != 1" ></v-text-field>
        <v-text-field v-model="policy.otPayment.ot_payment_weekend" type="number" label="Weekend" :readonly="editMode != 1" ></v-text-field>
        <v-card-actions v-if="editMode == 1">
            <v-btn color="blue darken-1" text @click="editMode=0;getPolicy()">
                Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="onUpdatePolicy">
                Save
            </v-btn>
        </v-card-actions>
        <v-card-actions v-else>
          <v-btn color="blue darken-1" text @click="editMode=1">
                Edit
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
    <hr>
    <div class="admin-project-title-static">
        Number of days leave
    </div>
    <v-row v-if="policy" no-gutters align="center" justify="center">
      <v-col cols="12" md="4">
        <v-text-field v-model="policy.increase_paid_leave_month" type="number" label="Number of days" :readonly="editMode != 3"></v-text-field>      </v-col>
      <v-col cols="12" md="4" offset-md="1">
        <v-card-actions v-if="editMode == 3">
            <v-btn color="blue darken-1" text @click="editMode=0;getPolicy()">
                Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="onUpdatePolicy">
                Save
            </v-btn>
        </v-card-actions>
        <v-card-actions v-else>
          <v-btn color="blue darken-1" text @click="editMode=3">
                Edit
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </div>
</template>

<script src="./AdminPolicy.js">
</script>

<style>
</style>