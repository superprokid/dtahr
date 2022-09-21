// import { Auth } from "aws-amplify"

// import Login from "../../components/Login/Login.vue";
// import LoginServices from '../../services/Login/LoginServices'
// import GetCurrentUserNameService from '../../services/User/GetCurrentUserNameService'
// import Notification from '../../components/Notification/Notification.vue'

import Login from "../../components/Login/Login.vue";
import Notification from '../../components/Notification/Notification.vue'

import LoginServices from '../../services/API/Login/LoginServices'

export default {
  name: "LoginPage",
  components: { Login, Notification },
  data() {
    return {
      logoPath: require(`../../assets/logo.png`),
      /**
       * @binding {boolean} Check Username or Password is empty
       */
      isLoginDataEmpty: false,
      isUserNotInGroup: false,
      /**
       * @binding {string} Notification Title and Body text
       */
      isUserConfirmModelShowed: false
    };
  },
  created(){

  },
  methods: {
    async login(data) {
      console.log('data', data);
      if (data.userName === "" || data.password === "") {
        this.isUserNotInGroup = false;
        this.isLoginDataEmpty = true;
      } else {
        this.isLoginDataEmpty = false;
        const response = await LoginServices.checkLogin(data)
        console.log('response',response);
        if(response != null){
          sessionStorage.setItem("hrm-login-token", response.accessToken)
          sessionStorage.setItem("hrm-refresh-token", response.refreshToken)
          //navigate to
          this.$router.push('/home')
        }
      }
    },

  }
};