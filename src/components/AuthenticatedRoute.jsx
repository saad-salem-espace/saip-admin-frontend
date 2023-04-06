import { Outlet } from 'react-router-dom';
import Login from './login/Login';

const AuthenticatedRoute = () => {
  const auth = localStorage.getItem(`oidc.user:${process.env.REACT_APP_KEYCLOAK_AUTHORITY}:${process.env.REACT_APP_KEYCLOAK_CLIENT_ID}`);
  return (
    auth ? <Outlet /> : <Login />
  );
};

export default AuthenticatedRoute;
