import axiosBase from 'axios';
import { FACE_API_URL } from '../../config/constant';
const axiosFaceRecognition = {
  registerLocalRecognition: (data, config) => {
    return axiosBase.post(`${FACE_API_URL}/register`, data, config);
  },
}
export default axiosFaceRecognition;