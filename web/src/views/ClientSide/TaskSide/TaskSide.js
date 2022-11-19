/* eslint-disable */
import SessionUtls from '@/services/SessionUtls';
import { TAB_TYPE } from '@/config/constant';

export default {
  name: 'TaskSide',
  mounted() {
    console.log('abc');
  },
  beforeMount() {
    SessionUtls.setItem(SessionUtls.tabTypeKey, TAB_TYPE.TASK);
    this.$root.$emit('drawer');
  },
  beforeDestroy() {
    SessionUtls.setItem(SessionUtls.tabTypeKey, TAB_TYPE.USER);
    this.$root.$emit('drawer');
  },
};
