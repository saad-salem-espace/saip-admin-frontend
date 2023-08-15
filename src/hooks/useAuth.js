import { useContext, useMemo } from 'react';
import AppAuthContext from 'contexts/AppAuthContext';
import { useAuth as useMainAuth } from 'react-oidc-context';

const useAuth = () => {
  const { role, localRefreshUser, requestSignOut } = useContext(AppAuthContext);

  const mainAuth = useMainAuth();

  const auth = useMemo(
    () => ({
      ...mainAuth,
      role,
      localRefreshUser,
      requestSignOut,
    }),
    [...Object.values(mainAuth), role],
  );

  return auth;
};

export default useAuth;
