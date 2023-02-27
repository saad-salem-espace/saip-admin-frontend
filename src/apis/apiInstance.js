import axios from 'axios';

const apiInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/v1`,
  headers: {
    // TODO add auth
    'Content-Type': 'application/json',
  },
});

export default apiInstance;
