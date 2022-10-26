import { mapState } from 'vuex'
import CookieUtls from '../../services/CookieUtls';

import PasswordService from '@/services/API/UserManagementAPI/PasswordService';
import UserManagementServices from '@/services/API/UserManagementAPI/UserManagementServices';
import { ABSENT_HISTORY_SCREEN, ABSENT_TICKET_SCREEN, OT_HISTORY_SCREEN, OT_TICKET_SCREEN, REAL_TIME_TRACKING_SCREEN, REPORT_RECEIVER_SCREEN, TIME_TRACKING_SCREEN } from '../../config/screenName';
import { LEAVE_CHANNEL, OVERTIME_CHANNEL, REPORT_CHANNEL, TIME_TRACKING_CHANNEL, REAL_TIME_TRACKING_CHANNEL } from '../../config/channel';

import moment from 'moment';

export default {
    name: 'Header',
    data() {
        return {
            socket: {},

            menu: false,

            passwdModal: false,
            currPasswrd: '',
            newPasswrd: '',
            confirmPasswrd: '',

            profileModal: false,
            profileModel: {},
            file: undefined,
            isChangeImg: false,
            userAvatar: '',
            genderItems: [{
                text: 'Male',
                value: 0,
            },
            {
                text: 'Female',
                value: 1,
            },
            {
                text: 'Other',
                value: 2,
            }]
        }
    },
    mounted() {

        this.$mySocket.on(OVERTIME_CHANNEL, (msg) => {
            switch (msg) {
                case 0:
                    this.$root.$emit(OT_HISTORY_SCREEN);
                    this.$root.$emit(OT_TICKET_SCREEN);
                    break;
                case 1:
                    this.$root.$emit(OT_HISTORY_SCREEN);
                    break;
                case 2:
                    this.$root.$emit(OT_TICKET_SCREEN);
                    break;
                default:
                    break;
            }
        });

        this.$mySocket.on(LEAVE_CHANNEL, (msg) => {
            switch (msg) {
                case 0:
                    this.$root.$emit(ABSENT_HISTORY_SCREEN);
                    this.$root.$emit(ABSENT_TICKET_SCREEN);
                    break;
                case 1:
                    this.$root.$emit(ABSENT_HISTORY_SCREEN);
                    break;
                case 2:
                    this.$root.$emit(ABSENT_TICKET_SCREEN);
                    break;
                default:
                    break;
            }
        });

        this.$mySocket.on(REPORT_CHANNEL, () => {
            this.$root.$emit(REPORT_RECEIVER_SCREEN);
        });

        this.$mySocket.on(TIME_TRACKING_CHANNEL, (msg) => {
            this.$root.$emit(TIME_TRACKING_SCREEN,msg);
        });
        this.$mySocket.on(REAL_TIME_TRACKING_CHANNEL, (msg) => {
            this.$root.$emit(REAL_TIME_TRACKING_SCREEN,msg);
        });
        this.profileModel = this.startDataUser
    },
    computed: {
        ...mapState(["startDataUser"]),
    },
    watch: {
        startDataUser: function (newVal) {
            this.profileModel = {
                ...newVal,
                avt: 'http://26.197.75.244:3000/api/public/avts/' + newVal.avt,
                dob: moment(this.startDataUser.dob).local().format('YYYY-MM-DD')
            }
        }
    },
    methods: {
        allowedDates(date) {
            let now = moment().format('YYYY-MM-DD');
            return date <= now;
        },
        redirect(component) {
            this.$router.push(component);
        },
        logout() {
            CookieUtls.removeAllCookie();
            this.redirect('login');
        },
        openInput() {
            document.getElementById('imgupload').click();
        },
        async imgInput(event) {
            let file = event.target.files[0];
            this.isChangeImg = true
            if (file.size > 1024 * 1024 * 2) {
                alert('file to big')
            }
            this.file = file;
            this.profileModel.avt = URL.createObjectURL(file);
        },
        async onSavePasswrd() {
            if (this.newPasswrd !== this.confirmPasswrd) {
                this.$eventBus.$emit('show-toast', {
                    type: 'error',
                    message: 'Password does not match'
                });
                return;
            } 
            let params = {
                currentPassword: this.currPasswrd,
                newPassword: this.newPasswrd,
            }
            let response = await PasswordService.updatePassword(params);
            if (!response) {
                this.$router.push('/user/login')
                return;
            } else {
                alert('Success')
            }
            this.passwdModal = false;
        },
        async onSaveProfile() {
            let form = new FormData();
            if (this.file) {
                form.append('file', this.file)
            }
            if (this.profileModel.first_name != this.startDataUser.first_name) {
                form.append('firstName', this.profileModel.first_name)
            }
            if (this.profileModel.last_name != this.startDataUser.last_name) {
                form.append('lastName', this.profileModel.last_name)
            }
            if (this.profileModel.dob != moment(this.startDataUser.dob).local().format('YYYY-MM-DD')) {
                form.append('dob', this.profileModel.dob);
            }
            if (this.profileModel.address != this.startDataUser.address) {
                form.append('address', this.profileModel.address);
            }
            if (this.profileModel.gender != this.startDataUser.gender) {
                form.append('gender', this.profileModel.gender);
            }
            if (this.profileModel.phone != this.startDataUser.phone) {
                form.append('phone', this.profileModel.phone);
            }
            if (this.profileModel.main_skill != this.startDataUser.main_skill) {
                form.append('mainSkill', this.profileModel.main_skill);
            }
            if (this.profileModel.sub_skill != this.startDataUser.sub_skill) {
                form.append('subSkill', this.profileModel.sub_skill);
            }
            let response = await UserManagementServices.updateUserInfo(form);
            if (!response) {
                this.$router.push('/user/login')
                return;
            } else {
                alert('Success')
                this.$router.go()
            }
        },
        toggleDrawerMini() {
            this.$store.commit("setDrawerMini");
        },
    },
}