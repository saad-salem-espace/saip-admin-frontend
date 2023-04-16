import { Outlet } from 'react-router-dom';
import Login from './login/Login';

const AuthenticatedRoute = () => {
  let auth = {};
  const urlParams = new URLSearchParams(window.location.search);
  const appType = urlParams?.get('appType');
  if (appType === 'user_app') {
    auth = localStorage.getItem(`oidc.user:${process.env.REACT_APP_KEYCLOAK_AUTHORITY_EXTERNAL}:${process.env.REACT_APP_KEYCLOAK_CLIENT_ID_EXTERNAL}`);
  } else {
    auth = localStorage.getItem(`oidc.user:${process.env.REACT_APP_KEYCLOAK_AUTHORITY_INTERNAL}:${process.env.REACT_APP_KEYCLOAK_CLIENT_ID_INTERNAL}`);
  }
  return (
    JSON.parse(auth)?.access_token ? <Outlet /> : <Login />
  );
};

export default AuthenticatedRoute;
