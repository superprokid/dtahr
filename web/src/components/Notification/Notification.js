export default {
  props: {
    /**
     * @binding {string} Notification header background color
     * @value : primary, success, warning, danger
     */
    notiHeaderBgColor: {
      type: String,
      required: true,
    },
    /**
     * @binding {string} Notification header text color
     * @value : light, dark
     */
    notiHeaderTextColor: {
      type: String,
      default: 'light',
    },
    /**
     * @binding {string} Notification title
     */
    notiTitle: {
      type: String,
      required: true,
    },
    /**
     * @binding {string} Notification body text
     */
    notiBody: {
      type: String,
      required: true,
    },
    /**
     * @binding {boolean} Notification footer have only Ok button
     * @value : true, false
     */
    okButtonOnly: {
      type: Boolean,
      default: false,
    },
    onClickOkButton: {
      type: Function,
    },
    onClickCancelButton: {
      type: Function,
    },
    /**
     * @binding {boolean} Notification show or hide
     * @value : true, false
     */
    isModalShowed: {
      type: Boolean,
      default: true,
    },
  },
};
