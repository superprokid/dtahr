export default {
  data() {
    return {
      isSpinnerShow: false,
    };
  },
  mounted() {
    this.$eventBus.$on("show-spinner", (isSpinnerShow) => {
      this.isSpinnerShow = isSpinnerShow;
    });
  },
  destroyed() {
    this.$eventBus.$off("show-spinner")
  }
};