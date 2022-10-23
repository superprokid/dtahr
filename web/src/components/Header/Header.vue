<template>
  <div id="header" class="d-flex flex-row justify-content-between">
    <div class="d-flex flex-row align-center">
      <v-app class="item-container">
        <v-list-item class="item-account">
          <v-icon medium color="white" @click="toggleDrawerMini">
            mdi-menu
          </v-icon>
          <v-list-item-content>
            <v-list-item-title class="site-title">HRM</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-app>
    </div>
    <div class="d-flex flex-row align-center">
      <v-app class="item-container">
        <v-list-item class="item-account">
          <v-icon large color="white"> mdi-account-circle </v-icon>
          <md-menu md-size="medium" md-align-trigger>
            <md-button md-menu-trigger class="user-name">{{
              startDataUser.first_name + " " + startDataUser.last_name
            }}</md-button>
            <md-menu-content>
              <md-menu-item @click="profileModal = true"
                >Setting profile</md-menu-item
              >
              <md-menu-item @click="passwdModal = true"
                >Change password</md-menu-item
              >
              <md-menu-item @click="logout">Log out</md-menu-item>
            </md-menu-content>
          </md-menu>
        </v-list-item>
        <v-dialog v-model="passwdModal" persistent max-width="800px">
          <v-card>
            <v-toolbar class="text-h5" color="primary" dark
              >Change Password</v-toolbar
            >
            <v-card-text>
              <v-container>
                <v-text-field
                  label="Current Password *"
                  :rules="[() => !!currPasswrd || 'This field is required']"
                  v-model="currPasswrd"
                  type="password"
                  hint="Your current password"
                >
                </v-text-field>
                <v-text-field
                  label="New Password *"
                  :rules="[() => !!newPasswrd || 'This field is required',
                  () => newPasswrd.length >= 6 || 'Password must be at least 6 characters']"
                  v-model="newPasswrd"
                  type="password"
                  hint="Your new password"
                >
                </v-text-field>
                <v-text-field
                  label="Confirm Password *"
                  :rules="[() => !!confirmPasswrd || 'This field is required',
                  () => confirmPasswrd === newPasswrd || 'Password does not match']"
                  v-model="confirmPasswrd"
                  type="password"
                  hint="Confirm your new password"
                >
                </v-text-field>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="passwdModal = false">
                Close
              </v-btn>
              <v-btn color="blue darken-1" text @click="onSavePasswrd"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="profileModal" persistent max-width="800px">
          <v-card>
            <v-toolbar class="text-h5" color="primary" dark
              >Change Profile</v-toolbar
            >
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="4" md="4">
                    <v-text-field
                      label="First Name *"
                      :rules="[() => !!profileModel.first_name || 'This field is required']"
                      v-model="profileModel.first_name"
                      type="text"
                      hint="Your first name">
                    </v-text-field>
                    <v-text-field
                      label="Last Name *"
                      :rules="[() => !!profileModel.last_name || 'This field is required']"
                      v-model="profileModel.last_name"
                      type="text"
                      hint="Your last name">
                    </v-text-field>
                    <!-- <v-text-field
                      label="Day of birth *"
                      :rules="[() => !!profileModel.dob || 'This field is required']"
                      v-model="profileModel.dob"
                      type="text"
                      hint="Your day of birth">
                    </v-text-field> -->
                    <v-menu
                      v-model="menu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="profileModel.dob"
                          label="Day of birth *"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="profileModel.dob"
                        :allowed-dates="allowedDates"
                        @input="menu = false"
                      ></v-date-picker>
                    </v-menu>
                    <v-text-field
                      label="Address *"
                      :rules="[() => !!profileModel.address || 'This field is required']"
                      v-model="profileModel.address"
                      type="text"
                      hint="Your address">
                    </v-text-field>
                    <v-select
                      :items="genderItems"
                      item-text="text"
                      v-model="profileModel.gender"
                      item-value="value"
                      label="Gender *"
                      hint="Your gender"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="4" md="4">
                    <v-text-field
                      label="Email *"
                      v-model="profileModel.email"
                      type="text"
                      readonly
                      hint="Your email">
                    </v-text-field>
                    <v-text-field
                      label="Relationship *"
                      v-model="profileModel.relationship"
                      readonly
                      type="text"
                      hint="Your relationship">
                    </v-text-field>
                    <v-text-field
                      label="Relative address *"
                      v-model="profileModel.relative_address"
                      readonly
                      type="text"
                      hint="Your relative address">
                    </v-text-field>
                    <v-text-field
                      label="Relative name *"
                      v-model="profileModel.relative_name"
                      readonly
                      type="text"
                      hint="Your relative name">
                    </v-text-field>
                    <v-text-field
                      label="Relative phone *"
                      v-model="profileModel.relative_phone"
                      readonly
                      type="text"
                      hint="Your relative phone">
                    </v-text-field>

                  </v-col>
                  <v-col  cols="12" sm="4" md="4">
                    <v-text-field
                      label="Phone number *"
                      :rules="[() => (!!profileModel.phone) || 'This field is required']"
                      v-model="profileModel.phone"
                      type="text"
                      hint="Your phone number">
                    </v-text-field>
                    <v-text-field
                      label="Main skill *"
                      :rules="[() => !!profileModel.main_skill || 'This field is required']"
                      v-model="profileModel.main_skill"
                      type="text"
                      hint="Your main skill">
                    </v-text-field>
                    <v-text-field
                      label="Sub skill *"
                      :rules="[() => !!profileModel.sub_skill || 'This field is required']"
                      v-model="profileModel.sub_skill"
                      type="text"
                      hint="Your sub skill">
                    </v-text-field>
                    <img @click="openInput" id="avatar" class="image_avatar" :src="profileModel.avt">
                    <input @change="imgInput" type="file" id="imgupload" style="display:none" 
                      accept="image/png, image/jpeg"/> 
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="profileModal = false">
                Close
              </v-btn>
              <v-btn color="blue darken-1" text @click="onSaveProfile"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-app>
    </div>
  </div>
</template>

<script src="./Header.js"></script>

<style src="./Header.css" scoped>
</style>