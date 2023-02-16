import axios from 'axios';

export default function axiosFn(method, url, data = [], headers = '') {
  return axios({
    method,
    url: `http://localhost:8090/${url}`,
    data,
    headers,
  }).catch((error) => {
    console.log(error.response.status);
  });
}
