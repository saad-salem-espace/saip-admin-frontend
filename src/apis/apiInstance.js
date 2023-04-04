import axios from 'axios';

let headers = {
  'Content-Type': 'application/json',
};

const auth = localStorage.getItem(`oidc.user:${process.env.REACT_APP_KEYCLOAK_AUTHORITY}:${process.env.REACT_APP_KEYCLOAK_CLIENT_ID}`);

if (JSON.parse(auth)?.access_token) {
  headers = { ...headers, Authorization: `Bearer ${JSON.parse(auth).access_token}` };
}

const apiInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/v1`,
  // eslint-disable-next-line object-shorthand
  headers: headers,
});

export default apiInstance;
