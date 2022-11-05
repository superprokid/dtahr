/* eslint-disable */
import AdminGroupServices from "../../services/API/AdminGroup/AdminGroupServices"
import moment from 'moment';

export default {
    name: 'AddCategoryTaskModal',
    components: {
    },
    props: {
        
    },
    data() {
        return {
            categoryName: '',
            categoryNameRules: [
                v => !!v || 'Category Name is required',
            ],

            picker: '#F44336',
            valid: true,
        };
    },
    mounted(){

    },
    methods: {
        onClose() {
            this.$emit('on-close',1);
        },
        async onSave() {
            // this.$emit('on-save');
        },

        onClickCreateCategoryTask(){
            if(this.$refs.form.validate()){
                const params = {
                    categoryName: this.categoryName,
                    categoryColor: this.picker
                }
                this.$emit('on-create-category-task', params);
            }
        },
        reset () {
            this.$refs.form.reset()
        },
        resetValidation () {
            this.$refs.form.resetValidation()
        },

        remove (item) {
            this.managerSelect.splice(this.managerSelect.indexOf(item), 1)
        },
        required(value) {
            if (value instanceof Array && value.length == 0) {
              return 'Manager is Required.';
            }
            if (value instanceof Array && value.length > 1) {
                return 'Only 1 Manager.';
              }
            return !!value || 'Manager is Required.';
        },

    },
}