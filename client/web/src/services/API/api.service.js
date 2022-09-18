import axiosBase from 'axios';

const axios = axiosBase.create({
	// This is development host
	baseURL: '',
});

axios.defaults.headers = {
	'Cache-Control': 'no-cache',
	Pragma: 'no-cache',
	Expires: '0',
};

const ApiService = {
	async get(resource) {
		try {
			return await axios.get(`/${resource}`);
		} catch (err) {
			throw new Error(`ApiService: ${err}`);
		}
	},

	async post(resource, body) {
		try {
			return await axios.post(`/${resource}`, body);
		} catch (err) {
			throw new Error(`ApiService: ${err}`);
		}
	},

	async put(resource, body) {
		try {
			return await axios.put(`/${resource}`, body);
		} catch (err) {
			throw new Error(`ApiService: ${err}`);
		}
	},

	async delete(resource) {
		try {
			return await axios.delete(`/${resource}`);
		} catch (err) {
			throw new Error(`ApiService: ${err}`);
		}
	},
};

export default ApiService;
