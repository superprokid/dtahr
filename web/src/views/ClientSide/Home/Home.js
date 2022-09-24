import { BASE_API_USER_URL } from '../../../config/constant';
import axiosClient, {
	asyncRecallFunction,
} from '../../../services/API/API';

export default {
	name: 'HomePage',
	methods: {
		async test() {
			let response = await asyncRecallFunction(() => {
				return axiosClient.get(BASE_API_USER_URL + '/get');
			});
			console.log(response);
		},
	},
};
