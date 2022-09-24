import { BASE_API_USER_URL } from '../../../config/constant';
import axiosClient, {
	asyncRecallFunction,
} from '../../../services/API/API';

export default {
	name: 'HomePage',
	methods: {
		async test() {
			await asyncRecallFunction(() => {
				return axiosClient.get(BASE_API_USER_URL + '/get')
			});
		},
	},
};
