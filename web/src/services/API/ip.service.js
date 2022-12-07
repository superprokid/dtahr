import axios from 'axios';


const ipURL = 'https://api.ipify.org/?format=json';
const IPService = {
  async getIP() {
    try {
      let response = await axios.get(`${ipURL}`);
      return response.data.ip;
    }
    catch (error) {
      console.log(error);
    }
  }
};

export default IPService;