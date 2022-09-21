export default {
  name: 'DropDown',
  props: ['dropDownTitle', 'selectedOptions', 'disable', 'placeSetup'],
  data() {
    return {
      selectedObject: '',
    };
  },
  methods: {
    onChange() {
      this.$emit('on-change', this.selectedObject);
    },
  },
  mounted() {
    this.selectedObject = this.placeSetup;
  },
};
