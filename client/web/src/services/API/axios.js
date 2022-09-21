import axiosBase from 'axios';

const axios = axiosBase.create({
  withCredentials: true,
  //this is devlopment host
  baseURL: 'http://localhost:3000', //process.env.baseURL 
});

export default axios;
