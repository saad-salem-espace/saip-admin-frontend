import axios from 'axios';

const headers = {
  'Content-Type': 'application/json',
};
const apiInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/v1`,
  headers,
});

export default apiInstance;
