import axios from 'axios';

let headers = {
  'Content-Type': 'application/json',
};

let auth = {};
const urlParams = new URLSearchParams(window.location.search);
const appType = urlParams?.get('app_type');
if (appType === 'user_app') {
  auth = localStorage.getItem(`oidc.user:${process.env.REACT_APP_KEYCLOAK_AUTHORITY_EXTERNAL}:${process.env.REACT_APP_KEYCLOAK_CLIENT_ID_EXTERNAL}`);
} else {
  auth = localStorage.getItem(`oidc.user:${process.env.REACT_APP_KEYCLOAK_AUTHORITY_INTERNAL}:${process.env.REACT_APP_KEYCLOAK_CLIENT_ID_INTERNAL}`);
}

if (JSON.parse(auth)?.access_token) {
  headers = { ...headers, Authorization: `Bearer ${JSON.parse(auth).access_token}` };
}

const apiInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/v1`,
  headers,
});

export default apiInstance;
