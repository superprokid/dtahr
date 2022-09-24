// import { Auth } from "aws-amplify"

// import Login from "../../components/Login/Login.vue";
// import LoginServices from '../../services/Login/LoginServices'
// import GetCurrentUserNameService from '../../services/User/GetCurrentUserNameService'
// import Notification from '../../components/Notification/Notification.vue'

import Login from "@/components/Login/Login.vue";
import Notification from '@/components/Notification/Notification.vue'

import LoginServices from '@/services/API/Login/LoginServices'
import SessionUtls from "@/services/SessionUtls";

export default {
  name: "LoginPage",
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

      notiHeaderBgColor: "",
      notiTitle: "",
      notiBody: "",
    };
  },
  created(){

  },
  methods: {
    async login(data) {
      console.log('data', data);
      if (data.userName === "" || data.password === "") {
        this.isLoginDataEmpty = true;
      } else {
        this.isLoginDataEmpty = false;
        const response = await LoginServices.checkLogin(data)
        if(response != null && response.status === 200){
          SessionUtls.setAccessToken(response.data.accessToken);
          SessionUtls.setRefreshToken(response.data.refreshToken);
          //navigate to
            this._navigateSite();
        }else {
            this.notiHeaderBgColor = "danger"
            this.notiTitle = "Error"
            this.notiBody = "User Name or Password is incorrect. Please try again!"
            this.isUserConfirmModelShowed = true
        }
      }
    },

    async _navigateSite() {
        this.$router.push('/user/home')
    },

    onClickOkButton() {
      this.isUserConfirmModelShowed = false
    }

  }
};