export default {
  props: {
    /**
     * Page header Content
     * @binding {string}
     */
    pageHeaderContent: {
      type: String,
      default: ''
    },
    /**
     * Logo url
     * @binding {string}
     */
    logoUrl: {
      type: String,
      required: true
    }
  }
}