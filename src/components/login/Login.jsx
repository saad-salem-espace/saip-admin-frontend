import React, { useEffect } from 'react';
import { useAuth } from 'react-oidc-context';

function Login() {
  const auth = useAuth();
  useEffect(() => {
    if (!(auth && auth?.user)) {
      auth.signinRedirect();
    }
  }, []);

  return (
    <div />
  );
}

export default Login;
