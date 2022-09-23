export default {
  name: 'Input',
  props: ['inputID', 'inputType', 'inputTitle', 'disable', 'startTimeSetup'],
  data() {
    return {
      inputContents: '',
    };
  },
  methods: {
    onInput() {
      this.$emit('on-input', this.inputContents);
    },
  },
  mounted() {
    if (this.startTimeSetup != '') {
      this.inputContents = this.startTimeSetup;
    }
  },
};
