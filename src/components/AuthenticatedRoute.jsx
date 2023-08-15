import { Navigate, Outlet } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import { roles } from '../utils/roleMapper';

const AuthenticatedRoute = () => {
  const AppName = process.env.REACT_APP_NAME;

  const { role, isAuthenticated } = useAuth();

  const canAccess = AppName === 'examiner_app' ? isAuthenticated && (role === roles.EXTERNAL_EXAMINER || roles.INTERNAL_EXAMINER) : isAuthenticated && (role === roles.REGISTERED_USER || roles.PUBLIC_USER);

  return (canAccess ? <Outlet /> : <Navigate to="/" />);
};

export default AuthenticatedRoute;
