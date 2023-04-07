import React from 'react';
import { useAuth } from 'react-oidc-context';
import roleMapper from '../../utils/roleMapper';

function NavBar() {
  const auth = useAuth();
  if (auth.isAuthenticated) {
    return (
      <div>
        Hello
        {auth.user?.profile.preferred_username}
        {roleMapper(auth.user?.profile.clientRoles[0])}
        <button type="button" onClick={() => auth.removeUser()}>Log out</button>
      </div>
    );
  }

  return <button type="button" onClick={() => auth.signinRedirect()}>Log in</button>;
}

export default NavBar;
