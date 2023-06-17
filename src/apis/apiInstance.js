import axios from 'axios';

const headers = {
  'Content-Type': 'application/json',
};
const hostURL = process.env.REACT_APP_BACKEND_URL;
const apiInstance = axios.create({
  baseURL: `${hostURL.endsWith('/') ? hostURL.slice(0, -1) : hostURL}/api/v1`,
  headers,
});

export default apiInstance;
