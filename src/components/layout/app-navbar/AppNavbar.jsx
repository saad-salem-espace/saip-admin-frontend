import { useAuth } from 'react-oidc-context';
import LoggedNavbar from './LoggedNavbar';
import GuestNavbar from './GuestNavbar';

import './AppNavbar.scss';

function AppNavbar() {
  const auth = useAuth();
  if (auth.isAuthenticated) {
    return (
      <LoggedNavbar />
    );
  }
  return (
    <GuestNavbar />
  );
}

export default AppNavbar;
