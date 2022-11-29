/* eslint-disable */
import SessionUtls from "../../../services/SessionUtls"
import tabName from '../../../config/tabname';
import { getDateString, getTimeString, getAvatar } from "../../../services/utilities";

import AdminProjectServices from "../../../services/API/AdminProjectAPI/AdminProjectServices"

export default {
	name: 'AdminProjectDetail',
	components:{

	},

	data() {
		return {

		};
	},
    async mounted() {
        this.$eventBus.$emit('show-spinner', true);
        console.log('this.$route.params.projectId', this.$route.params.projectId);
        this.$eventBus.$emit('show-spinner', false);
    },
    computed: {
        
    },
	methods: {

	},


};
