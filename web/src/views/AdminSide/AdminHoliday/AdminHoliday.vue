<template>
  <div>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
              Actions
              <v-icon>mdi-menu-down</v-icon>
          </v-btn>

      </template>
      <v-list>
          <v-list-item>
              <v-btn @click="addHolidayModal = true" text>
                  <v-icon style="margin-right: 10px">
                      mdi-receipt-text-plus-outline
                  </v-icon>
                  Add Holiday
              </v-btn>
          </v-list-item>
          <v-list-item>
              <v-btn text>
                  <v-icon style="margin-right: 10px">
                      mdi-receipt-text-plus-outline
                  </v-icon>
                  Export CSV
              </v-btn>
          </v-list-item>
      </v-list>
    </v-menu>

    <v-data-table :headers="headers" :items="holiday" item-class="item-row"
        :search="search" item-key="holiday_id"
        class="elevation-1">
        <template v-slot:top>
            <v-text-field v-model="search" label="Search" class="mx-4"></v-text-field>
        </template>
        <template v-slot:item.date="{ item }"> 
            {{ item.date | formatDate }}
        </template>
        <template v-slot:item.action="{ item }">
            <v-icon style="color:red" small @click="onClickDeleteHoliday(item)">mdi-delete</v-icon>
        </template>
    </v-data-table>

    <v-dialog v-model="addHolidayModal" v-if="addHolidayModal" persistent max-width="800px">
            <!-- <template v-slot:activator="{ on, attrs }">
                <v-icon style="margin-right: 10px" v-bind="attrs" v-on="on">mdi-text-box-edit-outline
                </v-icon>
                <v-list-item-title v-bind="attrs" v-on="on">Add</v-list-item-title>
            </template> -->
            <v-card>
                <AddHolidayDate @on-close="onCloseModal" @on-save="onSave"/>
            </v-card>
        </v-dialog>
  </div>
</template>

<script src="./AdminHoliday.js">
</script>

<style src="./AdminHoliday.css">
</style>