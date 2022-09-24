// import { Auth } from "aws-amplify"

// import Login from "../../components/Login/Login.vue";
// import LoginServices from '../../services/Login/LoginServices'
// import GetCurrentUserNameService from '../../services/User/GetCurrentUserNameService'
// import Notification from '../../components/Notification/Notification.vue'

import Login from '@/components/Login/Login.vue';
import Notification from '@/components/Notification/Notification.vue';

import LoginServices from '@/services/API/Login/LoginServices';
import SessionUtls from '@/services/SessionUtls';

export default {
	name: 'LoginPage',
	components: { Login, Notification },
	data() {
		return {
			logoPath: require(`@/assets/logo.png`),
			/**
			 * @binding {boolean} Check Username or Password is empty
			 */
			isLoginDataEmpty: false,
			/**
			 * @binding {string} Notification Title and Body text
			 */
			isUserConfirmModelShowed: false,

			notiHeaderBgColor: '',
			notiTitle: '',
			notiBody: '',
		};
	},
	created() {},
	methods: {
		async login(data) {
			console.log('data', data);
			if (data.email === '' || data.password === '') {
				this.isLoginDataEmpty = true;
			} else {
				data.username = data.email;
				delete data.email;
				this.isLoginDataEmpty = false;
				const response = await LoginServices.adminLogin(data);
				if (response != null && response.status === 200) {
					SessionUtls.setAdminSession(response.data.loginSession);
					//navigate to
					this._navigateSite();
				} else {
					this.notiHeaderBgColor = 'danger';
					this.notiTitle = 'Error';
					this.notiBody =
						'User Name or Password is incorrect. Please try again!';
					this.isUserConfirmModelShowed = true;
				}
			}
		},

		async _navigateSite() {
			this.$router.push('/admin/home');
		},

		onClickOkButton() {
			this.isUserConfirmModelShowed = false;
		},
	},
};
