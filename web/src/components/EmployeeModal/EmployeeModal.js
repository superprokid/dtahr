import {USER_GET_IMAGE} from '../../config/constant'

export default{
    name: 'EmployeeModal',
    props: {
        // The 'value' prop is the v-model of the component
        value:  Boolean,
        propPackage: {
          type: Object,
          required: true,
          default: {}
        },
      isAdminEdit: {
        type: Boolean,
      }
    },
    data: () => ({
        // Instead of trying to access the prop value on the data block
        // Set up a watcher for this prop, and do the value assignment there
        // selectPackage: this.propPackage,
        selectPackage: '',
        avtBaseUrl: USER_GET_IMAGE,
        cameraShow: false,
    }),  
    watch: {
        propPackage(val) {
          // Be sure to validate default values
          if(val !== '') {
            this.selectPackage = val
          }
        }
    },
    computed: {
        // Configuring a computed property like this,
        // you can close the dialog from the child component
        // and avoid the mutation prop warning
        show: {
            get() {
              return this.value
            },
            set(value) {
              var me = this
              me.$emit('input', value)
            }
        }
    },
    methods: {
        close() {
          // It's okay to use $emit and set a @close event 
          // if you need to pass data to parent component
          //this.$emit("close", data);
    
          // But if not, with help of the computed property 'show' 
          // we can close the dialog from the child component
          // by just assign the value to false, since it's used
          // as the v-model of the component it also gets updated
          // on the parent component
          this.show = false
      },
      openCamera() {
        this.cameraShow = true
        let video = document.getElementById('camera')

        navigator.mediaDevices.getUserMedia({ video: true })
          .then((stream) => {
            video.srcObject = stream;
          }).catch((err) => {
            console.log(err)
          })
      }
    },
}