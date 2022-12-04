
import SessionUtls from '../../../services/SessionUtls';
import tabName from '../../../config/tabname';

export default {
	name: 'AdminDashboard',
	data() {
		return {
			value: 60,

		};
	},

	components: {

	},

	async created() {

	},

	methods: {

	},

	beforeCreate() {
		SessionUtls.setItem(SessionUtls.tabNameKey, tabName.homeAdmin);
	},
};
