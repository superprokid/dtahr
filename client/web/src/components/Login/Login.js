//import { Auth } from "aws-amplify";

export default {
  name: "Login",
  props: {
    logoPath: {
      type: String,
      required: true,
    },
    /**
     * @binding {boolean} Check Username or Password is empty
     */
    isLoginDataEmpty: {
      type: Boolean,
      default: false
    },
    /**
     * @binding {boolean} Check User belongs to Group
     */
    isUserNotInGroup: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      /**
       * @binding {string} Input Username and Password
       */
      userName: "",
      password: "",
    };
  },

  methods: {
    login() {
      let loginData = { email: this.userName, password: this.password };
      // Send data to parent component
      this.$emit('login', loginData)
    },
  },
};